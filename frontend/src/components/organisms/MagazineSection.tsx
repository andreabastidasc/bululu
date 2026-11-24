import { SectionTitle } from "@/components/atoms/SectionTitle";
import { Magazine } from "@/components/organisms/Magazine";
import type { ArticleSummary } from "@/data/articles";

export function MagazineSection({ articles }: { articles: ArticleSummary[] }) {
    return (
        <section id="revista" className="wrap flex flex-col gap-7 py-12 md:py-16" aria-labelledby="revista-title">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
                <SectionTitle id="revista-title">La revista</SectionTitle>
                <span className="text-sm text-ink-soft">Historias, estudios y cosas que nos copan</span>
            </div>
            <Magazine articles={articles} />
        </section>
    );
}
