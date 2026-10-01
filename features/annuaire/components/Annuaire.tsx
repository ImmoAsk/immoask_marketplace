import Link from "next/link"

import JsonLd from "@/components/seo/JsonLd"
import Container from "@/components/ui/Container"
import {
  buildAnnuaireDescription,
  buildAnnuaireJsonLd,
  buildAnnuairePath,
} from "@/features/annuaire/components/buildAnnuaireMetadata"
import AnnuaireDirectory from "@/features/annuaire/components/AnnuaireDirectory"
import type { AnnuaireProps } from "@/features/annuaire/types"
import { AUTH_SIGNUP_PATH } from "@/lib/routing/auth"

function DirectoryIllustration() {
  return (
    <svg
      viewBox="0 0 280 220"
      fill="none"
      aria-hidden="true"
      className="mx-auto h-auto w-full max-w-[16rem]"
    >
      <rect x="18" y="16" width="244" height="188" rx="28" fill="#e6f4fa" />
      <circle cx="140" cy="86" r="34" fill="#ffffff" />
      <circle cx="140" cy="78" r="16" fill="#0096d6" />
      <path
        d="M108 124c6-16 18-24 32-24s26 8 32 24"
        stroke="#0b1f3a"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <rect x="92" y="132" width="96" height="46" rx="16" fill="#ffffff" />
      <path
        d="M116 150h48M124 162h32"
        stroke="#0096d6"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Annuaire({
  countryCode,
  countryName,
  agents,
}: AnnuaireProps) {
  const path = buildAnnuairePath(countryCode)

  return (
    <div className="bg-surface">
      <JsonLd
        data={buildAnnuaireJsonLd({
          countryName,
          path,
          agents,
        })}
      />

      <Container className="py-8 sm:py-12">
        <header className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(12rem,0.6fr)]">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">
              Découvrir
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Annuaire
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {buildAnnuaireDescription(countryName)}
            </p>
          </div>
          <DirectoryIllustration />
        </header>

        <div className="mt-8">
          <AnnuaireDirectory countryCode={countryCode} agents={agents} />
        </div>

        <aside className="mt-10 w-full rounded-2xl bg-primary px-6 py-8 text-white sm:px-8 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Créer un compte ImmoAsk : Professionnel immobilier, propriétaire de biens immobiliers
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/90 sm:text-base">
                Rejoignez l&apos;annuaire au {countryName}. Présentez votre activité ou vos biens, et laissez les locataires et les acquéreurs vous trouver.
              </p>
            </div>
            <Link
              href={AUTH_SIGNUP_PATH}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary-soft"
            >
              Créer un compte
              <span aria-hidden="true" className="ml-1">
                →
              </span>
            </Link>
          </div>
        </aside>
      </Container>
    </div>
  )
}

export { Annuaire }
