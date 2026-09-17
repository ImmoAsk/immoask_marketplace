import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/cn"

export type SeparatorProps = ComponentPropsWithoutRef<"div"> & {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

export default function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  )
}
