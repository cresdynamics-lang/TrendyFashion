import Link from "next/link";

export type Crumb = { label: string; href?: string };

function humanize(segment: string) {
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Build crumbs for a category path: Home › Shoes › Officials › Monk straps */
export function crumbsForPath(segments: string[]): Crumb[] {
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }];
  let href = "";
  segments.forEach((seg, i) => {
    href += `/${seg}`;
    const isLast = i === segments.length - 1;
    crumbs.push({
      label: humanize(seg),
      href: isLast ? undefined : href,
    });
  });
  return crumbs;
}

/** Category path + product name on the PDP. */
export function crumbsForProduct(
  category: string[],
  productName: string,
): Crumb[] {
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }];
  let href = "";
  category.forEach((seg) => {
    href += `/${seg}`;
    crumbs.push({ label: humanize(seg), href });
  });
  crumbs.push({ label: productName });
  return crumbs;
}

export function Breadcrumbs({
  items,
  tone = "muted",
}: {
  items: Crumb[];
  tone?: "muted" | "light";
}) {
  const text = tone === "light" ? "text-white/60" : "text-muted";
  const link =
    tone === "light"
      ? "text-white/80 hover:text-white"
      : "text-slate-600 hover:text-navy";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-xs uppercase tracking-[0.14em] ${text}`}
    >
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li
              key={`${item.label}-${i}`}
              className="flex items-center gap-1.5"
            >
              {i > 0 && <span aria-hidden="true">›</span>}
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={`font-semibold underline-offset-2 hover:underline ${link}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    last
                      ? tone === "light"
                        ? "text-white"
                        : "text-navy"
                      : undefined
                  }
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
