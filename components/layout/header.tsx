"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Activity,
  Globe,
  User,
  Calendar,
} from "lucide-react"
import { HOSPITAL_PHONE } from "@/lib/data"

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/departments",
    label: "Departments",
    children: [
      { href: "/departments/cardiology", label: "Cardiology" },
      { href: "/departments/oncology", label: "Oncology" },
      { href: "/departments/neurology", label: "Neurology" },
      { href: "/departments/orthopedics", label: "Orthopedics" },
      { href: "/departments/pediatrics", label: "Pediatrics" },
      { href: "/departments/womens-health", label: "Women's Health" },
    ],
  },
  { href: "/doctors", label: "Find a Doctor" },
  { href: "/about", label: "About Us" },
  { href: "/news", label: "News" },
  { href: "/locations", label: "Locations" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [deptOpen, setDeptOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          <div className="flex items-center gap-4">
            <a href={`tel:${HOSPITAL_PHONE}`} className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone className="size-3" />
              <span>{HOSPITAL_PHONE}</span>
            </a>
            <span className="text-primary-foreground/60 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-primary-foreground/80">24/7 Emergency Care Available</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Globe className="size-3" />
              <span>EN</span>
              <ChevronDown className="size-3" />
            </button>
            <Link href="/queue" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Activity className="size-3" />
              <span className="hidden sm:inline">Queue Status</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-background border-b border-border"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              M
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-foreground leading-tight text-sm">MediCare</p>
              <p className="text-muted-foreground text-[10px] leading-tight">General Hospital</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative group">
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith(link.href) ? "text-primary" : "text-foreground/70"
                    )}
                    onMouseEnter={() => setDeptOpen(true)}
                    onMouseLeave={() => setDeptOpen(false)}
                  >
                    {link.label}
                    <ChevronDown className="size-3.5" />
                  </button>
                  <div
                    className="absolute left-0 top-full z-50 hidden group-hover:block w-52 rounded-xl border border-border bg-popover p-2 shadow-lg"
                    onMouseEnter={() => setDeptOpen(true)}
                    onMouseLeave={() => setDeptOpen(false)}
                  >
                    <Link
                      href="/departments"
                      className="block rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:bg-accent"
                    >
                      All Departments
                    </Link>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === link.href ? "text-primary font-semibold" : "text-foreground/70"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <Link href="/queue" className="hidden md:flex">
              <Button variant="outline" size="sm" className="gap-1.5">
                <User className="size-3.5" />
                Patient Portal
              </Button>
            </Link>
            <Link href="/admin" className="hidden md:flex">
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                Admin
              </Button>
            </Link>
            <Link href="/appointments">
              <Button size="sm" className="gap-1.5 hidden sm:flex">
                <Calendar className="size-3.5" />
                Book Appointment
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
                M
              </div>
              <span className="font-heading font-bold">MediCare</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </Button>
          </div>
          <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent",
                    pathname === link.href ? "text-primary bg-accent" : "text-foreground/70"
                  )}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-3 mt-1 flex flex-col gap-0.5">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <Link href="/appointments" onClick={() => setOpen(false)}>
                <Button className="w-full gap-2">
                  <Calendar className="size-4" />
                  Book Appointment
                </Button>
              </Link>
              <Link href="/queue" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full gap-2">
                  <Activity className="size-4" />
                  Queue Status
                </Button>
              </Link>
              <Link href="/admin" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full gap-2">
                  <User className="size-4" />
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
