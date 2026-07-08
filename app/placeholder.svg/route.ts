import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const width = parseInt(searchParams.get("width") ?? "600", 10)
  const height = parseInt(searchParams.get("height") ?? "400", 10)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#e8edf4"/>
  <rect x="${width * 0.35}" y="${height * 0.3}" width="${width * 0.3}" height="${height * 0.3}" rx="8" fill="#b8c8dc" opacity="0.6"/>
  <circle cx="${width * 0.5}" cy="${height * 0.38}" r="${Math.min(width, height) * 0.07}" fill="#8aaac0" opacity="0.5"/>
  <text x="50%" y="${height * 0.75}" font-family="system-ui, sans-serif" font-size="${Math.max(12, Math.min(width, height) * 0.055)}" fill="#8899aa" text-anchor="middle">${width} × ${height}</text>
</svg>`

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
