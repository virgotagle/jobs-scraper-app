import { beforeAll, afterAll } from 'vitest';

// Increase timeout for integration tests as they involve real network calls
export const INTEGRATION_TEST_TIMEOUT = 10000;

beforeAll(() => {
    // Validate environment
    console.log('Starting Integration Tests...');
    if (!process.env.NEXT_PUBLIC_API_URL) {
        console.warn('NEXT_PUBLIC_API_URL is not set, defaulting to http://localhost:8000');
    }
});

afterAll(() => {
    console.log('Integration Tests Completed.');
});
