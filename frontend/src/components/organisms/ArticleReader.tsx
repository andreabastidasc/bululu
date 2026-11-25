"use client";

import { type KeyboardEvent, type TouchEvent, useCallback, useEffect, useRef, useState } from "react";
import { bululitos } from "@/components/atoms/bululitos";
import { Pill } from "@/components/atoms/Pill";
import { RichText } from "@/components/atoms/RichText";
import { ArticleFigure } from "@/components/molecules/ArticleFigure";
import { MagazinePager } from "@/components/molecules/MagazinePager";
import { colors, mascotOn } from "@/data/colors";
import type { Article } from "@/lib/api";
import { formatDate } from "@/lib/format";

const GUTTER = 24;
const SWIPE = 40;

export function ArticleReader({ article }: { article: Article }) {
    const viewport = useRef<HTMLDivElement>(null);
    const flow = useRef<HTMLDivElement>(null);
    const touch = useRef<{ x: number; y: number } | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(1);
    const Mascot = bululitos[article.mascot];

    const measure = useCallback(() => {
        const box = viewport.current;
        const content = flow.current;
        if (!box || !content) return;
        const width = box.clientWidth;
        const height = box.clientHeight;
        setSize((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
        if (width > 0) {
            const pages = 1 + Math.max(1, Math.ceil((content.scrollWidth - 2) / width));
            setTotal(pages);
            setPage((current) => Math.min(current, pages - 1));
        }
    }, []);

    useEffect(() => {
        const box = viewport.current;
        if (!box) return;
        const observer = new ResizeObserver(measure);
        observer.observe(box);
        document.fonts?.ready.then(measure);
        return () => observer.disconnect();
    }, [measure]);

    useEffect(() => {
        measure();
    }, [size, measure]);

    const goTo = (target: number) => setPage(Math.max(0, Math.min(total - 1, target)));

    const onTouchStart = (event: TouchEvent) => {
        const point = event.touches[0];
        touch.current = { x: point.clientX, y: point.clientY };
    };

    const onTouchEnd = (event: TouchEvent) => {
        const start = touch.current;
        touch.current = null;
        if (!start) return;
        const point = event.changedTouches[0];
        const dx = point.clientX - start.x;
        const dy = point.clientY - start.y;
        if (Math.abs(dx) < SWIPE || Math.abs(dx) < Math.abs(dy)) return;
        goTo(page + (dx < 0 ? 1 : -1));
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(page + 1);
        }
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(page - 1);
        }
    };

    const meta = ["Por Alguien del bululú", formatDate(article.published_at)].filter(Boolean).join(" · ");

    return (
        <section className="flex h-[calc(100svh-67px)] min-h-[520px] flex-col md:hidden" aria-label="Artículo">
            <div
                ref={viewport}
                tabIndex={0}
                role="region"
                aria-roledescription="revista"
                aria-label={`Página ${page + 1} de ${total}`}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onKeyDown={onKeyDown}
                className="relative flex-1 touch-pan-y overflow-hidden outline-none"
            >
                <div
                    className="flex h-full transition-transform duration-300 ease-out motion-reduce:transition-none"
                    style={{ transform: `translateX(${-page * size.width}px)` }}
                >
                    <header
                        className="relative flex h-full shrink-0 flex-col items-start justify-end gap-4 overflow-hidden px-6 pt-8 pb-28"
                        style={{ width: size.width || "100%", background: colors[article.cover_color] }}
                    >
                        <div className="flex flex-wrap gap-2">
                            <Pill size="sm">{article.category}</Pill>
                            {article.status === "draft" && (
                                <Pill size="sm" tone="ink">
                                    Borrador
                                </Pill>
                            )}
                        </div>
                        <h1 className="font-display text-[44px] leading-[1.02] font-normal">{article.title}</h1>
                        <p className="text-lg font-medium">{article.excerpt}</p>
                        <p className="text-sm font-bold">{meta}</p>
                        <p className="relative z-10 mt-2 rounded-full border-3 border-ink bg-paper px-4 py-2 text-sm font-bold shadow-hard-sm">
                            Desliza para leer →
                        </p>
                        <Mascot
                            color={mascotOn[article.cover_color]}
                            width={120}
                            height={168}
                            className="absolute right-5 -bottom-12 -rotate-6"
                        />
                    </header>

                    <div className="shrink-0" style={{ width: size.width || "100%" }}>
                        <div
                            ref={flow}
                            onLoadCapture={measure}
                            className="reader-flow h-full"
                            style={{
                                width: size.width || "100%",
                                padding: `${GUTTER}px`,
                                columnWidth: size.width ? `${size.width - GUTTER * 2}px` : undefined,
                                columnGap: `${GUTTER * 2}px`,
                                columnFill: "auto",
                            }}
                        >
                            {article.cover_image && <ArticleFigure src={article.cover_image} alt="" />}
                            {article.blocks.map((block, i) =>
                                block.kind === "image" && block.image ? (
                                    <ArticleFigure key={i} src={block.image} alt={block.alt} caption={block.caption} />
                                ) : (
                                    <RichText key={i} html={block.text} />
                                ),
                            )}
                            <p className="reader-end font-display text-[28px] leading-none">Fin ✦</p>
                            <a href="#comentarios-title" className="mt-3 inline-block font-bold underline">
                                Ir a los comentarios ↓
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t-3 border-ink bg-paper pt-1 pb-3">
                <div className="h-1.5 bg-ink/10" aria-hidden="true">
                    <div
                        className="h-full bg-coral transition-[width] duration-300 motion-reduce:transition-none"
                        style={{ width: `${((page + 1) / total) * 100}%` }}
                    />
                </div>
                <MagazinePager page={page} total={total} onPrev={() => goTo(page - 1)} onNext={() => goTo(page + 1)} />
            </div>
        </section>
    );
}
