"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DOCTORS, DEPARTMENTS } from "@/lib/data"
import { Search, Star, Calendar, Filter, Users } from "lucide-react"

export default function DoctorsPage() {
  const [search, setSearch] = useState("")
  const [selectedDept, setSelectedDept] = useState("all")

  const filtered = DOCTORS.filter((doc) => {
    const matchSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase())
    const matchDept = selectedDept === "all" || doc.department === selectedDept
    return matchSearch && matchDept
  })

  return (
    <div>
      {/* Header */}
      <div className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <Badge variant="secondary" className="mb-4 text-primary-foreground/80 bg-primary-foreground/10 border-primary-foreground/20">
            Our Physicians
          </Badge>
          <h1 className="font-heading text-4xl font-bold md:text-5xl text-balance">Find Your Doctor</h1>
          <p className="mt-4 max-w-xl text-primary-foreground/80 text-pretty">
            Browse our directory of 540+ specialist physicians. Filter by specialty, search by name, and book
            your appointment online.
          </p>
        </div>
      </div>

      {/* Search + Filter bar */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search by name or specialty..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Search doctors"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-muted-foreground shrink-0" />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Filter by department"
              >
                <option value="all">All Departments</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {filtered.length} of {DOCTORS.length} physicians
          </p>
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Users className="mx-auto mb-4 size-12 text-muted-foreground/40" />
              <p className="text-muted-foreground">No doctors found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setSelectedDept("all") }}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((doc) => (
                <Link key={doc.id} href={`/doctors/${doc.id}`} className="group">
                  <Card className="h-full overflow-hidden border-border hover:shadow-md hover:border-primary/20 transition-all duration-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                          <img src={doc.image} alt={doc.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                            {doc.name}
                          </h2>
                          <p className="text-xs text-muted-foreground">{doc.title}</p>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {doc.specialty}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="size-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-foreground">{doc.rating}</span>
                          <span>({doc.reviews} reviews)</span>
                        </div>
                        <p>{doc.experience} years experience</p>
                        <p className="text-muted-foreground">{doc.education}</p>
                        <p>Available: {doc.availability}</p>
                        <p>Languages: {doc.languages.join(", ")}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Book a consultation</span>
                          <Link
                            href="/appointments"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button size="sm" className="h-7 gap-1 text-xs">
                              <Calendar className="size-3" />
                              Book
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
