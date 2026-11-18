export function SectionLabel({ children, className = "" }: { children: string; className?: string }) {
  return (
    <p
      className={`flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-ink/60 sm:text-xs ${className}`}
    >
      <span aria-hidden="true" className="inline-block size-2 rotate-45 bg-accent" />
      {children}
    </p>
  );
}
