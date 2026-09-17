import type { Metadata } from "next"

import {
  buildTermsOfUse,
  buildTermsOfUseMetadata,
} from "@/features/legal/components/buildTermsOfUse"
import LegalDocument from "@/features/legal/components/LegalDocument"

export const metadata: Metadata = buildTermsOfUseMetadata()

export default function TermsOfUsePage() {
  return <LegalDocument {...buildTermsOfUse()} />
}
