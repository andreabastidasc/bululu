"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import { CloseIcon, MenuIcon } from "@/components/atoms/icons";
import { featuredTest } from "@/data/tests";

const links = [
    { href: "/#tests", label: "Tests" },
    { href: "/#mundo", label: "Mundo Bululú" },
    { href: "/#revista", label: "Revista" },
];

export function Header() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <header className="border-b-3 border-ink bg-paper">
            <nav className="wrap flex items-center gap-3 py-2.5 md:gap-8 md:py-3.5" aria-label="Principal">
                <Link
                    href="/"
                    className="font-display text-[34px] leading-none no-underline md:text-[40px]"
                    aria-label="Bululú, inicio"
                    onClick={() => setOpen(false)}
                >
                    bululú
                </Link>

                <div className="ml-auto hidden items-center gap-7 text-base font-medium md:flex">
                    {links.map((l) => (
                        <Link key={l.href} href={l.href} className="py-2.5 no-underline hover:text-cobalt">
                            {l.label}
                        </Link>
                    ))}
                </div>

                <div className="ml-auto flex items-center gap-2.5 md:ml-0">
                    <ButtonLink href={`/tests/${featuredTest.slug}`} variant="coral" size="sm">
                        Haz el test
                    </ButtonLink>
                    <button
                        type="button"
                        className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border-3 border-ink bg-paper text-ink md:hidden"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? "Cerrar menú" : "Abrir menú"}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <CloseIcon width={22} height={22} /> : <MenuIcon width={22} height={22} />}
                    </button>
                </div>
            </nav>

            <div id="mobile-menu" className="flex flex-col border-t-3 border-ink bg-paper md:hidden" hidden={!open}>
                {links.map((l) => (
                    <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="border-b-2 border-ink/10 px-6 py-4 font-display text-[28px] leading-[1.1] no-underline last:border-b-0"
                    >
                        {l.label}
                    </Link>
                ))}
            </div>
        </header>
    );
}
