import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
    ink: "bg-ink text-paper",
    coral: "bg-coral text-ink",
    paper: "bg-paper text-ink shadow-hard-sm",
    lemon: "bg-lemon text-ink",
} as const;

const sizes = {
    md: "min-h-14 px-7.5 text-lg",
    sm: "min-h-11 px-4 text-base shadow-hard-sm md:px-5.5",
} as const;

type ButtonLinkProps = ComponentProps<typeof Link> & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
};

export function ButtonLink({ variant = "ink", size = "md", className = "", ...props }: ButtonLinkProps) {
    return (
        <Link
            className={[
                "inline-flex items-center justify-center rounded-full border-3 border-ink font-bold leading-none no-underline",
                "transition duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#1b1530]",
                "active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
                "motion-reduce:transition-none motion-reduce:hover:translate-0 motion-reduce:active:translate-0",
                variants[variant],
                sizes[size],
                className,
            ].join(" ")}
            {...props}
        />
    );
}
