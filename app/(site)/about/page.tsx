import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Award, Users, Heart, Globe, FlaskConical } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about MediCare General Hospital's history, mission, and accreditations.",
}

const timeline = [
  { year: "1959", event: "Founded as Springfield Community Hospital with 80 beds" },
  { year: "1975", event: "Expanded to 300 beds; established first cardiac care unit" },
  { year: "1988", event: "Designated Level I Trauma Center by State Health Department" },
  { year: "1999", event: "Renamed MediCare General Hospital; launched cancer research institute" },
  { year: "2008", event: "Opened West Surgical Center and North Health Clinic" },
  { year: "2015", event: "Achieved Magnet Nursing Recognition; expanded to 1,200 beds" },
  { year: "2020", event: "Launched telemedicine platform; COVID-19 regional command center" },
  { year: "2024", event: "Opened state-of-the-art Cardiac Center of Excellence" },
  { year: "2026", event: "Launched Digital Queue Management System across all 12 facilities" },
]

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We treat every patient with empathy, dignity, and respect — not just their illness.",
  },
  {
    icon: CheckCircle,
    title: "Excellence",
    description: "We hold ourselves to the highest standards in clinical outcomes, safety, and patient experience.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Our multidisciplinary teams work in concert to deliver the best possible care.",
  },
  {
    icon: Globe,
    title: "Community",
    description: "We are rooted in the communities we serve and committed to improving population health.",
  },
  {
    icon: FlaskConical,
    title: "Innovation",
    description: "We continuously invest in research, technology, and training to stay at medicine's frontier.",
  },
  {
    icon: Award,
    title: "Integrity",
    description: "We operate with transparency, accountability, and the highest ethical standards.",
  },
]

const accreditations = [
  "The Joint Commission — Full Accreditation (8 consecutive years)",
  "American College of Surgeons — Level I Trauma Center",
  "Commission on Cancer — Approved Cancer Program",
  "American Nurses Credentialing Center — Magnet Recognition",
  "Society of Cardiovascular Patient Care — Chest Pain Center",
  "American Heart Association — Heart Failure Certification",
  "Leapfrog Group — 'A' Patient Safety Grade",
  "DNV GL — ISO 9001:2015 Healthcare Certification",
  "American College of Radiology — Imaging Center of Excellence",
]

export default function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <Badge variant="secondary" className="mb-4 text-primary-foreground/80 bg-primary-foreground/10 border-primary-foreground/20">
            About Us
          </Badge>
          <h1 className="font-heading text-4xl font-bold md:text-5xl text-balance">
            Our Story, Our Mission
          </h1>
          <p className="mt-4 max-w-xl text-primary-foreground/80 text-pretty leading-relaxed">
            For over 65 years, MediCare General Hospital has provided exceptional healthcare to the communities
            of the greater Springfield region and beyond.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-16 bg-background" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-primary/5 p-8 border border-primary/10">
              <h2 id="mission-heading" className="font-heading text-xl font-bold text-foreground mb-3">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To deliver compassionate, high-quality healthcare that improves the health and wellbeing of
                every individual we serve — through clinical excellence, innovation, and a deep respect for
                human dignity.
              </p>
            </div>
            <div className="rounded-2xl bg-muted/60 p-8 border border-border">
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be recognized as the most trusted, patient-centered health system in the region —
                setting the national standard for clinical outcomes, patient experience, and healthcare equity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-muted/30" aria-labelledby="history-heading">
        <div className="mx-auto max-w-4xl px-4">
          <h2 id="history-heading" className="font-heading text-3xl font-bold text-foreground text-center mb-12">
            Our History
          </h2>
          <div className="relative">
            <div className="absolute left-[60px] top-0 bottom-0 w-px bg-border md:left-1/2" aria-hidden="true" />
            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`flex gap-4 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`hidden md:flex md:w-1/2 ${i % 2 === 0 ? "md:pr-8 md:justify-end" : "md:pl-8 md:justify-start"}`}>
                    <div className="rounded-xl border border-border bg-background p-4 max-w-xs shadow-sm">
                      <p className="text-sm text-muted-foreground">{item.event}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="sr-only">{item.year}</span>
                    <div className="size-2 rounded-full bg-primary-foreground" />
                  </div>
                  <div className="flex-1 md:hidden">
                    <p className="text-sm font-bold text-primary">{item.year}</p>
                    <p className="text-sm text-muted-foreground">{item.event}</p>
                  </div>
                  <div className={`hidden md:flex md:w-1/2 items-center ${i % 2 === 0 ? "md:pl-8" : "md:pr-8 md:justify-end"}`}>
                    <span className="text-xl font-bold text-primary font-heading">{item.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="values-heading" className="font-heading text-3xl font-bold text-foreground text-center mb-10">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4 rounded-xl border border-border p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-16 bg-muted/30" aria-labelledby="accreditations-heading">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="accreditations-heading" className="font-heading text-3xl font-bold text-foreground text-center mb-10">
            Accreditations &amp; Certifications
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {accreditations.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg bg-background border border-border p-4">
                <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
