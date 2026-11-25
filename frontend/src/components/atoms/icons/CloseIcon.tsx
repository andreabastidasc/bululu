import type { SVGProps } from "react";

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 22 22" aria-hidden="true" {...props}>
            <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}
