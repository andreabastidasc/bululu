import { ChevronLeftIcon, ChevronRightIcon } from "@/components/atoms/icons";
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
                <ChevronLeftIcon width={20} height={20} />
            </RoundButton>
            <span className="min-w-14 text-center font-bold" aria-live="polite">
                {page + 1} / {total}
            </span>
            <RoundButton label="Página siguiente" disabled={page === total - 1} onClick={onNext}>
                <ChevronRightIcon width={20} height={20} />
            </RoundButton>
        </div>
    );
}
