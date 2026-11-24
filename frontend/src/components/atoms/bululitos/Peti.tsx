import { BululitoFrame, INK, type BululitoProps } from "./parts";

/** Peti: bajito, ancho y con los ojos cerrados de felicidad. Feliz con poco. */
export function Peti({ color = "#FF8FCB", ...frame }: BululitoProps) {
    return (
        <BululitoFrame {...frame}>
            <path fill={color} stroke={INK} strokeWidth={3} d="M0 142C0 104 22 78 50 78C78 78 100 104 100 142Z" />
            <path
                d="M30 106q6 -7 12 0M58 106q6 -7 12 0"
                fill="none"
                stroke={INK}
                strokeWidth={4}
                strokeLinecap="round"
            />
            <path d="M42 122q8 6 16 0" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
        </BululitoFrame>
    );
}
