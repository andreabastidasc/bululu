import { BululuWorld } from "@/components/organisms/BululuWorld";
import { FeaturedTest } from "@/components/organisms/FeaturedTest";
import { MagazineSection } from "@/components/organisms/MagazineSection";
import { SiteLayout } from "@/components/templates/SiteLayout";
import { articles } from "@/data/articles";
import { featuredTest } from "@/data/tests";
import { worldParts } from "@/data/world";

export default function Home() {
    return (
        <SiteLayout>
            <FeaturedTest test={featuredTest} />
            <BululuWorld parts={worldParts} />
            <MagazineSection articles={articles} />
        </SiteLayout>
    );
}
