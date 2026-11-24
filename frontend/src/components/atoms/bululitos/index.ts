// Los bululitos: las mascotas de Bululú.
// Cada uno vive en su propio archivo. Este índice permite elegirlos por clave
// (por ejemplo, desde los datos de un test).
// Por ahora solo Tuqui y Peti tienen nombre; los demás se identifican por su forma.

import type { ComponentType } from "react";
import { Antena } from "./Antena";
import { Peti } from "./Peti";
import { Redondo } from "./Redondo";
import { Tuqui } from "./Tuqui";
import type { BululitoProps } from "./parts";

export { Antena, Peti, Redondo, Tuqui };
export type { BululitoProps };

export const bululitos = {
    tuqui: Tuqui,
    redondo: Redondo,
    antena: Antena,
    peti: Peti,
} satisfies Record<string, ComponentType<BululitoProps>>;

export type BululitoName = keyof typeof bululitos;
