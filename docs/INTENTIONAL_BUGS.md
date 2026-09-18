# Erros Intencionais (exercício de teste "caixa preta")

> Como parte do trabalho prático de teste de software pelo método da caixa
> preta, esta versão do ChessMaster contém **7 erros inseridos
> intencionalmente**, de naturezas diferentes, para serem encontrados por
> uma equipe de teste externa **sem conhecimento prévio desta lista**. Este
> documento deve ser mantido reservado até a etapa de avaliação/entrega do
> relatório final.

Cada erro é descrito no formato: identificador, localização, tipo, o que
acontece, e como detectá-lo (condições de execução / passos de teste).

---

## BUG-01 — Poda alfa-beta invertida na IA

- **Localização:** `src/ai/engine.ts`, função `minimax`, ramo maximizante.
- **Tipo:** Lógico.
- **Descrição:** Ao atualizar o limite `alpha` após avaliar um lance, o
  código usa `Math.min(alpha, best)` em vez de `Math.max(alpha, best)`.
  Isso quebra a poda alfa-beta e faz a IA, especialmente no nível
  "Difícil" (busca mais profunda), escolher lances claramente ruins
  (blunders) mesmo tendo alternativas óbvias melhores.
- **Detecção:** Jogar várias partidas contra o computador no nível
  "Difícil" e observar se ele deixa peças importantes (dama, torre) sem
  proteção em posições simples, ou joga de forma pior que no nível
  "Intermediário".

## BUG-02 — Empate contabilizado também como vitória

- **Localização:** `src/context/ScoreContext.tsx`, função `recordResult`.
- **Tipo:** Lógico.
- **Descrição:** A condição que incrementa `wins` inclui também o
  resultado `'draw'` (`result === 'win' || result === 'draw'`), então toda
  partida empatada soma 1 no contador de vitórias além de 1 no contador de
  empates.
- **Detecção:** Jogar contra o computador até empatar (por exemplo, por
  afogamento) e comparar os contadores de "Vitórias" e "Empates" na tela
  inicial antes e depois da partida — ambos vão subir.

## BUG-03 — Destaque de xeque sempre no rei branco

- **Localização:** `src/screens/GameScreen.tsx`, função `findKingSquare`.
- **Tipo:** Lógico / Interface.
- **Descrição:** A função recebe um parâmetro `color`, mas a comparação
  interna está fixa em `cell.color === 'w'`, ignorando o parâmetro. Quando
  as **pretas** estão em xeque, o destaque vermelho de "rei em xeque"
  continua marcando a casa do rei branco (ou nenhuma casa relevante), em
  vez do rei preto.
- **Detecção:** No modo "Jogar com um Amigo", levar as peças pretas a ficar
  em xeque e observar qual casa recebe o destaque vermelho — deveria ser a
  casa do rei preto.

## BUG-04 — Seletor de idioma sempre destaca "EN"

- **Localização:** `src/components/LanguageSwitcher.tsx`.
- **Tipo:** Interface.
- **Descrição:** O estilo do botão/ texto "ativo" compara `'en' ===
  option.code` em vez de `language === option.code`. O texto do aplicativo
  muda de idioma normalmente, mas o botão destacado no seletor nunca
  reflete o idioma realmente selecionado (fica sempre em "EN").
- **Detecção:** Trocar o idioma para PT ou RU e observar visualmente qual
  botão do seletor aparece destacado.

## BUG-05 — Botão "Desistir" não é traduzido

- **Localização:** `src/screens/GameScreen.tsx`, botão de desistência.
- **Tipo:** Interface / Localização.
- **Descrição:** O rótulo do botão está fixo como a string em inglês
  `"Resign"` em vez de usar `t.resign`, então o texto não muda mesmo
  trocando o idioma da interface.
- **Detecção:** Trocar o idioma para Português ou Russo, entrar em uma
  partida e verificar o texto do botão de desistência — permanece em
  inglês enquanto os demais botões são traduzidos.

## BUG-06 — Rótulos de dificuldade trocados em russo

- **Localização:** `src/i18n/translations.ts`, dicionário `ru`.
- **Tipo:** Dados / Tradução.
- **Descrição:** Os textos de `easy` e `hard` foram trocados entre si no
  idioma russo: o botão que deveria dizer "Лёгкий" (Fácil) exibe "Сложный"
  (Difícil) e vice-versa. A dificuldade realmente aplicada na partida
  continua correta (a troca é só no texto exibido).
- **Detecção:** Com o idioma em russo, comparar os rótulos exibidos na
  tela de dificuldade com o comportamento real da IA ao selecionar cada
  opção.

## BUG-07 — Indicador de lance legal ausente na última casa de destino

- **Localização:** `src/components/Board.tsx`.
- **Tipo:** Lógico (indexação) / Interface.
- **Descrição:** Ao desenhar os pontos que indicam para onde uma peça
  selecionada pode se mover, a lista de destinos usada para desenhar os
  pontos é cortada com `legalTargets.slice(0, -1)`, descartando o último
  destino legal da lista apenas para fins de exibição. O lance para essa
  casa continua sendo aceito normalmente se o jogador tocar nela.
- **Detecção:** Selecionar uma peça com vários movimentos possíveis (por
  exemplo, a dama em posição aberta) e verificar se algum destino
  legítimo — geralmente o último calculado — não recebe o ponto de
  indicação, mas ainda assim aceita o toque para mover a peça até lá.

---

## Resumo por tipo

| Tipo | Quantidade | IDs |
|------|-----------|-----|
| Lógico | 4 | BUG-01, BUG-02, BUG-03, BUG-07 |
| Interface | 3 | BUG-03, BUG-04, BUG-05 |
| Dados / Tradução | 1 | BUG-06 |

(BUG-03 tem natureza mista lógico/interface e é contado nas duas categorias.)
