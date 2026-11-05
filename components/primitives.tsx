import Link from "next/link";

const metaLink =
  "font-mono text-[11px] uppercase tracking-wider text-gray-500 hover:text-ink";

export function SectionHeading({
  title,
  href,
  linkLabel,
  as: Tag = "h2",
  className = "mb-8",
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={`flex items-baseline justify-between gap-4 ${className}`}>
      <Tag className="shrink-0 whitespace-nowrap font-pixel text-sm text-gray-400">
        {title}
      </Tag>
      {href && linkLabel && (
        <Link href={href} className={`${metaLink} text-right`}>
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

export function Chip({
  children,
  size = "sm",
}: {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md";
}) {
  const sizes = {
    xs: "px-2.5 py-1 text-[11px] text-gray-600",
    sm: "px-2.5 py-1 text-[12px] text-gray-600",
    md: "px-3 py-1.5 text-[13px] text-gray-700 hover:border-gray-400 hover:text-ink",
  };
  return (
    <span
      className={`rounded-md border border-gray-200 bg-paper font-mono ${sizes[size]}`}
    >
      {children}
    </span>
  );
}

export function Pill({
  children,
  solid = false,
}: {
  children: React.ReactNode;
  solid?: boolean;
}) {
  return solid ? (
    <span className="inline-flex items-center rounded-full bg-ink px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-paper">
      {children}
    </span>
  ) : (
    <span className="rounded-full border border-gray-300 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gray-500">
      {children}
    </span>
  );
}

export function Monogram({
  value,
  size = "md",
}: {
  value: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-9 w-9 rounded-md text-[11px]",
    md: "h-12 w-12 rounded-xl text-[12px]",
    lg: "h-16 w-16 rounded-2xl text-[15px]",
  };
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center border border-gray-200 bg-paper font-pixel text-gray-600 ${sizes[size]}`}
    >
      {value}
    </span>
  );
}

export function PageShell({
  title,
  lede,
  width = "max-w-2xl",
  children,
}: {
  title: string;
  lede: string;
  width?: "max-w-2xl" | "max-w-3xl" | "max-w-4xl";
  children: React.ReactNode;
}) {
  return (
    <main id="main" className="relative z-10 lg:pl-56">
      <div className={`mx-auto ${width} px-6 py-14 sm:py-20`}>
        <header className="mb-12">
          <h1 className="reveal font-pixel text-2xl leading-none">{title}</h1>
        </header>
        <p className="reveal d1 mb-12 max-w-xl text-[15px] leading-relaxed text-gray-600">
          {lede}
        </p>
        {children}
      </div>
    </main>
  );
}

export function ExternalLinks({
  githubUrl,
  liveUrl,
  className = "",
}: {
  githubUrl?: string;
  liveUrl?: string;
  className?: string;
}) {
  if (!githubUrl && !liveUrl) return null;
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[12px] text-gray-500 ${className}`}
    >
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-ink"
        >
          source ↗
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-ink"
        >
          live ↗
        </a>
      )}
    </div>
  );
}
