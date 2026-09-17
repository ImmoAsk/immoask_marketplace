import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/cn"

const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
} as const

export type AvatarProps = ComponentPropsWithoutRef<"div"> & {
  src?: string
  alt?: string
  name?: string
  size?: keyof typeof sizes
}

function initials(name?: string) {
  if (!name) {
    return ""
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export default function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const fallback = initials(name)

  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-soft font-semibold text-primary",
        sizes[size],
        className,
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt || name || ""} className="size-full object-cover" />
      ) : (
        <span aria-hidden={fallback ? undefined : true}>
          {fallback || name?.[0] || ""}
        </span>
      )}
    </div>
  )
}
