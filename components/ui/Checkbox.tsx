import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { cn } from "@/lib/cn"

export type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  label?: ReactNode
}

export default function Checkbox({
  className,
  label,
  id,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={cn(
        "inline-flex items-start gap-2.5 text-sm text-navy",
        props.disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <span className="relative mt-0.5 inline-flex size-4 shrink-0">
        <input
          id={id}
          type="checkbox"
          className="peer absolute inset-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...props}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none inline-flex size-4 items-center justify-center rounded-[5px] border border-border bg-white text-white shadow-sm peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
        >
          <svg viewBox="0 0 16 16" fill="none" className="size-3 stroke-current">
            <path
              d="M3.5 8.5l3 3 6-7"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      {label ? <span className="leading-5">{label}</span> : null}
    </label>
  )
}
