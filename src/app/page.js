import SectionCarouselCards from "@/components/SectionCarouselCards";
import SectionHero from "@/components/SectionHero";
import { services } from "@/mock/services";

export default function Home() {
  return (
    <main>
      <SectionHero />
      <SectionCarouselCards data={services} />
    </main>
  );
}
