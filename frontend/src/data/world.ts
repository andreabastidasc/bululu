import type { WorldCardProps } from "@/components/molecules/WorldCard";
import { colors } from "./colors";
import { featuredTest } from "./tests";

export const worldParts: WorldCardProps[] = [
    {
        title: "Jugar",
        text: "Tests rápidos y absurdos para descubrir algo de ti y compararlo con tu gente.",
        color: colors.lemon,
        href: `/tests/${featuredTest.slug}`,
        cta: "Empezar con GTA",
    },
    {
        title: "Leer",
        text: "Historias de juegos, estudios y proyectos creativos que nos dan ganas de hacer cosas.",
        color: colors.mint,
        href: "/#revista",
        cta: "Abrir la revista",
    },
    {
        title: "Inventar",
        text: "Juegos y objetos que todavía están en la mesa de trabajo. Pronto los vas a ver por acá.",
        color: colors.bubblegum,
    },
];
