import { cva } from "class-variance-authority";

export const cardVariants = {
    container: cva(
        "bg-white rounded-xl p-6 border border-slate-200 hover:border-pink-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col h-full"
    ),
    header: cva("flex justify-between items-start mb-4"),
    title: cva("text-lg font-semibold text-slate-800 mb-2 leading-snug"),
    metaWrapper: cva("flex items-center gap-1.5 text-sm text-slate-500"),
    icon: cva("w-4 h-4 text-slate-400"),
    iconHighlight: cva("w-4 h-4"),

    badge: cva("px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap", {
        variants: {
            intent: {
                Remote: "bg-pink-50 text-pink-600",
                Hybrid: "bg-pink-100 text-pink-700",
                OnSite: "bg-pink-100 text-pink-800",
                Default: "bg-pink-100 text-pink-800",
            }
        },
        defaultVariants: {
            intent: "Default"
        }
    }),

    description: cva("text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2"),
    footer: cva("flex flex-wrap gap-6 text-sm text-slate-500 mt-auto"),
    footerItem: cva("flex items-center gap-1.5"),
    footerItemHighlight: cva("flex items-center gap-1.5 text-pink-600 font-semibold"),
};
