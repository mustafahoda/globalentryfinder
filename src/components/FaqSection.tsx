"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/faqData";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question} className="border-t border-black/10 last:border-b">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left py-4"
            >
              <span className="text-[17px] font-semibold text-ink">{item.question}</span>
              <span
                className="shrink-0 text-accent text-xl leading-none transition-transform duration-200"
                style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="text-[15px] leading-[26px] text-neutral-800 max-w-[68ch] pb-5 m-0">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
