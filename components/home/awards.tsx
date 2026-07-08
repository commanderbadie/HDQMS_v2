import { Badge } from "@/components/ui/badge"
import { AWARDS } from "@/lib/data"
import { Award } from "lucide-react"

export function Awards() {
  return (
    <section className="py-20 bg-background" aria-labelledby="awards-heading">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <Badge variant="secondary" className="text-primary bg-primary/10 border-primary/20">
            Awards &amp; Recognition
          </Badge>
          <h2
            id="awards-heading"
            className="font-heading text-3xl font-bold text-foreground md:text-4xl text-balance"
          >
            Recognized for Excellence
          </h2>
          <p className="max-w-xl text-muted-foreground text-pretty">
            Our commitment to quality care has earned us national recognition from the most respected
            healthcare organizations in the country.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((award) => (
            <div
              key={award.name}
              className="flex items-start gap-4 rounded-xl border border-border bg-muted/30 p-5 hover:bg-muted/60 transition-colors"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Award className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground text-sm">{award.name}</h3>
                  <Badge variant="secondary" className="text-xs shrink-0">{award.year}</Badge>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
