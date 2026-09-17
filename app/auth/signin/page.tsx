import type { Metadata } from "next"

import AccountLogin from "@/features/account/components/AccountLogin"
import Container from "@/components/ui/Container"

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre compte ImmoAsk.",
}

export default function LoginPage() {
  return (
    <div className="bg-surface py-6 sm:py-10">
      <Container>
        <AccountLogin />
      </Container>
    </div>
  )
}
