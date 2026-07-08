"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { TESTIMONIALS } from "@/lib/data"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1))

  return (
    <section className="py-20 bg-primary" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <Badge variant="secondary" className="text-primary-foreground/80 bg-primary-foreground/10 border-primary-foreground/20">
            Patient Stories
          </Badge>
          <h2
            id="testimonials-heading"
            className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl text-balance"
          >
            Lives Changed Every Day
          </h2>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="rounded-2xl bg-primary-foreground/10 backdrop-blur-sm p-8 md:p-12 text-center">
            <Quote className="mx-auto mb-4 size-8 text-primary-foreground/40" aria-hidden="true" />
            <p className="text-lg text-primary-foreground/90 leading-relaxed italic text-pretty md:text-xl">
              &ldquo;{TESTIMONIALS[current].quote}&rdquo;
            </p>
            <div className="mt-6 flex flex-col items-center gap-1">
              <div className="flex gap-0.5" aria-label={`Rating: ${TESTIMONIALS[current].rating} out of 5 stars`}>
                {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>
              <p className="font-semibold text-primary-foreground mt-1">{TESTIMONIALS[current].name}</p>
              <p className="text-xs text-primary-foreground/60">
                {TESTIMONIALS[current].condition} • {TESTIMONIALS[current].date}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            >
              <ChevronLeft className="size-4" />
            </button>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === current ? "w-6 bg-primary-foreground" : "w-1.5 bg-primary-foreground/30"
                )}
              />
            ))}
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
