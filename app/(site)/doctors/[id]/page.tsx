import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DOCTORS, DEPARTMENTS } from "@/lib/data"
import { Star, Calendar, Phone, ArrowLeft, GraduationCap, Languages, Clock } from "lucide-react"

export async function generateStaticParams() {
  return DOCTORS.map((d) => ({ id: d.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const doctor = DOCTORS.find((d) => d.id === id)
  if (!doctor) return {}
  return { title: doctor.name, description: doctor.bio }
}

export default async function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const doctor = DOCTORS.find((d) => d.id === id)
  if (!doctor) notFound()

  const dept = DEPARTMENTS.find((d) => d.id === doctor.department)

  return (
    <div>
      <div className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <Link href="/doctors" className="mb-6 inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <ArrowLeft className="size-4" />
            All Doctors
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          {/* Main */}
          <div className="flex flex-col gap-8">
            {/* Profile header */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="relative size-32 shrink-0 overflow-hidden rounded-2xl bg-muted shadow-md">
                <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-heading text-3xl font-bold text-foreground">{doctor.name}</h1>
                <p className="text-muted-foreground">{doctor.title}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{doctor.specialty}</Badge>
                  {dept && (
                    <Link href={`/departments/${dept.id}`}>
                      <Badge variant="outline" className="hover:bg-accent cursor-pointer">{dept.name}</Badge>
                    </Link>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < Math.floor(doctor.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium text-foreground">{doctor.rating}</span>
                  <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <section>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>
            </section>

            {/* Details grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: GraduationCap, label: "Education", value: doctor.education },
                { icon: Clock, label: "Experience", value: `${doctor.experience} years` },
                { icon: Calendar, label: "Availability", value: doctor.availability },
                { icon: Languages, label: "Languages", value: doctor.languages.join(", ") },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 rounded-xl border border-border p-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5 flex flex-col gap-3">
                <h3 className="font-heading font-semibold text-foreground">Schedule a Consultation</h3>
                <p className="text-sm text-muted-foreground">
                  Available: <span className="font-medium text-foreground">{doctor.availability}</span>
                </p>
                <Link href="/appointments">
                  <Button className="w-full gap-2">
                    <Calendar className="size-4" />
                    Book Appointment
                  </Button>
                </Link>
                <a href="tel:+18005550199">
                  <Button variant="outline" className="w-full gap-2">
                    <Phone className="size-4" />
                    Call for Appointment
                  </Button>
                </a>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
