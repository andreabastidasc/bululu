"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { MagazinePage } from "@/components/molecules/MagazinePage";
import { MagazinePager } from "@/components/molecules/MagazinePager";
import type { ArticleSummary } from "@/data/articles";

export function Magazine({ articles }: { articles: ArticleSummary[] }) {
    const track = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const el = track.current;
        if (!el) return;
        const pages = Array.from(el.children) as HTMLElement[];
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setPage(pages.indexOf(entry.target as HTMLElement));
                }
            },
            { root: el, threshold: 0.6 },
        );
        pages.forEach((p) => observer.observe(p));
        return () => observer.disconnect();
    }, [articles.length]);

    const goTo = useCallback(
        (i: number) => {
            const el = track.current;
            if (!el) return;
            const first = el.children[0] as HTMLElement | undefined;
            const target = el.children[Math.max(0, Math.min(articles.length - 1, i))] as HTMLElement | undefined;
            if (!first || !target) return;
            const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            el.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior: smooth ? "smooth" : "auto" });
        },
        [articles.length],
    );

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(page + 1);
        }
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(page - 1);
        }
    };

    return (
        <div>
            <div
                ref={track}
                tabIndex={0}
                onKeyDown={onKeyDown}
                aria-roledescription="carrusel"
                aria-label="Artículos de la revista"
                className={[
                    "grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-6 focus-visible:outline-offset-8",
                    "max-md:-mx-6 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-4 max-md:overflow-x-auto",
                    "max-md:scroll-px-6 max-md:overscroll-x-contain max-md:px-6 max-md:pt-1 max-md:pb-3.5",
                    "max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden",
                ].join(" ")}
            >
                {articles.map((article, i) => (
                    <MagazinePage key={article.slug} article={article} number={i + 1} total={articles.length} />
                ))}
            </div>

            <MagazinePager
                page={page}
                total={articles.length}
                onPrev={() => goTo(page - 1)}
                onNext={() => goTo(page + 1)}
            />
        </div>
    );
}
