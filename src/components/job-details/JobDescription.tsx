import { FileText } from 'lucide-react';

interface JobDescriptionProps {
    description: string;
}

export default function JobDescription({ description }: JobDescriptionProps) {
    return (
        <div className="bg-white rounded-xl p-8 mb-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-pink-600" />
                Job Description
            </h2>
            <div
                className="job-description"
                dangerouslySetInnerHTML={{ __html: description || 'No description available.' }}
            />
        </div>
    );
}
