import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Pega o corpo da requisição que veio do seu frontend
    const body = await request.json();

    // 2. Define a URL real do webhook (protegida no backend)
    const n8nWebhookUrl = 'https://webhookub.mooveinsd.com.br/webhook/1aa172f8-ccc5-4c98-bc24-e8796d8fa78f/chat';

    // 3. O SEU SERVIDOR faz a chamada para o N8N (sem problemas de CORS)
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // 4. Verifica se a resposta do N8N foi bem-sucedida
    if (!n8nResponse.ok) {
      // Se o N8N retornou um erro, repassa o erro
      const errorText = await n8nResponse.text();
      console.error(`Erro do webhook N8N: ${n8nResponse.status} - ${errorText}`);
      return new NextResponse(errorText, { status: n8nResponse.status });
    }

    // 5. Pega a resposta do N8N e a envia de volta para o seu frontend
    const n8nData = await n8nResponse.json();
    return NextResponse.json(n8nData);

  } catch (error) {
    console.error('Erro no proxy para o N8N:', error);
    return new NextResponse('Erro interno do servidor ao processar a requisição do chat.', { status: 500 });
  }
} 