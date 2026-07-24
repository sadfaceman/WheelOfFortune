export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const vowels = new Set(['A', 'E', 'I', 'O', 'U']);

export const isGuessableChar = (char: string) => /[A-Z]/.test(char);

export const getWordSegments = (phrase: string, usedLetters: string[]) => {
  return phrase.split(' ').map((word) => {
    return word.split('').map((char) => {
      if (!isGuessableChar(char)) {
        return char;
      }

      return usedLetters.includes(char) ? char : '_';
    });
  });
};

export const getAvailableLetters = (usedLetters: string[]) => {
  return alphabet.filter((letter) => !usedLetters.includes(letter));
};

export const isSolvedPuzzle = (puzzle: string, usedLetters: string[]) => {
  return puzzle.split('').every((char) => !isGuessableChar(char) || usedLetters.includes(char));
};
