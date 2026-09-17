import Link from "next/link"
import type { ReactNode } from "react"

import HeaderNav from "@/components/layout/HeaderNav"
import MobileMenu from "@/components/layout/MobileMenu"
import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import { cn } from "@/lib/cn"
import AccountAuthenticated from "@/features/account/components/AccountAuthenticated"

function IconCircle({
  href,
  label,
  className,
  children,
}: {
  href?: string
  label: string
  className?: string
  children: ReactNode
}) {
  const classes = cn(
    "inline-flex size-10 items-center justify-center rounded-full border border-border bg-white text-muted transition-colors",
    "hover:border-primary/40 hover:text-primary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    className,
  )

  if (href) {
    return (
      <Link href={href} aria-label={label} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" aria-label={label} className={classes}>
      {children}
    </button>
  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <Container className="flex h-16 min-w-0 items-center justify-between gap-2 sm:h-[4.5rem] sm:gap-4">
        <Link href="/" aria-label="ImmoAsk - Accueil" className="shrink-0">
          <img
            src="/images/immoask_logo.png"
            alt="ImmoAsk"
            width={472}
            height={183}
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <HeaderNav />

          <span className="hidden md:inline-flex">
            <Button href="/listing" size="sm" pill className="shadow-sm">
              <span aria-hidden="true" className="text-base leading-none">
                +
              </span>
              Lister une propriété
            </Button>
          </span>

          <span className="hidden sm:inline-flex">
            <IconCircle label="Langue">
              <span className="flex items-center gap-0.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="size-4 stroke-current"
                >
                  <circle cx="12" cy="12" r="8" strokeWidth="1.6" />
                  <path
                    d="M4 12h16M12 4c2.5 2.8 3.8 5.6 3.8 8s-1.3 5.2-3.8 8c-2.5-2.8-3.8-5.6-3.8-8S9.5 6.8 12 4Z"
                    strokeWidth="1.6"
                  />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="size-3 stroke-current"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </IconCircle>
          </span>

          <AccountAuthenticated variant="icon" />

          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}
