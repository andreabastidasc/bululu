import type { ReactNode } from "react";

const tones = {
    paper: "bg-paper text-ink",
    ink: "bg-ink text-paper",
} as const;

type PillProps = {
    children: ReactNode;
    tone?: keyof typeof tones;
    size?: "sm" | "md";
};

export function Pill({ children, tone = "paper", size = "md" }: PillProps) {
    const sizing = size === "md" ? "px-4 py-2 text-[15px]" : "px-3 py-1.5 text-sm";
    return (
        <span className={`inline-block rounded-full border-3 border-ink font-bold leading-tight ${tones[tone]} ${sizing}`}>
            {children}
        </span>
    );
}
