import { SectionTitle } from "@/components/atoms/SectionTitle";
import { Magazine } from "@/components/organisms/Magazine";
import type { ArticleSummary } from "@/lib/api";

export function MagazineSection({ articles }: { articles: ArticleSummary[] }) {
    return (
        <section id="revista" className="wrap flex flex-col gap-7 py-12 md:py-16" aria-labelledby="revista-title">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
                <SectionTitle id="revista-title">La revista</SectionTitle>
                <span className="text-sm text-ink-soft">Historias, estudios y cosas que nos copan</span>
            </div>
            {articles.length > 0 ? (
                <Magazine articles={articles} />
            ) : (
                <p className="rounded-3xl border-3 border-dashed border-ink/30 p-8 text-center text-ink-soft">
                    Estamos escribiendo los primeros artículos. Muy pronto, por acá.
                </p>
            )}
        </section>
    );
}
