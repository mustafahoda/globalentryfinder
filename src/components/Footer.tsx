import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/60 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-4 font-mono text-xs">
        <p>
          GlobalEntryFinder is an independent comparison resource operated by the same team that
          built{" "}
          <a
            href="https://snapslot.co"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-amber"
          >
            Snapslot
          </a>
          .
        </p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="underline underline-offset-2 hover:text-amber">
            Privacy Policy
          </Link>
          <span>© {new Date().getFullYear()} GlobalEntryFinder</span>
        </div>
      </div>
    </footer>
  );
}
