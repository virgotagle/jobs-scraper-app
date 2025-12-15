import { cva } from "class-variance-authority";

export const paginationVariants = {
    container: cva("flex justify-center items-center gap-2 mt-8 p-4 sm:p-6 bg-white rounded-xl"),
    ellipsis: cva("px-4 text-sm text-slate-700"),
    icon: cva("w-4 h-4"),
};
