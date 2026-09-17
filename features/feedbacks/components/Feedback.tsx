"use client"

import { useId } from "react"

import Button from "@/components/ui/Button"
import { cn } from "@/lib/cn"
import type { FeedbackProps } from "@/features/feedbacks/types"

export default function Feedback({
  status,
  title,
  subtitle,
  image_illustration,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
}: FeedbackProps) {
  const titleId = useId()
  const subtitleId = useId()

  return (
    <section
      className={cn(
        "flex flex-col items-center px-2 py-4 text-center sm:px-6 sm:py-8",
        className,
      )}
      data-status={status}
      aria-labelledby={titleId}
      aria-describedby={subtitleId}
    >
      <div className="w-full max-w-[16rem]" aria-hidden={true}>
        {image_illustration}
      </div>

      <h2
        id={titleId}
        className="mt-6 text-2xl font-bold tracking-tight text-navy sm:text-3xl"
      >
        {title}
      </h2>

      <p
        id={subtitleId}
        className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base"
      >
        {subtitle}
      </p>

      {actionLabel || secondaryActionLabel ? (
        <div className="mt-8 flex w-full max-w-sm flex-col gap-2">
          {actionLabel ? (
            <Button type="button" size="lg" onClick={onAction}>
              {actionLabel}
            </Button>
          ) : null}

          {secondaryActionLabel ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onSecondaryAction}
            >
              {secondaryActionLabel}
            </Button>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}

export { Feedback }
