'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/home/hero';
import { Stats } from '@/components/home/stats';
import { AboutSection } from '@/components/home/about-section';
import { CentersOfExcellence } from '@/components/home/centers-of-excellence';
import { Awards } from '@/components/home/awards';
import { Testimonials } from '@/components/home/testimonials';
import { NewsSection } from '@/components/home/news-section';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <AboutSection />
        <CentersOfExcellence />
        <Awards />
        <Testimonials />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}
