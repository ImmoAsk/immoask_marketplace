import Link from "next/link"

import Container from "@/components/ui/Container"
import { cn } from "@/lib/cn"
import type { LegalDocumentProps } from "@/features/legal/types"

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path
        d="M4 11 12 4.5 20 11V20H4V11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v-5h4v5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-3.5 shrink-0 text-subtle"
    >
      <path
        d="M9 6.5 15.5 12 9 17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function LegalDocument({
  title,
  updatedLabel,
  intro,
  sections,
  breadcrumb = [],
  className,
}: LegalDocumentProps) {
  return (
    <div className={cn("bg-white", className)}>
      <section className="border-b border-border">
        <Container className="py-4 sm:py-5">
          {breadcrumb.length > 0 ? (
            <nav aria-label="Fil d'Ariane">
              <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted">
                {breadcrumb.map((item, index) => {
                  const isLast = index === breadcrumb.length - 1

                  return (
                    <li
                      key={`${item.label}-${index}`}
                      className="flex shrink-0 items-center gap-1.5"
                    >
                      {index > 0 ? <ChevronIcon /> : null}

                      {item.href && !isLast ? (
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                        >
                          {index === 0 ? <HomeIcon /> : null}
                          {item.label}
                        </Link>
                      ) : (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5",
                            isLast && "font-semibold text-navy",
                          )}
                          aria-current={isLast ? "page" : undefined}
                        >
                          {index === 0 ? <HomeIcon /> : null}
                          {item.label}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ol>
            </nav>
          ) : null}
        </Container>
      </section>

      <section className="bg-surface pb-16">
        <Container className="pt-6 sm:pt-8">
          <article className="mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-card sm:p-8">
            <header>
              <h1 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                {title}
              </h1>
              {updatedLabel ? (
                <p className="mt-2 text-sm text-muted">{updatedLabel}</p>
              ) : null}
            </header>

            {intro ? (
              <p className="mt-6 text-[15px] leading-relaxed text-muted">
                {intro}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-8">
              {sections.map((section, index) => {
                const headingId = `legal-section-${index + 1}`

                return (
                  <section key={headingId} aria-labelledby={headingId}>
                    <h2
                      id={headingId}
                      className="text-lg font-bold tracking-tight text-navy"
                    >
                      <span className="text-primary">{index + 1}.</span>{" "}
                      {section.title}
                    </h2>

                    {section.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-3 text-[15px] leading-relaxed text-muted"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.items && section.items.length > 0 ? (
                      <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-muted">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}

                    {section.closingParagraphs?.map((paragraph) => (
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
          </article>
        </Container>
      </section>
    </div>
  )
}

export { LegalDocument }
