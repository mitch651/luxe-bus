import Hero from "@/components/hero";
import TripBooker from "@/components/trip-booker";
import FleetSection from "@/components/fleet-section";
import ServicesSection from "@/components/services-section";
import ReviewsSection from "@/components/reviews-section";
import InstagramSection from "@/components/instagram-section";
import TikTokSection from "@/components/tiktok-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { getHomepageHeroContent } from "@/lib/homepage";

export default async function HomePage() {
  const heroContent = await getHomepageHeroContent();
  return (
    <main className="bg-[#0a0a0a]">
      <Hero content={heroContent} />
      <TripBooker />
      <FleetSection />
      <ServicesSection />
      <ReviewsSection />
      <InstagramSection />
      <TikTokSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
