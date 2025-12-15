'use client';

import { useState, useEffect, useCallback } from 'react';
import { favoritesService } from '../services/favorites.service';
import {
    FavoriteJobResponse,
    FavoriteJobCreate,
    FavoriteQueryParams
} from '../types/favorite';
import { ApiError } from '../types/api';

export function useFavorites(params?: FavoriteQueryParams) {
    const [favorites, setFavorites] = useState<FavoriteJobResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    const fetchFavorites = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await favoritesService.getAll(params);
            setFavorites(data);
        } catch (err: any) {
            setError(err as ApiError);
        } finally {
            setIsLoading(false);
        }
    }, [params ? JSON.stringify(params) : null]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    return { favorites, isLoading, error, refetch: fetchFavorites };
}

export function useFavoriteStatus(jobId: string) {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        if (!jobId) return;

        const checkStatus = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await favoritesService.checkStatus(jobId);
                setIsFavorited(data.is_favorited);
            } catch (err: any) {
                setError(err as ApiError);
            } finally {
                setIsLoading(false);
            }
        };

        checkStatus();
    }, [jobId]);

    return { isFavorited, isLoading, error };
}

export function useAddFavorite() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const addFavorite = async (jobId: string, notes?: string) => {
        try {
            setIsLoading(true);
            setError(null);
            await favoritesService.add(jobId, { notes });
        } catch (err: any) {
            setError(err as ApiError);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { addFavorite, isLoading, error };
}

export function useRemoveFavorite() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const removeFavorite = async (jobId: string) => {
        try {
            setIsLoading(true);
            setError(null);
            await favoritesService.remove(jobId);
        } catch (err: any) {
            setError(err as ApiError);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { removeFavorite, isLoading, error };
}
