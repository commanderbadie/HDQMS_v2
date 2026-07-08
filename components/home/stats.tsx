"use client"

import { useEffect, useRef, useState } from "react"
import { STATS } from "@/lib/data"
import { cn } from "@/lib/utils"

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const start = Date.now()
          const tick = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplay(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="border-y border-border bg-primary py-14" aria-label="Hospital statistics">
      <div className="mx-auto max-w-7xl px-4">
        <p className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-primary-foreground/60">
          By the Numbers
        </p>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col items-center gap-1 text-center",
                i < STATS.length - 1 && "lg:border-r lg:border-primary-foreground/20"
              )}
            >
              <p className="text-3xl font-bold text-primary-foreground md:text-4xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-primary-foreground/70 leading-tight max-w-[100px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
