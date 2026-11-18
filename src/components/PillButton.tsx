import type { ReactNode } from "react";

export function PillButton({
  href,
  children,
  variant = "solid",
  size = "md",
  ariaLabel,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: "md" | "sm";
  ariaLabel?: string;
  className?: string;
}) {
  const base = `group inline-flex items-center gap-3 rounded-full font-semibold tracking-wide transition-transform duration-300 hover:-translate-y-0.5 ${
    size === "sm" ? "py-1.5 pr-1.5 pl-4 text-xs" : "py-2.5 pr-2.5 pl-5 text-sm"
  }`;
  const skin =
    variant === "solid"
      ? "bg-ink text-bg shadow-soft hover:bg-accent hover:text-white"
      : "border border-line bg-card text-ink shadow-soft hover:border-accent";

  return (
    <a href={href} aria-label={ariaLabel} className={`${base} ${skin} ${className}`}>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`grid shrink-0 place-items-center rounded-full transition-transform duration-500 group-hover:translate-x-0.5 group-hover:rotate-45 ${
          size === "sm" ? "size-6" : "size-8"
        } ${
          variant === "solid" ? "bg-accent text-white group-hover:bg-white group-hover:text-accent" : "bg-pink text-ink"
        }`}
      >
        <svg viewBox="0 0 16 16" className={size === "sm" ? "size-3" : "size-3.5"} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 13 13 3M6 3h7v7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
