'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NEWS } from '@/lib/data';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { ArrowRight, Calendar } from 'lucide-react';

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Latest News & Updates</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay informed with the latest developments and medical insights from our hospital
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured Article */}
        {NEWS.length > 0 && (
          <div className="mb-12">
            <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-background border-primary/20">
              <div className="grid md:grid-cols-2 gap-6 p-8">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge>{NEWS[0].category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="size-3" />
                        {formatDate(new Date(NEWS[0].date))}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold mb-3">{NEWS[0].title}</h2>
                    <p className="text-muted-foreground mb-6">{NEWS[0].excerpt}</p>
                  </div>
                  <Link
                    href={`/news/${NEWS[0].id}`}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                  >
                    Read full story <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg h-full min-h-[300px] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl font-bold opacity-20 mb-2">{NEWS[0].id}</div>
                    <p className="text-white/80">{NEWS[0].category}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* All Articles */}
        <div>
          <h3 className="text-2xl font-bold mb-6">All Articles</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {NEWS.slice(1).map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="size-3" />
                      {formatDate(new Date(article.date))}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex-1 flex flex-col">
                  <CardDescription className="text-sm flex-1 mb-4">{article.excerpt}</CardDescription>
                  <Link
                    href={`/news/${article.id}`}
                    className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all"
                  >
                    Read more <ArrowRight className="size-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
