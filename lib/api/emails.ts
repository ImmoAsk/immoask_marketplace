import {
  ENCAISSEMENT_LOYER_TEMPLATE_ID,
  MAINTENANCE_NOTIFICATION_TEMPLATE_ID,
  NEW_BOOKING_PROPERTY_TEMPLATE_ID,
  NEW_DEMANDE_TEMPLATE_ID,
  NEW_PROPERTY_TEMPLATE_ID,
  NEW_VISIT_NOTIFICATION_TEMPLATE_ID,
  WELCOME_ONBOARDING_TEMPLATE_ID,
  type EmailApi,
  type EncaissementLoyerEmailInput,
  type GraphQLResponse,
  type JsonObject,
  type MaintenanceNotificationEmailInput,
  type NewBookingPropertyEmailInput,
  type NewDemandeEmailInput,
  type NewPropertyEmailInput,
  type NewVisitNotificationEmailInput,
  type SendTemplateEmailData,
  type SendTemplateEmailInput,
  type SendTemplateEmailResult,
  type SendTemplateEmailVariables,
  type WelcomeEmailInput,
} from "@/lib/api/types"

const EMAIL_API_ORIGIN = "https://immoaskprodapi.omnisoft.africa/api/v2"
const EMAIL_API_PROXY = "/immoask-api"

function emailApiUrl() {
  return typeof window === "undefined" ? EMAIL_API_ORIGIN : EMAIL_API_PROXY
}

const SEND_TEMPLATE_EMAIL_MUTATION = `
  mutation SendTemplateEmail(
    $to: String!
    $template_id: String!
    $subject: String
    $variables: MixedScalar
  ) {
    sendTemplateEmail(
      to: $to
      template_id: $template_id
      subject: $subject
      variables: $variables
    ) {
      email_id
      email_ids
      success
      message
    }
  }
`

function toSendTemplateEmailVariables<TVariables extends JsonObject>(
  input: SendTemplateEmailInput<TVariables>,
): SendTemplateEmailVariables<TVariables> {
  return {
    to: input.to,
    template_id: input.template_id,
    variables: input.variables,
    ...(input.subject != null && input.subject !== ""
      ? { subject: input.subject }
      : {}),
  }
}

async function graphqlRequest<T>(
  payload: {
    query: string
    variables: SendTemplateEmailVariables
  },
  errorLabel: string,
): Promise<T | undefined> {
  const response = await fetch(emailApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`${errorLabel}: ${response.status}`)
  }

  const result = (await response.json()) as GraphQLResponse<T>

  if (result.errors?.length) {
    throw new Error(result.errors[0].message)
  }

  return result.data
}

async function sendTemplateEmail<TVariables extends JsonObject = JsonObject>(
  input: SendTemplateEmailInput<TVariables>,
): Promise<SendTemplateEmailResult> {
  const data = await graphqlRequest<SendTemplateEmailData>(
    {
      query: SEND_TEMPLATE_EMAIL_MUTATION,
      variables: toSendTemplateEmailVariables(input),
    },
    "Send template email API request failed",
  )

  const payload = data?.sendTemplateEmail

  if (!payload) {
    throw new Error("Send template email API returned an empty response")
  }

  if (!payload.success) {
    throw new Error(payload.message || "Send template email API returned a failure")
  }

  return {
    email_id: payload.email_id ?? null,
    success: Boolean(payload.success),
    message: payload.message ?? null,
    ...(payload.email_ids?.length ? { email_ids: payload.email_ids } : {}),
  }
}

async function sendWelcomeEmail(
  input: WelcomeEmailInput,
): Promise<SendTemplateEmailResult> {
  return sendTemplateEmail({
    to: input.to,
    template_id: WELCOME_ONBOARDING_TEMPLATE_ID,
    variables: { userName: input.userName },
    subject: input.subject,
  })
}

async function sendNewVisitNotificationEmail(
  input: NewVisitNotificationEmailInput,
): Promise<SendTemplateEmailResult> {
  return sendTemplateEmail({
    to: input.to,
    template_id: NEW_VISIT_NOTIFICATION_TEMPLATE_ID,
    variables: {
      userName: input.userName,
      date: input.date,
      timeVisit: input.timeVisit,
    },
    subject: input.subject,
  })
}

async function sendMaintenanceNotificationEmail(
  input: MaintenanceNotificationEmailInput,
): Promise<SendTemplateEmailResult> {
  return sendTemplateEmail({
    to: input.to,
    template_id: MAINTENANCE_NOTIFICATION_TEMPLATE_ID,
    variables: {
      userName: input.userName,
      categorie_maintenance: input.categorie_maintenance,
      description: input.description,
      image_illustration: input.image_illustration,
    },
    subject: input.subject,
  })
}

async function sendEncaissementLoyerEmail(
  input: EncaissementLoyerEmailInput,
): Promise<SendTemplateEmailResult> {
  return sendTemplateEmail({
    to: input.to,
    template_id: ENCAISSEMENT_LOYER_TEMPLATE_ID,
    variables: {
      tenantName: input.tenantName,
      receiptPeriods: input.receiptPeriods,
      landlordName: input.landlordName,
      landlordAddress: input.landlordAddress,
    },
    subject: input.subject,
  })
}

async function sendNewDemandeEmail(
  input: NewDemandeEmailInput,
): Promise<SendTemplateEmailResult> {
  return sendTemplateEmail({
    to: input.to,
    template_id: NEW_DEMANDE_TEMPLATE_ID,
    variables: {
      userName: input.userName,
      requestDescription: input.requestDescription,
    },
    subject: input.subject,
  })
}

async function sendNewPropertyEmail(
  input: NewPropertyEmailInput,
): Promise<SendTemplateEmailResult> {
  return sendTemplateEmail({
    to: input.to,
    template_id: NEW_PROPERTY_TEMPLATE_ID,
    variables: {
      userName: input.userName,
      title: input.title,
      surface: input.surface,
      price: input.price,
      property_type: input.property_type,
      full_marketing_description: input.full_marketing_description,
      location: input.location,
      reference: input.reference,
      short_description: input.short_description,
      canonical_link: input.canonical_link,
      cover_image: input.cover_image,
      preheader: input.preheader,
    },
    subject: input.subject,
  })
}

async function sendNewBookingPropertyEmail(
  input: NewBookingPropertyEmailInput,
): Promise<SendTemplateEmailResult> {
  return sendTemplateEmail({
    to: input.to,
    template_id: NEW_BOOKING_PROPERTY_TEMPLATE_ID,
    variables: {
      guest_first_name: input.guest_first_name,
      checkin_date: input.checkin_date,
      checkout_date: input.checkout_date,
      guest_count: input.guest_count,
      property_name: input.property_name,
      bathrooms: input.bathrooms,
      bedrooms: input.bedrooms,
      total_price: input.total_price,
      max_guests: input.max_guests,
      checkin_time: input.checkin_time,
      checkout_time: input.checkout_time,
      property_address: input.property_address,
      booking_url: input.booking_url,
      confirmation_code: input.confirmation_code,
      support_url: input.support_url,
    },
    subject: input.subject,
  })
}

export const emailApi: EmailApi = {
  sendTemplateEmail,
  sendWelcomeEmail,
  sendNewVisitNotificationEmail,
  sendMaintenanceNotificationEmail,
  sendEncaissementLoyerEmail,
  sendNewDemandeEmail,
  sendNewPropertyEmail,
  sendNewBookingPropertyEmail,
}

export {
  sendTemplateEmail,
  sendWelcomeEmail,
  sendNewVisitNotificationEmail,
  sendMaintenanceNotificationEmail,
  sendEncaissementLoyerEmail,
  sendNewDemandeEmail,
  sendNewPropertyEmail,
  sendNewBookingPropertyEmail,
}
