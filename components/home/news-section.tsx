import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { NEWS } from "@/lib/data"
import { ArrowRight, Calendar, Clock } from "lucide-react"

const categoryColors: Record<string, string> = {
  Facility: "bg-blue-100 text-blue-700",
  Technology: "bg-cyan-100 text-cyan-700",
  Awards: "bg-yellow-100 text-yellow-700",
  Research: "bg-purple-100 text-purple-700",
  Community: "bg-green-100 text-green-700",
  Innovation: "bg-orange-100 text-orange-700",
}

export function NewsSection() {
  const featured = NEWS.slice(0, 3)
  const side = NEWS.slice(3, 6)

  return (
    <section className="py-20 bg-muted/30" aria-labelledby="news-heading">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Badge variant="secondary" className="w-fit text-primary bg-primary/10 border-primary/20">
              News &amp; Updates
            </Badge>
            <h2
              id="news-heading"
              className="font-heading text-3xl font-bold text-foreground md:text-4xl text-balance"
            >
              Latest from MediCare
            </h2>
          </div>
          <Link
            href="/news"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline shrink-0"
          >
            View All News
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Featured articles */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {featured.map((article, i) => (
              <Link key={article.id} href={`/news/${article.id}`} className="group">
                <Card className="overflow-hidden border-border hover:shadow-md transition-shadow">
                  <div className={`grid grid-cols-1 ${i === 0 ? "sm:grid-cols-[2fr_3fr]" : "sm:grid-cols-[1fr_2fr]"}`}>
                    <div className="relative bg-muted overflow-hidden aspect-video sm:aspect-auto">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4 flex flex-col gap-2 justify-between">
                      <div>
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium mb-2 ${categoryColors[article.category] ?? "bg-muted text-muted-foreground"}`}
                        >
                          {article.category}
                        </span>
                        <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {article.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Side articles */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">More Stories</h3>
            {side.map((article) => (
              <Link key={article.id} href={`/news/${article.id}`} className="group flex gap-3 items-start py-3 border-b border-border last:border-0">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColors[article.category] ?? "bg-muted text-muted-foreground"}`}
                  >
                    {article.category}
                  </span>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
                    {article.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{article.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
