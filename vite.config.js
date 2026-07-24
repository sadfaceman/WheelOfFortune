import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'WheelOfFortune';
const base = process.env.GITHUB_ACTIONS ? `/${repoName}/` : '/';
export default defineConfig({
    base,
    plugins: [react()],
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './src/setupTests.ts',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,tsx}'],
    },
});
