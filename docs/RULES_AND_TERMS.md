# Regras do Jogo e Termos de Uso do Software

## 1. Regras do xadrez implementadas

O ChessMaster segue as regras oficiais do xadrez, validadas pelo motor de
regras (`chess.js`):

1. **Objetivo**: dar xeque-mate no rei adversário — atacá-lo de forma que
   não haja lance legal que o livre da captura.
2. **Turnos**: os jogadores se alternam, movendo uma peça por vez; as
   brancas sempre começam.
3. **Movimentação das peças**: peão, cavalo, bispo, torre, dama e rei se
   movem conforme descrito na tela de **Treino** do aplicativo, disponível
   nos três idiomas suportados.
4. **Lances especiais** suportados: roque (curto e longo), captura *en
   passant* e promoção de peão (promovido automaticamente a dama).
5. **Fim de jogo**: xeque-mate, afogamento (*stalemate*) e empates por
   material insuficiente, repetição de posição ou regra dos 50 lances.

Essas regras são as mesmas tanto no modo "Jogar com um Amigo" quanto no modo
"Jogar contra o Computador".

## 2. Pontuação

- Cada peça capturada pelo jogador humano soma pontos conforme seu valor de
  material (peão = 1, cavalo/bispo = 3, torre = 5, dama = 9).
- Ao final da partida contra o computador, é somado um bônus fixo pelo
  resultado: vitória, empate ou derrota.
- O placar (vitórias, derrotas, empates e pontos totais) é acumulado e
  salvo localmente no dispositivo ou navegador do jogador.

## 3. Termos de uso do software

### 3.1 Licença

O código-fonte do ChessMaster é distribuído sob a **licença MIT** (ver
arquivo `LICENSE`). Isso significa que qualquer pessoa pode usar, copiar,
modificar e redistribuir o software, inclusive para fins comerciais, desde
que mantenha o aviso de copyright e a licença original.

### 3.2 Direitos do usuário

- Usar o aplicativo livremente, para jogar ou para fins de aprendizado do
  xadrez.
- Consultar e reutilizar o código-fonte, conforme os termos da licença MIT.
- Reportar problemas ou sugerir melhorias através do repositório GitHub do
  projeto.

### 3.3 Deveres do usuário

- Não utilizar o software para fins ilícitos.
- Ao redistribuir o código ou partes dele, manter os créditos e o aviso de
  licença conforme exigido pela licença MIT.
- Ao reportar um problema, fornecer informações suficientes (passos para
  reproduzir, comportamento esperado vs. observado) para facilitar a
  correção.

### 3.4 Isenção de responsabilidade

O software é fornecido "como está", sem garantias de qualquer tipo,
conforme os termos padrão da licença MIT. Os autores não se
responsabilizam por eventuais danos decorrentes do uso do software.

## 4. Nota sobre o exercício de teste de software

Este produto foi desenvolvido também como parte de um exercício acadêmico
de teste de software pelo método "caixa preta". Por esse motivo, uma versão
do software recebe intencionalmente um pequeno número de erros
(documentados em `docs/INTENTIONAL_BUGS.md`), para que sejam encontrados e
relatados por uma equipe de teste externa, sem conhecimento prévio da lista
de erros.
