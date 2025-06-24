# 🚀 KompraX - Sistema de Gestão para Associações

> Landing page moderna e responsiva para o sistema KompraX da Obian Sistemas, com integração inteligente de leads via N8N e IA.

![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC)

## 📋 **Sobre o Projeto**

Landing page profissional para o KompraX, sistema de gestão de compras e cotações para associações de proteção veicular. Desenvolvida com foco em **performance, segurança e conversão de leads**.

### **🎯 Principais Funcionalidades:**

- ✅ **Landing Page Responsiva** - Design moderno adaptável a todos os dispositivos
- ✅ **Chatbot Inteligente** - Qualificação automática de leads com IA
- ✅ **Integração N8N** - Webhook para automação de processos
- ✅ **Lead Scoring** - Pontuação automática de prospects (0-100)
- ✅ **Sistema de Promoções** - Timer promocional com desconto limitado
- ✅ **Carrossel de Features** - Demonstrações interativas do sistema
- ✅ **Galeria de Clientes** - Logos de associações parceiras

---

## 🛠️ **Stack Tecnológica**

### **Frontend:**
- **Next.js 15** - Framework React com App Router
- **React 18** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React Icons** - Biblioteca de ícones

### **Funcionalidades:**
- **Swiper.js** - Carrossel responsivo
- **AOS** - Animações on scroll
- **Zod** - Validação de schemas

### **Integração:**
- **N8N Webhook** - Automação de leads
- **IA Lead Scoring** - Qualificação inteligente

---

## 🚀 **Instalação e Execução**

### **Pré-requisitos:**
- Node.js 18+ 
- npm ou yarn

### **1. Clone o repositório:**
```bash
git clone https://github.com/SEU_USERNAME/landingpage-komprax.git
cd landingpage-komprax
```

### **2. Instale as dependências:**
```bash
npm install
# ou
yarn install
```

### **3. Configure as variáveis de ambiente:**
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite o arquivo .env.local com suas configurações
```

### **4. Execute em desenvolvimento:**
```bash
npm run dev
# ou
yarn dev
```

### **5. Acesse:**
```
http://localhost:3000
```

---

## 📁 **Estrutura do Projeto**

```
src/
├── app/
│   ├── api/
│   │   └── webhook/n8n/          # API route para integração N8N
│   ├── components/
│   │   ├── chatbot-components/   # Componentes do chatbot
│   │   ├── hero-components/      # Componentes da seção hero
│   │   ├── Footer.tsx           # Rodapé
│   │   ├── navbar.tsx           # Navegação
│   │   └── WhatsAppButton.tsx   # Chatbot principal
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx              # Layout principal
│   └── page.tsx                # Página inicial
docs/
├── analise-sistema.md          # Análise técnica original
├── analise-sistema-02.md       # Análise técnica avançada
├── implementacao-n8n-webhook.md # Guia de implementação
└── n8n-workflow-example.json   # Exemplo de workflow N8N
public/
├── img/                        # Imagens e assets
└── sounds/                     # Arquivos de áudio
```

---

## 🔗 **Integração N8N**

### **Webhook URL:**
```
https://n8nub.mooveinsd.com.br/webhook-test/komprax
```

### **Estrutura de Dados Enviados:**
```typescript
{
  selectedServicePlan: string;    // Plano escolhido
  userName: string;               // Nome do lead
  userEnterprise: string;         // Empresa/associação
  userNumber: string;             // WhatsApp
  userMessage?: string;           // Mensagem opcional
  promoActive?: boolean;          // Promoção ativa
  metadata: {
    ip: string;                   // IP do usuário
    userAgent: string;            // Browser info
    leadScore: number;            // Score 0-100
    timestamp: string;            // Data/hora ISO
  }
}
```

### **Lead Scoring Algorithm:**
- **Base:** 50 pontos
- **Plano Exclusivo:** +40 | **Premium:** +30 | **Profissional:** +20 | **Padrão:** +10
- **Promoção Ativa:** +15
- **Mensagem Detalhada:** +10
- **Empresa Detalhada:** +5
- **Score Final:** 0-100 (priorização automática)

---

## 🔒 **Segurança**

- ✅ **Rate Limiting** - 5 requests/minuto por IP
- ✅ **Validação Zod** - Schemas seguros para dados
- ✅ **Sanitização** - Proteção contra XSS
- ✅ **Server-side Processing** - Credenciais protegidas
- ✅ **Error Handling** - Tratamento robusto de erros

---

## 📊 **Performance**

### **Core Web Vitals:**
- **LCP:** < 2.5s (otimizado)
- **FID:** < 100ms (interatividade)
- **CLS:** < 0.1 (estabilidade visual)

### **Otimizações:**
- **Next.js Image** - Otimização automática de imagens
- **Tree Shaking** - Bundle otimizado
- **Code Splitting** - Carregamento lazy
- **CSS Purging** - Tailwind otimizado

---

## 🚀 **Deploy**

### **Vercel (Recomendado):**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Netlify:**
```bash
# Build command
npm run build

# Publish directory
out/
```

### **Docker:**
```dockerfile
# Dockerfile já configurado
docker build -t komprax-landing .
docker run -p 3000:3000 komprax-landing
```

---

## 📈 **Analytics e Monitoramento**

- **Lead Tracking:** Conversões via N8N
- **Performance:** Core Web Vitals
- **Errors:** Logs estruturados
- **User Behavior:** Interações do chatbot

---

## 🤝 **Contribuição**

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 **Licença**

Este projeto é privado e proprietário da **Obian Sistemas**.

---

## 👥 **Equipe**

**Desenvolvido por:** Obian Sistemas  
**Cliente:** KompraX  
**Tecnologia:** Next.js + TypeScript + N8N

---

## 📞 **Suporte**

Para suporte técnico ou dúvidas sobre o projeto:

- **Email:** suporte@obian.com.br
- **Website:** [obian.com.br](https://obian.com.br)
- **WhatsApp:** +55 48 9 9999-9999

---

**🔥 Sistema otimizado para conversão máxima de leads com tecnologia de ponta!**
