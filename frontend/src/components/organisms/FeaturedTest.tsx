import { ButtonLink } from "@/components/atoms/ButtonLink";
import { Pill } from "@/components/atoms/Pill";
import { Crowd } from "@/components/molecules/Crowd";
import { colors as c } from "@/data/colors";
import type { TestSummary } from "@/data/tests";

export function FeaturedTest({ test }: { test: TestSummary }) {
    return (
        <section id="tests" className="overflow-hidden border-b-3 border-ink bg-lemon" aria-labelledby="hero-title">
            <div className="wrap flex flex-wrap items-end gap-8 pt-9 md:pt-14">
                <div className="flex flex-[1_1_440px] flex-col items-start gap-5 pb-2 md:pb-14">
                    <Pill>Test de la semana</Pill>
                    <h1 id="hero-title" className="font-display text-[clamp(40px,5.2vw,68px)] leading-[1.04] font-normal">
                        {test.title}
                    </h1>
                    <p className="max-w-[560px] text-[19px] font-medium">{test.blurb}</p>
                    <div className="flex flex-wrap items-center gap-4">
                        <ButtonLink href={`/tests/${test.slug}`}>Empezar el test</ButtonLink>
                        <span className="text-[15px] font-medium">
                            {test.questions} preguntas · {test.minutes} min
                        </span>
                    </div>
                </div>
                <Crowd
                    className="block aspect-[680/330] h-auto w-full max-w-[640px] flex-[1_1_420px]"
                    viewBox="160 0 680 330"
                    label="Tres bululitos amontonados mirando hacia arriba"
                    members={[
                        { name: "antena", color: c.mint, x: 170, y: 60, w: 200, h: 290 },
                        { name: "tuqui", color: c.bubblegum, x: 620, y: 40, w: 210, h: 310 },
                        { name: "peti", color: c.coral, x: 320, y: -70, w: 330, h: 410 },
                    ]}
                />
            </div>
        </section>
    );
}
