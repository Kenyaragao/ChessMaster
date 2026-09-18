export type Language = 'en' | 'pt' | 'ru';

export interface Translations {
  appName: string;
  tagline: string;
  playFriend: string;
  playComputer: string;
  training: string;
  language: string;
  difficulty: string;
  easy: string;
  medium: string;
  hard: string;
  back: string;
  newGame: string;
  resign: string;
  undo: string;
  yourTurn: string;
  opponentTurn: string;
  whiteToMove: string;
  blackToMove: string;
  whiteWins: string;
  blackWins: string;
  check: string;
  checkmate: string;
  stalemate: string;
  draw: string;
  youWin: string;
  youLose: string;
  score: string;
  wins: string;
  losses: string;
  draws: string;
  selectMode: string;
  chooseDifficulty: string;
  trainingTitle: string;
  trainingIntro: string;
  howPiecesMove: string;
  basicRules: string;
  rule_goal: string;
  rule_turns: string;
  rule_check: string;
  rule_checkmate: string;
  rule_castling: string;
  rule_enPassant: string;
  rule_promotion: string;
  piece_pawn: string;
  piece_pawn_move: string;
  piece_knight: string;
  piece_knight_move: string;
  piece_bishop: string;
  piece_bishop_move: string;
  piece_rook: string;
  piece_rook_move: string;
  piece_queen: string;
  piece_queen_move: string;
  piece_king: string;
  piece_king_move: string;
  home: string;
  chooseTimeControl: string;
  noTimeLimit: string;
  timeOut: string;
  white: string;
  black: string;
  practiceTitle: string;
  practiceHint: string;
  resetBoard: string;
  theme: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'ChessMaster',
    tagline: 'Play chess your way',
    playFriend: 'Play a Friend',
    playComputer: 'Play the Computer',
    training: 'Training',
    language: 'Language',
    difficulty: 'Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    back: 'Back',
    newGame: 'New Game',
    resign: 'Resign',
    undo: 'Undo',
    yourTurn: "Your turn",
    opponentTurn: "Opponent's turn",
    whiteToMove: 'White to move',
    blackToMove: 'Black to move',
    whiteWins: 'White wins',
    blackWins: 'Black wins',
    check: 'Check!',
    checkmate: 'Checkmate',
    stalemate: 'Stalemate',
    draw: 'Draw',
    youWin: 'You win!',
    youLose: 'You lose',
    score: 'Score',
    wins: 'Wins',
    losses: 'Losses',
    draws: 'Draws',
    selectMode: 'Choose how you want to play',
    chooseDifficulty: 'Choose a difficulty',
    trainingTitle: 'Learn to Play Chess',
    trainingIntro:
      'Chess is played on an 8x8 board between two players, White and Black. The goal is to checkmate the opponent king.',
    howPiecesMove: 'How the pieces move',
    basicRules: 'Basic rules',
    rule_goal: 'The objective is to checkmate the opponent king, meaning it is under attack with no legal way to escape.',
    rule_turns: 'Players alternate turns, moving one piece at a time. White always moves first.',
    rule_check: 'A king in check is under direct threat of capture and must be defended on the next move.',
    rule_checkmate: 'If a king in check cannot escape capture, the game ends in checkmate.',
    rule_castling:
      'Castling lets the king move two squares toward a rook, and that rook jumps beside it, if neither has moved and there is nothing between them.',
    rule_enPassant:
      'En passant lets a pawn capture an enemy pawn that just advanced two squares past it, as if it had moved only one.',
    rule_promotion: 'A pawn reaching the last rank is promoted, usually to a queen.',
    piece_pawn: 'Pawn',
    piece_pawn_move: 'Moves forward one square (two on its first move) and captures diagonally.',
    piece_knight: 'Knight',
    piece_knight_move: 'Moves in an L-shape: two squares in one direction, then one square perpendicular. Can jump over pieces.',
    piece_bishop: 'Bishop',
    piece_bishop_move: 'Moves any number of squares diagonally.',
    piece_rook: 'Rook',
    piece_rook_move: 'Moves any number of squares horizontally or vertically.',
    piece_queen: 'Queen',
    piece_queen_move: 'Moves any number of squares in any direction: horizontal, vertical or diagonal.',
    piece_king: 'King',
    piece_king_move: 'Moves one square in any direction.',
    home: 'Home',
    chooseTimeControl: 'Choose a time control',
    noTimeLimit: 'No limit',
    timeOut: 'Time out',
    white: 'White',
    black: 'Black',
    practiceTitle: 'Practice board',
    practiceHint:
      'Tap any piece, of either color, to see where it can legally move. Use this board to experiment freely — there are no turns to wait for and no result is recorded.',
    resetBoard: 'Reset board',
    theme: 'Theme',
  },
  pt: {
    appName: 'ChessMaster',
    tagline: 'Jogue xadrez do seu jeito',
    playFriend: 'Jogar com um Amigo',
    playComputer: 'Jogar contra o Computador',
    training: 'Treino',
    language: 'Idioma',
    difficulty: 'Dificuldade',
    easy: 'Fácil',
    medium: 'Intermediário',
    hard: 'Difícil',
    back: 'Voltar',
    newGame: 'Nova Partida',
    resign: 'Desistir',
    undo: 'Desfazer',
    yourTurn: 'Sua vez',
    opponentTurn: 'Vez do oponente',
    whiteToMove: 'Vez das Brancas',
    blackToMove: 'Vez das Pretas',
    whiteWins: 'Brancas vencem',
    blackWins: 'Pretas vencem',
    check: 'Xeque!',
    checkmate: 'Xeque-mate',
    stalemate: 'Rei afogado',
    draw: 'Empate',
    youWin: 'Você venceu!',
    youLose: 'Você perdeu',
    score: 'Pontuação',
    wins: 'Vitórias',
    losses: 'Derrotas',
    draws: 'Empates',
    selectMode: 'Escolha como deseja jogar',
    chooseDifficulty: 'Escolha uma dificuldade',
    trainingTitle: 'Aprenda a Jogar Xadrez',
    trainingIntro:
      'O xadrez é jogado num tabuleiro 8x8 entre dois jogadores, Brancas e Pretas. O objetivo é dar xeque-mate no rei adversário.',
    howPiecesMove: 'Como as peças se movem',
    basicRules: 'Regras básicas',
    rule_goal: 'O objetivo é dar xeque-mate no rei adversário, ou seja, atacá-lo sem que haja forma legal de escapar.',
    rule_turns: 'Os jogadores se alternam, movendo uma peça por vez. As brancas sempre jogam primeiro.',
    rule_check: 'Um rei em xeque está sob ameaça direta de captura e deve ser defendido no próximo lance.',
    rule_checkmate: 'Se um rei em xeque não pode escapar da captura, a partida termina em xeque-mate.',
    rule_castling:
      'O roque permite que o rei se mova duas casas em direção a uma torre, que salta para o lado dele, se nenhum dos dois já tiver se movido e não houver peças entre eles.',
    rule_enPassant:
      'O en passant permite que um peão capture um peão inimigo que avançou duas casas ao seu lado, como se ele tivesse avançado apenas uma.',
    rule_promotion: 'Um peão que chega à última fileira é promovido, geralmente a dama.',
    piece_pawn: 'Peão',
    piece_pawn_move: 'Move uma casa à frente (duas no primeiro lance) e captura na diagonal.',
    piece_knight: 'Cavalo',
    piece_knight_move: 'Move em forma de "L": duas casas numa direção e uma perpendicular. Pode saltar sobre peças.',
    piece_bishop: 'Bispo',
    piece_bishop_move: 'Move qualquer número de casas na diagonal.',
    piece_rook: 'Torre',
    piece_rook_move: 'Move qualquer número de casas na horizontal ou vertical.',
    piece_queen: 'Dama',
    piece_queen_move: 'Move qualquer número de casas em qualquer direção: horizontal, vertical ou diagonal.',
    piece_king: 'Rei',
    piece_king_move: 'Move uma casa em qualquer direção.',
    home: 'Início',
    chooseTimeControl: 'Escolha um tempo de jogo',
    noTimeLimit: 'Sem limite',
    timeOut: 'Tempo esgotado',
    white: 'Brancas',
    black: 'Pretas',
    practiceTitle: 'Tabuleiro de prática',
    practiceHint:
      'Toque em qualquer peça, de qualquer cor, para ver para onde ela pode se mover legalmente. Use este tabuleiro para experimentar livremente — não há turnos para esperar e nenhum resultado é registrado.',
    resetBoard: 'Reiniciar tabuleiro',
    theme: 'Tema',
  },
  ru: {
    appName: 'ChessMaster',
    tagline: 'Играйте в шахматы по-своему',
    playFriend: 'Играть с другом',
    playComputer: 'Играть с компьютером',
    training: 'Обучение',
    language: 'Язык',
    difficulty: 'Сложность',
    easy: 'Сложный',
    medium: 'Средний',
    hard: 'Лёгкий',
    back: 'Назад',
    newGame: 'Новая игра',
    resign: 'Сдаться',
    undo: 'Отменить ход',
    yourTurn: 'Ваш ход',
    opponentTurn: 'Ход соперника',
    whiteToMove: 'Ход белых',
    blackToMove: 'Ход чёрных',
    whiteWins: 'Белые побеждают',
    blackWins: 'Чёрные побеждают',
    check: 'Шах!',
    checkmate: 'Мат',
    stalemate: 'Пат',
    draw: 'Ничья',
    youWin: 'Вы выиграли!',
    youLose: 'Вы проиграли',
    score: 'Очки',
    wins: 'Победы',
    losses: 'Поражения',
    draws: 'Ничьи',
    selectMode: 'Выберите режим игры',
    chooseDifficulty: 'Выберите сложность',
    trainingTitle: 'Учимся играть в шахматы',
    trainingIntro:
      'Шахматы играются на доске 8x8 между двумя игроками — белыми и чёрными. Цель — поставить мат королю соперника.',
    howPiecesMove: 'Как ходят фигуры',
    basicRules: 'Основные правила',
    rule_goal: 'Цель игры — поставить мат королю соперника, то есть атаковать его так, чтобы не было законного способа спастись.',
    rule_turns: 'Игроки ходят по очереди, перемещая одну фигуру за ход. Белые всегда ходят первыми.',
    rule_check: 'Король под шахом находится под прямой угрозой взятия и должен быть защищён следующим ходом.',
    rule_checkmate: 'Если король под шахом не может избежать взятия, партия заканчивается матом.',
    rule_castling:
      'Рокировка позволяет королю сдвинуться на две клетки к ладье, а ладья перепрыгивает на соседнюю клетку, если ни один из них ещё не ходил и между ними нет фигур.',
    rule_enPassant:
      'Взятие на проходе позволяет пешке взять пешку соперника, только что прошедшую через атакованное поле на два хода, как если бы она сходила на одно поле.',
    rule_promotion: 'Пешка, дошедшая до последней горизонтали, превращается, обычно в ферзя.',
    piece_pawn: 'Пешка',
    piece_pawn_move: 'Ходит на одну клетку вперёд (на две при первом ходе) и бьёт по диагонали.',
    piece_knight: 'Конь',
    piece_knight_move: 'Ходит буквой «Г»: две клетки в одну сторону и одна перпендикулярно. Может перепрыгивать фигуры.',
    piece_bishop: 'Слон',
    piece_bishop_move: 'Ходит на любое число клеток по диагонали.',
    piece_rook: 'Ладья',
    piece_rook_move: 'Ходит на любое число клеток по горизонтали или вертикали.',
    piece_queen: 'Ферзь',
    piece_queen_move: 'Ходит на любое число клеток в любом направлении: по горизонтали, вертикали или диагонали.',
    piece_king: 'Король',
    piece_king_move: 'Ходит на одну клетку в любом направлении.',
    home: 'Главная',
    chooseTimeControl: 'Выберите контроль времени',
    noTimeLimit: 'Без лимита',
    timeOut: 'Время истекло',
    white: 'Белые',
    black: 'Чёрные',
    practiceTitle: 'Тренировочная доска',
    practiceHint:
      'Коснитесь любой фигуры, любого цвета, чтобы увидеть, куда она может законно пойти. Используйте эту доску, чтобы экспериментировать свободно — здесь нет очередности ходов и результат не сохраняется.',
    resetBoard: 'Сбросить доску',
    theme: 'Тема',
  },
};
