type ArticleFigureProps = {
    src: string;
    alt: string;
    caption?: string;
};

export function ArticleFigure({ src, alt, caption }: ArticleFigureProps) {
    return (
        <figure className="flex flex-col gap-3">
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full rounded-3xl border-3 border-ink bg-paper shadow-hard"
            />
            {caption && <figcaption className="text-sm text-ink-soft">{caption}</figcaption>}
        </figure>
    );
}
