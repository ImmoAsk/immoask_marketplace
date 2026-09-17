import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/cn"

const variants = {
  default: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  outline: "border border-border bg-white text-muted",
} as const

export type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: keyof typeof variants
}

export default function Badge({
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
