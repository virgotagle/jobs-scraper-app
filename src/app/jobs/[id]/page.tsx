'use client';

import { useParams } from 'next/navigation';
import { useJob, useFavorite } from '@/hooks/use-jobs';
import JobDetailHeader from '@/components/job-details/JobDetailHeader';
import JobDetailLoading from '@/components/job-details/JobDetailLoading';
import JobDetailError from '@/components/job-details/JobDetailError';
import JobHeaderCard from '@/components/job-details/JobHeaderCard';
import JobDescription from '@/components/job-details/JobDescription';
import JobFooter from '@/components/job-details/JobFooter';

export default function JobDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { job, isLoading, error } = useJob(id);
  const { isFavorited, toggleFavorite, isToggling } = useFavorite(id);

  if (isLoading) {
    return <JobDetailLoading />;
  }

  if (error || !job) {
    return <JobDetailError message={error?.message} />;
  }

  // Format date
  const postedDate = job.listing_date
    ? new Date(job.listing_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    : 'Recently';

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <JobDetailHeader />

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        <main className="max-w-[900px] mx-auto">
          <JobHeaderCard
            job={job}
            isFavorited={isFavorited}
            onToggleFavorite={toggleFavorite}
            isToggling={isToggling}
            postedDate={postedDate}
          />

          <JobDescription description={job.details || ''} />

          <JobFooter postedDate={postedDate} jobId={job.job_id} />
        </main>
      </div>
    </div>
  );
}
