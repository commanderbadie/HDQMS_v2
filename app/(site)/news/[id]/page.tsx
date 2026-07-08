'use client';

import { NEWS } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  const article = NEWS.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-8 border-b">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium mb-6">
            <ArrowLeft className="size-4" />
            Back to News
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <Badge>{article.category}</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="size-4" />
              {formatDate(new Date(article.date))}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight mb-4">{article.title}</h1>
          <p className="text-lg text-muted-foreground">{article.excerpt}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-primary/5 rounded-lg p-8 mb-8">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {article.content || `${article.excerpt}\n\nThis is the full article content. In a real application, this would be pulled from a database or CMS. The article covers important updates and developments related to ${article.category.toLowerCase()} at our hospital.\n\nOur commitment to excellence in healthcare continues to drive innovation and patient care improvements. We remain dedicated to providing the highest quality medical services to our community.\n\nFor more information, please contact our communications department or visit our website.`}
          </p>
        </div>

        <Separator className="my-8" />

        {/* Share */}
        <div className="flex items-center justify-between py-8">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Share this article</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="size-4" />
            Share
          </Button>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {NEWS
              .filter((a) => a.category === article.category && a.id !== article.id)
              .slice(0, 2)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/news/${relatedArticle.id}`}
                  className="group p-4 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <h4 className="font-semibold group-hover:text-primary transition-colors mb-2">
                    {relatedArticle.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{relatedArticle.excerpt}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
