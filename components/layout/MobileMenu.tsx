"use client"

import { useEffect, useId, useState } from "react"
import Link from "next/link"

import {
  headerAccountLinks,
  headerNavLinks,
} from "@/components/layout/HeaderNav"
import { accountApi } from "@/lib/api/accounts"
import { AUTH_SIGNIN_PATH } from "@/lib/routing/auth"
import { clearAccountSession } from "@/features/account/session"
import { useAccountSession } from "@/features/account/useAccountSession"

const listingLink = {
  href: "/listing",
  label: "Lister une propriété",
} as const

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const { session } = useAccountSession()

  useEffect(() => {
    if (!open) {
      return
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  async function handleLogout() {
    try {
      await accountApi.logoutAccount(session?.accessToken)
    } catch {
      // Local sign-out still proceeds if the API call fails.
    } finally {
      clearAccountSession()
      setOpen(false)
      window.location.assign(AUTH_SIGNIN_PATH)
    }
  }

  const links = session
    ? [...headerNavLinks, listingLink]
    : [...headerNavLinks, ...headerAccountLinks, listingLink]

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className="flex size-10 items-center justify-center rounded-full border border-border text-navy hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 stroke-current">
            <path d="M6 6l12 12M18 6 6 18" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 stroke-current">
            <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Fermer le menu"
            className="fixed inset-0 z-40 bg-navy/25"
            onClick={() => setOpen(false)}
          />

          <nav
            id={menuId}
            aria-label="Navigation mobile"
            className="fixed inset-x-0 top-16 z-50 border-b border-border bg-white px-4 py-2 shadow-[0_16px_40px_rgb(11_31_58_/_0.16)] sm:top-[4.5rem]"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-navy hover:bg-primary-soft hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-navy hover:bg-primary-soft hover:text-primary"
              >
                Se déconnecter
              </button>
            ) : null}
          </nav>
        </>
      ) : null}
    </div>
  )
}
