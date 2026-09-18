# Especificação Técnica (TK) — ChessMaster

> Documento equivalente a um Técnicheskoe Zadanie (ТЗ), elaborado com base na
> estrutura da GOST 19.201-78 / GOST 34.602-2020 e da ISO/IEC/IEEE 29148:2018,
> conforme solicitado no trabalho prático de teste de software pelo método
> "caixa preta".

## 1. Introdução

ChessMaster é um jogo de xadrez multiplataforma (aplicativo via Expo Go e
site web publicado no GitHub Pages), construído a partir de uma única base
de código em React Native + React Native Web. Permite partidas locais entre
duas pessoas no mesmo dispositivo ou contra um adversário controlado por
computador, com três níveis de dificuldade, um modo de treino que ensina as
regras do jogo, um sistema de pontuação persistente e suporte a três
idiomas (Inglês, Português e Russo).

## 2. Bases para o desenvolvimento

- Trabalho prático de "Teste de Software pelo Método da Caixa Preta", que
  exige a criação de um produto de software próprio, executável, acompanhado
  de Especificação Técnica e documentação, para posterior teste por outra
  equipe.
- Requisitos definidos pelo autor do produto (issues e descrições fornecidas
  ao longo do desenvolvimento no repositório GitHub `ChessMaster`).

## 3. Finalidade do desenvolvimento

Oferecer um jogo de xadrez completo, bonito e fácil de entender, que sirva
tanto para jogar partidas casuais (contra outra pessoa ou contra o
computador) quanto para aprender as regras do xadrez do zero, com suporte
multilíngue e acompanhamento de desempenho via pontuação.

## 4. Requisitos do programa

### 4.1 Requisitos funcionais

| # | Requisito |
|---|-----------|
| F1 | O sistema deve permitir uma partida local entre dois jogadores humanos no mesmo dispositivo. |
| F2 | O sistema deve permitir uma partida contra um adversário controlado por computador. |
| F3 | O computador deve oferecer três níveis de dificuldade: fácil, intermediário e difícil. |
| F4 | O sistema deve validar os movimentos de acordo com as regras oficiais do xadrez (movimentos por tipo de peça, roque, en passant, promoção, xeque e xeque-mate, afogamento/empate). |
| F5 | O sistema deve indicar visualmente o estado da partida: de quem é a vez, xeque, xeque-mate, afogamento e empate. |
| F6 | O sistema deve oferecer um modo de treino que explique, de forma textual, a movimentação de cada peça e as regras básicas do xadrez. |
| F7 | O sistema deve manter uma pontuação persistente entre sessões (vitórias, derrotas, empates e pontos acumulados). |
| F8 | O sistema deve permitir trocar o idioma da interface entre Inglês, Português e Russo a qualquer momento, mantendo a preferência entre sessões. |
| F9 | O sistema deve permitir iniciar uma nova partida, desfazer o último lance e desistir da partida atual. |

### 4.2 Requisitos de interface

- Interface visual em tema escuro, com tabuleiro em tons de madeira
  claro/escuro e peças representadas por glifos Unicode de xadrez.
- Todos os textos da interface devem respeitar o idioma selecionado.
- Botões de ação (Nova Partida, Desfazer, Desistir, Voltar) devem estar
  sempre visíveis durante a partida.
- O tabuleiro deve realçar visualmente a casa selecionada, os destinos
  legais do lance, o último lance realizado e o rei em xeque.
- O layout deve se adaptar a telas de celular e a navegadores desktop
  (responsivo, largura máxima centralizada em telas grandes).

### 4.3 Condições de operação

- Aplicativo: executado via Expo Go (Android/iOS) ou build nativo gerado
  pelo Expo, exigindo Node.js 18+ apenas para desenvolvimento.
- Web: qualquer navegador moderno com JavaScript habilitado, sem
  necessidade de instalação; hospedado como site estático no GitHub Pages.
- Não há dependência de servidor/backend: toda a lógica roda no
  dispositivo do usuário e a persistência é local (armazenamento do
  dispositivo/navegador).

### 4.4 Confiabilidade

- As regras do xadrez são delegadas a uma biblioteca de terceiros
  amplamente utilizada e testada (`chess.js`), reduzindo o risco de erros
  de lógica na validação de lances.
- O estado da partida é mantido em memória durante a sessão; o placar é
  persistido localmente a cada resultado de partida.
- Falhas ao ler/gravar a preferência de idioma ou o placar não devem
  impedir o uso do aplicativo (falha silenciosa com valores padrão).

### 4.5 Compatibilidade

- Compatível com Expo SDK 57 (React Native 0.86, React 19).
- Compatível com os principais navegadores desktop e mobile via
  React Native Web.
- Sem dependência de recursos nativos exclusivos de uma plataforma
  (câmera, sensores, etc.), o que preserva a paridade entre app e web.

## 5. Critérios de aceitação

- 100% dos movimentos legais e ilegais testados respeitam as regras
  oficiais do xadrez (validados pela biblioteca de regras).
- É possível concluir uma partida completa (do início ao xeque-mate,
  afogamento ou empate) nos três modos: dois jogadores, computador fácil e
  computador difícil.
- A troca de idioma reflete corretamente em 100% dos textos visíveis nas
  telas de início, jogo e treino.
- O site publicado no GitHub Pages carrega e é jogável sem erros de
  console em um navegador atualizado.
- A pontuação exibida na tela inicial é corretamente atualizada e mantida
  após fechar e reabrir o aplicativo/site.

## 6. Requisitos de documentação

Junto ao produto devem ser entregues:

- Este documento (Especificação Técnica).
- Manual do usuário (`docs/USER_MANUAL.md`).
- Descrição da arquitetura do sistema com diagramas (`docs/ARCHITECTURE.md`).
- Descrição dos erros intencionalmente inseridos no software, para fins do
  exercício de teste caixa preta (`docs/INTENTIONAL_BUGS.md`).
- Regras do jogo e termos de uso do software (`docs/RULES_AND_TERMS.md`).
- `README.md` descrevendo como instalar, rodar e testar o projeto.

## 7. Procedimento de controle e aceitação

- Cada funcionalidade é implementada e verificada isoladamente antes de ser
  integrada (checagem de tipos com `tsc --noEmit`, build de exportação web
  e testes manuais/automatizados de fumaça em navegador).
- Cada etapa do desenvolvimento corresponde a um commit próprio no
  repositório Git, com mensagem descrevendo o que foi adicionado ou
  alterado, permitindo rastrear a evolução do produto.
- O teste do tipo "caixa preta" por outra equipe deve seguir o roteiro do
  Manual do Usuário e tentar reproduzir os critérios de aceitação acima,
  reportando qualquer divergência encontrada.

## 8. Etapas e prazos de desenvolvimento

| Etapa | Entregável | Status |
|-------|------------|--------|
| 1 | Estrutura do projeto (Expo + Web + GitHub Pages) | Concluído |
| 2 | Tabuleiro, regras de xadrez e partida local (2 jogadores) | Concluído |
| 3 | Adversário controlado por computador com 3 dificuldades | Concluído |
| 4 | Internacionalização (EN/PT/RU) e troca de idioma | Concluído |
| 5 | Modo de treino com regras e movimentação das peças | Concluído |
| 6 | Sistema de pontuação persistente | Concluído |
| 7 | Documentação técnica e de usuário completa | Em andamento |
| 8 | Inserção e documentação de erros intencionais (exercício caixa preta) | Concluído |
| 9 | Publicação contínua da versão web no GitHub Pages | Concluído (workflow automatizado) |

Os prazos seguem o ritmo das solicitações do responsável pelo produto,
registradas como commits/etapas sucessivas neste repositório.
