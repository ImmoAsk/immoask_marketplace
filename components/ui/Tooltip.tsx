"use client"

import { useId, useState, type ReactNode } from "react"

import { cn } from "@/lib/cn"

export type TooltipProps = {
  content: ReactNode
  children: ReactNode
  side?: "top" | "bottom"
  className?: string
}

export default function Tooltip({
  content,
  children,
  side = "top",
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const tooltipId = useId()

  if (!content) {
    return children
  }

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocusCapture={() => setVisible(true)}
      onBlurCapture={() => setVisible(false)}
    >
      {children}
      {visible ? (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            "pointer-events-none absolute left-1/2 z-40 w-max max-w-xs -translate-x-1/2 rounded-lg bg-navy px-2.5 py-1.5 text-xs font-medium text-white shadow-card",
            side === "top" ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          {content}
        </span>
      ) : null}
    </span>
  )
}
