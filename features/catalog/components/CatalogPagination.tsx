import Link from "next/link"

import { cn } from "@/lib/cn"
import type { CatalogPaginationProps } from "../types"

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path
        d="M14.5 6.5 9 12l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path
        d="M9.5 6.5 15 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const controlClassName = cn(
  "inline-flex items-center gap-1.5 text-sm font-medium",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
)

export default function CatalogPagination({
  from,
  to,
  total,
  items,
  previousHref,
  nextHref,
  previousLabel = "Précédent",
  nextLabel = "Suivant",
  className,
}: CatalogPaginationProps) {
  const countFormatter = new Intl.NumberFormat("fr-FR")

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-col gap-4 rounded-2xl bg-white px-5 py-4 shadow-card sm:flex-row sm:items-center sm:justify-between sm:px-6",
        className,
      )}
    >
      <p className="text-sm text-muted">
        Affichage de{" "}
        <span className="font-bold text-navy">{countFormatter.format(from)}</span>
        {" à "}
        <span className="font-bold text-navy">{countFormatter.format(to)}</span>
        {" sur "}
        <span className="font-bold text-navy">{countFormatter.format(total)}</span>{" "}
        propriétés
      </p>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {previousHref ? (
          <Link href={previousHref} className={cn(controlClassName, "text-navy")}>
            <ChevronLeftIcon />
            {previousLabel}
          </Link>
        ) : (
          <span className={cn(controlClassName, "text-subtle")}>
            <ChevronLeftIcon />
            {previousLabel}
          </span>
        )}

        <ol className="flex items-center gap-1">
          {items.map((item) => {
            if (item.type === "ellipsis") {
              return (
                <li
                  key={item.key}
                  className="px-1.5 text-sm font-medium text-muted"
                  aria-hidden="true"
                >
                  …
                </li>
              )
            }

            return (
              <li key={item.page}>
                {item.current ? (
                  <span
                    aria-current="page"
                    className="inline-flex size-10 items-center justify-center rounded-lg bg-navy text-sm font-semibold text-white"
                  >
                    {item.page}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex size-10 items-center justify-center rounded-lg text-sm font-medium text-navy",
                      "transition-colors hover:bg-surface",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    )}
                  >
                    {item.page}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>

        {nextHref ? (
          <Link href={nextHref} className={cn(controlClassName, "text-navy")}>
            {nextLabel}
            <ChevronRightIcon />
          </Link>
        ) : (
          <span className={cn(controlClassName, "text-subtle")}>
            {nextLabel}
            <ChevronRightIcon />
          </span>
        )}
      </div>
    </nav>
  )
}

export { CatalogPagination }
