"use client"

import { useId, useState } from "react"
import { useRouter } from "next/navigation"

import Container from "@/components/ui/Container"
import Radio, { RadioGroup } from "@/components/ui/Radio"
import { useAccountSession } from "@/features/account/useAccountSession"
import { cn } from "@/lib/cn"
import type {
  ImmoAskPricingCustomerType,
  ImmoAskPricingProps,
} from "@/features/pricing/types"
import { isImmoAskPricingCustomerType } from "@/features/pricing/types"
import AgentMarketPlaceSubscription from "@/features/subscriptions/components/AgentMarketPlaceSubscription"
import { AGENT_MARKETPLACE_SUBSCRIPTION_COLUMNS } from "@/features/subscriptions/components/buildAgentMarketPlaceSubscription"
import { LANDLORD_SUBSCRIPTION_COLUMNS } from "@/features/subscriptions/components/buildLandlordSubscription"
import { PROPERTY_SEEKERS_SUBSCRIPTION_COLUMNS } from "@/features/subscriptions/components/buildPropertySeekersSubscription"
import LandlordSubscription from "@/features/subscriptions/components/LandlordSubscription"
import PropertySeekersSubscription from "@/features/subscriptions/components/PropertySeekersSubscription"
import type { TemplateSubscriptionColumn } from "@/features/subscriptions/types"
import { AUTH_SIGNUP_PATH } from "@/lib/routing/auth"

import { buildImmoAskPricing } from "./buildImmoAskPricing"

function resolveLoggedInPlanHref(
  columns: TemplateSubscriptionColumn[],
  planId: string,
) {
  const href = columns.find((column) => column.id === planId)?.ctaHref?.trim()

  if (!href || href === AUTH_SIGNUP_PATH) {
    return "/"
  }

  return href
}

export default function ImmoAskPricing({
  title,
  subtitle,
  customerOptions,
  defaultCustomerType,
  customerType: controlledCustomerType,
  onCustomerTypeChange,
  className,
  footer,
}: ImmoAskPricingProps = {}) {
  const defaults = buildImmoAskPricing()
  const options = customerOptions ?? defaults.customerOptions
  const formId = useId()
  const router = useRouter()
  const { session, ready } = useAccountSession()
  const [uncontrolledCustomerType, setUncontrolledCustomerType] =
    useState<ImmoAskPricingCustomerType>(
      defaultCustomerType ?? defaults.defaultCustomerType,
    )

  const customerType = controlledCustomerType ?? uncontrolledCustomerType

  function selectCustomerType(next: ImmoAskPricingCustomerType) {
    if (controlledCustomerType == null) {
      setUncontrolledCustomerType(next)
    }
    onCustomerTypeChange?.(next)
  }

  function handleSelectPlan(
    columns: TemplateSubscriptionColumn[],
    planId: string,
  ) {
    if (!ready) {
      return
    }

    if (!session) {
      router.push(AUTH_SIGNUP_PATH)
      return
    }

    router.push(resolveLoggedInPlanHref(columns, planId))
  }

  return (
    <section
      className={cn("bg-surface", className)}
      aria-labelledby="immoask-pricing-title"
    >
      <Container className="py-10 sm:py-14">
        <header className="mx-auto max-w-3xl text-center">
          <h1
            id="immoask-pricing-title"
            className="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl"
          >
            {title ?? defaults.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {subtitle ?? defaults.subtitle}
          </p>
        </header>

        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-border bg-white p-5 shadow-card sm:mt-10 sm:p-6">
          <RadioGroup
            legend="Quel est votre profil ?"
            optionsClassName="!flex-row items-stretch gap-3"
          >
            {options.map((option) => {
              const inputId = `${formId}-${option.id}`

              return (
                <Radio
                  key={option.id}
                  id={inputId}
                  name={`${formId}-customer-type`}
                  value={option.id}
                  checked={customerType === option.id}
                  onChange={(event) => {
                    if (isImmoAskPricingCustomerType(event.target.value)) {
                      selectCustomerType(event.target.value)
                    }
                  }}
                  label={
                    <span className="flex flex-col gap-0.5">
                      <span className="font-medium text-navy">
                        {option.label}
                      </span>
                      {option.description ? (
                        <span className="text-xs leading-relaxed text-muted">
                          {option.description}
                        </span>
                      ) : null}
                    </span>
                  }
                  className="w-full flex-1 rounded-xl border border-transparent px-3 py-2.5 has-[:checked]:border-primary/30 has-[:checked]:bg-primary-soft/40 sm:min-w-0"
                />
              )
            })}
          </RadioGroup>
        </div>

        <div className="mt-8 sm:mt-10">
          {customerType === "chercheurs" ? (
            <PropertySeekersSubscription
              embedded
              onSelectColumn={(planId) =>
                handleSelectPlan(PROPERTY_SEEKERS_SUBSCRIPTION_COLUMNS, planId)
              }
            />
          ) : null}

          {customerType === "proprietaires" ? (
            <LandlordSubscription
              embedded
              onSelectColumn={(planId) =>
                handleSelectPlan(LANDLORD_SUBSCRIPTION_COLUMNS, planId)
              }
            />
          ) : null}

          {customerType === "professionnels" ? (
            <AgentMarketPlaceSubscription
              embedded
              onSelectColumn={(planId) =>
                handleSelectPlan(AGENT_MARKETPLACE_SUBSCRIPTION_COLUMNS, planId)
              }
            />
          ) : null}
        </div>

        {footer ? (
          <div className="mt-8 flex justify-center">{footer}</div>
        ) : null}
      </Container>
    </section>
  )
}

export { ImmoAskPricing }
