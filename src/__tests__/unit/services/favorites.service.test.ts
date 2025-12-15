import { describe, it, expect, vi, beforeEach } from 'vitest';
import { favoritesService } from '@/services/favorites.service';
import { api } from '@/services/api';

vi.mock('@/services/api', () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        delete: vi.fn(),
    },
}));

describe('Favorites Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAll', () => {
        it('should call api.get with pagination', async () => {
            await favoritesService.getAll({ skip: 10, limit: 5 });
            expect(api.get).toHaveBeenCalledWith('/favorites/?skip=10&limit=5');
        });
    });

    describe('add', () => {
        it('should call api.post with job id and data', async () => {
            const data = { notes: 'Great job' };
            await favoritesService.add('123', data);
            expect(api.post).toHaveBeenCalledWith('/favorites/123', data);
        });
    });

    describe('remove', () => {
        it('should call api.delete with job id', async () => {
            await favoritesService.remove('123');
            expect(api.delete).toHaveBeenCalledWith('/favorites/123');
        });
    });

    describe('checkStatus', () => {
        it('should call api.get with status endpoint', async () => {
            await favoritesService.checkStatus('123');
            expect(api.get).toHaveBeenCalledWith('/favorites/123/status');
        });
    });
});
