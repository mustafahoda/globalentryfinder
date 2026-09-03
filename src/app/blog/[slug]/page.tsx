import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import BlogPostBody from "@/components/BlogPostBody";
import { BLOG_POSTS, getPostBySlug, getPublishedPosts } from "@/lib/blogData";

const SITE_URL = "https://globalentryfinder.com";

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "GlobalEntryFinder" },
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <nav className="flex items-center gap-8 py-4 px-5 sm:px-8 md:px-16">
        <Link href="/" className="font-semibold text-lg mr-auto">
          GlobalEntryFinder
        </Link>
        <Link href="/#which" className="text-sm hover:text-accent">
          Quiz
        </Link>
        <Link href="/#compare" className="text-sm hover:text-accent">
          Compare
        </Link>
        <Link href="/blog" className="text-sm hover:text-accent">
          Blog
        </Link>
      </nav>

      <main className="max-w-[720px] mx-auto px-5 sm:px-8 md:px-16 pt-8 sm:pt-12 pb-24">
        <Link href="/blog" className="text-[13px] text-accent hover:underline">
          ← Blog
        </Link>

        <span className="block text-[12px] uppercase tracking-[0.08em] text-accent-700 font-semibold mt-6">
          {post.persona}
        </span>
        <h1 className="text-[clamp(28px,4vw,40px)] leading-[1.1] m-0 mt-2 mb-2">{post.title}</h1>
        <p className="text-[13px] text-neutral-700 mb-9">
          {formatDate(post.publishedAt as string)}
        </p>

        <BlogPostBody blocks={post.body} />
      </main>
      <Footer />
    </div>
  );
}
