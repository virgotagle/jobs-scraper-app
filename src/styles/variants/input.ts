import { cva } from "class-variance-authority";

export const inputVariants = {
    container: cva("bg-white rounded-xl p-6 mb-6 shadow-sm"),
    wrapper: cva("relative"),
    icon: cva("absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none"),
    field: cva(
        "flex w-full border-2 border-slate-200 bg-transparent px-3 py-3.5 text-base shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus:outline-none focus:border-pink-600 focus:ring-4 focus:ring-pink-100 disabled:cursor-not-allowed disabled:opacity-50 rounded-xl pl-12 pr-4"
    ),
};
