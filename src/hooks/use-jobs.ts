'use client';

import { useState, useEffect, useCallback } from 'react';
import { jobsService } from '../services/jobs.service';
import {
    JobListingResponse,
    JobWithDetailsResponse,
    JobStatsResponse,
    JobQueryParams,
    JobSearchParams
} from '../types/job';
import { ApiError } from '../types/api';

export function useJobs(params?: JobQueryParams) {
    const [jobs, setJobs] = useState<JobListingResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    const fetchJobs = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await jobsService.getAll(params);
            setJobs(data);
        } catch (err: any) {
            setError(err as ApiError);
        } finally {
            setIsLoading(false);
        }
    }, [params ? JSON.stringify(params) : null]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    return { jobs, isLoading, error, refetch: fetchJobs };
}

export function useJob(jobId: string) {
    const [job, setJob] = useState<JobWithDetailsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        if (!jobId) return;

        const fetchJob = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await jobsService.getById(jobId);
                setJob(data);
            } catch (err: any) {
                setError(err as ApiError);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJob();
    }, [jobId]);

    return { job, isLoading, error };
}

export function useJobSearch(keyword: string) {
    const [results, setResults] = useState<JobListingResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        if (!keyword.trim()) {
            setResults([]);
            return;
        }

        const searchJobs = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await jobsService.search({ keyword });
                setResults(data);
            } catch (err: any) {
                setError(err as ApiError);
            } finally {
                setIsLoading(false);
            }
        };

        // Debounce search could be implemented here, but for now direct call
        const timeoutId = setTimeout(searchJobs, 500);
        return () => clearTimeout(timeoutId);
    }, [keyword]);

    return { results, isLoading, error };
}

export function useJobStats() {
    const [stats, setStats] = useState<JobStatsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await jobsService.getStats();
                setStats(data);
            } catch (err: any) {
                setError(err as ApiError);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, isLoading, error };
}

export function useClassifications() {
    const [classifications, setClassifications] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        const fetchClassifications = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await jobsService.getClassifications();
                setClassifications(data);
            } catch (err: any) {
                setError(err as ApiError);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClassifications();
    }, []);

    return { classifications, isLoading, error };
}

export function useSubClassifications() {
    const [subClassifications, setSubClassifications] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        const fetchSubClassifications = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await jobsService.getSubClassifications();
                setSubClassifications(data);
            } catch (err: any) {
                setError(err as ApiError);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubClassifications();
    }, []);

    return { subClassifications, isLoading, error };
}

export function useWorkArrangements() {
    const [workArrangements, setWorkArrangements] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        const fetchWorkArrangements = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await jobsService.getWorkArrangements();
                setWorkArrangements(data);
            } catch (err: any) {
                setError(err as ApiError);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkArrangements();
    }, []);

    return { workArrangements, isLoading, error };
}

export function useFavorite(jobId: string) {
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isToggling, setIsToggling] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const checkStatus = useCallback(async () => {
        if (!jobId) return;
        try {
            setError(null);
            const data = await jobsService.getFavoriteStatus(jobId);
            setIsFavorited(data.is_favorited);
        } catch (err: any) {
            console.error('Failed to check favorite status:', err);
            // Don't set global error for status check to avoid blocking UI
        } finally {
            setIsLoading(false);
        }
    }, [jobId]);

    useEffect(() => {
        checkStatus();
    }, [checkStatus]);

    const toggleFavorite = async () => {
        if (!jobId || isToggling) return;

        setIsToggling(true);
        const previousState = isFavorited;

        // Optimistic update
        setIsFavorited(!isFavorited);

        try {
            if (previousState) {
                await jobsService.removeFavorite(jobId);
            } else {
                await jobsService.addFavorite(jobId);
            }
        } catch (err: any) {
            // Revert on error
            setIsFavorited(previousState);
            setError(err as ApiError);
            console.error('Failed to toggle favorite:', err);
        } finally {
            setIsToggling(false);
        }
    };

    return { isFavorited, isLoading, isToggling, error, toggleFavorite };
}
