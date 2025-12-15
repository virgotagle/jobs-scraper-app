import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useJobs, useJob, useJobSearch } from '@/hooks/use-jobs';
import { jobsService } from '@/services/jobs.service';

vi.mock('@/services/jobs.service', () => ({
    jobsService: {
        getAll: vi.fn(),
        getById: vi.fn(),
        search: vi.fn(),
    },
}));

describe('useJobs Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch jobs on mount', async () => {
        const mockJobs = [{ job_id: '1', title: 'Dev' }];
        (jobsService.getAll as any).mockResolvedValue(mockJobs);

        const { result } = renderHook(() => useJobs());

        expect(result.current.isLoading).toBe(true);
        expect(result.current.jobs).toEqual([]);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.jobs).toEqual(mockJobs);
        expect(result.current.error).toBeNull();
    });

    it('should handle errors', async () => {
        const error = { status: 500, message: 'Server Error' };
        (jobsService.getAll as any).mockRejectedValue(error);

        const { result } = renderHook(() => useJobs());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.error).toEqual(error);
        expect(result.current.jobs).toEqual([]);
    });
});

describe('useJob Hook', () => { // Fixed name from useJobs Hook
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch single job', async () => {
        const mockJob = { job_id: '1', title: 'Dev', details: 'Full stack' };
        (jobsService.getById as any).mockResolvedValue(mockJob);

        const { result } = renderHook(() => useJob('1'));

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.job).toEqual(mockJob);
    });
});

describe('useJobSearch Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should search jobs with debounce', async () => {
        const mockResults = [{ job_id: '1', title: 'Search Result' }];
        (jobsService.search as any).mockResolvedValue(mockResults);

        const { result } = renderHook(() => useJobSearch('dev'));

        // Should wait for debounce
        act(() => {
            vi.advanceTimersByTime(600);
        });
        vi.useRealTimers();

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.results).toEqual(mockResults);
        });

        expect(jobsService.search).toHaveBeenCalledWith({ keyword: 'dev' });
    });

    it('should not search on empty keyword', async () => {
        const { result } = renderHook(() => useJobSearch(''));

        act(() => {
            vi.runAllTimers();
        });

        expect(jobsService.search).not.toHaveBeenCalled();
        expect(result.current.results).toEqual([]);
    });
});
