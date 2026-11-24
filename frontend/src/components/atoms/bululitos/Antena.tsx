import { BululitoFrame, Eye, INK, type BululitoProps } from "./parts";

/** Antena: un solo ojo y una antena. Capta todas las señales. */
export function Antena({ color = "#22C3A0", ...frame }: BululitoProps) {
    return (
        <BululitoFrame {...frame}>
            <path d="M50 32V10" stroke={INK} strokeWidth={4} strokeLinecap="round" />
            <circle cx={50} cy={9} r={7} fill={color} stroke={INK} strokeWidth={3} />
            <path fill={color} stroke={INK} strokeWidth={3} d="M14 142C8 90 18 34 50 32C82 34 92 90 86 142Z" />
            <Eye cx={50} cy={70} r={13} />
            <path d="M40 98h20" stroke={INK} strokeWidth={4} strokeLinecap="round" />
        </BululitoFrame>
    );
}
