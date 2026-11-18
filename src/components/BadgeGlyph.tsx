import type { BadgeIcon } from "@/lib/content";

const PATHS: Record<BadgeIcon, string> = {
  code: "M8 5 4 9l4 4M12 5l4 4-4 4",
  globe: "M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-8 8h16M10 2c2.5 2.4 3.8 5 3.8 8S12.5 15.6 10 18c-2.5-2.4-3.8-5-3.8-8S7.5 4.4 10 2Z",
  database: "M10 3c3.9 0 7 1.1 7 2.5S13.9 8 10 8 3 6.9 3 5.5 6.1 3 10 3Zm7 2.5v9c0 1.4-3.1 2.5-7 2.5s-7-1.1-7-2.5v-9M17 10c0 1.4-3.1 2.5-7 2.5S3 11.4 3 10",
  bug: "M10 6a4 4 0 0 1 4 4v3a4 4 0 0 1-8 0v-3a4 4 0 0 1 4-4Zm0 0V4m-4 6H3m14 0h-3M6 7 4.5 5.5M14 7l1.5-1.5M6 13l-2 1.5M14 13l2 1.5",
  users: "M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6 1a2.5 2.5 0 1 0 0-5M2 16c0-2.8 2.2-5 5-5s5 2.2 5 5m2.5-4.8c2 .6 3.5 2.5 3.5 4.8",
};

export function BadgeGlyph({ icon, className = "" }: { icon: BadgeIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[icon]} />
    </svg>
  );
}
