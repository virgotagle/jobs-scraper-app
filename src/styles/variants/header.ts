import { cva } from "class-variance-authority";

export const headerVariants = {
    container: cva(
        "bg-white border-b border-slate-200 px-4 md:px-8 py-4 sticky top-0 z-50 shadow-sm"
    ),
    content: cva("max-w-[1400px] mx-auto flex justify-between items-center"),
    title: cva("text-2xl font-bold text-pink-600"),
    nav: cva("hidden md:flex gap-8 text-sm text-slate-500"),
    statItem: cva("flex items-center gap-2"),
    statLabel: cva(""),
    statValue: cva("font-semibold text-slate-700"),
};
