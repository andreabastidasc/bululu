import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bagel_Fat_One, Rubik } from "next/font/google";
import "./globals.css";

const bagel = Bagel_Fat_One({ weight: "400", subsets: ["latin"], variable: "--font-bagel" });
const rubik = Rubik({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-rubik" });

export const metadata: Metadata = {
    title: {
        default: "Bululú · mundo creativo",
        template: "%s · Bululú",
    },
    description: "Tests absurdos, juegos cortitos y una revista de cosas que nos copan. Para jugar con tu gente.",
    openGraph: {
        title: "Bululú · mundo creativo",
        description: "Tests absurdos, juegos cortitos y una revista de cosas que nos copan.",
        locale: "es_419",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="es" className={`${bagel.variable} ${rubik.variable}`}>
            <body className="antialiased">{children}</body>
        </html>
    );
}
