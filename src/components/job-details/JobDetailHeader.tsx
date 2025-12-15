import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function JobDetailHeader() {
    return (
        <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-50 shadow-sm">
            <div className="max-w-[1200px] mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold text-pink-600">
                    🔍 Jobs Dashboard
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm text-slate-500 hover:border-pink-600 hover:text-pink-600 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Search
                    </Link>
                </div>
            </div>
        </header>
    );
}
