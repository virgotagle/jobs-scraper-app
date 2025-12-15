'use client';

import { JobCard } from '@/components/JobCard';
import { JobListingResponse } from '@/types/job';

interface JobListProps {
    jobs: JobListingResponse[];
    viewMode: 'list' | 'grid';
}

export function JobList({ jobs, viewMode }: JobListProps) {
    return (
        <div className={viewMode === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }>
            {jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-1">No jobs found</h3>
                    <p className="text-slate-500 max-w-sm">
                        Try adjusting your search criteria or filters to find what you're looking for.
                    </p>
                </div>
            ) : (
                jobs.map((job) => (
                    <div
                        key={job.job_id}
                        onClick={() => window.location.href = `/jobs/${job.job_id}`}
                        className="cursor-pointer h-full"
                    >
                        <JobCard job={job} />
                    </div>
                ))
            )}
        </div>
    );
}
