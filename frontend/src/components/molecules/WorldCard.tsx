import Link from "next/link";

export type WorldCardProps = {
    title: string;
    text: string;
    color: string;
    href?: string;
    cta?: string;
};

export function WorldCard({ title, text, color, href, cta }: WorldCardProps) {
    return (
        <div
            className="flex flex-col items-start gap-2.5 rounded-3xl border-3 border-ink p-6 text-ink shadow-hard"
            style={{ background: color }}
        >
            <h3 className="font-display text-[34px] leading-none font-normal">{title}</h3>
            <p className="text-base font-medium">{text}</p>
            {href && cta ? (
                <Link
                    href={href}
                    className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-2 font-bold underline underline-offset-4"
                >
                    {cta}
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                        <path
                            d="M4 9h10M10 5l4 4-4 4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            ) : (
                <span className="mt-auto inline-block rounded-2xl bg-ink px-3 py-1.5 font-bold text-paper">
                    En el taller
                </span>
            )}
        </div>
    );
}
