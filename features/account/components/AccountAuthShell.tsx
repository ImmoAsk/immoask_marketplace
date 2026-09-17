import Link from "next/link"

import { cn } from "@/lib/cn"
import type { AccountAuthShellProps } from "@/features/account/types"

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path
        d="M14 6.5 8.5 12 14 17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ErrorIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0 text-danger"
    >
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 6.5v4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="10" cy="13.6" r="0.8" fill="currentColor" />
    </svg>
  )
}

export function EyeIcon({ off }: { off?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0"
    >
      <path
        d="M3.5 12S6.8 6.5 12 6.5 20.5 12 20.5 12 17.2 17.5 12 17.5 3.5 12 3.5 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      {off ? (
        <path
          d="M4 19.5 20 4.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      ) : null}
    </svg>
  )
}

export default function AccountAuthShell({
  backHref = "/",
  backLabel = "Précédent",
  formTitle,
  headline,
  illustration,
  footer,
  children,
  className,
}: AccountAuthShellProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[28px] border border-border bg-white shadow-card",
        className,
      )}
    >
      <div className="grid lg:grid-cols-2">
        <div className="flex min-h-[28rem] flex-col justify-between px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
          <h1 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl">
            {headline}
          </h1>

          <div className="mx-auto my-10 w-full max-w-sm">{illustration}</div>

          <p className="text-sm text-muted">{footer}</p>
        </div>

        <div className="relative border-t border-border px-6 py-8 sm:px-10 sm:py-10 lg:border-l lg:border-t-0 lg:px-12 lg:py-12">
          <Link
            href={backHref}
            className="absolute right-6 top-6 inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-navy sm:right-10"
          >
            <BackIcon />
            {backLabel}
          </Link>

          <div className="mx-auto w-full max-w-md pt-8">
            {formTitle ? (
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px flex-1 bg-border" />
                <p className="text-sm font-medium text-muted">{formTitle}</p>
                <span className="h-px flex-1 bg-border" />
              </div>
            ) : null}

            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

export { AccountAuthShell }
