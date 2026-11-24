// Artículos de la revista. Cuando esté el backend, esto viene de la API de Django.
import type { BululitoName } from "@/components/atoms/bululitos";
import { colors } from "./colors";

export type ArticleSummary = {
    slug: string;
    kicker: string;
    title: string;
    blurb: string;
    color: string;
    /** Bululito que aparece en la portada de la página. */
    mascot: { name: BululitoName; color: string };
    comingSoon?: boolean;
};

export const articles: ArticleSummary[] = [
    {
        slug: "historia-de-gta",
        kicker: "Línea de tiempo",
        title: "De Liberty City a Leonida: la historia de GTA",
        blurb: "Todos los juegos, todos los protagonistas y cómo cambió el mundo abierto en casi 30 años.",
        color: colors.lemon,
        mascot: { name: "tuqui", color: colors.coral },
        comingSoon: true,
    },
    {
        slug: "cmyk-juegos-de-fiesta",
        kicker: "Estudios que nos copan",
        title: "CMYK, la editorial que hizo lindos los juegos de fiesta",
        blurb: "Cómo una editorial convirtió juegos simples en objetos que dan ganas de dejar sobre la mesa.",
        color: colors.mint,
        mascot: { name: "antena", color: colors.lemon },
        comingSoon: true,
    },
    {
        slug: "como-nacieron-los-bululitos",
        kicker: "Detrás de escena",
        title: "Cómo nacieron los bululitos",
        blurb: "Cuatro formas básicas, muchos colores planos y un tumulto de personajes.",
        color: colors.bubblegum,
        mascot: { name: "redondo", color: colors.lilac },
        comingSoon: true,
    },
];
