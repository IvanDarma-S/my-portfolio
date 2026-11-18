import Image from "next/image";
import { MaskLine, Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { about } from "@/lib/content";

export default function About() {
  const renderLine = (line: string) => {
    const accent = about.headlineAccent;
    if (!accent || !line.includes(accent)) return line;
    const [before, after] = line.split(accent);
    return (
      <>
        {before}
        <span className="text-accent">{accent}</span>
        {after}
      </>
    );
  };

  return (
    <section id="about" className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-6 sm:py-32">
      <SectionLabel>{about.label}</SectionLabel>

      <div className="mt-10 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <h2 className="font-display text-[clamp(2.1rem,5.4vw,4.4rem)] leading-[0.94] uppercase">
            {about.headline.map((line, i) => (
              <MaskLine key={line} delay={i * 0.08}>
                {renderLine(line)}
              </MaskLine>
            ))}
          </h2>

          {about.statements.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 24)} delay={0.1 + i * 0.08}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <ul className="mt-9 flex flex-wrap gap-3">
              {about.traits.map((trait) => (
                <li
                  key={trait}
                  className="rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold shadow-soft transition-transform duration-300 hover:-translate-y-0.5 hover:rotate-1"
                >
                  {trait}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.26}>
            <dl className="mt-14 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {about.meta.map((item) => (
                <div key={item.label} className="border-t border-line pt-3">
                  <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/50">{item.label}</dt>
                  <dd className="mt-1 text-sm font-medium sm:text-base">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative -rotate-3 rounded-[2rem] bg-card p-3 pb-5 shadow-sticker transition-transform duration-500 hover:rotate-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem] bg-mint">
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 88vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-center font-mono text-[11px] tracking-[0.2em] uppercase text-ink/50">
              ivan, probably debugging
            </p>
          </div>
          <span className="absolute -top-4 -right-2 rotate-6 rounded-2xl bg-mint px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase shadow-sticker">
            est. 2020
          </span>
        </Reveal>
      </div>
    </section>
  );
}
