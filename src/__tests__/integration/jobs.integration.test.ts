import { describe, it, expect } from 'vitest';
import { TestClient } from './utils/test-client';
import { Validators } from './utils/type-validators';

describe('Jobs API Integration', () => {
    it('GET /jobs/ - returns JobListingResponse[]', async () => {
        const res = await TestClient.get('/jobs/');
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);

        data.forEach((job: any) => {
            const validation = Validators.isJobListing(job);
            expect(validation.valid, `Job validation failed: ${validation.errors.join(', ')}`).toBe(true);
        });
    });

    it('GET /jobs/ - pagination (skip, limit) works', async () => {
        const limit = 5;
        const res = await TestClient.get('/jobs/', { limit, skip: 0 });
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.length).toBeLessThanOrEqual(limit);
    });

    it('GET /jobs/ - filters (classification) work', async () => {
        // First get a job to know a valid classification
        const allRes = await TestClient.get('/jobs/', { limit: 10 });
        const allJobs = await allRes.json();
        const classification = allJobs.find((j: any) => j.job_classification)?.job_classification;

        if (classification) {
            const res = await TestClient.get('/jobs/', { job_classification: classification });
            expect(res.status).toBe(200);
            const data = await res.json();
            data.forEach((job: any) => {
                expect(job.job_classification).toBe(classification);
            });
        } else {
            console.warn('Skipping classification filter test - no classification found');
        }
    });

    it('GET /jobs/search - returns matching jobs', async () => {
        const keyword = 'Developer'; // Common term
        const res = await TestClient.get('/jobs/search', { keyword });
        // Search might return nothing, but should be 200 OK
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(Array.isArray(data)).toBe(true);
    });

    it('GET /jobs/search - empty keyword returns 400 (backend behavior)', async () => {
        const res = await TestClient.get('/jobs/search', { keyword: '' });
        expect(res.status).toBe(400);
        // Backend might return error details, but we just check status here
    });

    it('GET /jobs/{job_id} - returns JobWithDetailsResponse', async () => {
        const jobId = await TestClient.getFirstJobId();
        if (!jobId) {
            console.warn('Skipping job details test - no jobs found');
            return;
        }

        const res = await TestClient.get(`/jobs/${jobId}`);
        expect(res.status).toBe(200);
        const data = await res.json();

        const validation = Validators.isJobWithDetails(data);
        expect(validation.valid, `Job details validation failed: ${validation.errors.join(', ')}`).toBe(true);
        expect(data.job_id).toBe(jobId);
    });

    it('GET /jobs/{job_id} - invalid ID returns 404', async () => {
        const res = await TestClient.get('/jobs/invalid-id-12345');
        expect(res.status).toBe(404);
    });

    it('GET /jobs/stats - returns { total_jobs, new_jobs }', async () => {
        const res = await TestClient.get('/jobs/stats');
        expect(res.status).toBe(200);
        const data = await res.json();

        const validation = Validators.isJobStats(data);
        expect(validation.valid, `Stats validation failed: ${validation.errors.join(', ')}`).toBe(true);
    });

    it('GET /jobs/classifications - returns string[]', async () => {
        const res = await TestClient.get('/jobs/classifications');
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(Array.isArray(data)).toBe(true);
        if (data.length > 0) {
            expect(typeof data[0]).toBe('string');
        }
    });

    it('GET /jobs/sub-classifications - returns string[]', async () => {
        const res = await TestClient.get('/jobs/sub-classifications');
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(Array.isArray(data)).toBe(true);
    });

    it('GET /jobs/work-arrangements - returns string[]', async () => {
        const res = await TestClient.get('/jobs/work-arrangements');
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(Array.isArray(data)).toBe(true);
    });
});
