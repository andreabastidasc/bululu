import type { ReactNode } from "react";

type SectionTitleProps = {
    id?: string;
    className?: string;
    children: ReactNode;
};

export function SectionTitle({ id, className = "", children }: SectionTitleProps) {
    return (
        <h2 id={id} className={`font-display text-[clamp(36px,4.4vw,52px)] leading-[1.04] font-normal ${className}`}>
            {children}
        </h2>
    );
}
