import { Marquee } from "@/components/Marquee";
import { MaskLine, Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { profile } from "@/lib/content";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-28 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-32 size-[46vw] min-size-72 rounded-full bg-pink opacity-70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-40 size-[38vw] min-size-64 rounded-full bg-mint opacity-70 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <SectionLabel>{profile.kicker}</SectionLabel>

        <h1 className="mt-6 font-display text-[clamp(1.7rem,6.5vw,5.75rem)] leading-[0.9] tracking-[-0.015em] uppercase">
          {profile.headline.map((line, i) => (
            <MaskLine key={line} delay={0.05 + i * 0.09}>
              {line}
            </MaskLine>
          ))}
        </h1>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8 pb-16">
          <Reveal delay={0.25}>
            <p className="max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">{profile.tagline}</p>
          </Reveal>
          <Reveal delay={0.35} className="hidden lg:block">
            <p className="rotate-3 rounded-3xl bg-butter px-6 py-4 font-mono text-xs tracking-[0.18em] uppercase shadow-sticker">
              open to work <span className="text-accent">✦</span> est. 2020
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative -rotate-1 scale-[1.02] border-y border-line bg-card/70 py-4">
        <Marquee items={profile.marquee} duration={30} />
      </div>
    </section>
  );
}
