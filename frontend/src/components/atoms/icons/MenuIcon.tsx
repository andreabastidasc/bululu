import type { SVGProps } from "react";

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 22 22" aria-hidden="true" {...props}>
            <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}
