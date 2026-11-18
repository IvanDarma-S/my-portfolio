"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { SectionLabel } from "@/components/SectionLabel";
import { processSection } from "@/lib/content";

function StepRow({
  index,
  active,
  onEnter,
}: {
  index: number;
  active: number;
  onEnter: (i: number) => void;
}) {
  const step = processSection.steps[index];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  const isActive = active === index;
  return (
    <div
      ref={ref}
      className={`border-t border-line py-8 transition-opacity duration-500 sm:py-10 ${isActive ? "opacity-100" : "opacity-40"}`}
    >
      <div className="flex items-baseline gap-5">
        <span
          className={`font-mono text-2xl transition-colors duration-500 sm:text-3xl ${isActive ? "text-accent" : "text-ink/30"}`}
          aria-hidden="true"
        >
          {step.no}
        </span>
        <h3 className="font-display text-2xl leading-[0.95] uppercase sm:text-4xl">{step.title}</h3>
      </div>
      <p className="mt-4 max-w-lg pl-0 text-base leading-relaxed text-ink/70 sm:pl-14">{step.body}</p>
    </div>
  );
}

export default function Process() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const file = processSection.steps[active].file;

  return (
    <section id="process" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 sm:py-32">
      <SectionLabel>{processSection.label}</SectionLabel>
      <h2 className="mt-4 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.9] uppercase">
        {processSection.title[0]} {processSection.title[1]}
      </h2>

      <div className="mt-12 grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="size-2.5 rounded-full bg-pink" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-butter" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-mint" aria-hidden="true" />
              <span className="ml-2 font-mono text-xs tracking-[0.14em] text-ink/70">{file.name}</span>
              <span className="ml-auto rounded-full bg-bg px-3 py-1 font-mono text-[10px] tracking-[0.18em] uppercase text-ink/50">
                {file.kind}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={file.name}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="px-5 py-5 font-mono text-xs leading-relaxed sm:text-sm"
              >
                {file.lines.map((line, i) => (
                  <p key={line} className="whitespace-pre-wrap">
                    <span className="mr-4 inline-block w-4 text-right text-ink/30" aria-hidden="true">
                      {i + 1}
                    </span>
                    {line}
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-4 font-mono text-[11px] tracking-[0.2em] uppercase text-ink/45">
            step {processSection.steps[active].no} / 04 · {file.name}
          </p>
        </div>

        <div>
          {processSection.steps.map((step, i) => (
            <StepRow key={step.no} index={i} active={active} onEnter={setActive} />
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
