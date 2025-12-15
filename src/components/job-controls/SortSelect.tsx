interface SortSelectProps {
    value?: string;
    onSortChange: (value: string) => void;
}

export function SortSelect({ value = 'recent', onSortChange }: SortSelectProps) {
    return (
        <select
            value={value}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white cursor-pointer hover:border-slate-300 transition-colors"
        >
            <option value="recent">Sort by: Most Recent</option>
            <option value="relevance">Sort by: Relevance</option>
            <option value="company">Sort by: Company Name</option>
        </select>
    );
}
