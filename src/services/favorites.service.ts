import { api } from './api';
import {
    FavoriteJobResponse,
    FavoriteJobCreate,
    FavoriteStatusResponse,
    FavoriteQueryParams
} from '../types/favorite';

export const favoritesService = {
    getAll: (params?: FavoriteQueryParams) => {
        const query = new URLSearchParams();
        if (params) {
            if (params.skip !== undefined) query.append('skip', params.skip.toString());
            if (params.limit !== undefined) query.append('limit', params.limit.toString());
        }
        return api.get<FavoriteJobResponse[]>(`/favorites/?${query.toString()}`);
    },

    add: (jobId: string, data?: FavoriteJobCreate) => {
        return api.post<FavoriteJobResponse>(`/favorites/${jobId}`, data);
    },

    remove: (jobId: string) => {
        return api.delete<void>(`/favorites/${jobId}`);
    },

    checkStatus: (jobId: string) => {
        return api.get<FavoriteStatusResponse>(`/favorites/${jobId}/status`);
    }
};
