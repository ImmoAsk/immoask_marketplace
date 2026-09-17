import type { Metadata } from "next"

import {
  buildPrivacyPolicy,
  buildPrivacyPolicyMetadata,
} from "@/features/legal/components/buildPrivacyPolicy"
import LegalDocument from "@/features/legal/components/LegalDocument"

export const metadata: Metadata = buildPrivacyPolicyMetadata()

export default function PrivacyPolicyPage() {
  return <LegalDocument {...buildPrivacyPolicy()} />
}
