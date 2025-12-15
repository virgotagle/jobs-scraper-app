interface JobCountProps {
    start: number;
    end: number;
    total: number;
}

export function JobCount({ start, end, total }: JobCountProps) {
    return (
        <div className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{start}-{end}</span> of{' '}
            <span className="font-semibold text-slate-700">{total}</span> jobs
        </div>
    );
}
