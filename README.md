# Kastello — Madeireira e Ferragem

Site institucional (landing page) estático em HTML5, CSS3 e JavaScript puro, pronto para publicação no GitHub Pages.

## Estrutura

```
/
├── index.html      → página única com todas as seções
├── style.css        → estilos, cores da marca e responsividade
├── script.js        → menu mobile, animações, galeria, contador, formulário
├── images/
│   ├── logo/         → logotipo da empresa
│   ├── produtos/      → fotos dos produtos
│   ├── galeria/       → fotos da loja/obra para a seção Galeria
│   └── banners/       → imagens de destaque (hero, ofertas)
└── README.md
```

## Imagens placeholder

Todas as imagens do site usam **placeholders gerados dinamicamente** (via `placehold.co`) nas cores da marca, apenas para servir de guia de proporção e posição. Substitua cada `<img src="https://placehold.co/...">` pelos arquivos reais dentro de `images/`, mantendo caminhos relativos, por exemplo:

```html
<img src="images/produtos/piso-ceramico.jpg" alt="Piso cerâmico">
```

O mesmo vale para o mapa (seção "Visite nossa loja"): o `iframe` já aponta para o endereço correto no Google Maps, mas pode ser substituído pelo código de incorporação oficial gerado no painel do Google Maps.

## Itens para configurar antes de publicar

- **WhatsApp:** os links usam o número `(51) 3261-2033` no formato `https://wa.me/555132612033`. Substitua pelo número de WhatsApp real da loja (com DDI 55 + DDD + número, sem espaços ou símbolos).
- **Formulário de orçamento:** hoje o formulário monta uma mensagem e abre o WhatsApp. Para receber os orçamentos por e-mail/painel, é possível conectar um serviço de formulário estático (ex: Formspree, Web3Forms) alterando o `action` do `<form>` em `index.html` e removendo o `event.preventDefault()` correspondente em `script.js`.
- **Instagram/Facebook:** os links do menu, footer e seção "Acompanhe nossas novidades" estão como `#` — troque pelos perfis reais.
- **Google Analytics:** há um comentário no `<head>` do `index.html` pronto para receber o `GA_MEASUREMENT_ID`.
- **Números de destaque** (anos de experiência, produtos disponíveis, clientes atendidos) estão em `data-count` nos elementos `.stat-number`, dentro da seção "A empresa" — basta trocar o número.

## Publicando no GitHub Pages

1. Crie um repositório no GitHub e envie todos os arquivos deste projeto para a branch `main`.
2. No repositório, vá em **Settings → Pages**.
3. Em **Source**, selecione a branch `main` e a pasta `/ (root)`.
4. Salve — o GitHub fornecerá a URL pública do site em alguns minutos.

Nenhum passo de build é necessário: o projeto é 100% estático (HTML/CSS/JS).
