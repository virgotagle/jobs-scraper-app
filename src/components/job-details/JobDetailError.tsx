import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

interface JobDetailErrorProps {
    message?: string;
}

export default function JobDetailError({ message }: JobDetailErrorProps) {
    return (
        <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-slate-800 mb-2">Error Loading Job</h2>
                <p className="text-slate-500 mb-6">{message || 'Job not found'}</p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors"
                >
                    Back to Jobs
                </Link>
            </div>
        </div>
    );
}
