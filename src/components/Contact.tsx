import { MaskLine, Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { PillButton } from "@/components/PillButton";
import { contactSection, profile } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-peach/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 size-[40vw] min-size-64 rounded-full bg-lilac opacity-60 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-6 sm:py-32">
        <SectionLabel>{contactSection.label}</SectionLabel>

        <h2 className="mt-6 font-display text-[clamp(2.6rem,9vw,8rem)] leading-[0.88] uppercase">
          {contactSection.statement.map((line, i) => (
            <MaskLine key={line} delay={i * 0.08}>
              {line}
            </MaskLine>
          ))}
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
          <Reveal>
            <PillButton href={profile.whatsapp.href} ariaLabel="Let's talk on WhatsApp">
              Let&apos;s Talk
            </PillButton>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm font-medium sm:text-base">
              <a className="link-sweep" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <a className="link-sweep" href={profile.whatsapp.href}>
                {profile.whatsapp.display}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <p className="mt-10 max-w-md text-base leading-relaxed text-ink/70">{contactSection.note}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase">
            <span className="size-2 rounded-full bg-sage" aria-hidden="true" />
            {profile.availability}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
