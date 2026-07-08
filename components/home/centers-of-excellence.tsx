import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DEPARTMENTS } from "@/lib/data"
import {
  Heart,
  Microscope,
  Brain,
  Bone,
  Baby,
  Zap,
  ScanLine,
  ArrowRight,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Microscope,
  Brain,
  Bone,
  Baby,
  Zap,
  ScanLine,
  Venus: Heart, // fallback
}

export function CentersOfExcellence() {
  const featured = DEPARTMENTS.slice(0, 6)

  return (
    <section className="py-20 bg-muted/30" aria-labelledby="centers-heading">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <Badge variant="secondary" className="text-primary bg-primary/10 border-primary/20">
            Centers of Excellence
          </Badge>
          <h2
            id="centers-heading"
            className="font-heading text-3xl font-bold text-foreground md:text-4xl text-balance"
          >
            Specialized Care Across Every Need
          </h2>
          <p className="max-w-xl text-muted-foreground text-pretty leading-relaxed">
            From complex cardiac procedures to comprehensive cancer care, our Centers of Excellence bring
            together the most skilled specialists and advanced technology for superior outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((dept) => {
            const Icon = iconMap[dept.icon] ?? Heart
            return (
              <Link key={dept.id} href={`/departments/${dept.id}`} className="group">
                <Card className="h-full overflow-hidden border-border hover:shadow-md transition-shadow duration-200">
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={dept.image}
                      alt={`${dept.name} department`}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                    <div className={`absolute top-3 left-3 rounded-lg p-2 ${dept.color} flex items-center justify-center`}>
                      <Icon className="size-4" />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-xs text-white font-medium">{dept.doctors} Doctors</span>
                      <span className="text-xs text-white font-medium">Avg. Wait: {dept.wait}</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                        {dept.name}
                      </h3>
                      <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {dept.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            View All {DEPARTMENTS.length} Departments
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
