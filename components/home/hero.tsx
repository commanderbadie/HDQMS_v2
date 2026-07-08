"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Phone,
  ArrowRight,
  Activity,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    badge: "Level I Trauma Center",
    headline: "Advanced Medicine,\nHuman Compassion.",
    subheadline:
      "MediCare General Hospital — where 540 expert physicians and 65 years of healthcare excellence come together for your wellbeing.",
    cta: "Book an Appointment",
    ctaHref: "/appointments",
    secondary: "Explore Departments",
    secondaryHref: "/departments",
    accent: "bg-primary/5",
  },
  {
    badge: "New Cardiac Center Open",
    headline: "Your Heart,\nOur Expertise.",
    subheadline:
      "Our state-of-the-art Cardiac Center of Excellence offers the most advanced interventional and surgical cardiac care in the region.",
    cta: "Learn About Cardiology",
    ctaHref: "/departments/cardiology",
    secondary: "Meet Our Cardiologists",
    secondaryHref: "/doctors",
    accent: "bg-red-50",
  },
  {
    badge: "Digital Queue System",
    headline: "Zero Wait.\nMaximum Care.",
    subheadline:
      "Our smart Digital Queue Management System lets you check wait times, book real-time slots, and get SMS notifications — no more crowded waiting rooms.",
    cta: "Check Queue Status",
    ctaHref: "/queue",
    secondary: "How It Works",
    secondaryHref: "/about",
    accent: "bg-green-50",
  },
]

export function Hero() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1))

  const slide = slides[current]

  return (
    <section className="relative overflow-hidden bg-background" aria-label="Hero banner">
      {/* Booking widget */}
      <div className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-sm font-semibold text-foreground whitespace-nowrap">Quick Appointment:</p>
            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-3">
              <select
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Select department"
              >
                <option value="">Select Department</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Orthopedics</option>
                <option>Pediatrics</option>
                <option>General OPD</option>
              </select>
              <select
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Select facility"
              >
                <option value="">Select Facility</option>
                <option>Main Campus</option>
                <option>North Health Center</option>
                <option>West Surgical Center</option>
              </select>
              <input
                type="text"
                placeholder="Patient ID (optional)"
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Link href="/appointments">
                <Button className="w-full sm:w-auto gap-2">
                  <Calendar className="size-4" />
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide */}
      <div className={cn("transition-colors duration-500", slide.accent)}>
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-6">
              <Badge variant="secondary" className="w-fit gap-1.5 text-primary border-primary/20 bg-primary/10">
                <Activity className="size-3" />
                {slide.badge}
              </Badge>
              <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
                {slide.headline.split("\n").map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg text-pretty">
                {slide.subheadline}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={slide.ctaHref}>
                  <Button size="lg" className="gap-2">
                    <Calendar className="size-4" />
                    {slide.cta}
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Link href={slide.secondaryHref}>
                  <Button size="lg" variant="outline" className="gap-2">
                    {slide.secondary}
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  { icon: Shield, text: "Joint Commission Accredited" },
                  { icon: Clock, text: "24/7 Emergency" },
                  { icon: Phone, text: "Immediate Response" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon className="size-3.5 text-primary" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image placeholder with stats overlay */}
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/3] shadow-xl">
              <img
                src="/placeholder.svg?height=540&width=720"
                alt="MediCare Hospital — state-of-the-art medical facilities"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/5" />
              {/* Floating stat card */}
              <div className="absolute bottom-4 left-4 rounded-xl bg-background/95 backdrop-blur-sm p-4 shadow-lg border border-border">
                <p className="text-2xl font-bold text-primary">540+</p>
                <p className="text-xs text-muted-foreground">Specialist Physicians</p>
              </div>
              <div className="absolute top-4 right-4 rounded-xl bg-primary text-primary-foreground p-4 shadow-lg">
                <p className="text-2xl font-bold">48+</p>
                <p className="text-xs opacity-80">Specialties</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="flex items-center justify-center gap-4 pb-8">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="flex size-8 items-center justify-center rounded-full border border-border hover:bg-accent transition-colors"
        >
          <ChevronLeft className="size-4" />
        </button>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === current ? "w-6 bg-primary" : "w-1.5 bg-border"
            )}
          />
        ))}
        <button
          onClick={next}
          aria-label="Next slide"
          className="flex size-8 items-center justify-center rounded-full border border-border hover:bg-accent transition-colors"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  )
}
