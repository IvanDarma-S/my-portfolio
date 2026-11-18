"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { SectionLabel } from "@/components/SectionLabel";
import { works, worksSection, type Work } from "@/lib/content";
import { lenisRef } from "@/lib/lenisInstance";
import { TINT_BG } from "@/lib/tints";

const pad = (i: number) => String(i + 1).padStart(2, "0");
const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));

function CardBody({ work, index }: { work: Work; index: number }) {
  const blank = work.title.trim() === "";
  return (
    <article className="w-[min(74vw,620px)] rounded-[2rem] border border-line bg-card p-3 shadow-soft">
      <div className={`relative aspect-[4/3] overflow-hidden rounded-[1.6rem] ${TINT_BG[work.tint]}`}>
        <span className="absolute top-4 left-5 font-mono text-xs tracking-[0.18em] text-ink/50">{pad(index)}</span>
        <div className="absolute inset-4 grid place-items-center rounded-[1.2rem] border-2 border-dashed border-ink/15">
          {blank ? (
            <p className="px-6 text-center font-mono text-[11px] leading-relaxed tracking-[0.2em] uppercase text-ink/40">
              slot {pad(index)} · blank
              <br />
              isi `works` di lib/content.ts
            </p>
          ) : (
            <div className="px-8 text-center">
              <p className="font-display text-2xl uppercase">{work.title}</p>
              <p className="mt-2 text-sm text-ink/60">{work.summary}</p>
            </div>
          )}
        </div>
      </div>
      {!blank && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 px-3 py-3 font-mono text-[11px] tracking-[0.16em] uppercase text-ink/60">
          <span>Role · {work.role}</span>
          <span>Status · {work.status}</span>
          <span>{work.year}</span>
        </div>
      )}
    </article>
  );
}

function PinnedCard({ work, index, v }: { work: Work; index: number; v: MotionValue<number> }) {
  const d = useTransform(v, (val) => val - index);
  const rotateY = useTransform(d, (x) => clamp(x, -1.7, 1.7) * -38);
  const x = useTransform(d, (val) => `${clamp(val, -2.4, 2.4) * 58}%`);
  const z = useTransform(d, (val) => -Math.min(Math.abs(val), 2) * 240);
  const scale = useTransform(d, (val) => 1 - Math.min(Math.abs(val), 2) * 0.1);
  const opacity = useTransform(d, (val) => clamp(1 - Math.abs(val) * 0.7, 0, 1));

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div style={{ x, rotateY, z, scale, opacity }} className="will-change-transform">
        <CardBody work={work} index={index} />
      </motion.div>
    </div>
  );
}

function NavButton({
  onClick,
  label,
  direction,
}: {
  onClick: () => void;
  label: string;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative grid size-11 place-items-center rounded-2xl border border-line bg-card shadow-soft transition-colors hover:bg-pink focus-visible:bg-pink"
    >
      <span aria-hidden="true" className="absolute -top-1 -right-1 size-2 rounded-[3px] bg-accent" />
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        {direction === "next" ? (
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M13 8H3M7 4 3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export default function SelectedWorks() {
  const ref = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const n = works.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const v = useTransform(scrollYProgress, [0.08, 0.92], [0, Math.max(n - 1, 1)]);
  useMotionValueEvent(v, "change", (val) => setActive(clamp(Math.round(val), 0, n - 1)));

  const goTo = (i: number) => {
    const target = clamp(i, 0, n - 1);
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const progress = 0.08 + (target / Math.max(n - 1, 1)) * 0.84;
    const top = el.offsetTop + progress * total;
    if (lenisRef.current) lenisRef.current.scrollTo(top, { duration: reduce ? 0 : 1.1 });
    else window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  const nudgeScroller = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.firstElementChild?.clientWidth ?? 320) + 24, behavior: reduce ? "auto" : "smooth" });
  };

  const current = works[active];
  const title = current.title.trim() === "" ? "BLANK" : current.title;
  const tag =
    current.title.trim() === ""
      ? `project slot ${pad(active)} · coming soon`
      : `${current.category} · ${current.year}`;

  return (
    <section
      id="works"
      ref={ref}
      className={`relative border-t border-line bg-card/40 ${reduce ? "" : "md:h-[var(--works-h)]"}`}
      style={{ ["--works-h" as string]: `${n * 95}vh` }}
    >
      {/* Desktop: pinned, scroll-driven curved 3D carousel */}
      {!reduce && (
        <div className="sticky top-0 hidden h-screen flex-col md:flex">
          <div className="flex items-start justify-between px-6 pt-8 lg:px-12">
            <SectionLabel>{worksSection.label}</SectionLabel>
            <div className="flex gap-3">
              <NavButton direction="prev" label="Previous project" onClick={() => goTo(active - 1)} />
              <NavButton direction="next" label="Next project" onClick={() => goTo(active + 1)} />
            </div>
          </div>

          <div className="mt-2 text-center">
            <motion.h2
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.6rem,7vw,6.4rem)] leading-[0.9] uppercase"
            >
              {title}
            </motion.h2>
            <p className="mt-2 font-mono text-[11px] tracking-[0.24em] uppercase text-ink/55">{tag}</p>
          </div>

          <div className="relative flex-1 [perspective:1400px]">
            {works.map((work, i) => (
              <PinnedCard key={pad(i)} work={work} index={i} v={v} />
            ))}
          </div>

          <p className="pb-8 text-center font-mono text-lg tracking-[0.3em] text-ink/70" aria-live="polite">
            {pad(active)}/{pad(n - 1)}
          </p>
        </div>
      )}

      {/* Mobile & reduced motion: horizontal snap scroller */}
      <div className={`px-4 py-20 sm:px-6 ${reduce ? "" : "md:hidden"}`}>
        <div className="flex items-start justify-between">
          <SectionLabel>{worksSection.label}</SectionLabel>
          <div className="flex gap-3">
            <NavButton direction="prev" label="Previous project" onClick={() => nudgeScroller(-1)} />
            <NavButton direction="next" label="Next project" onClick={() => nudgeScroller(1)} />
          </div>
        </div>
        <h2 className="mt-3 font-display text-4xl leading-[0.9] uppercase sm:text-5xl">
          {worksSection.title[0]}
          <br />
          {worksSection.title[1]}
        </h2>

        <div ref={scrollerRef} className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
          {works.map((work, i) => (
            <div key={pad(i)} className="shrink-0 snap-center">
              <CardBody work={work} index={i} />
            </div>
          ))}
        </div>
        <p className="text-center font-mono text-sm tracking-[0.3em] text-ink/60">{worksSection.emptyNote}</p>
      </div>
    </section>
  );
}
