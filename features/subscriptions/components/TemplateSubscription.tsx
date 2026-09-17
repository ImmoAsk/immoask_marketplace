import Container from "@/components/ui/Container"
import { cn } from "@/lib/cn"
import type { TemplateSubscriptionProps } from "@/features/subscriptions/types"

import TemplateSubscriptionColumn from "./TemplateSubscriptionColumn"
import TemplateSubscriptionConditions from "./TemplateSubscriptionConditions"

export default function TemplateSubscription({
  title,
  subtitle,
  columns,
  complementaryConditions,
  selectedColumnId,
  onSelectColumn,
  footer,
  embedded = false,
  className,
}: TemplateSubscriptionProps) {
  const Heading = embedded ? "h2" : "h1"
  const Wrapper = embedded ? "div" : Container

  return (
    <section
      className={cn(embedded ? "bg-transparent" : "bg-surface", className)}
      aria-labelledby="template-subscription-title"
    >
      <Wrapper className={embedded ? undefined : "py-10 sm:py-14"}>
        <header className="mx-auto max-w-3xl text-center">
          <Heading
            id="template-subscription-title"
            className={cn(
              "font-bold tracking-tight text-navy",
              embedded
                ? "text-lg sm:text-xl"
                : "text-2xl sm:text-3xl lg:text-4xl",
            )}
          >
            {title}
          </Heading>
          <p
            className={cn(
              "leading-relaxed text-muted",
              embedded ? "mt-2 text-sm" : "mt-4 text-sm sm:text-base",
            )}
          >
            {subtitle}
          </p>
        </header>

        {columns.length > 0 ? (
          <div
            className={cn(
              "grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-5",
              embedded ? "mt-5" : "mt-8 lg:mt-10",
            )}
          >
            {columns.map((column, index) => {
              const columnId = column.id ?? `${column.lightTitle}-${index}`

              return (
                <TemplateSubscriptionColumn
                  key={columnId}
                  {...column}
                  selected={
                    column.selected ??
                    (selectedColumnId ? columnId === selectedColumnId : false)
                  }
                  onSelect={
                    column.onSelect ??
                    (onSelectColumn ? () => onSelectColumn(columnId) : undefined)
                  }
                />
              )
            })}
          </div>
        ) : null}

        <TemplateSubscriptionConditions
          className={embedded ? "mt-5" : "mt-8 lg:mt-10"}
          {...complementaryConditions}
        />

        {footer ? (
          <div className={cn("flex justify-center", embedded ? "mt-5" : "mt-8")}>
            {footer}
          </div>
        ) : null}
      </Wrapper>
    </section>
  )
}

export { TemplateSubscription }
