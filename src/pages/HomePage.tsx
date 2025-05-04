
import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/home/HeroSection";
import ImageCarousel from "@/components/home/ImageCarousel";
import FeaturesSection from "@/components/home/FeaturesSection";
import VisualSection from "@/components/home/VisualSection";
import CtaSection from "@/components/home/CtaSection";

const HomePage = () => {
  return (
    <PageLayout fullWidth>
      <HeroSection />
      <ImageCarousel />
      <FeaturesSection />
      <VisualSection />
      <CtaSection />
    </PageLayout>
  );
};

export default HomePage;
