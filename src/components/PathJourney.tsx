"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { BadgeGlyph } from "@/components/BadgeGlyph";
import { SectionLabel } from "@/components/SectionLabel";
import { pathSection, type PathStop } from "@/lib/content";
import { TINT_BG } from "@/lib/tints";

const CURVE =
  "M 200 -20 C 60 40, 60 140, 200 200 C 340 260, 340 340, 200 400 C 60 460, 60 540, 200 600 C 340 660, 340 740, 200 800 C 60 840, 60 900, 200 960 L 200 1040";

const STOP_AT = [0.08, 0.29, 0.5, 0.71, 0.9];
const SIDES = ["right", "left", "right", "left", "right"] as const;
const BADGE_TILT = [-9, 10, -8, 11, -10];

function StopContent({ stop, index, side }: { stop: PathStop; index: number; side: "left" | "right" }) {
  return (
    <>
      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50">
        stop {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-2 font-display text-[clamp(1.9rem,4vw,3.6rem)] leading-[0.95] uppercase">
        {stop.wordA}{" "}
        <span
          className="relative mx-1 inline-grid size-12 shrink-0 place-items-center rounded-2xl bg-card shadow-sticker sm:size-14"
          style={{ rotate: `${BADGE_TILT[index]}deg` }}
          title={stop.badge.label}
        >
          <span
            aria-hidden="true"
            className={`absolute -inset-1.5 -z-10 rounded-[1.3rem] ${TINT_BG[stop.tint]}`}
            style={{ rotate: `${BADGE_TILT[index] * -0.6}deg` }}
          />
          <BadgeGlyph icon={stop.badge.icon} className="size-6 text-ink" />
          <span className="sr-only">{stop.badge.label}</span>
        </span>{" "}
        {stop.wordB}
      </h3>
      <p
        className={`mt-3 inline-block max-w-xs rounded-[1.4rem] border border-line bg-card px-5 py-3 text-sm leading-relaxed shadow-soft sm:text-base ${
          side === "right" ? "rotate-2" : "-rotate-2"
        }`}
      >
        {stop.speech}
      </p>
    </>
  );
}

function DesktopStop({
  stop,
  index,
  side,
  progress,
  reduce,
}: {
  stop: PathStop;
  index: number;
  side: "left" | "right";
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const t = STOP_AT[index];
  const isLast = index === STOP_AT.length - 1;
  const fadeIn = useTransform(progress, [Math.max(t - 0.16, 0), t - 0.05], [0, 1]);
  const fadeOut = useTransform(progress, [t + 0.08, t + 0.18], [1, 0]);
  // Each stop reveals on approach and recedes once passed, so only the
  // active stop dominates the stage (the last one stays until the end).
  const entered = useTransform([fadeIn, fadeOut], ([a, b]) =>
    isLast ? (a as number) : (a as number) * (b as number),
  );
  const scale = useTransform(fadeIn, [0, 1], [0.9, 1]);
  const y = useTransform(fadeIn, [0, 1], [28, 0]);

  return (
    <div
      className={`absolute w-[46%] max-w-md -translate-y-1/2 ${
        side === "right" ? "right-[5%] text-left" : "left-[5%] text-right"
      }`}
      style={{ top: `${t * 100}%` }}
    >
      <motion.div
        style={{ opacity: reduce ? 1 : entered, scale: reduce ? 1 : scale, y: reduce ? 0 : y }}
        className="will-change-transform"
      >
        <StopContent stop={stop} index={index} side={side} />
      </motion.div>
    </div>
  );
}

export default function PathJourney() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const drawn = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.5 });
  const lineScale = reduce ? 1 : drawn;

  return (
    <section ref={ref} id="path" className="relative md:h-[520vh]">
      {/* Desktop: sticky stage, curve draws itself with scroll */}
      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <div className="absolute top-8 left-8 z-10">
          <SectionLabel>{pathSection.label}</SectionLabel>
          <h2 className="mt-3 font-display text-3xl leading-[0.9] uppercase lg:text-4xl">
            {pathSection.title[0]}
            <br />
            {pathSection.title[1]}
          </h2>
        </div>

        <svg
          viewBox="0 0 400 1000"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path d={CURVE} fill="none" stroke="var(--line)" strokeWidth="12" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path
            d={CURVE}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.18"
            strokeWidth="26"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            d={CURVE}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="12"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: reduce ? 1 : drawn }}
          />
        </svg>

        {pathSection.stops.map((stop, i) => (
          <DesktopStop key={stop.wordA + stop.wordB} stop={stop} index={i} side={SIDES[i]} progress={scrollYProgress} reduce={reduce} />
        ))}
      </div>

      {/* Mobile: simple vertical timeline, line still draws with scroll */}
      <div className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 md:hidden">
        <SectionLabel>{pathSection.label}</SectionLabel>
        <h2 className="mt-3 font-display text-3xl leading-[0.9] uppercase">
          {pathSection.title[0]} {pathSection.title[1]}
        </h2>

        <div className="relative mt-12 pl-10">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-3 w-[3px] rounded-full bg-line" />
          <motion.div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-3 w-[3px] origin-top rounded-full bg-accent"
            style={{ scaleY: lineScale }}
          />
          {pathSection.stops.map((stop, i) => (
            <motion.div
              key={stop.wordA + stop.wordB}
              initial={reduce ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-18% 0px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative pb-14 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-1 -left-[2.15rem] size-4 rounded-full border-2 border-accent bg-card"
              />
              <StopContent stop={stop} index={i} side="right" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
