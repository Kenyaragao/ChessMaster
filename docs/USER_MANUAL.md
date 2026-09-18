# Manual do Usuário — ChessMaster

## 1. O que é o ChessMaster

ChessMaster é um jogo de xadrez que pode ser jogado:

- **No navegador**, acessando a versão web publicada no GitHub Pages;
- **No celular**, através do app Expo Go, apontando para o projeto em
  desenvolvimento, ou por um build nativo gerado a partir deste repositório.

## 2. Instalação e execução

### 2.1 Jogar no navegador

Acesse a versão publicada (ver link em `README.md`, seção "Versão web") ou,
localmente:

```bash
npm install
npm run web
```

### 2.2 Jogar no Expo Go

```bash
npm install
npm start
```

Abra o app **Expo Go** no seu celular (Android ou iOS) e escaneie o QR code
exibido no terminal.

## 3. Tela inicial

Ao abrir o aplicativo você verá:

- O nome do jogo e um seletor de **idioma** (EN / PT / RU) no topo.
- Um cartão de **pontuação**, mostrando pontos totais, vitórias, derrotas e
  empates acumulados.
- Três opções de modo de jogo:
  - **Jogar com um Amigo** — partida local, dois jogadores revezam o
    dispositivo.
  - **Jogar contra o Computador** — abre a tela de escolha de dificuldade
    (Fácil, Intermediário, Difícil) e inicia a partida contra a IA.
  - **Treino** — abre o guia de regras e movimentação das peças.

## 4. Jogando uma partida

- Toque em uma peça da cor que deve jogar para selecioná-la; as casas para
  onde ela pode se mover legalmente ficam marcadas.
- Toque em uma das casas marcadas para mover a peça até ali. Tocar em outra
  peça sua troca a seleção; tocar na própria peça selecionada a desmarca.
- O texto acima do tabuleiro indica de quem é a vez, se há **xeque**, e o
  resultado da partida quando ela termina (**xeque-mate**, **afogamento**
  ou **empate**).
- Contra o computador, você sempre joga com as peças brancas; o computador
  responde automaticamente após o seu lance.
- Botões disponíveis durante a partida:
  - **Nova Partida** — reinicia o tabuleiro.
  - **Desfazer** — desfaz o último lance (contra o computador, desfaz o seu
    lance e a resposta da IA juntos, devolvendo o turno a você).
  - **Desistir** — encerra a partida atual (contra o computador, conta como
    derrota) e volta ao início de uma nova partida.
  - **Voltar** — retorna à tela inicial.

### 4.1 Pontuação

Ao final de uma partida contra o computador, os pontos são calculados a
partir do valor das peças capturadas por você durante a partida, somados a
um bônus pelo resultado (vitória, empate ou derrota). O placar acumulado
fica salvo no dispositivo/navegador e aparece na tela inicial.

> Partidas no modo "Jogar com um Amigo" não afetam o placar acumulado, pois
> as duas pessoas compartilham o mesmo dispositivo.

## 5. Modo de Treino

A tela de treino apresenta, no idioma selecionado:

- Uma introdução ao objetivo do xadrez.
- Como cada peça se move (peão, cavalo, bispo, torre, dama e rei).
- As regras básicas do jogo: objetivo, alternância de turnos, xeque,
  xeque-mate, roque, captura *en passant* e promoção de peão.

## 6. Trocando o idioma

Toque em **EN**, **PT** ou **RU** no topo da tela inicial a qualquer
momento. A preferência é salva automaticamente e mantida da próxima vez que
você abrir o aplicativo.

## 7. Solução de problemas

| Situação | O que fazer |
|----------|-------------|
| A pontuação não aparece salva após reabrir o app | Verifique se o navegador não está em modo anônimo/privado, pois nesse caso o armazenamento local é limpo ao fechar. |
| O tabuleiro não aparece corretamente no navegador | Atualize a página; verifique se o JavaScript está habilitado. |
| O app não conecta ao Expo Go | Confirme que o celular e o computador estão na mesma rede Wi-Fi. |
