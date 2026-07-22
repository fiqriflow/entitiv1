import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageViewTracker from "@/components/PageViewTracker";

export default function HomePage() {
  return (
    <main>
      <PageViewTracker />
      <Navbar />
      <Hero />
      <AboutSection />
      <EventsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
