import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DEPARTMENTS } from "@/lib/data"
import {
  Heart, Microscope, Brain, Bone, Baby, Zap, ScanLine, ArrowRight, Clock, Users,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Departments & Specialties",
  description: "Explore all 48+ medical specialties and departments at MediCare General Hospital.",
}

const iconMap: Record<string, React.ElementType> = {
  Heart, Microscope, Brain, Bone, Baby, Zap, ScanLine, Venus: Heart,
}

export default function DepartmentsPage() {
  return (
    <div>
      <div className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <Badge variant="secondary" className="mb-4 text-primary-foreground/80 bg-primary-foreground/10 border-primary-foreground/20">
            Departments
          </Badge>
          <h1 className="font-heading text-4xl font-bold md:text-5xl text-balance">
            Specialized Care for Every Need
          </h1>
          <p className="mt-4 max-w-xl text-primary-foreground/80 text-pretty leading-relaxed">
            Our 48+ departments and specialty centers are staffed by expert physicians, surgeons, and allied
            health professionals — all working together for your best outcome.
          </p>
        </div>
      </div>

      <div className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {DEPARTMENTS.map((dept) => {
              const Icon = iconMap[dept.icon] ?? Heart
              return (
                <Link key={dept.id} href={`/departments/${dept.id}`} className="group">
                  <Card className="h-full overflow-hidden border-border hover:shadow-md hover:border-primary/30 transition-all duration-200">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img
                        src={dept.image}
                        alt={`${dept.name} department`}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                    </div>
                    <CardContent className="p-4 flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div className={`rounded-lg p-2 ${dept.color}`}>
                          <Icon className="size-4" />
                        </div>
                        <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-2" />
                      </div>
                      <div>
                        <h2 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                          {dept.name}
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {dept.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-border pt-3">
                        <span className="flex items-center gap-1">
                          <Users className="size-3" />
                          {dept.doctors} Doctors
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {dept.wait} avg. wait
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
