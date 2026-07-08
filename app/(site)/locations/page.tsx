'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Clock } from 'lucide-react';
import { LOCATIONS } from '@/lib/data';
import Link from 'next/link';

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Our Locations</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Visit any of our state-of-the-art medical facilities across the region
          </p>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {LOCATIONS.map((location) => (
            <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl">{location.name}</CardTitle>
                <CardDescription>{location.city}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Address */}
                <div className="flex gap-3">
                  <MapPin className="size-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3">
                  <Phone className="size-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <a href={`tel:${location.phone}`} className="text-sm text-primary hover:underline">
                      {location.phone}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-3">
                  <Clock className="size-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Hours</p>
                    <p className="text-sm text-muted-foreground">{location.hours}</p>
                  </div>
                </div>

                {/* Departments */}
                <div>
                  <p className="text-sm font-medium mb-2">Available Departments</p>
                  <div className="flex flex-wrap gap-2">
                    {location.departments.slice(0, 3).map((dept) => (
                      <Badge key={dept} variant="secondary" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                    {location.departments.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{location.departments.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action */}
                <Link
                  href="/appointments"
                  className="inline-block text-sm font-medium text-primary hover:underline mt-2"
                >
                  Book an appointment →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-primary/5 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8">
            <h2 className="text-2xl font-bold mb-4">Need Directions?</h2>
            <p className="text-muted-foreground mb-4">
              All our locations are easily accessible by public transport and have ample parking facilities. 
              Call ahead to confirm department availability and reduce wait times.
            </p>
            <p className="text-sm text-muted-foreground">
              Emergency services are available 24/7 at all locations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
