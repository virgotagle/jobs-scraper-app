import { cva } from "class-variance-authority";

export const sidebarVariants = {
    container: cva("bg-white rounded-xl p-6 h-fit sticky top-[100px] shadow-sm lg:block hidden"),
    header: cva("flex justify-between items-center mb-6"),
    title: cva("text-lg font-semibold text-slate-800"),
    clearButton: cva("text-pink-600 text-sm hover:underline cursor-pointer"),
    section: cva("space-y-6"),
    filterGroup: cva(""),
    label: cva("block text-sm font-semibold text-slate-700 mb-2"),
    select: cva(
        "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white cursor-pointer hover:border-slate-300 focus:outline-none focus:border-pink-600 focus:ring-4 focus:ring-pink-100 transition-all"
    ),
    activeFilters: cva("flex flex-wrap gap-2 pt-3"),
    chip: cva("inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-100 text-pink-600 rounded-md text-xs font-medium"),
    chipClose: cva("cursor-pointer w-3.5 h-3.5 flex items-center justify-center hover:bg-pink-200 rounded-full"),
};
