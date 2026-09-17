import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/cn"

export type SkeletonProps = ComponentPropsWithoutRef<"div">

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-lg bg-border", className)}
      {...props}
    />
  )
}

export { Skeleton }
