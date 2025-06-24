// ========================================
// SCRIPT DE TESTE - WEBHOOK N8N KOMPRAX
// ========================================

const TEST_URL_LOCAL = 'http://localhost:3000/api/webhook/n8n';
const TEST_URL_PRODUCTION = 'https://your-vercel-app.vercel.app/api/webhook/n8n'; // Substitua pela sua URL

// Dados de teste
const testPayload = {
  selectedServicePlan: 'Premium',
  userName: 'João Teste Silva',
  userEnterprise: 'Associação Teste Digital',
  userNumber: '48999887766',
  userMessage: 'Estou testando a integração do webhook KompraX. Queremos uma demonstração do sistema.',
  promoActive: true
};

// Função para testar o webhook
async function testWebhook(url, payload) {
  console.log(`\n🧪 TESTANDO WEBHOOK: ${url}`);
  console.log('📤 Payload:', JSON.stringify(payload, null, 2));
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('📡 Status:', response.status, response.statusText);
    console.log('📋 Headers:', Object.fromEntries(response.headers.entries()));

    const responseData = await response.text();
    console.log('📥 Response Raw:', responseData);

    // Tentar parsear como JSON
    try {
      const jsonData = JSON.parse(responseData);
      console.log('✅ Response JSON:', JSON.stringify(jsonData, null, 2));
      
      if (jsonData.success) {
        console.log('🎉 TESTE PASSOU! Webhook funcionando corretamente.');
        return true;
      } else {
        console.log('❌ TESTE FALHOU! Erro retornado:', jsonData.error);
        return false;
      }
    } catch (parseError) {
      console.log('⚠️ Resposta não é JSON válido');
      if (response.ok) {
        console.log('✅ Mas o status é 200, então pode estar funcionando');
        return true;
      }
      return false;
    }

  } catch (error) {
    console.error('❌ ERRO DE REDE:', error.message);
    return false;
  }
}

// Função para testar diretamente o N8N
async function testN8NDirect(payload) {
  const n8nUrl = 'https://n8nub.mooveinsd.com.br/webhook-test/komprax';
  console.log(`\n🔗 TESTANDO N8N DIRETO: ${n8nUrl}`);
  
  try {
    const response = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'KompraX-WebApp/1.0'
      },
      body: JSON.stringify(payload)
    });

    console.log('📡 N8N Status:', response.status, response.statusText);
    
    const responseData = await response.text();
    console.log('📥 N8N Response:', responseData);

    if (response.ok) {
      console.log('✅ N8N está respondendo!');
      return true;
    } else {
      console.log('❌ N8N retornou erro:', response.status);
      return false;
    }

  } catch (error) {
    console.error('❌ ERRO AO CONECTAR COM N8N:', error.message);
    return false;
  }
}

// Função principal de teste
async function runTests() {
  console.log('🚀 INICIANDO TESTES DO WEBHOOK KOMPRAX\n');
  console.log('=' .repeat(50));

  // Teste 1: N8N direto
  console.log('\n📋 TESTE 1: Conectividade direta com N8N');
  const n8nWorking = await testN8NDirect(testPayload);
  
  // Teste 2: API Local
  console.log('\n📋 TESTE 2: API local do Next.js');
  const localWorking = await testWebhook(TEST_URL_LOCAL, testPayload);
  
  // Teste 3: Rate limiting
  console.log('\n📋 TESTE 3: Rate limiting (fazendo 6 requests rápidos)');
  for (let i = 1; i <= 6; i++) {
    console.log(`Request ${i}/6...`);
    const result = await testWebhook(TEST_URL_LOCAL, {
      ...testPayload,
      userName: `Teste RateLimit ${i}`
    });
    
    if (i === 6 && result === false) {
      console.log('✅ Rate limiting funcionando corretamente!');
    }
  }

  // Resumo
  console.log('\n' + '=' .repeat(50));
  console.log('📊 RESUMO DOS TESTES:');
  console.log(`🔗 N8N direto: ${n8nWorking ? '✅ OK' : '❌ FALHOU'}`);
  console.log(`🏠 API local: ${localWorking ? '✅ OK' : '❌ FALHOU'}`);
  
  if (n8nWorking && localWorking) {
    console.log('\n🎉 TODOS OS TESTES PASSARAM!');
    console.log('💡 Se o chat não está funcionando, verifique:');
    console.log('   1. Se você está preenchendo todos os campos obrigatórios');
    console.log('   2. Se está clicando no botão "Enviar" correto');
    console.log('   3. Se não há erros no console do navegador');
  } else {
    console.log('\n❌ ALGUNS TESTES FALHARAM!');
    console.log('💡 Próximos passos:');
    
    if (!n8nWorking) {
      console.log('   • Verificar se o N8N está ativo e respondendo');
      console.log('   • Confirmar a URL do webhook N8N');
      console.log('   • Verificar se o workflow está habilitado');
    }
    
    if (!localWorking) {
      console.log('   • Verificar se o servidor Next.js está rodando');
      console.log('   • Verificar logs do servidor para erros');
      console.log('   • Confirmar se a rota da API está correta');
    }
  }
  
  console.log('\n🔍 Para mais detalhes, execute:');
  console.log('   npm run dev');
  console.log('   # E verifique os logs no terminal');
}

// Executar os testes
if (typeof window === 'undefined') {
  // Node.js environment
  const fetch = require('node-fetch');
  runTests().catch(console.error);
} else {
  // Browser environment
  window.testKompraxWebhook = runTests;
  console.log('💡 Execute testKompraxWebhook() no console do navegador');
} 