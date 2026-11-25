import { cookies } from "next/headers";
import type { BululitoName } from "@/components/atoms/bululitos";
import type { colors } from "@/data/colors";

export type BrandColorKey = Exclude<keyof typeof colors, "ink" | "paper">;

export type Language = "es" | "en";

export type ArticleStatus = "draft" | "published";

export type ArticleSummary = {
    slug: string;
    status: ArticleStatus;
    language: Language;
    title: string;
    category: string;
    excerpt: string;
    cover_image: string | null;
    cover_color: BrandColorKey;
    mascot: BululitoName;
    published_at: string | null;
    comment_count: number;
};

export type ArticleBlock = {
    kind: "text" | "image";
    text: string;
    image: string | null;
    caption: string;
    alt: string;
};

export type Article = ArticleSummary & {
    allow_comments: boolean;
    blocks: ArticleBlock[];
};

export type CommentReply = {
    id: number;
    author_name: string;
    body: string;
    created_at: string;
};

export type Comment = CommentReply & {
    replies: CommentReply[];
};

const API_URL = (process.env.API_URL ?? "http://localhost:8000").replace(/\/$/, "");

export type Session = {
    authenticated: boolean;
    is_staff: boolean;
    username: string | null;
};

export const backOfficeUrl = `${API_URL}/admin/`;

async function get<T>(path: string): Promise<T | null> {
    const cookie = (await cookies()).toString();
    const response = await fetch(`${API_URL}${path}`, {
        cache: "no-store",
        headers: cookie ? { cookie } : undefined,
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`La API respondió ${response.status} en ${path}`);
    return response.json() as Promise<T>;
}

export function mediaPath(url: string | null): string | null {
    if (!url) return null;
    try {
        return new URL(url).pathname;
    } catch {
        return url;
    }
}

function withMedia<T extends ArticleSummary>(article: T): T {
    return { ...article, cover_image: mediaPath(article.cover_image) };
}

export async function getArticles(): Promise<ArticleSummary[]> {
    try {
        const articles = await get<ArticleSummary[]>("/api/articulos/");
        return (articles ?? []).map(withMedia);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getArticle(slug: string): Promise<Article | null> {
    const article = await get<Article>(`/api/articulos/${encodeURIComponent(slug)}/`);
    if (!article) return null;
    return {
        ...withMedia(article),
        blocks: article.blocks.map((block) => ({ ...block, image: mediaPath(block.image) })),
    };
}

export async function getComments(slug: string): Promise<Comment[]> {
    return (await get<Comment[]>(`/api/articulos/${encodeURIComponent(slug)}/comentarios/`)) ?? [];
}

export async function getSession(): Promise<Session> {
    try {
        const session = await get<Session>("/api/session/");
        if (session) return session;
    } catch (error) {
        console.error(error);
    }
    return { authenticated: false, is_staff: false, username: null };
}

export function formatDate(iso: string | null): string {
    if (!iso) return "";
    return new Intl.DateTimeFormat("es", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}
