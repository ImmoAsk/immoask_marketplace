"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"

import Avatar from "@/components/ui/Avatar"
import { headerAuthenticatedLinks } from "@/components/layout/HeaderNav"
import { accountApi } from "@/lib/api/accounts"
import { cn } from "@/lib/cn"
import { AUTH_SIGNIN_PATH } from "@/lib/routing/auth"
import type { AccountAuthenticatedProps } from "@/features/account/types"

import { clearAccountSession, resolveAccountRoleName } from "../session"
import { useAccountSession } from "../useAccountSession"

function DefaultProfileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 stroke-current"
    >
      <circle cx="12" cy="9" r="3.2" strokeWidth="1.6" />
      <path
        d="M5.5 19c1.4-3 3.7-4.5 6.5-4.5s5.1 1.5 6.5 4.5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

const triggerClassName = cn(
  "inline-flex size-10 items-center justify-center overflow-hidden rounded-full border border-border bg-white text-muted transition-colors",
  "hover:border-primary/40 hover:text-primary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
)

export default function AccountAuthenticated({
  variant = "icon",
  className,
  children,
}: AccountAuthenticatedProps) {
  const router = useRouter()
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const { session, ready } = useAccountSession()
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  async function handleLogout() {
    setPending(true)

    try {
      await accountApi.logoutAccount(session?.accessToken)
    } catch {
      // Local sign-out still proceeds if the API call fails.
    } finally {
      clearAccountSession()
      setOpen(false)
      setPending(false)
      router.push(AUTH_SIGNIN_PATH)
      router.refresh()
    }
  }

  if (variant === "nav" && !ready) {
    return null
  }

  if (variant === "nav" && !session) {
    return children ?? null
  }

  if (!session) {
    return (
      <Link
        href={AUTH_SIGNIN_PATH}
        aria-label="Profil"
        className={cn(triggerClassName, className)}
      >
        <DefaultProfileIcon />
      </Link>
    )
  }

  const displayName = session.user.name?.trim() || "Mon compte"
  const displayRole = resolveAccountRoleName(session.user.role)
  const displayPhone = session.user.phone?.trim() || session.user.email?.trim()

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative inline-flex",
        variant === "icon" && "lg:hidden",
        className,
      )}
    >
      <button
        type="button"
        aria-label={displayName}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className={triggerClassName}
      >
        {session.user.avatarUrl ? (
          <Avatar
            src={session.user.avatarUrl}
            name={displayName}
            alt={displayName}
            size="md"
            className="size-10"
          />
        ) : (
          <Avatar name={displayName} size="md" className="size-10 border-0" />
        )}
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-border bg-white p-1.5 shadow-card"
        >
          <div
            role="menuitem"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5"
          >
            <Avatar
              src={session.user.avatarUrl ?? undefined}
              name={displayName}
              alt={displayName}
              size="md"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-navy">{displayName}</p>
              {displayRole ? (
                <p className="truncate text-xs text-primary">{displayRole}</p>
              ) : null}
              {displayPhone ? (
                <p className="truncate text-xs text-muted">{displayPhone}</p>
              ) : null}
            </div>
          </div>

          <div className="my-1 border-t border-border" />

          {headerAuthenticatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              {...("external" in link && link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              onClick={() => setOpen(false)}
              className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium text-navy transition-colors hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            role="menuitem"
            disabled={pending}
            onClick={handleLogout}
            className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium text-navy transition-colors hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          >
            Se déconnecter
          </button>
        </div>
      ) : null}
    </div>
  )
}

export { AccountAuthenticated }
