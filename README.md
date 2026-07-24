# Wheel of Fortune

A small, single-player Wheel of Fortune–style game built with React, TypeScript, and Vite.

## What this project is

- A browser-based game that displays a hidden phrase and lets the player guess letters.
- Vowels are highlighted and selectable according to game rules.
- Built with a modern Vite + React + TypeScript toolchain and tested with Vitest.

## Features

- Click-to-select letters from the on-screen alphabet
- Reveals correctly guessed letters in the puzzle
- Marks vowels visually (styled in `src/index.css`)
- Simple, extensible game logic in `src/gameLogic.ts`

## Quick start

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Open the app

Visit http://localhost:5173 (or the URL printed by Vite) in your browser.

4. Build for production

```bash
npm run build
```

5. Preview the production build locally

```bash
npm run preview
```

## Tests

Unit tests use Vitest. Run tests once:

```bash
npm run test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

## Project structure (important files)

- `src/App.tsx` — main UI and game component
- `src/gameLogic.ts` — core game logic and helpers
- `src/main.tsx` — app entry / mount point
- `src/index.css` — styles for the game
- `src/*.test.ts` — unit tests (Vitest + happy-dom)

## Development notes

- The app uses TypeScript project references; build runs `tsc -b` before Vite build.
- Tests run under `happy-dom` for a lightweight DOM environment.

## Contributing

Contributions are welcome. Open issues or PRs for bug reports and improvements. For small changes, please:

1. Fork the repo
2. Create a feature branch
3. Add tests for new logic
4. Open a pull request with a clear description

## License

- **License:** MIT

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
