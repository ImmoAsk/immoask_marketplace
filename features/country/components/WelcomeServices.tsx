"use client"

import { useState } from "react"

import ImmoAskMobileModalAd from "@/features/ad/components/immoask_mobile_modal_ad/ImmoAskMobileModalAd"
import type { WelcomeService } from "@/features/country/welcomeData"
import ServiceCard from "@/features/service_card/components/ServiceCard"

export type WelcomeServicesProps = {
  services: WelcomeService[]
}

export default function WelcomeServices({ services }: WelcomeServicesProps) {
  const [mobileAdOpen, setMobileAdOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-3">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            href={service.opensMobileAppAd ? undefined : service.href}
            onClick={
              service.opensMobileAppAd
                ? () => setMobileAdOpen(true)
                : undefined
            }
            title={service.title}
            subtitle={service.subtitle}
            icon={service.icon}
          />
        ))}
      </div>

      <ImmoAskMobileModalAd
        open={mobileAdOpen}
        onClose={() => setMobileAdOpen(false)}
      />
    </>
  )
}

export { WelcomeServices }
