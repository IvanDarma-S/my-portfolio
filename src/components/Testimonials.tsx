import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { testimonials } from "@/lib/content";
import { TINT_BG } from "@/lib/tints";

const TILT = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 sm:py-32">
      <SectionLabel>Fig. 05 · Kind words</SectionLabel>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure
              className={`rounded-[1.8rem] border border-line bg-card p-6 shadow-soft transition-transform duration-500 hover:-translate-y-1 ${TILT[i % TILT.length]}`}
            >
              <blockquote className="text-base leading-relaxed text-ink/80">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className={`grid size-10 place-items-center rounded-full font-display text-sm ${TINT_BG[t.tint]}`}>
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block font-mono text-[11px] tracking-[0.16em] uppercase text-ink/50">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
