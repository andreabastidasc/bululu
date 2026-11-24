import { BululitoFrame, Eye, INK, type BululitoProps } from "./parts";

/** Tuqui: alto y sonriente. Opina de todo. */
export function Tuqui({ color = "#FF5A4E", ...frame }: BululitoProps) {
    return (
        <BululitoFrame {...frame}>
            <path fill={color} stroke={INK} strokeWidth={3} d="M12 142C6 84 14 14 50 12C86 14 94 84 88 142Z" />
            <Eye cx={37} cy={52} r={10} />
            <Eye cx={63} cy={52} r={10} />
            <path d="M42 74q8 7 16 0" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
        </BululitoFrame>
    );
}
