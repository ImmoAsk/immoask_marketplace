import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { cn } from "@/lib/cn"

const variants = {
  info: "border-primary/20 bg-primary-soft text-navy",
  success: "border-success/20 bg-success-soft text-success",
  warning: "border-warning/20 bg-warning-soft text-warning",
  danger: "border-danger/20 bg-danger-soft text-danger",
} as const

export type AlertProps = ComponentPropsWithoutRef<"div"> & {
  variant?: keyof typeof variants
  title?: ReactNode
}

export default function Alert({
  variant = "info",
  title,
  className,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border px-4 py-3 text-sm leading-relaxed",
        variants[variant],
        className,
      )}
      {...props}
    >
      {title ? (
        <p className="font-semibold text-current">{title}</p>
      ) : null}
      {children ? (
        <div className={title ? "mt-1 opacity-90" : undefined}>{children}</div>
      ) : null}
    </div>
  )
}
