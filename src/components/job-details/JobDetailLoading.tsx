import { Loader2 } from 'lucide-react';

export default function JobDetailLoading() {
    return (
        <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-10 h-10 text-pink-600 animate-spin mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-slate-800">Loading Job Details...</h2>
            </div>
        </div>
    );
}
