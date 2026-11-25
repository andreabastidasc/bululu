// Los mismos colores que en globals.css, para usarlos dentro de los SVG.
export const colors = {
    cobalt: "#3550FF",
    lemon: "#FFC63D",
    coral: "#FF5A4E",
    mint: "#22C3A0",
    bubblegum: "#FF8FCB",
    lilac: "#9B7BFF",
    ink: "#1B1530",
    paper: "#FFF6E9",
} as const;

export const mascotOn = {
    cobalt: colors.lemon,
    lemon: colors.coral,
    coral: colors.lemon,
    mint: colors.lemon,
    bubblegum: colors.lilac,
    lilac: colors.bubblegum,
} as const;
