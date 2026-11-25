import type { SVGProps } from "react";

export function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M12.5 4l-6 6 6 6" />
        </svg>
    );
}
