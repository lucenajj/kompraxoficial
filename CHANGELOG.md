# 📋 **CHANGELOG - Landing Page KOMPRAX**

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2025-06-25

### ✨ **Adicionado**
- Melhorias no design responsivo da seção hero
- Otimização dos botões de call-to-action

### 🔧 **Modificado**
- **Hero Section:** Ajustado alinhamento do texto para ficar à esquerda em todas as telas
- **Botões CTA:** Aumentado padding vertical (`py-4`) e horizontal (`px-8`) para melhor proporção visual
- **Layout Responsivo:** Otimizado espaçamento lateral com `px-8 sm:px-12 lg:px-16`
- **Tipografia:** Ajustado título principal com palavra "veicular" para maior clareza
- **Largura Máxima:** Definido `max-w-3xl lg:max-w-4xl` para título e `max-w-2xl lg:max-w-3xl` para subtítulo

### 🎨 **Melhorias de UX/UI**
- Interface mais alinhada com o design original
- Melhor proporção visual dos elementos
- Experiência mais consistente entre dispositivos

---

## [1.1.0] - 2025-06-20

### ✨ **Adicionado**
- Sistema de chatbot WhatsApp integrado
- Componente `WhatsAppButton.tsx` com funcionalidades avançadas
- Integração com webhook N8N para captura de leads
- Sistema de lead scoring automatizado
- Validação de formulários com Zod

### 🔧 **Modificado**
- Estrutura de componentes reorganizada
- Melhorias na API route `/api/webhook/n8n`
- Otimização de performance com Next.js Image

### 🔒 **Segurança**
- Implementado rate limiting (5 requests/minuto por IP)
- Validação server-side com schemas Zod
- Sanitização de dados contra XSS
- Tratamento robusto de erros

---

## [1.0.0] - 2025-01-15

### 🚀 **Release Inicial**
- Landing page responsiva com design moderno
- Seção hero com call-to-action otimizado
- Seção de funcionalidades do sistema
- Seção de planos e preços
- Footer com informações de contato
- Integração inicial com Tailwind CSS
- Estrutura base Next.js + TypeScript

### 📊 **Performance**
- Core Web Vitals otimizados
- LCP < 2.5s
- FID < 100ms  
- CLS < 0.1

### 🎯 **Recursos**
- Design focado em conversão de leads
- Interface intuitiva e moderna
- Compatibilidade com todos os dispositivos
- SEO otimizado

---

## 📝 **Tipos de Mudanças**

- **✨ Adicionado** - Para novas funcionalidades
- **🔧 Modificado** - Para mudanças em funcionalidades existentes
- **❌ Removido** - Para funcionalidades removidas
- **🔒 Segurança** - Para correções de vulnerabilidades
- **🐛 Corrigido** - Para correções de bugs
- **🎨 Melhorias** - Para melhorias de UX/UI

---

## 🔗 **Links Úteis**

- [Repositório do Projeto](https://github.com/SEU_USERNAME/landingpage-komprax)
- [Documentação Técnica](./docs/)
- [Análise do Sistema](./docs/analise-sistema.md)
- [Implementação N8N](./docs/implementacao-n8n-webhook.md)

---

**🔥 Mantido pela equipe Obian Sistemas para KompraX** 