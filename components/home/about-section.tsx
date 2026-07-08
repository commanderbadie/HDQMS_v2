import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight } from "lucide-react"

const highlights = [
  "Founded in 1959, serving 3 generations of families",
  "Level I Trauma Center with 24/7 emergency services",
  "Joint Commission Accredited — 8 consecutive years",
  "Home to the region's only dedicated cancer research institute",
  "Magnet-recognized nursing excellence program",
]

export function AboutSection() {
  return (
    <section className="py-20 bg-background" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Image side */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-muted shadow-lg">
              <img
                src="/placeholder.svg?height=480&width=640"
                alt="MediCare hospital building and campus"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating history badge */}
            <div className="absolute -bottom-4 -right-4 rounded-xl bg-primary text-primary-foreground p-5 shadow-xl">
              <p className="text-4xl font-bold">65+</p>
              <p className="text-sm opacity-80">Years of Excellence</p>
            </div>
          </div>

          {/* Content side */}
          <div className="flex flex-col gap-5">
            <Badge variant="secondary" className="w-fit text-primary bg-primary/10 border-primary/20">
              About MediCare
            </Badge>
            <h2
              id="about-heading"
              className="font-heading text-3xl font-bold text-foreground md:text-4xl text-balance"
            >
              A Legacy of Healing, A Future of Innovation
            </h2>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              Since 1959, MediCare General Hospital has stood at the forefront of healthcare delivery — combining
              the latest medical breakthroughs with genuine, patient-centered compassion. From a modest 80-bed
              community hospital, we have grown into a 1,200-bed regional medical center serving over 320,000
              patients annually.
            </p>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              Our mission is simple: deliver the right care, at the right time, every time — supported by
              cutting-edge technology and a team of world-class physicians, nurses, and allied health professionals.
            </p>
            <ul className="flex flex-col gap-2.5 mt-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-2">
              <Link href="/about">
                <Button className="gap-2">
                  Learn More About Us
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
