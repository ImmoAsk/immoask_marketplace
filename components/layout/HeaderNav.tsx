"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import GoogleAnalytics from "@/components/analytics/GoogleAnalytics"
import { cn } from "@/lib/cn"
import Separator from "@/components/ui/Separator"
import { buildAnnuairePath } from "@/features/annuaire/components/buildAnnuaireMetadata"
import AccountAuthenticated from "@/features/account/components/AccountAuthenticated"
import { AUTH_SIGNIN_PATH, AUTH_SIGNUP_PATH, MOBILE_APP_LINK } from "@/lib/routing/auth"
import { getCountry } from "@/lib/routing/countries"

export function countryCodeFromPathname(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0] ?? ""
  return getCountry(segment)?.code ?? "tg"
}

export function getHeaderNavLinks(pathname: string) {
  return [
    {
      href: buildAnnuairePath(countryCodeFromPathname(pathname)),
      label: "Trouver un agent immobilier",
    },
    { href: "/tarifications", label: "Tarifs" },
  ]
}

export const headerAccountLinks = [
  { href: AUTH_SIGNIN_PATH, label: "Se connecter" },
  { href: AUTH_SIGNUP_PATH, label: "Créer un compte" },
] as const

export const headerAuthenticatedLinks = [
  {
    href: "/tarifications",
    label: "Mettre à jour votre abonnement",
  },
  {
    href: MOBILE_APP_LINK,
    label: "Continuer sur l'appli mobile",
    external: true,
  },
] as const

export function HeaderAnnuaireLink({ className }: { className?: string }) {
  const pathname = usePathname()
  const href = buildAnnuairePath(countryCodeFromPathname(pathname))
  const active = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        active ? "text-primary" : "text-navy",
        className,
      )}
    >
      Annuaire
    </Link>
  )
}

export default function HeaderNav() {
  const pathname = usePathname()
  const headerNavLinks = getHeaderNavLinks(pathname)

  return (
    <nav
      className="hidden items-center gap-6 lg:flex"
      aria-label="Navigation principale"
    >
      <GoogleAnalytics />
      {headerNavLinks.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`)

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              active ? "text-primary" : "text-navy",
            )}
          >
            {link.label}
          </Link>
        )
      })}

      <AccountAuthenticated variant="nav">
        <div className="flex items-center gap-3">
          {headerAccountLinks.map((link, index) => (
            <span key={link.href} className="flex items-center gap-3">
              {index > 0 ? (
                <Separator orientation="vertical" className="h-4" />
              ) : null}
              <Link
                href={link.href}
                className="text-sm font-medium text-navy transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>
      </AccountAuthenticated>
    </nav>
  )
}
