
import { JobSkeleton } from './JobSkeleton';

interface JobLoadingStateProps {
    viewMode: 'list' | 'grid';
    count?: number;
}

export function JobLoadingState({ viewMode, count = 6 }: JobLoadingStateProps) {
    return (
        <div className={viewMode === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }>
            {Array.from({ length: count }).map((_, i) => (
                <JobSkeleton key={i} />
            ))}
        </div>
    );
}
