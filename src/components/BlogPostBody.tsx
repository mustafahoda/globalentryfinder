import type { BlogBlock } from "@/lib/blogData";

export default function BlogPostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-[15px] leading-[26px] text-neutral-800 max-w-[68ch] m-0">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} className="text-[clamp(20px,2.2vw,26px)] m-0 mt-4">
                {block.text}
              </h2>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-2 max-w-[68ch] pl-5 list-disc">
                {block.items.map((item, j) => (
                  <li key={j} className="text-[15px] leading-[26px] text-neutral-800">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "cta":
            return (
              <div
                key={i}
                className="mt-4 p-6 rounded-lg bg-accent-100 border border-accent-200 flex flex-col gap-3"
              >
                {block.kicker && (
                  <span className="text-[11px] uppercase tracking-[0.08em] text-accent-700 font-semibold">
                    {block.kicker}
                  </span>
                )}
                <p className="text-[15px] leading-[26px] text-neutral-800 max-w-[60ch] m-0">
                  {block.text}
                </p>
                <a
                  href={block.href}
                  className="inline-flex w-fit items-center gap-1.5 text-[15px] font-semibold text-accent hover:underline"
                >
                  {block.label} →
                </a>
              </div>
            );
        }
      })}
    </div>
  );
}
