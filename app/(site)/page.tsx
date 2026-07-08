import { Hero } from "@/components/home/hero"
import { Stats } from "@/components/home/stats"
import { AboutSection } from "@/components/home/about-section"
import { CentersOfExcellence } from "@/components/home/centers-of-excellence"
import { Awards } from "@/components/home/awards"
import { Testimonials } from "@/components/home/testimonials"
import { NewsSection } from "@/components/home/news-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutSection />
      <CentersOfExcellence />
      <Awards />
      <Testimonials />
      <NewsSection />
    </>
  )
}
