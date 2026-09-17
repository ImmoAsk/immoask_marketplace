"use client"

import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/cn"

const sizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-5xl",
} as const

export type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: keyof typeof sizes
  closeLabel?: string
  closeOnOverlayClick?: boolean
  className?: string
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",")

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  closeLabel = "Fermer",
  closeOnOverlayClick = true,
  className,
}: ModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const frame = window.requestAnimationFrame(() => {
      const firstFocusable =
        panelRef.current?.querySelector<HTMLElement>(focusableSelector)
      firstFocusable?.focus()
    })

    return () => {
      window.cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [open])

  if (!open || typeof document === "undefined") {
    return null
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation()
      onClose()
      return
    }

    if (event.key !== "Tab" || !panelRef.current) {
      return
    }

    const focusable = [
      ...panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
    ]

    if (focusable.length === 0) {
      event.preventDefault()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement

    if (event.shiftKey && active === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      onKeyDown={handleKeyDown}
    >
      <div
        className="absolute inset-0 bg-navy/45"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "relative w-full rounded-xl border border-border bg-white p-5 shadow-card sm:p-6",
          sizes[size],
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {title ? (
              <h2
                id={titleId}
                className="text-lg font-semibold tracking-tight text-navy"
              >
                {title}
              </h2>
            ) : null}

            {description ? (
              <p
                id={descriptionId}
                className="mt-1 text-sm leading-relaxed text-muted"
              >
                {description}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="size-5 stroke-current"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={title || description ? "mt-5" : undefined}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  )
}
