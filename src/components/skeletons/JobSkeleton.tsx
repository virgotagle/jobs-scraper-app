
import { cardVariants } from '@/styles';

export function JobSkeleton() {
    return (
        <div className={`${cardVariants.container()} animate-pulse`}>
            {/* Header */}
            <div className={cardVariants.header()}>
                <div className="w-full">
                    {/* Title Placeholder */}
                    <div className="h-7 bg-slate-200 rounded-md w-3/4 mb-3"></div>

                    {/* Company Name Placeholder */}
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-slate-200"></div>
                        <div className="h-5 bg-slate-200 rounded w-1/3"></div>
                    </div>
                </div>

                {/* Badge Placeholder */}
                <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
            </div>

            {/* Description Placeholders */}
            <div className="mt-4 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>

            {/* Footer */}
            <div className={`${cardVariants.footer()} mt-6`}>
                {/* Location */}
                <div className={cardVariants.footerItem()}>
                    <div className="w-4 h-4 rounded-full bg-slate-200 mr-1.5"></div>
                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                </div>

                {/* Salary */}
                <div className="flex items-center px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100">
                    <div className="w-3.5 h-3.5 rounded-full bg-slate-200 mr-1.5"></div>
                    <div className="h-4 bg-slate-200 rounded w-20"></div>
                </div>

                {/* Date */}
                <div className={cardVariants.footerItem()}>
                    <div className="w-4 h-4 rounded-full bg-slate-200 mr-1.5"></div>
                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                </div>
            </div>
        </div>
    );
}
