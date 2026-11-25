import { bululitos } from "@/components/atoms/bululitos";
import { Pill } from "@/components/atoms/Pill";
import { colors, mascotOn } from "@/data/colors";
import { type Article, formatDate } from "@/lib/api";

export function ArticleHeader({ article }: { article: Article }) {
    const Mascot = bululitos[article.mascot];
    const meta = [
        "Por Alguien del bululú",
        formatDate(article.published_at),
        article.comment_count > 0 &&
            `${article.comment_count} ${article.comment_count === 1 ? "comentario" : "comentarios"}`,
    ].filter(Boolean);

    return (
        <header
            className="relative overflow-hidden border-b-3 border-ink"
            style={{ background: colors[article.cover_color] }}
        >
            <div className="wrap relative z-10 flex flex-col items-start gap-5 pt-10 pb-12 md:pt-14 md:pb-16">
                <div className="flex flex-wrap gap-2">
                    <Pill>{article.category}</Pill>
                    {article.status === "draft" && <Pill tone="ink">Borrador</Pill>}
                </div>
                <h1 className="max-w-[820px] font-display text-[clamp(40px,5.6vw,72px)] leading-[1.02] font-normal">
                    {article.title}
                </h1>
                <p className="max-w-[640px] text-[19px] font-medium md:text-[21px]">{article.excerpt}</p>
                {meta.length > 0 && <p className="text-[15px] font-bold">{meta.join(" · ")}</p>}
            </div>
            <div className="group absolute right-[6%] bottom-0 z-20 hidden h-[150px] w-[160px] md:block">
                <Mascot
                    color={mascotOn[article.cover_color]}
                    width={150}
                    height={210}
                    className="absolute -bottom-16 left-0 -rotate-6 transition duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-10 group-hover:rotate-6 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:-rotate-6"
                />
            </div>
        </header>
    );
}
