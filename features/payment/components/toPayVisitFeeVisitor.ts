import type { AccountSession } from "@/features/account/types"
import type { PayVisitFeeVisitor } from "@/features/payment/types"

function splitVisitorName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return { firstname: "", lastname: "" }
  }

  if (parts.length === 1) {
    return { firstname: parts[0], lastname: parts[0] }
  }

  return {
    firstname: parts[0],
    lastname: parts.slice(1).join(" "),
  }
}

export function toPayVisitFeeVisitor(
  session: AccountSession | null,
): PayVisitFeeVisitor | null {
  const name = session?.user?.name?.trim() || ""
  const email = session?.user?.email?.trim() || ""
  const phone = session?.user?.phone?.trim() || ""
  const { firstname, lastname } = splitVisitorName(name)

  if (!name && !email && !phone) {
    return null
  }

  return {
    name: name || [firstname, lastname].filter(Boolean).join(" "),
    firstname,
    lastname,
    email,
    phone,
  }
}
