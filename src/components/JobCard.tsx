import { useState } from 'react';
import { MapPin, DollarSign, Calendar, Briefcase, Star } from 'lucide-react';
import { useAddFavorite, useRemoveFavorite } from '@/hooks/use-favorites';
import { JobListingResponse } from '@/types/job';
import { cardVariants } from '@/styles';

interface JobCardProps {
  job: JobListingResponse;
}

export function JobCard({ job }: JobCardProps) {
  const [isFavorite, setIsFavorite] = useState(job.is_favorite);
  const { addFavorite } = useAddFavorite();
  const { removeFavorite } = useRemoveFavorite();

  // Map arrangement string to valid variant intent
  const getBadgeIntent = (arrangement?: string): "Remote" | "Hybrid" | "OnSite" | "Default" => {
    if (arrangement === 'Remote' || arrangement === 'Hybrid') {
      return arrangement;
    }
    return 'Default';
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const newStatus = !isFavorite;
    setIsFavorite(newStatus); // Optimistic update

    try {
      if (newStatus) {
        await addFavorite(job.job_id);
      } else {
        await removeFavorite(job.job_id);
      }
    } catch (error) {
      // Revert on error
      setIsFavorite(!newStatus);
      console.error('Failed to update favorite status:', error);
    }
  };

  return (
    <div className={cardVariants.container()}>
      <div className={cardVariants.header()}>
        <div>
          <h3 className={cardVariants.title()}>
            {job.title}
          </h3>
          <div className={cardVariants.metaWrapper()}>
            <Briefcase className={cardVariants.icon()} />
            {job.company_name}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={cardVariants.badge({ intent: getBadgeIntent(job.work_arrangements) })}>
            {job.work_arrangements}
          </span>
          <button
            onClick={handleToggleFavorite}
            className="p-1 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 cursor-pointer"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star
              className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-pink-600 text-pink-600' : 'text-slate-300 hover:text-pink-400'}`}
            />
          </button>
        </div>
      </div>

      <p className={cardVariants.description()}>
        {job.job_summary}
      </p>

      <div className={cardVariants.footer()}>
        <div className={cardVariants.footerItem()}>
          <MapPin className={cardVariants.icon()} />
          {job.location}
        </div>
        {job.salary_label && (
          <div className={cardVariants.footerItemHighlight()}>
            <DollarSign className={cardVariants.iconHighlight()} />
            {job.salary_label}
          </div>
        )}
        <div className={cardVariants.footerItem()}>
          <Calendar className={cardVariants.icon()} />
          Posted {job.listing_date}
        </div>
      </div>
    </div>
  );
}
