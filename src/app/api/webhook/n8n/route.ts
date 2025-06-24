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
  source: z.string().default('website_chat')
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
    // Rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
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
    const validatedData = chatDataSchema.parse({
      ...rawData,
      timestamp: new Date().toISOString(),
      source: 'website_chat'
    });

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

    // Envio para N8N webhook
    const n8nResponse = await fetch('https://n8nub.mooveinsd.com.br/webhook-test/komprax', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'KompraX-WebApp/1.0'
      },
      body: JSON.stringify(enrichedData)
    });

    if (!n8nResponse.ok) {
      throw new Error(`N8N webhook error: ${n8nResponse.status} ${n8nResponse.statusText}`);
    }

    const n8nResult = await n8nResponse.json();

    // Resposta para o frontend
    return NextResponse.json({
      success: true,
      message: 'Dados enviados com sucesso! Nossa equipe entrará em contato em breve.',
      data: {
        leadId: n8nResult.leadId || `lead_${Date.now()}`,
        estimatedResponse: '24 horas',
        nextSteps: generateNextSteps(validatedData)
      }
    });

  } catch (error) {
    console.error('Webhook N8N Error:', error);

    // Log estruturado para monitoramento
    const errorDetails = {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: getClientIP(request),
      userAgent: request.headers.get('user-agent')
    };
    
    console.error('Error Details:', errorDetails);

    if (error instanceof z.ZodError) {
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