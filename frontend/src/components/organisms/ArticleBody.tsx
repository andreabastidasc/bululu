import { RichText } from "@/components/atoms/RichText";
import { ArticleFigure } from "@/components/molecules/ArticleFigure";
import type { Article } from "@/lib/api";

export function ArticleBody({ article }: { article: Article }) {
    return (
        <div className="wrap flex flex-col gap-10 py-12 md:py-16">
            {article.cover_image && (
                <div className="mx-auto w-full max-w-[960px]">
                    <ArticleFigure src={article.cover_image} alt="" />
                </div>
            )}
            <div className="mx-auto flex w-full max-w-[680px] flex-col gap-8">
                {article.blocks.map((block, i) =>
                    block.kind === "image" && block.image ? (
                        <ArticleFigure key={i} src={block.image} alt={block.alt} caption={block.caption} />
                    ) : (
                        <RichText key={i} html={block.text} />
                    ),
                )}
            </div>
        </div>
    );
}
