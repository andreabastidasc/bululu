// Tests publicados. Cuando esté el backend, esto viene de la API de Django.
import type { BululitoName } from "@/components/atoms/bululitos";
import { colors } from "./colors";

export type TestSummary = {
    slug: string;
    title: string;
    blurb?: string;
    category: string;
    questions: number;
    minutes: number;
    cover: string;
    mascots: { name: BululitoName; color: string }[];
};

export const featuredTest: TestSummary = {
    slug: "protagonista-gta-navidad",
    title: "¿Qué protagonista de GTA serías en la cena de Navidad?",
    blurb: "De Claude a Jason y Lucia: ocho preguntas para descubrir quién eres cuando falta hielo, la tía pregunta por la boda y alguien se sube a una silla a brindar.",
    category: "Gamers",
    questions: 8,
    minutes: 2,
    cover: colors.lemon,
    mascots: [
        { name: "antena", color: colors.mint },
        { name: "peti", color: colors.coral },
        { name: "tuqui", color: colors.bubblegum },
    ],
};

/** Todos los tests publicados (por ahora, solo uno). */
export const tests: TestSummary[] = [featuredTest];
