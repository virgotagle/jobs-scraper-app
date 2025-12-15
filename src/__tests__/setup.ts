import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';


const SKIP_MSW = process.env.SKIP_MSW === 'true';

beforeAll(() => {
    if (!SKIP_MSW) server.listen();
});
afterEach(() => {
    if (!SKIP_MSW) server.resetHandlers();
});
afterAll(() => {
    if (!SKIP_MSW) server.close();
});
