interface PageSizeSelectorProps {
    itemsPerPage: number;
    onItemsPerPageChange: (value: number) => void;
}

export function PageSizeSelector({ itemsPerPage, onItemsPerPageChange }: PageSizeSelectorProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Show:</span>
            <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="px-2 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white cursor-pointer hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={18}>18</option>
                <option value={24}>24</option>
                <option value={1000}>All</option>
            </select>
        </div>
    );
}
