"use client"

import Link from "next/link"

import GoogleAnalytics from "@/components/analytics/GoogleAnalytics"
import Separator from "@/components/ui/Separator"
import { AUTH_SIGNIN_PATH, AUTH_SIGNUP_PATH, MOBILE_APP_LINK } from "@/lib/routing/auth"
import AccountAuthenticated from "@/features/account/components/AccountAuthenticated"

export const headerNavLinks = [
  { href: "/tarifications", label: "Tarifications" },
] as const

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

export default function HeaderNav() {
  return (
    <nav
      className="hidden items-center gap-6 lg:flex"
      aria-label="Navigation principale"
    >
      <GoogleAnalytics />
      {headerNavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-navy transition-colors hover:text-primary"
        >
          {link.label}
        </Link>
      ))}

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
