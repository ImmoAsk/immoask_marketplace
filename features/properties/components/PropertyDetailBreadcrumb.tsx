"use client"

import Link from "next/link"
import { useState } from "react"

import { cn } from "@/lib/cn"
import type { PropertyDetailBreadcrumbProps } from "@/features/properties/types"

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

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path
        d="M12 4.5A7.5 7.5 0 0 0 6.1 16.2L5 19.5l3.4-1.05A7.5 7.5 0 1 0 12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 9.4c.2-.5.4-.5.7-.5h.6c.2 0 .4.1.5.4l.6 1.4c.1.3 0 .5-.2.7l-.4.4c-.1.1-.1.3 0 .5.3.6.8 1.1 1.4 1.4.2.1.4.1.5 0l.4-.4c.2-.2.4-.3.7-.2l1.4.6c.3.1.4.3.4.5v.6c0 .3 0 .5-.5.7A4.6 4.6 0 0 1 9.2 9.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path
        d="M12 19.5s-6.5-3.9-8.2-8.2C2.6 8.3 4.2 5.5 7.2 5.5c1.7 0 3.2 1 3.8 2.5.6-1.5 2.1-2.5 3.8-2.5 3 0 4.6 2.8 3.4 5.8C18.5 15.6 12 19.5 12 19.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PrinterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path
        d="M7 8V5.5h10V8M7 16.5H5.5A1.5 1.5 0 0 1 4 15v-4.5A1.5 1.5 0 0 1 5.5 9h13A1.5 1.5 0 0 1 20 10.5V15a1.5 1.5 0 0 1-1.5 1.5H17"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <rect
        x="7"
        y="13.5"
        width="10"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  )
}

const actionClassName = cn(
  "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-medium text-navy",
  "transition-colors hover:bg-white",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
)

export default function PropertyDetailBreadcrumb({
  items,
  whatsappHref,
  whatsappLabel = "Partager WhatsApp",
  saveLabel = "Enregistrer",
  saved = false,
  onSave,
  pdfLabel = "Fiche PDF",
  onPrintPdf,
  className,
}: PropertyDetailBreadcrumbProps) {
  const [isSaved, setIsSaved] = useState(saved)

  function handleSave() {
    setIsSaved((current) => !current)
    onSave?.()
  }

  function handlePrint() {
    if (onPrintPdf) {
      onPrintPdf()
      return
    }

    window.print()
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      <nav aria-label="Fil d'Ariane" className="min-w-0">
        <ol className="flex items-center gap-1.5 overflow-x-auto text-sm text-navy [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={`${item.label}-${index}`} className="flex shrink-0 items-center gap-1.5">
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
                    className="inline-flex items-center gap-1.5"
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

      <div className="flex flex-wrap items-center gap-2">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={actionClassName}
        >
          <WhatsAppIcon />
          {whatsappLabel}
        </a>

        <button
          type="button"
          aria-pressed={isSaved}
          onClick={handleSave}
          className={actionClassName}
        >
          <HeartIcon filled={isSaved} />
          {saveLabel}
        </button>

        <button type="button" onClick={handlePrint} className={actionClassName}>
          <PrinterIcon />
          {pdfLabel}
        </button>
      </div>
    </div>
  )
}

export { PropertyDetailBreadcrumb }
