import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WorkflowSection from "@/components/WorkflowSection";
import EventsSection from "@/components/EventsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutSection />
      <WorkflowSection />
      <EventsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
