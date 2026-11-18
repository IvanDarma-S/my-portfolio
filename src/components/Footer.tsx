"use client";

import { Marquee } from "@/components/Marquee";
import { footerSection, profile } from "@/lib/content";
import { useWibClock } from "@/lib/useWibClock";

export default function Footer() {
  const time = useWibClock();

  return (
    <footer className="border-t border-line bg-card/60">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-8 sm:px-6">
        <p className="text-sm text-ink/60">{footerSection.credit}</p>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/60">
          {profile.location.split(",").slice(0, 2).join(",")} · WIB {time ?? "--:--"}
        </p>
      </div>
      <div className="border-t border-line bg-ink py-4 text-bg">
        <Marquee items={footerSection.marquee} reverse duration={26} itemClassName="text-bg" />
      </div>
    </footer>
  );
}
