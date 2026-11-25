import Link from "next/link";
import { Crowd } from "@/components/molecules/Crowd";
import { colors as c } from "@/data/colors";

const links = [
    { href: "/#tests", label: "Tests" },
    { href: "/#mundo", label: "Mundo Bululú" },
    { href: "/#revista", label: "Revista" },
];

export function Footer() {
    return (
        <footer className="overflow-hidden border-t-3 border-ink bg-cobalt text-paper">
            <div className="wrap flex flex-wrap items-center justify-between gap-4 pt-10">
                <div className="flex flex-col gap-1.5">
                    <span className="font-display text-5xl leading-none text-lemon text-outline">bululú</span>
                    <span className="text-lg font-bold">mundo creativo</span>
                </div>
                <nav className="flex flex-wrap gap-x-6 gap-y-1 font-medium" aria-label="Pie de página">
                    {links.map((l) => (
                        <Link key={l.href} href={l.href} className="py-2.5 no-underline hover:underline">
                            {l.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <Crowd
                className="mt-6 block aspect-[1000/160] h-auto w-full"
                viewBox="0 170 1000 160"
                members={[
                    { name: "redondo", color: c.bubblegum, x: 20, y: 200, w: 100, h: 140 },
                    { name: "tuqui", color: c.lemon, x: 140, y: 190, w: 90, h: 140 },
                    { name: "peti", color: c.mint, x: 250, y: 200, w: 120, h: 140 },
                    { name: "antena", color: c.coral, x: 390, y: 180, w: 90, h: 150 },
                    { name: "redondo", color: c.paper, x: 500, y: 200, w: 100, h: 140 },
                    { name: "tuqui", color: c.lilac, x: 620, y: 190, w: 90, h: 140 },
                    { name: "peti", color: c.lemon, x: 730, y: 200, w: 120, h: 140 },
                    { name: "antena", color: c.mint, x: 870, y: 180, w: 90, h: 150 },
                ]}
            />
        </footer>
    );
}
