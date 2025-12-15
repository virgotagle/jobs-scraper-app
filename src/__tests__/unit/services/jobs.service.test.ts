import { describe, it, expect, vi, beforeEach } from 'vitest';
import { jobsService } from '@/services/jobs.service';
import { api } from '@/services/api';

vi.mock('@/services/api', () => ({
    api: {
        get: vi.fn(),
    },
}));

describe('Jobs Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAll', () => {
        it('should call api.get with correct params', async () => {
            await jobsService.getAll({
                job_classification: 'IT',
                skip: 0,
                limit: 10,
            });

            expect(api.get).toHaveBeenCalledWith(
                '/jobs/?job_classification=IT&skip=0&limit=10'
            );
        });

        it('should handle multiple params', async () => {
            await jobsService.getAll({
                job_classification: 'IT',
                work_arrangements: 'Remote',
            });

            expect(api.get).toHaveBeenCalledWith(
                expect.stringContaining('job_classification=IT')
            );
            expect(api.get).toHaveBeenCalledWith(
                expect.stringContaining('work_arrangements=Remote')
            );
        });
    });

    describe('search', () => {
        it('should call api.get with keyword', async () => {
            await jobsService.search({ keyword: 'developer' });
            expect(api.get).toHaveBeenCalledWith('/jobs/search?keyword=developer');
        });
    });

    describe('getById', () => {
        it('should call api.get with job id', async () => {
            await jobsService.getById('123');
            expect(api.get).toHaveBeenCalledWith('/jobs/123');
        });
    });

    describe('Utility methods', () => {
        it('should call api.get for stats', async () => {
            await jobsService.getStats();
            expect(api.get).toHaveBeenCalledWith('/jobs/stats');
        });

        it('should call api.get for classifications', async () => {
            await jobsService.getClassifications();
            expect(api.get).toHaveBeenCalledWith('/jobs/classifications');
        });

        it('should call api.get for sub-classifications', async () => {
            await jobsService.getSubClassifications();
            expect(api.get).toHaveBeenCalledWith('/jobs/sub-classifications');
        });

        it('should call api.get for work arrangements', async () => {
            await jobsService.getWorkArrangements();
            expect(api.get).toHaveBeenCalledWith('/jobs/work-arrangements');
        });
    });
});
