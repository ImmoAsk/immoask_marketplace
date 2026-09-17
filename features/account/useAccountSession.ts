"use client"

import { useEffect, useState } from "react"

import type { AccountSession } from "@/features/account/types"

import {
  ACCOUNT_SESSION_EVENT,
  readAccountSession,
} from "./session"

export function useAccountSession() {
  const [session, setSession] = useState<AccountSession | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    function sync() {
      setSession(readAccountSession())
      setReady(true)
    }

    sync()
    window.addEventListener("storage", sync)
    window.addEventListener(ACCOUNT_SESSION_EVENT, sync)

    return () => {
      window.removeEventListener("storage", sync)
      window.removeEventListener(ACCOUNT_SESSION_EVENT, sync)
    }
  }, [])

  return { session, ready }
}
