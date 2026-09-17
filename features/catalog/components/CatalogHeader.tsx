import Link from "next/link"

import { cn } from "@/lib/cn"
import type { CatalogHeaderProps } from "@/features/properties/types"

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path
        d="M4 11 12 4.5 20 11V20H4V11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v-5h4v5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-3.5 shrink-0 text-subtle"
    >
      <path
        d="M9 6.5 15.5 12 9 17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CatalogHeader({
  items,
  title = "Catalogue des biens immobiliers vérifiés",
  subtitle = "Transactions sécurisées, visites physiques certifiées et vérification des titres fonciers au Togo.",
  countLabel,
  className,
}: CatalogHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-4 sm:gap-5", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <nav aria-label="Fil d'Ariane" className="min-w-0 flex-1">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted">
            {items.map((item, index) => {
              const isLast = index === items.length - 1

              return (
                <li
                  key={`${item.label}-${index}`}
                  className="flex shrink-0 items-center gap-1.5"
                >
                  {index > 0 ? <ChevronIcon /> : null}

                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                    >
                      {index === 0 ? <HomeIcon /> : null}
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5",
                        isLast && "font-semibold text-navy",
                      )}
                      aria-current={isLast ? "page" : undefined}
                    >
                      {index === 0 ? <HomeIcon /> : null}
                      {item.label}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        {countLabel ? (
          <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-navy sm:self-auto">
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rounded-full bg-navy"
            />
            {countLabel}
          </span>
        ) : null}
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 max-w-3xl text-base text-muted sm:mt-3">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  )
}
