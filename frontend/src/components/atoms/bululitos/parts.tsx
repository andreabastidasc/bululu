// Piezas que comparten todos los bululitos: el marco SVG y los ojos.

import type { ReactNode } from "react";

export const INK = "#1B1530";

export type BululitoProps = {
    color?: string;
    x?: number;
    y?: number;
    width?: number | string;
    height?: number | string;
    className?: string;
    label?: string;
};

type FrameProps = Omit<BululitoProps, "color"> & { children: ReactNode };

export function BululitoFrame({ x, y, width = 100, height = 140, className, label, children }: FrameProps) {
    const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
    return (
        <svg
            viewBox="0 0 100 140"
            x={x}
            y={y}
            width={width}
            height={height}
            className={className}
            overflow="visible"
            {...a11y}
        >
            {children}
        </svg>
    );
}

type EyeProps = {
    cx: number;
    cy: number;
    r: number;
    look?: number;
};

export function Eye({ cx, cy, r, look = 2 }: EyeProps) {
    return (
        <>
            <circle cx={cx} cy={cy} r={r} fill="#fff" stroke={INK} strokeWidth={2.5} />
            <circle cx={cx + look} cy={cy + 2} r={r / 2} fill={INK} />
        </>
    );
}
