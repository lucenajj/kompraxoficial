#!/usr/bin/env node

/**
 * SCRIPT DE TESTE DIRETO DO WEBHOOK N8N
 * Execute: node testar-webhook-direto.js
 */

const https = require('https');

const WEBHOOK_URL = 'https://webhookub.mooveinsd.com.br/webhook/1a7ff005-dbd8-40fc-a0f7-2c675a2f3c94/chat';

const payloadTeste = {
    message: 'Teste direto via Node.js',
    timestamp: new Date().toISOString(),
    chatId: `test_node_${Date.now()}`,
    source: 'teste_direto_nodejs',
    // Dados adicionais para compatibilidade
    selectedServicePlan: 'Premium',
    userName: 'Teste Node.js',
    userEnterprise: 'Empresa Teste',
    userNumber: '48999887766',
    userMessage: 'Teste de conectividade direto via Node.js',
    promoActive: true
};

console.log('🔧 TESTE DIRETO WEBHOOK N8N - KOMPRAX');
console.log('=' .repeat(50));
console.log(`📡 URL: ${WEBHOOK_URL}`);
console.log(`📤 Payload:`, JSON.stringify(payloadTeste, null, 2));
console.log('=' .repeat(50));
console.log('🚀 Enviando requisição...\n');

const url = new URL(WEBHOOK_URL);
const data = JSON.stringify(payloadTeste);

const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'User-Agent': 'KompraX-TesteDireto/1.0'
    },
    timeout: 30000 // 30 segundos
};

const req = https.request(options, (res) => {
    console.log(`📡 Status: ${res.statusCode} ${res.statusMessage}`);
    console.log(`📋 Headers:`, res.headers);
    console.log('─'.repeat(30));
    
    let responseData = '';
    
    res.on('data', (chunk) => {
        responseData += chunk;
    });
    
    res.on('end', () => {
        console.log('📥 Resposta completa:');
        console.log(responseData);
        console.log('─'.repeat(30));
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('✅ SUCESSO! O webhook está funcionando.');
            console.log('💡 Se o erro persiste no frontend, verifique:');
            console.log('   • Problemas de CORS');
            console.log('   • Configurações do navegador');
            console.log('   • Console do navegador para erros específicos');
        } else {
            console.log('❌ ERRO HTTP! Verifique:');
            console.log('   • Configuração do workflow N8N');
            console.log('   • URL do webhook');
            console.log('   • Payload aceito pelo N8N');
        }
        
        process.exit(0);
    });
});

req.on('timeout', () => {
    console.log('❌ TIMEOUT! O webhook demorou mais de 30 segundos para responder.');
    console.log('💡 Possíveis causas:');
    console.log('   • N8N sobrecarregado');
    console.log('   • Workflow muito lento');
    console.log('   • Problemas de conectividade');
    req.destroy();
    process.exit(1);
});

req.on('error', (error) => {
    console.log('❌ ERRO DE REDE!');
    console.log(`🔍 Detalhes: ${error.message}`);
    console.log('💡 Possíveis causas:');
    console.log('   • N8N está offline');
    console.log('   • URL incorreta');
    console.log('   • Problemas de DNS');
    console.log('   • Firewall bloqueando');
    process.exit(1);
});

req.write(data);
req.end(); 