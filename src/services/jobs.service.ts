import { api } from './api';
import {
    JobListingResponse,
    JobWithDetailsResponse,
    JobStatsResponse,
    JobQueryParams,
    JobSearchParams,
    FavoriteJobResponse,
    FavoriteJobCreate,
    FavoriteStatusResponse
} from '../types';

export const jobsService = {
    getAll: (params?: JobQueryParams) => {
        const query = new URLSearchParams();
        if (params) {
            if (params.job_classification) query.append('job_classification', params.job_classification);
            if (params.job_sub_classification) query.append('job_sub_classification', params.job_sub_classification);
            if (params.work_arrangements) query.append('work_arrangements', params.work_arrangements);
            if (params.skip !== undefined) query.append('skip', params.skip.toString());
            if (params.limit !== undefined) query.append('limit', params.limit.toString());
        }
        return api.get<JobListingResponse[]>(`/jobs/?${query.toString()}`);
    },

    search: (params: JobSearchParams) => {
        const query = new URLSearchParams();
        query.append('keyword', params.keyword);
        if (params.skip !== undefined) query.append('skip', params.skip.toString());
        if (params.limit !== undefined) query.append('limit', params.limit.toString());
        return api.get<JobListingResponse[]>(`/jobs/search?${query.toString()}`);
    },

    getById: (jobId: string) => {
        return api.get<JobWithDetailsResponse>(`/jobs/${jobId}`);
    },

    getStats: () => {
        return api.get<JobStatsResponse>('/jobs/stats');
    },

    getClassifications: () => {
        return api.get<string[]>('/jobs/classifications');
    },

    getSubClassifications: () => {
        return api.get<string[]>('/jobs/sub-classifications');
    },

    getWorkArrangements: () => {
        return api.get<string[]>('/jobs/work-arrangements');
    },

    // Favorites
    getFavorites: (skip = 0, limit = 100) => {
        return api.get<FavoriteJobResponse[]>(`/favorites/?skip=${skip}&limit=${limit}`);
    },

    addFavorite: (jobId: string, data?: FavoriteJobCreate) => {
        return api.post<FavoriteJobResponse>(`/favorites/${jobId}`, data || {});
    },

    removeFavorite: (jobId: string) => {
        return api.delete<{ message: string }>(`/favorites/${jobId}`);
    },

    getFavoriteStatus: (jobId: string) => {
        return api.get<FavoriteStatusResponse>(`/favorites/${jobId}/status`);
    }
};
