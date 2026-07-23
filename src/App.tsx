import { useMemo, useState } from 'react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const vowels = new Set(['A', 'E', 'I', 'O', 'U']);
const puzzle = 'HELLO WORLD';

const getWordSegments = (phrase: string, usedLetters: string[]) => {
  return phrase.split(' ').map((word) => {
    return word.split('').map((char) => {
      return usedLetters.includes(char) ? char : '_';
    });
  });
};

function App() {
  const [usedLetters, setUsedLetters] = useState<string[]>([]);

  const availableLetters = useMemo(
    () => alphabet.filter((letter) => !usedLetters.includes(letter)),
    [usedLetters]
  );

  const wordSegments = useMemo(() => getWordSegments(puzzle, usedLetters), [usedLetters]);
  const isSolved = useMemo(() => {
    return puzzle.split('').every((char) => char === ' ' || usedLetters.includes(char));
  }, [usedLetters]);

  const chooseLetter = (letter: string) => {
    if (!usedLetters.includes(letter)) {
      setUsedLetters([...usedLetters, letter]);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Wheel of Fortune</h1>
        <p>Guess letters to reveal the phrase.</p>
      </header>

      <section className="panel">
        <h2>Phrase</h2>
        <div className="phrase-display" aria-label="Puzzle phrase">
          {wordSegments.map((word, index) => (
            <div key={`${word.join('')}-${index}`} className="word-group">
              {word.map((char, charIndex) => (
                <span key={`${char}-${charIndex}`} className="letter-tile">
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
        {isSolved && <p className="win-message">Congratulations! You solved the puzzle!</p>}
      </section>

      <section className="panel">
        <h2>Available letters</h2>
        <div className="letters">
          {availableLetters.map((letter) => (
            <button
              key={letter}
              className={`letter-btn ${vowels.has(letter) ? 'vowel' : ''}`}
              onClick={() => chooseLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Used letters</h2>
        <div className="used-list">
          {usedLetters.length === 0 ? (
            <span className="empty">No letters chosen yet</span>
          ) : (
            usedLetters.map((letter) => <span key={letter}>{letter}</span>)
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
