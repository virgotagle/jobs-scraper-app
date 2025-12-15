import { MapPin, Briefcase, Grid, Calendar, Star } from 'lucide-react';
import { JobWithDetailsResponse } from '@/types/job';

interface JobHeaderCardProps {
    job: JobWithDetailsResponse;
    isFavorited: boolean;
    onToggleFavorite: () => void;
    isToggling: boolean;
    postedDate: string;
}

export default function JobHeaderCard({
    job,
    isFavorited,
    onToggleFavorite,
    isToggling,
    postedDate
}: JobHeaderCardProps) {
    // Get company initials
    const companyInitials = job.company_name
        ? job.company_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
        : 'JK';

    return (
        <div className="bg-white rounded-xl p-8 mb-6 shadow-sm">
            <div className="mb-6">
                <div className="flex justify-between items-start gap-4">
                    <h1 className="text-3xl font-bold text-slate-800 mb-4 leading-tight flex-1">
                        {job.title}
                    </h1>
                    <button
                        onClick={onToggleFavorite}
                        disabled={isToggling}
                        className={`p-2 rounded-lg border transition-all ${isFavorited
                            ? 'bg-pink-50 border-pink-200 text-pink-600'
                            : 'bg-white border-slate-200 text-slate-400 hover:text-pink-600 hover:border-pink-200'
                            }`}
                        title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Star
                            className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`}
                        />
                    </button>
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                        {companyInitials}
                    </div>
                    <div>
                        <div className="text-lg font-semibold text-slate-800 mb-1">
                            {job.company_name}
                        </div>
                        <div className="text-sm text-slate-500 flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {job.location || 'Location not specified'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
                <div className="flex flex-col gap-2">
                    <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                        Work Type
                    </div>
                    <div className="text-sm text-slate-800 font-medium flex items-center gap-2">
                        <Briefcase className="w-[18px] h-[18px] text-pink-600" />
                        {job.work_type || 'N/A'}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                        Work Arrangement
                    </div>
                    <div className="text-sm text-slate-800 font-medium flex items-center gap-2">
                        <span className="inline-flex px-3.5 py-1.5 bg-pink-100 text-pink-600 rounded-md text-xs font-semibold">
                            {job.work_arrangements || 'N/A'}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                        Job Classification
                    </div>
                    <div className="text-sm text-slate-800 font-medium flex items-center gap-2">
                        <Grid className="w-[18px] h-[18px] text-pink-600" />
                        {job.job_classification || 'N/A'}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                        Posted Date
                    </div>
                    <div className="text-sm text-slate-800 font-medium flex items-center gap-2">
                        <Calendar className="w-[18px] h-[18px] text-pink-600" />
                        {postedDate}
                    </div>
                </div>
            </div>
        </div>
    );
}
