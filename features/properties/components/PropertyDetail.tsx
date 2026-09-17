import JsonLd from "@/components/seo/JsonLd"
import Container from "@/components/ui/Container"
import FlashImmoCardAd from "@/features/ad/components/flashimmo_card_ad/FlashImmoCardAd"
import ImmoAskMobileCardAd from "@/features/ad/components/immoask_mobile_card_ad/ImmoAskMobileCardAd"
import { buildMarketplaceSubscription } from "@/features/subscriptions/components/buildMarketplaceSubscription"
import MarketplaceSubscription from "@/features/subscriptions/components/MarketplaceSubscription"

import type {
  Property,
  PropertyDetailProps,
  PropertyGalleryBadge,
  PropertyGalleryImage,
} from "../types"
import { getProperty } from "../queries/getProperty"
import { buildPropertyDetailBreadcrumbItems, getPropertySharePath } from "./buildPropertyDetailBreadcrumb"
import { buildPropertyDetailCondition } from "./buildPropertyDetailCondition"
import { buildPropertyDetailDescription } from "./buildPropertyDetailDescription"
import { buildPropertyDetailEquipment } from "./buildPropertyDetailEquipment"
import { buildPropertyDetailInfrastructure } from "./buildPropertyDetailInfrastructure"
import { buildPropertyDetailLightFeatures } from "./buildPropertyDetailLightFeatures"
import { buildPropertyDetailLightInformation } from "./buildPropertyDetailLightInformation"
import { buildPropertyDetailLocation } from "./buildPropertyDetailLocation"
import { buildPropertyDetailPricing } from "./buildPropertyDetailPricing"
import { buildPropertyDetailRealEstateAgency } from "./buildPropertyDetailRealEstateAgency"
import { buildPropertyDetailBookFurnishedProperty } from "./buildPropertyDetailBookFurnishedProperty"
import { buildPropertyDetailJsonLd } from "./buildPropertyDetailJsonLd"
import {
  buildPropertyDetailSeoTitle,
  toMetaDescription,
} from "./buildPropertyDetailMetadata"
import { buildPropertyDetailVisitTour } from "./buildPropertyDetailVisitTour"
import PropertyDetailBookFurnishedProperty from "./PropertyDetailBookFurnishedProperty"
import PropertyDetailBreadcrumb from "./PropertyDetailBreadcrumb"
import PropertyDetailCondition from "./PropertyDetailCondition"
import PropertyDetailDescription from "./PropertyDetailDescription"
import PropertyDetailEquipment from "./PropertyDetailEquipment"
import PropertyDetailGallery from "./PropertyDetailGallery"
import PropertyDetailInfrastructure from "./PropertyDetailInfrastructure"
import PropertyDetailLightFeatures from "./PropertyDetailLightFeatures"
import PropertyDetailLightInformation from "./PropertyDetailLightInformation"
import PropertyDetailLocation from "./PropertyDetailLocation"
import PropertyDetailPricing from "./PropertyDetailPricing"
import PropertyDetailRealEstateAgency from "./PropertyDetailRealEstateAgency"
import PropertyDetailVisitTour from "./PropertyDetailVisitTour"

function toGalleryImages(
  property: Property,
  headline: string,
): PropertyGalleryImage[] {
  const fallback = headline || "Bien immobilier"

  return property.images.map((src, index) => ({
    src,
    alt: `${fallback} — photo ${index + 1}`,
  }))
}

function toGalleryBadges(badges: string[]): PropertyGalleryBadge[] {
  return badges.map((label) => ({ label }))
}

export default async function PropertyDetail({
  propertyNuo,
  country,
  transaction,
  segments,
}: PropertyDetailProps) {
  const property = await getProperty(propertyNuo)

  if (!property) {
    return (
      <Container className="py-16">
        <p className="rounded-xl border border-border bg-white px-6 py-12 text-center text-muted shadow-card">
          Bien immobilier introuvable.
        </p>
      </Container>
    )
  }

  const breadcrumbItems = buildPropertyDetailBreadcrumbItems({
    property,
    country,
    transaction,
    segments,
  })
  const sharePath = getPropertySharePath({
    property,
    country,
    transaction,
    segments,
  })
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    `${property.title} https://www.immoask.com${sharePath}`.trim(),
  )}`
  const lightInformation = buildPropertyDetailLightInformation(property)
  const lightFeatures = buildPropertyDetailLightFeatures(property)
  const description = buildPropertyDetailDescription(property)
  const condition = buildPropertyDetailCondition(property)
  const equipment = buildPropertyDetailEquipment(property)
  const location = buildPropertyDetailLocation(property)
  const infrastructure = buildPropertyDetailInfrastructure(property)
  const pricing = buildPropertyDetailPricing(property)
  const agency = buildPropertyDetailRealEstateAgency(property)
  const visitTour = buildPropertyDetailVisitTour({
    property,
    propertyHref: sharePath,
  })
  const bookFurnished = buildPropertyDetailBookFurnishedProperty({
    property,
    propertyHref: sharePath,
  })
  const subscription = buildMarketplaceSubscription(property)
  const seoTitle = buildPropertyDetailSeoTitle(property, country)
  const seoDescription =
    toMetaDescription(property.description) ??
    `${seoTitle}. Annonce immobilière vérifiée sur ImmoAsk.`

  return (
    <main>
      <JsonLd
        data={buildPropertyDetailJsonLd({
          property,
          title: seoTitle,
          description: seoDescription.slice(0, 320),
          path: sharePath,
          country,
          breadcrumbs: breadcrumbItems,
        })}
      />
      <article itemScope itemType="https://schema.org/RealEstateListing">
      <section className="border-b border-border bg-white">
        <Container className="py-4 sm:py-5">
          <PropertyDetailBreadcrumb
            items={breadcrumbItems}
            whatsappHref={whatsappHref}
          />
        </Container>
      </section>

      <section className="bg-white">
        <Container className="pt-2 pb-4 sm:pb-5">
          <PropertyDetailGallery
            images={toGalleryImages(property, lightInformation.title)}
            title={lightInformation.title}
            address={lightInformation.address}
            badges={toGalleryBadges(property.badges)}
          />
        </Container>
      </section>

      <section className="bg-white pb-16">
        <Container className="grid items-start gap-6 md:grid-cols-[minmax(0,75%)_minmax(0,25%)]">
            <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
              <PropertyDetailLightInformation {...lightInformation} />

              <PropertyDetailLightFeatures {...lightFeatures} />

              {description ? (
                <PropertyDetailDescription {...description} />
              ) : null}

              {condition ? <PropertyDetailCondition {...condition} /> : null}

              {equipment ? <PropertyDetailEquipment {...equipment} /> : null}

              {location ? <PropertyDetailLocation {...location} /> : null}

              {infrastructure ? (
                <PropertyDetailInfrastructure {...infrastructure} />
              ) : null}
            </div>

            <aside className="flex h-fit min-w-0 flex-col gap-4 sm:gap-5 md:sticky md:top-4">
              <section className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card">
                {pricing ? (
                  <PropertyDetailPricing
                    {...pricing}
                    className="rounded-none border-0 shadow-none"
                  />
                ) : null}
                <PropertyDetailVisitTour
                  {...visitTour}
                  className="rounded-none border-0 shadow-none"
                />
                {bookFurnished ? (
                  <PropertyDetailBookFurnishedProperty
                    {...bookFurnished}
                    className="rounded-none border-0 shadow-none"
                  />
                ) : null}
              </section>

              <ImmoAskMobileCardAd />

              {agency ? <PropertyDetailRealEstateAgency {...agency} /> : null}

              <FlashImmoCardAd />

              <MarketplaceSubscription {...subscription} />
            </aside>
        </Container>
      </section>
      </article>
    </main>
  )
}
