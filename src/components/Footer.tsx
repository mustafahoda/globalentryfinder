import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-16 pb-16">
      <p className="text-[13px] leading-6 text-neutral-700 pt-14 border-t border-black/10">
        globalentryfinder.com is an independent comparison resource operated by the same team
        that built{" "}
        <a
          href="https://snapslot.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Snapslot
        </a>
        . Not affiliated with U.S. Customs and Border Protection.{" "}
        <Link href="/privacy" className="text-accent hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </footer>
  );
}
