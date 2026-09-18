# ChessMaster

Jogo de xadrez multiplataforma construído com Expo (React Native +
React Native Web): a mesma base de código roda como app no **Expo Go** e
como **site web** publicado no GitHub Pages.

## Funcionalidades

- ♟️ Regras completas do xadrez (roque, *en passant*, promoção, xeque,
  xeque-mate, afogamento e empates), validadas por `chess.js`.
- 👥 Modo **Jogar com um Amigo** (dois jogadores no mesmo dispositivo).
- 🤖 Modo **Jogar contra o Computador**, com três dificuldades: Fácil,
  Intermediário e Difícil (IA por minimax com poda alfa-beta).
- 🎓 Modo **Treino**, explicando o objetivo do jogo, a movimentação de
  cada peça e as regras básicas.
- 🌐 Interface em **três idiomas**: Inglês, Português e Russo, com troca de
  idioma persistida entre sessões.
- 🏆 **Sistema de pontuação** por partida (material capturado + resultado),
  acumulado e salvo localmente.

## Rodando o projeto

```bash
npm install

# App (Expo Go / emulador)
npm start

# Web (navegador)
npm run web
```

## Build e publicação do site

```bash
npm run build:web
```

Gera os arquivos estáticos em `dist/`. O deploy para o GitHub Pages é
automatizado pelo workflow [`.github/workflows/deploy-web.yml`](.github/workflows/deploy-web.yml)
a cada push na branch `main` (é necessário habilitar **Settings → Pages →
Source: GitHub Actions** uma única vez no repositório). Depois de
habilitado, o jogo fica disponível em
`https://<usuário>.github.io/ChessMaster/`.

## Documentação do produto

Toda a documentação técnica e de usuário do projeto está em [`docs/`](docs):

| Documento | Conteúdo |
|-----------|----------|
| [Especificação Técnica (TK)](docs/TECHNICAL_SPECIFICATION.md) | Introdução, requisitos funcionais/de interface/confiabilidade/compatibilidade, critérios de aceitação, etapas e prazos. |
| [Manual do Usuário](docs/USER_MANUAL.md) | Como instalar, jogar e usar cada funcionalidade do aplicativo. |
| [Arquitetura do Sistema](docs/ARCHITECTURE.md) | Diagramas de componentes e de fluxo, módulos do código, publicação web. |
| [Regras e Termos de Uso](docs/RULES_AND_TERMS.md) | Regras do xadrez implementadas, pontuação, licença e direitos/deveres do usuário. |
| [Erros Intencionais](docs/INTENTIONAL_BUGS.md) | Lista de erros propositalmente inseridos para o exercício de teste caixa preta. |

## Histórico de desenvolvimento

O desenvolvimento é feito em etapas, cada uma registrada em um commit
próprio no histórico do Git, para deixar clara a evolução do produto:
estrutura do projeto → tabuleiro e regras → IA e dificuldades →
internacionalização → treino → pontuação → documentação. Veja o histórico
de commits do repositório para o detalhamento completo de cada etapa.
