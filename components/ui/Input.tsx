import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/cn"

export type InputProps = ComponentPropsWithoutRef<"input">

export default function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-foreground shadow-sm",
        "placeholder:text-subtle",
        "transition-colors hover:border-primary/40",
        "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-60",
        className,
      )}
      {...props}
    />
  )
}
