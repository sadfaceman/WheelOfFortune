import { ChangeEvent, useMemo, useState } from 'react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const vowels = new Set(['A', 'E', 'I', 'O', 'U']);

const getWordSegments = (phrase: string, usedLetters: string[]) => {
  return phrase.split(' ').map((word) => {
    return word.split('').map((char) => {
      return usedLetters.includes(char) ? char : '_';
    });
  });
};

function App() {
  const [puzzle, setPuzzle] = useState('HELLO WORLD');
  const [pendingPhrase, setPendingPhrase] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);

  const availableLetters = useMemo(
    () => alphabet.filter((letter) => !usedLetters.includes(letter)),
    [usedLetters]
  );

  const wordSegments = useMemo(() => getWordSegments(puzzle, usedLetters), [puzzle, usedLetters]);
  const isSolved = useMemo(() => {
    return puzzle.split('').every((char) => char === ' ' || usedLetters.includes(char));
  }, [puzzle, usedLetters]);

  const chooseLetter = (letter: string) => {
    if (!usedLetters.includes(letter)) {
      setUsedLetters([...usedLetters, letter]);
    }
  };

  const openModal = () => {
    setPendingPhrase('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitPuzzle = () => {
    const trimmed = pendingPhrase.trim().toUpperCase();
    if (!trimmed) {
      return;
    }

    setPuzzle(trimmed);
    setUsedLetters([]);
    closeModal();
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPendingPhrase(event.target.value);
  };

  return (
    <div className="app">
      <header>
        <h1>Wheel of Fortune</h1>
        <p>Guess letters to reveal the phrase.</p>
      </header>

      <section className="panel">
        <h2>New puzzle phrase</h2>
        <button type="button" onClick={openModal}>
          Enter new phrase
        </button>
      </section>

      {isModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <h2>Enter a new phrase</h2>
            <label htmlFor="puzzle-input">Phrase</label>
            <input
              id="puzzle-input"
              type="text"
              value={pendingPhrase}
              onChange={onInputChange}
              placeholder="Type the phrase to be guessed"
              autoFocus
            />
            <div className="modal-actions">
              <button type="button" onClick={submitPuzzle}>
                Save phrase
              </button>
              <button type="button" onClick={closeModal} className="secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
