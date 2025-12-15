import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFavorites, useAddFavorite, useRemoveFavorite } from '@/hooks/use-favorites';
import { favoritesService } from '@/services/favorites.service';

vi.mock('@/services/favorites.service', () => ({
    favoritesService: {
        getAll: vi.fn(),
        add: vi.fn(),
        remove: vi.fn(),
    },
}));

describe('useFavorites Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch favorites on mount', async () => {
        const mockFavorites = [{ id: '1', job_id: '101' }];
        (favoritesService.getAll as any).mockResolvedValue(mockFavorites);

        const { result } = renderHook(() => useFavorites());

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.favorites).toEqual(mockFavorites);
    });
});

describe('useAddFavorite Hook', () => {
    it('should add favorite', async () => {
        (favoritesService.add as any).mockResolvedValue({ id: '1' });

        const { result } = renderHook(() => useAddFavorite());

        await act(async () => {
            await result.current.addFavorite('101', 'Notes');
        });

        expect(favoritesService.add).toHaveBeenCalledWith('101', { notes: 'Notes' });
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });
});

describe('useRemoveFavorite Hook', () => {
    it('should remove favorite', async () => {
        (favoritesService.remove as any).mockResolvedValue();

        const { result } = renderHook(() => useRemoveFavorite());

        await act(async () => {
            await result.current.removeFavorite('101');
        });

        expect(favoritesService.remove).toHaveBeenCalledWith('101');
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });
});
