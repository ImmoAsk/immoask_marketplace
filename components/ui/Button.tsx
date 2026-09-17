import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/cn"

const variants = {
  primary:
    "bg-primary text-white shadow-sm hover:bg-primary-hover",
  outline:
    "border border-primary bg-white text-primary hover:bg-primary-soft",
  ghost: "text-primary hover:bg-primary-soft",
} as const

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm sm:h-12 sm:px-6",
} as const

type Variant = keyof typeof variants
type Size = keyof typeof sizes

const baseClassName = cn(
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-50",
)

type CommonProps = {
  variant?: Variant
  size?: Size
  pill?: boolean
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined
  }

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export default function Button({
  variant = "primary",
  size = "md",
  pill = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    baseClassName,
    pill ? "rounded-full" : "rounded-lg",
    variants[variant],
    sizes[size],
    className,
  )

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    )
  }

  const buttonProps = props as ComponentPropsWithoutRef<"button">

  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
