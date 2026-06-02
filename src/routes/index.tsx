import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/useLenis";
import { Cursor } from "@/components/triveni/Cursor";
import { Loader } from "@/components/triveni/Loader";
import { ScrollProgress } from "@/components/triveni/ScrollProgress";
import { Navbar } from "@/components/triveni/Navbar";
import { Hero } from "@/components/triveni/Hero";
import { About } from "@/components/triveni/About";
import { Collections } from "@/components/triveni/Collections";
import { Showcase } from "@/components/triveni/Showcase";
import { Textures } from "@/components/triveni/Textures";
import { WhyTriveni } from "@/components/triveni/WhyTriveni";
import { Gallery } from "@/components/triveni/Gallery";
import { Testimonials } from "@/components/triveni/Testimonials";
import { Contact } from "@/components/triveni/Contact";
import { Footer } from "@/components/triveni/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Triveni — The Granite Studio" },
      { name: "description", content: "Premium granite, marble and luxury surfaces. A patient practice of stone, light and architecture." },
      { property: "og:title", content: "Triveni — The Granite Studio" },
      { property: "og:description", content: "Premium granite, marble and luxury surfaces." },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  return (
    <main className="grain relative bg-background text-foreground antialiased">
      <Loader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Collections />
      <Showcase />
      <Textures />
      <WhyTriveni />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
