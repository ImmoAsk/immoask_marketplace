"use client"

import { useState } from "react"

import Modal from "@/components/ui/Modal"
import MarketplaceSubscriptionFeature from "@/features/subscriptions/components/MarketplaceSubscriptionFeature"
import MarketplaceSubscriptionModal from "@/features/subscriptions/components/MarketplaceSubscriptionModal"
import { DEFAULT_MARKETPLACE_SUBSCRIPTION_FEATURES } from "@/features/subscriptions/components/buildMarketplaceSubscription"
import { cn } from "@/lib/cn"

type RealEstateAgentInquiryModalProps = {
  open: boolean
  agentName: string
  onClose: () => void
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 shrink-0">
      <path
        d="M5 12h12.5M13.5 7l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 shrink-0 text-primary">
      <path
        d="M12 3.5 5.5 6.2v5.2c0 4.1 2.7 7.3 6.5 8.6 3.8-1.3 6.5-4.5 6.5-8.6V6.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 12.1 11.2 14l3.5-4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function RealEstateAgentInquiryModal({
  open,
  agentName,
  onClose,
}: RealEstateAgentInquiryModalProps) {
  const [requestOpen, setRequestOpen] = useState(false)

  function handleClose() {
    setRequestOpen(false)
    onClose()
  }

  return (
    <>
      <Modal
        open={open && !requestOpen}
        onClose={handleClose}
        size="lg"
        closeLabel="Fermer la demande"
        title={`Soumettre une demande immobilière au professionnel immobilier ${agentName}`}
        description={`Confiez votre recherche à ${agentName}. Ces propositions accompagnent votre demande personnalisée.`}
        className="max-h-[90vh] overflow-y-auto"
      >
        <ul className="flex flex-col gap-3">
          {DEFAULT_MARKETPLACE_SUBSCRIPTION_FEATURES.map((feature) => (
            <MarketplaceSubscriptionFeature
              key={`${feature.icon}-${feature.title}`}
              {...feature}
            />
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setRequestOpen(true)}
          className={cn(
            "mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white",
            "transition-colors hover:bg-navy/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
        >
          Lancer ma demande personnalisée
          <ArrowIcon />
        </button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
          <ShieldCheckIcon />
          <span>Sans engagement • Réponse garantie en moins d&apos;1h</span>
        </p>
      </Modal>

      <MarketplaceSubscriptionModal
        open={requestOpen}
        onClose={handleClose}
      />
    </>
  )
}

export { RealEstateAgentInquiryModal }
