import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/cn"

export type SelectProps = ComponentPropsWithoutRef<"select"> & {
  placeholder?: string
}

export default function Select({
  className,
  children,
  placeholder,
  ...props
}: SelectProps) {
  const usesPlaceholder =
    Boolean(placeholder) &&
    props.value === undefined &&
    props.defaultValue === undefined

  return (
    <div className="relative w-full">
      <select
        {...props}
        defaultValue={usesPlaceholder ? "" : props.defaultValue}
        className={cn(
          "h-10 w-full appearance-none rounded-lg border border-border bg-white px-3 pr-10 text-sm text-foreground shadow-sm",
          "transition-colors hover:border-primary/40",
          "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-60",
          className,
        )}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {children}
      </select>

      <span
        className="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center text-subtle"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-4 stroke-current"
        >
          <path
            d="M6 9l6 6 6-6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  )
}
