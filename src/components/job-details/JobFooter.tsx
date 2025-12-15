interface JobFooterProps {
    postedDate: string;
    jobId: string | number;
}

export default function JobFooter({ postedDate, jobId }: JobFooterProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm text-center text-[13px] text-slate-500">
            Posted on {postedDate}
            <br />
            Job ID: #{jobId}
        </div>
    );
}
