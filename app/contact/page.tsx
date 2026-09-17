import type { Metadata } from "next"

import Container from "@/components/ui/Container"
import ContactForm from "@/features/contact/components/ContactForm"
import {
  buildContactPageContent,
  buildContactPageMetadata,
} from "@/features/contact/components/buildContactForm"

export const metadata: Metadata = buildContactPageMetadata()

export default function ContactPage() {
  const content = buildContactPageContent()

  return (
    <div className="bg-surface">
      <section className="hero-wash border-b border-border">
        <Container className="py-12 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold tracking-[0.18em] text-primary uppercase">
              ImmoAsk
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {content.h1}
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
              {content.intro}
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-10 sm:py-14">
          <ContactForm
            className="mx-auto max-w-2xl"
            title={content.formTitle}
            submitLabel={content.submitLabel}
            subtitle="Sélectionnez l'objet de votre demande puis décrivez votre projet."
          />
        </Container>
      </section>
    </div>
  )
}
