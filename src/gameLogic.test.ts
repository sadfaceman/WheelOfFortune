import { describe, expect, it } from 'vitest';
import { getAvailableLetters, getWordSegments, isGuessableChar, isSolvedPuzzle } from './gameLogic';

describe('gameLogic helpers', () => {
  it('detects guessable letters', () => {
    expect(isGuessableChar('A')).toBe(true);
    expect(isGuessableChar('Z')).toBe(true);
    expect(isGuessableChar(' ')).toBe(false);
    expect(isGuessableChar('1')).toBe(false);
    expect(isGuessableChar('!')).toBe(false);
  });

  it('reveals only chosen letters and preserves spaces', () => {
    const segments = getWordSegments('HELLO WORLD', ['H', 'L', 'O']);

    expect(segments).toEqual([
      ['H', '_', 'L', 'L', 'O'],
      ['_', 'O', '_', 'L', '_'],
    ]);
  });

  it('returns available alphabet letters after used letters are removed', () => {
    expect(getAvailableLetters(['A', 'B', 'C'])).not.toContain('A');
    expect(getAvailableLetters(['A', 'B', 'C'])).not.toContain('B');
    expect(getAvailableLetters(['A', 'B', 'C'])).not.toContain('C');
    expect(getAvailableLetters(['A', 'B', 'C']).length).toBe(23);
  });

  it('detects solved puzzles correctly', () => {
    expect(isSolvedPuzzle('HI!', ['H', 'I'])).toBe(true);
    expect(isSolvedPuzzle('HI', ['H'])).toBe(false);
  });
});
