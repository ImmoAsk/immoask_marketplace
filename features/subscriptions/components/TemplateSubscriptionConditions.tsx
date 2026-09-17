import { cn } from "@/lib/cn"
import type { TemplateSubscriptionComplementaryConditionsProps } from "@/features/subscriptions/types"

export default function TemplateSubscriptionConditions({
  title,
  items,
  className,
}: TemplateSubscriptionComplementaryConditionsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-white p-5 shadow-card sm:p-8",
        className,
      )}
      aria-labelledby="template-subscription-conditions-title"
    >
      <h2
        id="template-subscription-conditions-title"
        className="text-lg font-bold tracking-tight text-navy sm:text-xl"
      >
        {title}
      </h2>

      <div className="mt-6 flex flex-col gap-8">
        {items.map((item, index) => {
          const headingId = `template-subscription-condition-${index + 1}`

          return (
            <section key={headingId} aria-labelledby={headingId}>
              <h3
                id={headingId}
                className="text-base font-bold tracking-tight text-navy"
              >
                <span className="text-primary">{index + 1}.</span> {item.title}
              </h3>

              {item.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-[15px] leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          )
        })}
      </div>
    </section>
  )
}

export { TemplateSubscriptionConditions }
