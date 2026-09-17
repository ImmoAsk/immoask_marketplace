import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/cn"

export type TextareaProps = ComponentPropsWithoutRef<"textarea">

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full resize-y rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm",
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
