import type { Metadata } from "next"

import ImmoAskPricing from "@/features/pricing/components/ImmoAskPricing"
import { buildImmoAskPricingMetadata } from "@/features/pricing/components/buildImmoAskPricing"

export const metadata: Metadata = buildImmoAskPricingMetadata()

export default function TarificationsPage() {
  return <ImmoAskPricing />
}
