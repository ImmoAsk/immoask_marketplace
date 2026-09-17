"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/cn"
import type {
  CatalogFilteringInquiryProps,
  CatalogFilteringInquiryView,
} from "@/features/properties/types"

import { DEFAULT_CATALOG_SORT_OPTIONS } from "./buildCatalogFilteringInquiry"

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-3.5 shrink-0"
    >
      <path
        d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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
      className="size-4 shrink-0 text-subtle"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path
        d="M8.5 5.5 4 7.2v11.3l4.5-1.7 7 1.7 4.5-1.7V4.5L15.5 6.2 8.5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 5.5v11.3M15.5 6.2v11.3"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  )
}

function toCountLabel(resultCount: number) {
  const plural = resultCount > 1
  const count = new Intl.NumberFormat("fr-FR").format(resultCount)

  return `(${count} trouvé${plural ? "s" : ""})`
}

export default function CatalogFilteringInquiry({
  title = "Résultats : Locations & Ventes résidentielles",
  resultCount,
  countLabel,
  filtersLabel = "Filtres actifs:",
  chips = [],
  clearAllLabel = "Effacer tous les filtres",
  clearAllHref,
  sortLabel = "Trier par :",
  sortValue = "recommended",
  sortOptions = DEFAULT_CATALOG_SORT_OPTIONS,
  view = "grid",
  gridLabel = "Grille",
  mapLabel = "Carte & Split",
  onRemoveChip,
  onClearAll,
  onSortChange,
  onViewChange,
  className,
  children,
  mapView,
}: CatalogFilteringInquiryProps & {
  children?: ReactNode
  mapView?: ReactNode
}) {
  const [selectedSort, setSelectedSort] = useState(sortValue)
  const [selectedView, setSelectedView] =
    useState<CatalogFilteringInquiryView>(view)
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sortOpen) {
      return
    }

    function handlePointerDown(event: PointerEvent) {
      if (!sortRef.current?.contains(event.target as Node)) {
        setSortOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [sortOpen])
  const selectedSortLabel =
    sortOptions.find((option) => option.value === selectedSort)?.label ??
    "Recommandés"
  const resolvedCountLabel =
    countLabel ?? (resultCount == null ? undefined : toCountLabel(resultCount))
  const hasChips = chips.length > 0

  function handleSortChange(value: string) {
    setSelectedSort(value)
    onSortChange?.(value)
  }

  function handleViewChange(nextView: CatalogFilteringInquiryView) {
    setSelectedView(nextView)
    onViewChange?.(nextView)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight text-navy sm:text-xl">
            {title}
            {resolvedCountLabel ? (
              <span className="ml-2 text-sm font-normal text-muted sm:text-base">
                {resolvedCountLabel}
              </span>
            ) : null}
          </h2>

          {hasChips ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted">{filtersLabel}</span>

              {chips.map((chip) => {
                const removeLabel = `Retirer le filtre ${chip.label}`

                return (
                  <span
                    key={chip.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-sm font-medium text-navy shadow-sm"
                  >
                    {chip.label}
                    {chip.href ? (
                      <Link
                        href={chip.href}
                        aria-label={removeLabel}
                        className="rounded-full p-0.5 text-subtle transition-colors hover:bg-surface hover:text-navy"
                        onClick={() => onRemoveChip?.(chip.id)}
                      >
                        <CloseIcon />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        aria-label={removeLabel}
                        className="rounded-full p-0.5 text-subtle transition-colors hover:bg-surface hover:text-navy"
                        onClick={() => onRemoveChip?.(chip.id)}
                      >
                        <CloseIcon />
                      </button>
                    )}
                  </span>
                )
              })}

              {clearAllHref ? (
                <Link
                  href={clearAllHref}
                  className="text-sm font-medium text-primary transition-colors hover:text-primary-hover"
                  onClick={onClearAll}
                >
                  {clearAllLabel}
                </Link>
              ) : onClearAll ? (
                <button
                  type="button"
                  className="text-sm font-medium text-primary transition-colors hover:text-primary-hover"
                  onClick={onClearAll}
                >
                  {clearAllLabel}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div ref={sortRef} className="relative inline-flex shrink-0">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              aria-label={`${sortLabel} ${selectedSortLabel}`}
              onClick={() => setSortOpen((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-2 text-sm text-muted shadow-sm transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span>{sortLabel}</span>
              <span className="font-semibold text-navy">{selectedSortLabel}</span>
              <ChevronIcon />
            </button>

            {sortOpen ? (
              <div
                role="listbox"
                aria-label={sortLabel}
                className="absolute top-full right-0 z-20 mt-2 min-w-48 rounded-xl border border-border bg-white p-1.5 shadow-card"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={option.value === selectedSort}
                    onClick={() => {
                      handleSortChange(option.value)
                      setSortOpen(false)
                    }}
                    className={cn(
                      "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                      "hover:bg-primary-soft hover:text-primary",
                      option.value === selectedSort
                        ? "bg-primary-soft text-primary"
                        : "text-navy",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div
            role="group"
            aria-label="Mode d'affichage"
            className="inline-flex items-center gap-1"
          >
            <button
              type="button"
              aria-pressed={selectedView === "grid"}
              onClick={() => handleViewChange("grid")}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                selectedView === "grid"
                  ? "bg-white text-primary shadow-card"
                  : "text-muted hover:text-navy",
              )}
            >
              <GridIcon />
              {gridLabel}
            </button>
            <button
              type="button"
              aria-pressed={selectedView === "map"}
              onClick={() => handleViewChange("map")}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                selectedView === "map"
                  ? "bg-white text-primary shadow-card"
                  : "text-muted hover:text-navy",
              )}
            >
              <MapIcon />
              {mapLabel}
            </button>
          </div>
        </div>
      </div>

      {selectedView === "map"
        ? mapView
        : children}
    </div>
  )
}

export { CatalogFilteringInquiry }
