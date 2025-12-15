import { JobCount } from './job-controls/JobCount';
import { ViewModeToggle } from './job-controls/ViewModeToggle';
import { PageSizeSelector } from './job-controls/PageSizeSelector';
import { SortSelect } from './job-controls/SortSelect';

interface JobControlsProps {
    start?: number;
    end?: number;
    total?: number;
    itemsPerPage: number;
    onItemsPerPageChange: (value: number) => void;
    viewMode: 'list' | 'grid';
    onViewModeChange: (mode: 'list' | 'grid') => void;
    sort: string;
    onSortChange: (value: string) => void;
}

export function JobControls({
    start = 1,
    end = 20,
    total = 342,
    itemsPerPage,
    onItemsPerPageChange,
    viewMode,
    onViewModeChange,
    sort,
    onSortChange
}: JobControlsProps) {
    return (
        <div className="grid grid-cols-2 gap-4 mb-6 sm:flex sm:justify-between sm:items-center sm:gap-0">
            <div className="order-1 flex items-center sm:order-none">
                <JobCount start={start} end={end} total={total} />
            </div>

            <div className="contents sm:flex sm:gap-4 sm:items-center">
                <div className="order-3 flex items-center sm:order-none">
                    <ViewModeToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
                </div>

                <div className="w-px h-8 bg-slate-200 mx-2 hidden sm:block"></div>

                <div className="order-4 flex items-center justify-end sm:order-none">
                    <PageSizeSelector itemsPerPage={itemsPerPage} onItemsPerPageChange={onItemsPerPageChange} />
                </div>

                <div className="order-2 flex items-center justify-end sm:order-none">
                    <SortSelect value={sort} onSortChange={onSortChange} />
                </div>
            </div>
        </div>
    );
}

