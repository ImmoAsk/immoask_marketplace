"use client"

import Link from "next/link"
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react"

import Button from "@/components/ui/Button"
import { cn } from "@/lib/cn"

export type DropdownProps = {
  label: ReactNode
  children: ReactNode
  align?: "start" | "end"
  variant?: "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function Dropdown({
  label,
  children,
  align = "end",
  variant = "outline",
  size = "sm",
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={cn("relative inline-flex", className)}>
      <Button
        variant={variant}
        size={size}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        {label}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={cn(
            "size-4 stroke-current transition-transform",
            open && "rotate-180",
          )}
        >
          <path
            d="M6 9l6 6 6-6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className={cn(
            "absolute top-full z-30 mt-2 min-w-48 rounded-xl border border-border bg-white p-1.5 shadow-card",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          <div onClick={() => setOpen(false)}>{children}</div>
        </div>
      ) : null}
    </div>
  )
}

export function DropdownItem({
  href,
  className,
  children,
  ...props
}: {
  href?: string
} & ComponentPropsWithoutRef<"button">) {
  const classes = cn(
    "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium text-navy transition-colors",
    "hover:bg-primary-soft hover:text-primary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    className,
  )

  if (href) {
    return (
      <Link href={href} role="menuitem" className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" role="menuitem" className={classes} {...props}>
      {children}
    </button>
  )
}
