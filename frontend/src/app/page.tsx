import { BululuWorld } from "@/components/organisms/BululuWorld";
import { FeaturedTest } from "@/components/organisms/FeaturedTest";
import { MagazineSection } from "@/components/organisms/MagazineSection";
import { SiteLayout } from "@/components/templates/SiteLayout";
import { featuredTest } from "@/data/tests";
import { worldParts } from "@/data/world";
import { getArticles } from "@/lib/api";

export default async function Home() {
    const articles = await getArticles();

    return (
        <SiteLayout>
            <FeaturedTest test={featuredTest} />
            <BululuWorld parts={worldParts} />
            <MagazineSection articles={articles} />
        </SiteLayout>
    );
}
