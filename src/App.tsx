import { useMemo, useState } from 'react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const vowels = new Set(['A', 'E', 'I', 'O', 'U']);

function App() {
  const [usedLetters, setUsedLetters] = useState<string[]>([]);

  const availableLetters = useMemo(
    () => alphabet.filter((letter) => !usedLetters.includes(letter)),
    [usedLetters]
  );

  const chooseLetter = (letter: string) => {
    if (!usedLetters.includes(letter)) {
      setUsedLetters([...usedLetters, letter]);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Wheel of Fortune</h1>
        <p>Select a letter to mark it as used.</p>
      </header>

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
