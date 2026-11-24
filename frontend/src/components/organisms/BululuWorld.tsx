import { Pill } from "@/components/atoms/Pill";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { WorldCard, type WorldCardProps } from "@/components/molecules/WorldCard";

export function BululuWorld({ parts }: { parts: WorldCardProps[] }) {
    return (
        <section id="mundo" className="border-b-3 border-ink bg-cobalt py-12 text-paper md:py-16" aria-labelledby="mundo-title">
            <div className="wrap flex flex-col items-start gap-8">
                <div className="flex max-w-[760px] flex-col items-start gap-4.5">
                    <Pill>Mundo Bululú</Pill>
                    <SectionTitle id="mundo-title" className="text-paper text-outline">
                        Un mundo para crear y jugar
                    </SectionTitle>
                    <p className="max-w-[640px] text-[19px] font-medium">
                        Bululú es un estudio creativo chiquito con muchas ganas de jugar. Hacemos tests, escribimos
                        sobre lo que nos inspira y, de a poco, inventamos cosas nuevas.
                    </p>
                </div>
                <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-5">
                    {parts.map((part) => (
                        <WorldCard key={part.title} {...part} />
                    ))}
                </div>
            </div>
        </section>
    );
}
