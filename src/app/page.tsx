import Header from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import { FeaturesSection } from "@/components/home/features-section";
import { EventsSection } from "@/components/home/events-section";
import { StatsSection } from "@/components/home/stats-section";
import { TeamSection } from "@/components/home/team-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { Footer } from "@/components/layout/footer/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />
      <FeaturesSection />
      <StatsSection />
      <EventsSection />
      <TeamSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}