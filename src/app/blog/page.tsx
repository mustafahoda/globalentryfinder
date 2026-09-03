import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getPublishedPosts } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical guides to the Global Entry appointment wait, written for the specific situation you're actually in.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogIndexPage() {
  const posts = getPublishedPosts();

  return (
    <div className="min-h-screen">
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
        <h1 className="text-[clamp(28px,4vw,40px)] m-0 mb-2">Blog</h1>
        <p className="text-[15px] leading-[24px] text-neutral-700 mb-10 max-w-[56ch]">
          Guides to the Global Entry appointment wait, written for the specific situation you're
          actually in.
        </p>

        <div className="flex flex-col">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group py-6 border-t border-black/10 last:border-b flex flex-col gap-1.5"
            >
              <span className="text-[12px] uppercase tracking-[0.08em] text-accent-700 font-semibold">
                {post.persona}
              </span>
              <span className="text-[19px] leading-[26px] font-semibold text-ink group-hover:text-accent">
                {post.title}
              </span>
              <span className="text-[14px] leading-[22px] text-neutral-700 max-w-[60ch]">
                {post.description}
              </span>
              <span className="text-[13px] text-neutral-600 mt-1">
                {formatDate(post.publishedAt as string)}
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
