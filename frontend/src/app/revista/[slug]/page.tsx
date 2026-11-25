import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/organisms/ArticleBody";
import { ArticleHeader } from "@/components/organisms/ArticleHeader";
import { CommentsSection } from "@/components/organisms/CommentsSection";
import { SiteLayout } from "@/components/templates/SiteLayout";
import { getArticle, getComments } from "@/lib/api";

type ArticlePageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) return {};
    return {
        title: article.title,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: "article",
            images: article.cover_image ? [article.cover_image] : undefined,
        },
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const [article, comments] = await Promise.all([getArticle(slug), getComments(slug)]);
    if (!article) notFound();

    return (
        <SiteLayout>
            <article>
                <ArticleHeader article={article} />
                <ArticleBody article={article} />
            </article>
            <CommentsSection comments={comments} open={article.allow_comments} />
        </SiteLayout>
    );
}
