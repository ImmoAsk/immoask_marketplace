import type { Metadata } from "next"
import type { ReactNode } from "react"

import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import { cn } from "@/lib/cn"

import {
  buildListingPageContent,
  buildListingPageMetadata,
} from "./buildListingPage"
import ListingIllustration from "./ListingIllustration"
import type {
  ListingCta,
  ListingPageContent,
  ListingRichText,
  ListingSection,
} from "./types"

export const metadata: Metadata = buildListingPageMetadata()

function RichText({ value }: { value: ListingRichText }) {
  if (typeof value === "string") {
    return <>{value}</>
  }

  return (
    <>
      {value.map((part, index) =>
        part.emphasis ? (
          <strong
            key={`${part.text}-${index}`}
            className="font-semibold text-navy"
          >
            {part.text}
          </strong>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        ),
      )}
    </>
  )
}

function SectionCta({
  cta,
  className,
}: {
  cta: ListingCta
  className?: string
}) {
  return (
    <Button
      href={cta.href}
      target="_blank"
      rel="noopener noreferrer"
      size="lg"
      className={cn(
        "mt-8 w-full shadow-sm transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto",
        className,
      )}
    >
      {cta.label}
      <span aria-hidden="true" className="text-base leading-none">
        →
      </span>
    </Button>
  )
}

function SectionBody({ section }: { section: ListingSection }) {
  return (
    <>
      {section.paragraphs?.map((paragraph, index) => (
        <p
          key={`paragraph-${section.id}-${index}`}
          className="mt-4 text-[15px] leading-relaxed text-muted first:mt-0 sm:text-base"
        >
          <RichText value={paragraph} />
        </p>
      ))}

      {section.items && section.items.length > 0 ? (
        section.id === "types-de-biens" ? (
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {section.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-medium text-navy shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-5 flex flex-col gap-2.5">
            {section.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-muted sm:text-base"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )
      ) : null}

      {section.features && section.features.length > 0 ? (
        <ul className="mt-6 flex flex-col gap-4">
          {section.features.map((feature, index) => (
            <li
              key={feature.title}
              className="flex gap-3.5 border-b border-border/80 pb-4 last:border-b-0 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-base font-bold tracking-tight text-navy">
                  {feature.title}
                </h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {section.note ? (
        <p className="mt-5 text-sm leading-relaxed text-subtle italic">
          {section.note}
        </p>
      ) : null}

      {section.closingParagraphs?.map((paragraph, index) => (
        <p
          key={`closing-${section.id}-${index}`}
          className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base"
        >
          <RichText value={paragraph} />
        </p>
      ))}
    </>
  )
}

function ListingSectionBlock({
  section,
  cta,
  index,
}: {
  section: ListingSection
  cta: ListingCta
  index: number
}) {
  const headingId = `listing-section-${section.id}`
  const imageOnRight = index % 2 === 0
  const isFinal = section.id === "appel-final"

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "listing-section border-b border-border/70",
        isFinal ? "bg-navy text-white" : index % 2 === 1 ? "bg-surface" : "bg-white",
      )}
    >
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div
            className={cn(
              "listing-reveal",
              !imageOnRight && "lg:order-2",
            )}
          >
            <p className="mb-3 text-xs font-bold tracking-[0.18em] text-primary uppercase">
              Étape {String(index + 1).padStart(2, "0")}
            </p>
            <h2
              id={headingId}
              className={cn(
                "text-2xl font-bold tracking-tight sm:text-3xl",
                isFinal ? "text-white" : "text-navy",
              )}
            >
              {section.title}
            </h2>

            <div
              className={cn(
                "mt-5",
                isFinal &&
                  "[&_h3]:text-white [&_li]:text-white/80 [&_p]:text-white/80 [&_span]:text-white/80 [&_strong]:text-white",
              )}
            >
              <SectionBody section={section} />
            </div>

            <SectionCta cta={cta} />
          </div>

          <div
            className={cn(
              "listing-reveal listing-reveal-delay",
              !imageOnRight && "lg:order-1",
            )}
          >
            <ListingIllustration
              id={section.illustration.id}
              alt={section.illustration.alt}
              className={cn(isFinal && "ring-white/15")}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

function ListingPage({ content }: { content: ListingPageContent }) {
  return (
    <div className="bg-white">
      <section className="hero-wash relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_70%_40%,color-mix(in_srgb,#0096d6_18%,transparent),transparent_62%)] lg:block"
        />
        <Container className="relative py-14 sm:py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <div className="listing-reveal max-w-xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-xs font-bold tracking-wide text-primary uppercase shadow-sm backdrop-blur">
                Application mobile ImmoAsk
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[2.85rem] lg:leading-[1.12]">
                {content.h1}
              </h1>

              <h2 className="mt-8 text-xl font-bold tracking-tight text-navy sm:text-2xl">
                {content.introTitle}
              </h2>

              <div className="mt-5">
                {content.introParagraphs.map((paragraph, index) => (
                  <p
                    key={`intro-${index}`}
                    className="mt-4 text-[15px] leading-relaxed text-muted first:mt-0 sm:text-base"
                  >
                    <RichText value={paragraph} />
                  </p>
                ))}
              </div>

              <SectionCta cta={content.cta} />
            </div>

            <div className="listing-reveal listing-reveal-delay">
              <ListingIllustration
                id={content.heroIllustration.id}
                alt={content.heroIllustration.alt}
              />
            </div>
          </div>
        </Container>
      </section>

      {content.sections.map((section, index) => (
        <ListingSectionBlock
          key={section.id}
          section={section}
          cta={content.cta}
          index={index}
        />
      ))}
    </div>
  )
}

export default function ListingRoutePage(): ReactNode {
  return <ListingPage content={buildListingPageContent()} />
}
