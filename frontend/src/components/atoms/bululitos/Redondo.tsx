import { BululitoFrame, Eye, INK, type BululitoProps } from "./parts";

/** Redondo: con la boca abierta, siempre sorprendido. */
export function Redondo({ color = "#FFC63D", ...frame }: BululitoProps) {
    return (
        <BululitoFrame {...frame}>
            <path fill={color} stroke={INK} strokeWidth={3} d="M4 142C0 96 14 52 50 50C86 52 100 96 96 142Z" />
            <Eye cx={36} cy={84} r={9} look={-2} />
            <Eye cx={64} cy={84} r={9} look={-2} />
            <ellipse cx={50} cy={106} rx={7} ry={5} fill={INK} />
        </BululitoFrame>
    );
}
