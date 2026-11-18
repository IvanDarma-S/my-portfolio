"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionLabel } from "@/components/SectionLabel";
import { faqSection } from "@/lib/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  if (faqSection.items.length === 0) return null;

  return (
    <section id="faq" className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <SectionLabel>{faqSection.label}</SectionLabel>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.9] uppercase">
            Asked,
            <br />
            answered
          </h2>
        </div>

        <div>
          {faqSection.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-t border-line last:border-b">
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-base font-semibold sm:text-lg">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className={`grid size-8 shrink-0 place-items-center rounded-full border border-line text-lg transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-pink" : "bg-card"
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-12 text-base leading-relaxed text-ink/70">{item.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
