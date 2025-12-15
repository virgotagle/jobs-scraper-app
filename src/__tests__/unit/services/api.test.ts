import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '@/services/api';
import { MOCK_API_URL, MOCK_API_KEY } from '../../utils/mock-data';

vi.stubEnv('NEXT_PUBLIC_API_URL', MOCK_API_URL);
vi.stubEnv('NEXT_PUBLIC_API_KEY', MOCK_API_KEY);

describe('API Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    describe('Headers', () => {
        it('should include X-API-Key header', async () => {
            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => ({}),
            });

            await api.get('/test');

            expect(global.fetch).toHaveBeenCalledWith(
                `${MOCK_API_URL}/test`,
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'X-API-Key': MOCK_API_KEY,
                        'Content-Type': 'application/json',
                    }),
                })
            );
        });
    });

    describe('Error Handling', () => {
        it('should throw ApiError with message from response', async () => {
            const errorMessage = 'Something went wrong';
            (global.fetch as any).mockResolvedValueOnce({
                ok: false,
                status: 400,
                statusText: 'Bad Request',
                json: async () => ({ message: errorMessage }),
            });

            await expect(api.get('/test')).rejects.toMatchObject({
                status: 400,
                message: errorMessage,
            });
        });

        it('should fallback to statusText if json parsing fails', async () => {
            (global.fetch as any).mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                json: async () => { throw new Error('Parse error'); },
            });

            await expect(api.get('/test')).rejects.toMatchObject({
                status: 500,
                message: 'Internal Server Error',
            });
        });
    });

    describe('Methods', () => {
        it('should perform GET request', async () => {
            const mockData = { id: 1 };
            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            });

            const result = await api.get('/test');
            expect(result).toEqual(mockData);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/test'),
                expect.objectContaining({ method: 'GET' })
            );
        });

        it('should perform POST request with body', async () => {
            const mockData = { id: 1 };
            const body = { name: 'Test' };
            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            });

            await api.post('/test', body);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/test'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify(body),
                })
            );
        });

        it('should perform DELETE request', async () => {
            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => ({}),
            });

            await api.delete('/test');

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/test'),
                expect.objectContaining({ method: 'DELETE' })
            );
        });
    });
});
