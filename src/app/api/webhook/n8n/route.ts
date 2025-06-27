import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema de validação para os dados do chat
const chatDataSchema = z.object({
  selectedServicePlan: z.string().min(1, 'Plano é obrigatório'),
  userName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  userEnterprise: z.string().min(2, 'Empresa é obrigatória'),
  userNumber: z.string().min(10, 'Número de WhatsApp inválido'),
  userMessage: z.string().optional(),
  promoActive: z.boolean().optional(),
  timestamp: z.string().optional(),
  source: z.string().default('website_chat'),
  chatType: z.string().optional()
});

// Rate limiting simples (em produção, usar Redis)
const requestCounts = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 5; // 5 requests por minuto
const RATE_WINDOW = 60 * 1000; // 1 minuto

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(ip);

  if (!userRequests || now - userRequests.lastReset > RATE_WINDOW) {
    requestCounts.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (userRequests.count >= RATE_LIMIT) {
    return false;
  }

  userRequests.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 [N8N Webhook] Iniciando processamento...');
    
    // Rate limiting
    const clientIP = getClientIP(request);
    console.log('📍 [N8N Webhook] Client IP:', clientIP);
    
    if (!checkRateLimit(clientIP)) {
      console.log('⚠️ [N8N Webhook] Rate limit atingido para IP:', clientIP);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Muitas tentativas. Tente novamente em 1 minuto.' 
        }, 
        { status: 429 }
      );
    }

    // Parse e validação dos dados
    const rawData = await request.json();
    console.log('📥 [N8N Webhook] Dados recebidos:', JSON.stringify(rawData, null, 2));
    
    const validatedData = chatDataSchema.parse({
      ...rawData,
      timestamp: new Date().toISOString(),
      source: 'website_chat'
    });
    console.log('✅ [N8N Webhook] Dados validados:', JSON.stringify(validatedData, null, 2));

    // Dados enriquecidos para o N8N
    const enrichedData = {
      ...validatedData,
      metadata: {
        ip: clientIP,
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
        timestamp: new Date().toISOString(),
        leadScore: calculateLeadScore(validatedData)
      }
    };
    console.log('🔧 [N8N Webhook] Dados enriquecidos:', JSON.stringify(enrichedData, null, 2));

    // Envio para N8N webhook
    console.log('🚀 [N8N Webhook] Enviando para N8N:', 'https://webhookub.mooveinsd.com.br/webhook/1a7ff005-dbd8-40fc-a0f7-2c675a2f3c94/chat');
    
    const n8nResponse = await fetch('https://webhookub.mooveinsd.com.br/webhook/1a7ff005-dbd8-40fc-a0f7-2c675a2f3c94/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'KompraX-WebApp/1.0'
      },
      body: JSON.stringify(enrichedData),
      // Adicionar timeout para evitar hangs
      signal: AbortSignal.timeout(30000) // 30 segundos
    });

    console.log('📡 [N8N Webhook] Resposta N8N Status:', n8nResponse.status, n8nResponse.statusText);
    
    // Tentar obter o texto da resposta para debug
    const responseText = await n8nResponse.text();
    console.log('📡 [N8N Webhook] Resposta N8N Body:', responseText);

    if (!n8nResponse.ok) {
      throw new Error(`N8N webhook error: ${n8nResponse.status} ${n8nResponse.statusText} - Response: ${responseText}`);
    }

    // Tentar parsear como JSON
    let n8nResult;
    try {
      n8nResult = JSON.parse(responseText);
      console.log('✅ [N8N Webhook] Resposta N8N parseada:', JSON.stringify(n8nResult, null, 2));
    } catch {
      console.log('⚠️ [N8N Webhook] Resposta não é JSON válido, usando texto:', responseText);
      n8nResult = { message: responseText };
    }

    // Resposta para o frontend
    const successResponse = {
      success: true,
      message: 'Dados enviados com sucesso! Nossa equipe entrará em contato em breve.',
      data: {
        leadId: n8nResult.leadId || `lead_${Date.now()}`,
        estimatedResponse: '24 horas',
        nextSteps: generateNextSteps(validatedData),
        aiResponse: validatedData.chatType === 'free_conversation' ? 
          generateAIResponse(validatedData) : undefined
      }
    };
    
    console.log('✅ [N8N Webhook] Sucesso! Resposta final:', JSON.stringify(successResponse, null, 2));
    return NextResponse.json(successResponse);

  } catch (error) {
    console.error('❌ [N8N Webhook] Erro completo:', error);

    // Log estruturado para monitoramento
    const errorDetails = {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      ip: getClientIP(request),
      userAgent: request.headers.get('user-agent')
    };
    
    console.error('📋 [N8N Webhook] Detalhes do erro:', JSON.stringify(errorDetails, null, 2));

    if (error instanceof z.ZodError) {
      console.error('📝 [N8N Webhook] Erro de validação Zod:', error.errors);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Dados inválidos. Verifique as informações e tente novamente.',
          details: error.errors
        }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno. Tente novamente ou entre em contato via WhatsApp.' 
      }, 
      { status: 500 }
    );
  }
}

// Função para calcular score do lead
function calculateLeadScore(data: z.infer<typeof chatDataSchema>): number {
  let score = 50; // Base score

  // Score baseado no plano escolhido
  const planScores: Record<string, number> = {
    'Exclusivo': 40,
    'Premium': 30,
    'Profissional': 20,
    'Padrão': 10
  };
  score += planScores[data.selectedServicePlan] || 0;

  // Score por promoção ativa (urgência)
  if (data.promoActive) score += 15;

  // Score por qualidade da mensagem
  if (data.userMessage && data.userMessage.length > 50) score += 10;

  // Score por completude dos dados
  if (data.userEnterprise.length > 10) score += 5;

  return Math.min(score, 100);
}

// Função para gerar próximos passos
function generateNextSteps(data: z.infer<typeof chatDataSchema>): string[] {
  const steps = [
    'Nossa equipe analisará suas necessidades específicas',
    'Prepararemos uma demonstração personalizada do KompraX'
  ];

  if (data.selectedServicePlan === 'Exclusivo') {
    steps.push('Nosso consultor sênior entrará em contato para um orçamento personalizado');
  } else {
    steps.push(`Demonstraremos como o plano ${data.selectedServicePlan} atende sua associação`);
  }

  if (data.promoActive) {
    steps.push('🔥 Aplicaremos o desconto promocional na sua proposta');
  }

  return steps;
}

// Função para gerar resposta de IA
function generateAIResponse(data: z.infer<typeof chatDataSchema>): string {
  const message = data.userMessage?.toLowerCase() || '';
  const plan = data.selectedServicePlan || '';
  const userName = data.userName || 'Cliente';
  
  // IA conversacional baseada em palavras-chave
  if (message.includes('preço') || message.includes('valor') || message.includes('custo')) {
    return `Ótima pergunta sobre preços, ${userName}! 💰<br/><br/>Os valores do <b>${plan}</b> são super competitivos. Temos opções de pagamento flexíveis e retorno garantido do investimento.<br/><br/>📞 Quer que eu conecte você com nosso consultor para um orçamento personalizado?`;
  }
  
  if (message.includes('funcionalidade') || message.includes('recurso') || message.includes('como funciona')) {
    return `Excelente! O <b>${plan}</b> tem recursos incríveis! 🚀<br/><br/>✅ Gestão completa de associados<br/>✅ Relatórios inteligentes<br/>✅ Automação de processos<br/>✅ Suporte 24/7<br/><br/>💡 Sobre qual funcionalidade específica você gostaria de saber mais?`;
  }
  
  if (message.includes('demo') || message.includes('demonstração') || message.includes('teste')) {
    return `Perfeito! Vamos agendar uma demonstração do <b>${plan}</b>! 🎯<br/><br/>📅 Nosso consultor pode fazer uma demo personalizada mostrando exatamente como o KompraX se adapta à sua associação.<br/><br/>⏰ Prefere qual horário: manhã ou tarde?`;
  }
  
  if (message.includes('suporte') || message.includes('ajuda') || message.includes('problema')) {
    return `Fique tranquilo(a), ${userName}! 🤗<br/><br/>Nosso suporte é <b>excepcional</b>:<br/>📞 Atendimento humanizado<br/>⚡ Resposta rápida<br/>🎓 Treinamento incluído<br/>🔧 Suporte técnico especializado<br/><br/>💬 Em que posso te ajudar especificamente?`;
  }
  
  if (message.includes('contrato') || message.includes('prazo') || message.includes('cancelamento')) {
    return `Transparência total, ${userName}! 📋<br/><br/>✅ Contratos flexíveis<br/>✅ Sem fidelidade abusiva<br/>✅ Migração de dados incluída<br/>✅ Período de adaptação<br/><br/>🤝 Nosso foco é seu sucesso, não te prender em contratos complicados!`;
  }
  
  if (message.includes('obrigad') || message.includes('valeu') || message.includes('ótimo')) {
    return `Fico feliz em ajudar, ${userName}! 😊<br/><br/>É sempre um prazer esclarecer dúvidas sobre o <b>${plan}</b>.<br/><br/>💬 Tem mais alguma questão? Estou aqui para te ajudar!`;
  }
  
  // Resposta padrão contextual
  return `Entendi sua questão sobre "<b>${message}</b>", ${userName}! 🤔<br/><br/>Vou registrar sua solicitação e nosso especialista em <b>${plan}</b> entrará em contato com uma resposta detalhada.<br/><br/>📞 Enquanto isso, posso te ajudar com:<br/>• Informações sobre preços<br/>• Demonstração do sistema<br/>• Detalhes das funcionalidades<br/><br/>💬 O que mais gostaria de saber?`;
}