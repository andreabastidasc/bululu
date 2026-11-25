import type { SVGProps } from "react";

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 18 18" aria-hidden="true" {...props}>
            <path
                d="M4 9h10M10 5l4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
