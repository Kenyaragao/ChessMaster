# ChessMaster

Jogo de xadrez construído com Expo (React Native + React Native Web), rodando como app no Expo Go e como site web (GitHub Pages) a partir da mesma base de código.

## Rodando o projeto

```bash
npm install

# App (Expo Go / emulador)
npm start

# Web (navegador)
npm run web
```

## Build do site

```bash
npm run build:web
```

Gera os arquivos estáticos em `dist/`, prontos para publicação (ex: GitHub Pages). O deploy para GitHub Pages é automatizado pelo workflow `.github/workflows/deploy-web.yml` a cada push na branch `main`.
