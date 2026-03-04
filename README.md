# Matheus Braga — Portfolio

Portfolio pessoal single-page para Backend Developer (.NET/C#) com estética coffee-shop. Construído com HTML5 semântico, CSS3 puro e JavaScript vanilla — zero frameworks.

## Funcionalidades

- Design responsivo com tema coffee-shop
- Navbar fixa com menu hambúrguer mobile
- Seções: Hero, Sobre Mim, Tech Stack, Experiência, Contato
- Animações on-scroll com Intersection Observer
- Formulário de contato integrado com EmailJS
- Contador de visitas com Firebase Realtime Database
- Notificação por email a cada 10 visitas
- Botão de download do CV em PDF
- Acessibilidade (WCAG AA)

## Estrutura

```
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── cv/
│   ├── icons/
│   └── images/
└── README.md
```

## Tecnologias

- **HTML5** — Estrutura semântica
- **CSS3** — Custom Properties, Flexbox, Grid, animações
- **JavaScript** — Intersection Observer, validação, navegação dinâmica
- **Firebase** — Realtime Database para contador de visitas
- **EmailJS** — Envio de emails do formulário de contato e notificações

## Como usar

1. Clone o repositório
2. Configure as credenciais do Firebase em `js/main.js` (bloco `FIREBASE_CONFIG`)
3. Configure os templates do EmailJS
4. Abra `index.html` no navegador

## Licença

MIT
