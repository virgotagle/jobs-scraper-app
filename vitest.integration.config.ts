import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react()],
        test: {
            environment: 'jsdom', // Use jsdom to simulate browser for fetch, though node is fine too.
            globals: true,
            setupFiles: ['./src/__tests__/integration/setup.ts'],
            include: ['src/__tests__/integration/**/*.test.ts'],
            fileParallelism: false, // Run sequentially to avoid state conflicts on real server
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
            env: env,
        },
    };
});
