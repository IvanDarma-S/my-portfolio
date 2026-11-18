export function Marquee({
  items,
  reverse = false,
  duration = 34,
  className = "",
  itemClassName = "",
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
  itemClassName?: string;
}) {
  const group = (key: string) => (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span
          key={`${key}-${i}`}
          className={`flex items-center gap-6 pr-6 font-display text-sm tracking-[0.18em] uppercase sm:text-base ${itemClassName}`}
        >
          {item}
          <span className="text-accent" aria-hidden="true">
            •
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${className}`}>
      <p className="sr-only">{items.join(", ")}</p>
      <div
        className="marquee-track"
        aria-hidden="true"
        data-reverse={reverse}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {group("a")}
        {group("b")}
      </div>
    </div>
  );
}
