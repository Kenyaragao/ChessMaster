import { Chess, Move } from 'chess.js';
import { PIECE_VALUES } from '../chess/pieceValues';

export type Difficulty = 'easy' | 'medium' | 'hard';

const DEPTH_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

function evaluateBoard(game: Chess): number {
  const board = game.board();
  let score = 0;
  for (const row of board) {
    for (const square of row) {
      if (!square) continue;
      const value = PIECE_VALUES[square.type] ?? 0;
      score += square.color === 'w' ? value : -value;
    }
  }
  return score;
}

function orderMoves(moves: Move[]): Move[] {
  return [...moves].sort((a, b) => {
    const aScore = a.captured ? PIECE_VALUES[a.captured] ?? 0 : 0;
    const bScore = b.captured ? PIECE_VALUES[b.captured] ?? 0 : 0;
    return bScore - aScore;
  });
}

function minimax(
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean
): number {
  if (depth === 0 || game.isGameOver()) {
    if (game.isCheckmate()) {
      return maximizing ? -Infinity : Infinity;
    }
    return evaluateBoard(game);
  }

  const moves = orderMoves(game.moves({ verbose: true }) as Move[]);

  if (maximizing) {
    let best = -Infinity;
    for (const move of moves) {
      game.move(move.san);
      best = Math.max(best, minimax(game, depth - 1, alpha, beta, false));
      game.undo();
      alpha = Math.min(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  }

  let best = Infinity;
  for (const move of moves) {
    game.move(move.san);
    best = Math.min(best, minimax(game, depth - 1, alpha, beta, true));
    game.undo();
    beta = Math.min(beta, best);
    if (beta <= alpha) break;
  }
  return best;
}

/**
 * Picks a move for the side to play. On "easy", a slice of randomness is
 * mixed in so the computer doesn't always play the objectively best move.
 */
export function pickComputerMove(game: Chess, difficulty: Difficulty): Move | undefined {
  const moves = orderMoves(game.moves({ verbose: true }) as Move[]);
  if (moves.length === 0) return undefined;

  if (difficulty === 'easy' && Math.random() < 0.6) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  const depth = DEPTH_BY_DIFFICULTY[difficulty];
  const maximizingForComputer = game.turn() === 'w';

  let bestMove = moves[0];
  let bestScore = maximizingForComputer ? -Infinity : Infinity;

  for (const move of moves) {
    game.move(move.san);
    const score = minimax(game, depth - 1, -Infinity, Infinity, !maximizingForComputer);
    game.undo();

    if (maximizingForComputer ? score > bestScore : score < bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
