"use client";

import { PillButton } from "@/components/PillButton";
import { profile } from "@/lib/content";
import { useWibClock } from "@/lib/useWibClock";

export default function Header() {
  const time = useWibClock();

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 sm:px-6">
      <div className="relative mx-auto mt-3 flex max-w-[1400px] items-center justify-between gap-2 rounded-full border border-line bg-bg/85 py-2 pr-2 pl-2 shadow-soft backdrop-blur-md sm:pl-4">
        <a
          href="#about"
          className="rounded-full border border-line bg-card px-4 py-2 text-xs font-semibold tracking-wide transition-colors hover:bg-pink"
        >
          Tentang
        </a>

        <a
          href="#home"
          aria-label="Back to top"
          className="absolute left-1/2 -translate-x-1/2 font-display text-base tracking-tight uppercase sm:text-lg"
        >
          {profile.initials}
          <span className="text-accent" aria-hidden="true">
            .
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-line bg-card px-3 py-2 font-mono text-[11px] tracking-[0.14em] uppercase md:flex">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-sage" />
            </span>
            WIB {time ?? "--:--"}
          </span>
          <PillButton href={profile.whatsapp.href} size="sm" ariaLabel="Let's talk on WhatsApp">
            Let&apos;s Talk
          </PillButton>
        </div>
      </div>
    </header>
  );
}
