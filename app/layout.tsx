import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QueueProvider } from "@/lib/queue-context"
import { Toaster } from "sonner"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "MediCare General Hospital — Compassionate Care, Advanced Medicine",
    template: "%s | MediCare General Hospital",
  },
  description:
    "MediCare General Hospital delivers world-class healthcare with 500+ physicians, 40+ specialties, and a state-of-the-art digital queue management system for seamless patient experiences.",
  keywords: ["hospital", "healthcare", "doctors", "appointments", "emergency", "medical care"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MediCare General Hospital",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn("bg-background antialiased", inter.variable, playfair.variable)}
    >
      <body className="font-sans">
        <ThemeProvider>
          <QueueProvider>
            {children}
            <Toaster />
          </QueueProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
