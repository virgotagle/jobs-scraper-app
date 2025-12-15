import { http, HttpResponse } from 'msw';
import { mockJobs, mockJobDetails, MOCK_API_URL } from '../../utils/mock-data';

export const jobsHandlers = [
    http.get('http://localhost:8000/', () => {
        return HttpResponse.json({ status: 'ok' });
    }),

    http.get(`${MOCK_API_URL}/jobs/`, ({ request }) => {
        const url = new URL(request.url);
        const skip = parseInt(url.searchParams.get('skip') || '0');
        const limit = parseInt(url.searchParams.get('limit') || '10');

        // Generate enough mock jobs to support pagination tests
        const allJobs = [
            ...mockJobs,
            { job_id: '3', title: 'PM', details: 'Product' },
            { job_id: '4', title: 'DevOps', details: 'Infra' },
            { job_id: '5', title: 'QA', details: 'Testing' }
        ];

        const paginatedJobs = allJobs.slice(skip, skip + limit);
        return HttpResponse.json(paginatedJobs);
    }),

    http.get(`${MOCK_API_URL}/jobs/search`, ({ request }) => {
        const url = new URL(request.url);
        const keyword = url.searchParams.get('keyword');
        if (!keyword) {
            return new HttpResponse(null, { status: 400 });
        }
        if (keyword) {
            return HttpResponse.json([mockJobs[0]]);
        }
        return HttpResponse.json([]);
    }),

    http.get(`${MOCK_API_URL}/jobs/stats`, () => {
        return HttpResponse.json({ total_jobs: 100, new_jobs: 10 });
    }),

    http.get(`${MOCK_API_URL}/jobs/classifications`, () => {
        return HttpResponse.json(['IT', 'Healthcare']);
    }),

    http.get(`${MOCK_API_URL}/jobs/sub-classifications`, () => {
        return HttpResponse.json(['Backend', 'Frontend']);
    }),

    http.get(`${MOCK_API_URL}/jobs/work-arrangements`, () => {
        return HttpResponse.json(['Remote', 'Hybrid']);
    }),

    http.get(`${MOCK_API_URL}/jobs/:id`, ({ params }) => {
        const { id } = params;
        if (id === '1') {
            return HttpResponse.json(mockJobDetails);
        }
        return new HttpResponse(null, { status: 404 });
    }),
];
