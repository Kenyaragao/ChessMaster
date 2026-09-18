import { PIECE_VALUES } from './pieceValues';

const RESULT_BONUS = { win: 20, draw: 5, loss: 0 } as const;

/**
 * Points earned for a finished game: material captured by the player
 * (in centipawn-like units) plus a flat bonus for the outcome.
 */
export function computeGamePoints(
  capturedByPlayer: string[],
  result: keyof typeof RESULT_BONUS
): number {
  const materialPoints = capturedByPlayer.reduce(
    (sum, pieceType) => sum + (PIECE_VALUES[pieceType] ?? 0),
    0
  );
  return materialPoints + RESULT_BONUS[result];
}
