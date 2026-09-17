import Link from "next/link"

import Container from "@/components/ui/Container"
import Separator from "@/components/ui/Separator"

const propertyTypes = [
  { href: "/tg/ventes-immobilieres", label: "Villas et Maisons de standing" },
  { href: "/tg/locations-immobilieres", label: "Appartements et Résidences" },
  { href: "/tg/locations-immobilieres", label: "Chambres et Studios meublés" },
  { href: "/tg/ventes-immobilieres", label: "Terrains titrés et Parcelles" },
] as const

const districts = [
  { href: "/tg/locations-immobilieres", label: "Lomé Centre & Cité OUA" },
  { href: "/tg/locations-immobilieres", label: "Adidogomé & Vakpossito" },
  { href: "/tg/locations-immobilieres", label: "Agoè, Cacaveli & Totsi" },
  { href: "/tg/locations-immobilieres", label: "Baguida Plage & Avépozo" },
] as const

const legalLinks = [
  {
    href: "/toc",
    label: "Conditions Générales d'Utilisation",
  },
  {
    href: "/privacy",
    label: "Politique de Confidentialité",
  },
  {
    href: "/legal",
    label: "Mentions légales",
  },
] as const

export default function Footer() {
  return (
    <footer className="bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label="ImmoAsk - Accueil">
              <img
                src="/images/immoask_logo.png"
                alt="ImmoAsk"
                width={472}
                height={183}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              La plateforme immobilière de référence combinant rigueur
              d&apos;inspection, transparence des prix et simplicité digitale au
              Togo et en Afrique de l&apos;Ouest.
            </p>
          </div>

          <FooterColumn title="Types de biens" links={propertyTypes} />
          <FooterColumn title="Quartiers prisés" links={districts} />

          <div>
            <h2 className="text-xs font-bold tracking-wider text-navy uppercase">
              Besoin d&apos;aide ?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Nos conseillers juridiques et agents vous accompagnent pour chaque
              contrat.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Contactez notre support WhatsApp
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <Separator className="mt-12" />

        <div className="flex flex-col gap-4 pt-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ImmoAsk Inc. Tous droits réservés.
          </p>

          <nav className="flex flex-col gap-3 sm:flex-row sm:gap-8">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: readonly { href: string; label: string }[]
}) {
  return (
    <div>
      <h2 className="text-xs font-bold tracking-wider text-navy uppercase">
        {title}
      </h2>
      <nav className="mt-4 flex flex-col gap-2.5 text-sm text-muted">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
