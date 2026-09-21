import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { cn } from "@/lib/cn"

export type RadioProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  label?: ReactNode
}

export default function Radio({
  className,
  label,
  id,
  ...props
}: RadioProps) {
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
          type="radio"
          className="peer absolute inset-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...props}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none inline-flex size-4 items-center justify-center rounded-full border border-border bg-white shadow-sm peer-checked:border-primary peer-checked:[&>span]:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
        >
          <span className="size-2 rounded-full bg-transparent" />
        </span>
      </span>
      {label ? <span className="leading-5">{label}</span> : null}
    </label>
  )
}

export function RadioGroup({
  legend,
  className,
  optionsClassName,
  children,
  ...props
}: ComponentPropsWithoutRef<"fieldset"> & {
  legend?: ReactNode
  optionsClassName?: string
}) {
  return (
    <fieldset className={cn("min-w-0", className)} {...props}>
      {legend ? (
        <legend className="mb-2 text-sm font-semibold text-navy">
          {legend}
        </legend>
      ) : null}
      <div className={cn("flex flex-col gap-2", optionsClassName)}>
        {children}
      </div>
    </fieldset>
  )
}
