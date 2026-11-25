import type { ReactNode } from "react";

type RoundButtonProps = {
    label: string;
    disabled?: boolean;
    onClick: () => void;
    children: ReactNode;
};

export function RoundButton({ label, disabled = false, onClick, children }: RoundButtonProps) {
    return (
        <button
            type="button"
            aria-label={label}
            disabled={disabled}
            onClick={onClick}
            className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border-3 border-ink bg-paper text-ink shadow-hard-sm disabled:cursor-default disabled:opacity-35 disabled:shadow-none"
        >
            {children}
        </button>
    );
}
