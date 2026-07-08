import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react"
import { HOSPITAL_NAME, HOSPITAL_PHONE, HOSPITAL_EMAIL, HOSPITAL_ADDRESS } from "@/lib/data"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/departments", label: "Departments" },
  { href: "/doctors", label: "Find a Doctor" },
  { href: "/appointments", label: "Book Appointment" },
  { href: "/locations", label: "Locations" },
  { href: "/news", label: "News & Blog" },
  { href: "/contact", label: "Contact Us" },
]

const patientLinks = [
  { href: "/queue", label: "Queue Management" },
  { href: "/appointments", label: "Patient Portal" },
  { href: "/appointments", label: "Online Appointments" },
  { href: "#", label: "Medical Records" },
  { href: "#", label: "Bill Payment" },
  { href: "#", label: "Visitor Information" },
]

const serviceLinks = [
  { href: "/departments/emergency", label: "Emergency Care" },
  { href: "/departments/cardiology", label: "Cardiology" },
  { href: "/departments/oncology", label: "Oncology" },
  { href: "/departments/neurology", label: "Neurology" },
  { href: "/departments/pediatrics", label: "Pediatrics" },
  { href: "/departments/womens-health", label: "Women's Health" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
                M
              </div>
              <div>
                <p className="font-heading font-bold text-background leading-tight">MediCare</p>
                <p className="text-background/60 text-xs leading-tight">General Hospital</p>
              </div>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed max-w-xs">
              Delivering compassionate, world-class healthcare to our communities for over 65 years. Your health is our mission.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-md bg-background/10 text-background/70 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading font-semibold text-background">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Services */}
          <div>
            <h3 className="mb-4 font-heading font-semibold text-background">Patient Services</h3>
            <ul className="flex flex-col gap-2">
              {patientLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-heading font-semibold text-background">Contact Us</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`tel:${HOSPITAL_PHONE}`}
                  className="flex items-start gap-2.5 text-sm text-background/70 hover:text-background transition-colors"
                >
                  <Phone className="size-4 shrink-0 mt-0.5" />
                  <span>{HOSPITAL_PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${HOSPITAL_EMAIL}`}
                  className="flex items-start gap-2.5 text-sm text-background/70 hover:text-background transition-colors"
                >
                  <Mail className="size-4 shrink-0 mt-0.5" />
                  <span>{HOSPITAL_EMAIL}</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-sm text-background/70">
                  <MapPin className="size-4 shrink-0 mt-0.5" />
                  <span>{HOSPITAL_ADDRESS}</span>
                </span>
              </li>
              <li className="mt-2 rounded-lg bg-background/10 p-3">
                <p className="text-xs font-semibold text-background mb-1">Emergency</p>
                <a href="tel:911" className="text-lg font-bold text-primary hover:opacity-80 transition-opacity">
                  Call 911
                </a>
                <p className="text-xs text-background/60 mt-0.5">Available 24 hours, 7 days</p>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-background/10" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-background/50">
            &copy; {new Date().getFullYear()} {HOSPITAL_NAME}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {["Privacy Policy", "Terms & Conditions", "Accessibility", "Sitemap"].map((item) => (
              <a key={item} href="#" className="text-xs text-background/50 hover:text-background transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
