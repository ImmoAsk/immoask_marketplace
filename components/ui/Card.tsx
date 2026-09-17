import type { ComponentPropsWithoutRef, ElementType } from "react"

import { cn } from "@/lib/cn"

type CardTag = "div" | "article" | "section"

type CardProps<T extends CardTag = "div"> = {
  as?: T
  interactive?: boolean
} & ComponentPropsWithoutRef<T>

export default function Card<T extends CardTag = "div">({
  as,
  interactive = false,
  className,
  ...props
}: CardProps<T>) {
  const Component = (as ?? "div") as ElementType

  return (
    <Component
      className={cn(
        "rounded-xl border border-border bg-white shadow-card",
        interactive &&
          "transition-shadow hover:border-primary/30 hover:shadow-md",
        className,
      )}
      {...props}
    />
  )
}
