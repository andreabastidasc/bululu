import { bululitos, type BululitoName } from "@/components/atoms/bululitos";

export type CrowdMember = {
    name: BululitoName;
    color?: string;
    x: number;
    y: number;
    w: number;
    h: number;
};

type CrowdProps = {
    members: CrowdMember[];
    className?: string;
    label?: string;
    viewBox?: string;
};

export function Crowd({ members, className, label, viewBox = "0 0 1000 330" }: CrowdProps) {
    const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
    return (
        <svg viewBox={viewBox} preserveAspectRatio="xMidYMax slice" className={className} {...a11y}>
            {members.map((m, i) => {
                const Bululito = bululitos[m.name];
                return <Bululito key={i} color={m.color} x={m.x} y={m.y} width={m.w} height={m.h} />;
            })}
        </svg>
    );
}
