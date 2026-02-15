import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { OurStorySection } from "../components/OurStorySection";
import { EventSection } from "../components/EventSection";
import { GiftsSection } from "../components/GiftsSection";
import { RSVPSection } from "../components/RSVPSection";
import { Footer } from "../components/Footer";
import { ToasterProvider } from "../components/ToasterProvider";
import { weddingInfo } from "../config/constants";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />
      <Navbar />

      <main className="overflow-x-hidden md:pt-20">
        <HeroSection weddingDate={weddingInfo.weddingDate} />
        <OurStorySection />
        <EventSection />
        <GiftsSection />
        <RSVPSection confirmDate={weddingInfo.confirmDate} />
      </main>

      <Footer />

      <ToasterProvider />
    </div>
  );
}
