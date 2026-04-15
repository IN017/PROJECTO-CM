# Carlos Mateus – CM | Soluções em Informática & Telecomunicações

Website profissional estático com otimizações de SEO, Acessibilidade e Performance.

## 📁 Estrutura do Projeto

```
FRONT-END/
├── index.html          # Página principal (optimizada)
├── logotipo.jpeg       # Logo da empresa
├── robots.txt          # Controle de crawlers
├── sitemap.xml         # Mapa do website
└── .htaccess          # Configurações do servidor Apache
```

## ⚡ Tecnologias

- **HTML5** - Markup semântico
- **Tailwind CSS** - Framework CSS utility-first
- **JavaScript Vanilla** - Interatividade (sem dependências)
- **Node.js** - Servidor de desenvolvimento local

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 14+ instalado

### Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar servidor de desenvolvimento
npm start
```

O servidor iniciará em `http://localhost:3000`

## 🌐 Deploy no Vercel

### Opção 1: Deploy Automático (Recomendado)

1. Faça push das mudanças para o GitHub
2. Vá a [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Selecione o repositório `IN017/PROJECTO-CM`
5. Vercel detectará automaticamente a configuração e fará deploy

### Opção 2: Deploy com Vercel CLI

```bash
npm install -g vercel
vercel
```

## 📋 Otimizações Implementadas

### SEO (Search Engine Optimization)
- ✅ Meta tags completas (description, keywords, author)
- ✅ Open Graph tags para redes sociais
- ✅ JSON-LD schema (LocalBusiness)
- ✅ robots.txt configurado
- ✅ sitemap.xml dinâmico
- ✅ Semantic HTML

### Acessibilidade (WCAG 2.1 Nível AA)
- ✅ Skip link para navegação por teclado
- ✅ ARIA labels e roles apropriados
- ✅ Focus states visíveis
- ✅ Alt text em imagens
- ✅ Menu responsivo com aria-expanded

### Performance
- ✅ Preload de Google Fonts
- ✅ Lazy loading de imagens
- ✅ Gzip compression
- ✅ Browser caching otimizado
- ✅ JavaScript minificado
- ✅ CSS por CDN (Tailwind)

## 📊 Estrutura do Servidor Node.js

O arquivo `server.js` implementa:
- Servir ficheiros estáticos do diretório `FRONT-END`
- Headers de segurança (CORS, X-Frame-Options, etc.)
- Gzip compression automática
- Cache headers otimizados
- Roteamento SPA (Single Page App)

## 🔐 Segurança

- Headers de segurança HTTP configurados
- CORS restrito
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Content-Security-Policy básico

## 📞 Contacto

- Email: mateuscarlos73@hotmail.com
- Telefone: +244-925-789-611
- Localização: Benguela, Angola

## 📄 Licença

© 2025 Carlos Mateus. Todos os direitos reservados.

---

**Criado com v0 by Vercel**
