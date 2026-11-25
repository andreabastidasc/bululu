import Link from "next/link";
import { bululitos } from "@/components/atoms/bululitos";
import { Pill } from "@/components/atoms/Pill";
import { colors, mascotOn } from "@/data/colors";
import type { ArticleSummary } from "@/lib/api";

type MagazinePageProps = {
    article: ArticleSummary;
    number: number;
    total: number;
};

export function MagazinePage({ article, number, total }: MagazinePageProps) {
    const Mascot = bululitos[article.mascot];

    return (
        <article
            aria-roledescription="página"
            aria-label={`${number} de ${total}`}
            className="overflow-hidden rounded-[10px_24px_24px_10px] border-3 border-l-8 border-ink bg-paper shadow-hard max-md:min-h-[460px] max-md:flex-[0_0_84%] max-md:snap-start"
        >
            <Link href={`/revista/${article.slug}`} className="group flex h-full flex-col">
                <div
                    className="relative h-[220px] overflow-hidden border-b-3 border-ink"
                    style={{ background: colors[article.cover_color] }}
                >
                    {article.cover_image ? (
                        <img
                            src={article.cover_image}
                            alt=""
                            className="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-105 motion-reduce:transition-none"
                        />
                    ) : (
                        <Mascot
                            color={mascotOn[article.cover_color]}
                            width={120}
                            height={168}
                            className="absolute right-4.5 -bottom-10 -rotate-8 transition duration-300 group-hover:-rotate-2 motion-reduce:transition-none"
                        />
                    )}
                    <div className="relative z-10 flex flex-wrap gap-2 px-4.5 py-4">
                        <Pill size="sm">{article.category}</Pill>
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 px-5 pt-5 pb-4">
                    <h3 className="font-display text-[28px] leading-[1.08] font-normal group-hover:underline">
                        {article.title}
                    </h3>
                    <p className="text-base text-ink-soft">{article.excerpt}</p>
                </div>
                <div className="mx-5 flex justify-between gap-3 border-t-2 border-dashed border-ink/25 pt-3 pb-4 text-[13px] font-bold text-ink-soft">
                    <span>Revista Bululú</span>
                    <span>p. {String(number).padStart(2, "0")}</span>
                </div>
            </Link>
        </article>
    );
}
