import { bululitos } from "@/components/atoms/bululitos";
import { Pill } from "@/components/atoms/Pill";
import type { ArticleSummary } from "@/data/articles";

type MagazinePageProps = {
    article: ArticleSummary;
    number: number;
    total: number;
};

export function MagazinePage({ article, number, total }: MagazinePageProps) {
    const Mascot = bululitos[article.mascot.name];

    return (
        <article
            aria-roledescription="página"
            aria-label={`${number} de ${total}`}
            className="flex flex-col overflow-hidden rounded-[10px_24px_24px_10px] border-3 border-l-8 border-ink bg-paper shadow-hard max-md:min-h-[460px] max-md:flex-[0_0_84%] max-md:snap-start"
        >
            <div className="relative h-[220px] overflow-hidden border-b-3 border-ink" style={{ background: article.color }}>
                <div className="relative z-10 flex flex-wrap gap-2 px-4.5 py-4">
                    <Pill size="sm">{article.kicker}</Pill>
                    {article.comingSoon && (
                        <Pill size="sm" tone="ink">
                            Próximamente
                        </Pill>
                    )}
                </div>
                <Mascot
                    color={article.mascot.color}
                    width={120}
                    height={168}
                    className="absolute right-4.5 -bottom-10 -rotate-8"
                />
            </div>
            <div className="flex flex-1 flex-col gap-2.5 px-5 pt-5 pb-4">
                <h3 className="font-display text-[28px] leading-[1.08] font-normal">{article.title}</h3>
                <p className="text-base text-ink-soft">{article.blurb}</p>
            </div>
            <div className="mx-5 flex justify-between gap-3 border-t-2 border-dashed border-ink/25 pt-3 pb-4 text-[13px] font-bold text-ink-soft">
                <span>Revista Bululú</span>
                <span>p. {String(number).padStart(2, "0")}</span>
            </div>
        </article>
    );
}
