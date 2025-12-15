import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white",
    {
        variants: {
            intent: {
                primary: "bg-pink-600 text-white border border-pink-600 hover:bg-pink-700",
                outline: "border border-slate-200 bg-white text-slate-700 hover:border-pink-600 hover:text-pink-600",
                ghost: "hover:bg-slate-100 hover:text-slate-900",
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-9 px-3 rounded-md",
                lg: "h-11 px-8 rounded-md",
                icon: "h-10 w-10",
            },
            active: {
                true: "",
                false: "",
            }
        },
        defaultVariants: {
            intent: "outline",
            size: "default",
            active: false,
        },
        compoundVariants: [
            {
                intent: "outline",
                active: true,
                class: "bg-pink-500 text-white border-pink-900 hover:bg-pink-800 hover:text-white hover:border-pink-800",
            }
        ]
    }
);
