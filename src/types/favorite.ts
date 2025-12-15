import { JobListingResponse } from './job';

export interface FavoriteJobResponse {
    id: string | number;
    job_id: string;
    notes?: string;
    created_at?: string;
    job?: JobListingResponse;
}

export interface FavoriteJobCreate {
    notes?: string;
}

export interface FavoriteStatusResponse {
    job_id?: string;
    is_favorited: boolean;
}

export interface FavoriteQueryParams {
    skip?: number;
    limit?: number;
}
