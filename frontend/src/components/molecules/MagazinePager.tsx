import { RoundButton } from "@/components/atoms/RoundButton";

type MagazinePagerProps = {
    page: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
};

export function MagazinePager({ page, total, onPrev, onNext }: MagazinePagerProps) {
    return (
        <div className="mt-2 flex items-center justify-center gap-4 md:hidden">
            <RoundButton label="Página anterior" disabled={page === 0} onClick={onPrev}>
                <path d="M12.5 4l-6 6 6 6" />
            </RoundButton>
            <span className="min-w-14 text-center font-bold" aria-live="polite">
                {page + 1} / {total}
            </span>
            <RoundButton label="Página siguiente" disabled={page === total - 1} onClick={onNext}>
                <path d="M7.5 4l6 6-6 6" />
            </RoundButton>
        </div>
    );
}
