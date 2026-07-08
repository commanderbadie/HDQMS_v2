import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DEPARTMENTS, DOCTORS } from "@/lib/data"
import { Heart, Microscope, Brain, Bone, Baby, Zap, ScanLine, Clock, Users, Calendar, Phone, ArrowLeft, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const iconMap: Record<string, React.ElementType> = {
  Heart, Microscope, Brain, Bone, Baby, Zap, ScanLine, Venus: Heart,
}

export async function generateStaticParams() {
  return DEPARTMENTS.map((d) => ({ id: d.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const dept = DEPARTMENTS.find((d) => d.id === id)
  if (!dept) return {}
  return {
    title: dept.name,
    description: dept.description,
  }
}

export default async function DepartmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const dept = DEPARTMENTS.find((d) => d.id === id)
  if (!dept) notFound()

  const Icon = iconMap[dept.icon] ?? Heart
  const deptDoctors = DOCTORS.filter((d) => d.department === dept.id)

  return (
    <div>
      {/* Header */}
      <div className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <Link
            href="/departments"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            All Departments
          </Link>
          <div className="flex items-start gap-4">
            <div className={`rounded-xl p-3 ${dept.color} bg-primary-foreground/20 text-primary-foreground`}>
              <Icon className="size-8" />
            </div>
            <div>
              <h1 className="font-heading text-4xl font-bold md:text-5xl">{dept.name}</h1>
              <div className="mt-3 flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 text-sm text-primary-foreground/80">
                  <Users className="size-4" />
                  {dept.doctors} specialist physicians
                </span>
                <span className="flex items-center gap-1.5 text-sm text-primary-foreground/80">
                  <Clock className="size-4" />
                  Average wait: {dept.wait}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-8">
            {/* Overview */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">About {dept.name}</h2>
              <p className="text-muted-foreground leading-relaxed">{dept.description}</p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Our department combines the most advanced diagnostic and treatment technologies with a patient-first
                philosophy. Every patient receives a personalized care plan developed by a multidisciplinary team
                of specialists committed to achieving the best possible outcome.
              </p>
            </section>

            <Separator />

            {/* Services */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Services Offered</h2>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  "Comprehensive diagnostic evaluation",
                  "Advanced imaging and lab testing",
                  "Minimally invasive procedures",
                  "Surgical interventions",
                  "Post-operative rehabilitation",
                  "Long-term disease management",
                  "Clinical trials and research access",
                  "Telehealth follow-up appointments",
                ].map((service) => (
                  <li key={service} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="size-1.5 rounded-full bg-primary shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </section>

            {/* Doctors in this department */}
            {deptDoctors.length > 0 && (
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Our {dept.name} Specialists
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {deptDoctors.map((doc) => (
                    <Link key={doc.id} href={`/doctors/${doc.id}`} className="group">
                      <Card className="hover:shadow-md transition-shadow border-border">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="relative size-14 rounded-full overflow-hidden bg-muted shrink-0">
                            <img src={doc.image} alt={doc.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                              {doc.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{doc.title}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star className="size-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-muted-foreground">{doc.rating} ({doc.reviews} reviews)</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5 flex flex-col gap-3">
                <h3 className="font-heading font-semibold text-foreground">Book an Appointment</h3>
                <p className="text-sm text-muted-foreground">Schedule with a {dept.name} specialist today.</p>
                <Link href="/appointments">
                  <Button className="w-full gap-2">
                    <Calendar className="size-4" />
                    Book Now
                  </Button>
                </Link>
                <a href="tel:+18005550199">
                  <Button variant="outline" className="w-full gap-2">
                    <Phone className="size-4" />
                    Call Us
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-5">
                <h3 className="font-heading font-semibold text-foreground mb-3">Department Info</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Specialists</span>
                    <span className="font-medium text-foreground">{dept.doctors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Wait Time</span>
                    <span className="font-medium text-foreground">{dept.wait}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hours</span>
                    <span className="font-medium text-foreground">Mon–Fri</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Urgent Care</span>
                    <span className="font-medium text-foreground">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
