export type GraphQLResponse<T> = {
  data?: T
  errors?: Array<{
    message: string
  }>
}

export type LocationRecord = {
  id: string
  denomination: string | null
  code: string | null
}

export type GetCitiesVariables = {
  countryCode: string
}

export type GetDistrictsVariables = {
  townId: string
}

export interface LocationApi {
  getCities(countryCallingCode: number | string): Promise<LocationRecord[]>
  getDistricts(townId: number | string): Promise<LocationRecord[]>
}

export interface PropertyApi {
  getProperty(nuo: number): Promise<PropertyApiResponse | null>

  getProperties(
    filters: PropertyListFilters,
  ): Promise<PropertyApiResponse[]>

  getFilteringProperties(
    filters: PropertyFilteringFilters,
  ): Promise<PropertyApiResponse[]>

  getLatestProperties(options?: {
    paysId?: number
    limit?: number
    usage?: number
  }): Promise<PropertyApiResponse[]>

  getPropertyStatistics(): Promise<PropertyStatistic[]>
}

export type PropertyStatistic = {
  id: number
  denomination: string | null
  total: number
}

export type TopRealEstateAgentDistrict = {
  id: string
  denomination: string | null
  nombre_biens: number
}

export type TopRealEstateAgent = {
  id: string
  name: string | null
  avatar: string | null
  nombre_biens: number
  quartiers_couverts: TopRealEstateAgentDistrict[]
}

export type GetTopRealEstateAgentsOptions = {
  limit?: number
}

export type GetTopRealEstateAgentsData = {
  topRealEstateAgents: TopRealEstateAgentApiItem[] | null
}

export type TopRealEstateAgentDistrictApiItem = {
  id: string | number
  denomination: string | null
  nombre_biens: number | null
}

export type TopRealEstateAgentApiItem = {
  id: string | number
  name: string | null
  avatar: string | null
  nombre_biens: number | null
  quartiers_couverts: TopRealEstateAgentDistrictApiItem[] | null
}

export interface StatisticsApi {
  getTopRealEstateAgents(
    options?: GetTopRealEstateAgentsOptions,
  ): Promise<TopRealEstateAgent[]>
}

export interface PropertyListFilters {
  offreId?: number
  categoryName?: string
  cityName?: string
  districtName?: string
  categorieId?: number | string
  villeId?: number | string
  quartierId?: number | string
  paysId?: number
  usage?: number | string
  limit?: number
}

export interface PropertyFilteringFilters extends PropertyListFilters {
  bedrooms?: number
  bathrooms?: number | string
  surfaceMin?: number
  surfaceMax?: number
  budgetMin?: number
  budgetMax?: number
  depositMonths?: number | string
  parking?: number
}

export type PropertyFilteringVariables = {
  limit: number
  offreId?: string
  paysId?: number
  usage?: number
  categorieId?: string
  villeId?: string
  quartierId?: string
  piece?: number
  wcDoucheInterne?: string
  surfaceMin?: number
  surfaceMax?: number
  rentMin?: number
  rentMax?: number
  buyMin?: number
  buyMax?: number
  cautionAvance?: string
  garage?: number
}

export interface PropertyApiResponse {
  id: number
  nuo: number

  titre: string | null
  descriptif: string | null
  statut?: string | number | null
  super_categorie?: string | null
  est_disponible?: boolean | number | null
  est_meuble?: boolean | number | null
  papier_propriete?: string | null

  surface: number | null
  usage: string | null

  piece: number | null
  salon: number | null
  cuisine: number | null
  wc_douche_interne: number | null

  cout_mensuel: number | null
  cout_vente: number | null
  nuitee: number | null
  cout_visite: number | null
  caution_avance: string | number | null

  garage: number | null

  categorie_propriete: {
    id: number
    denomination: string | null
    minus_denomination: string | null
  } | null

  offre: {
    id: number
    denomination: string | null
  } | null

  pays: {
    id: number
    code: string | null
  } | null

  ville: {
    id: number
    denomination: string | null
    minus_denomination: string | null
    minus_denonimation: string | null
  } | null

  quartier: {
    id: number
    denomination: string | null
    minus_denomination: string | null
  } | null

  lat_long?: string | null

  adresse?: {
    libelle: string | null
  } | null

  infrastructures?: Array<{
    id: number | string
    denomination: string | null
    type: string | null
    icone: string | null
    lat_long: string | null
  }> | null

  visuels: Array<{
    uri: string | null
    position: number | null
  }> | null

  user?: {
    id?: string | number | null
    name: string | null
    avatar: string | null
    role?: {
      roleName: string | null
    } | null
    organisation?: {
      name_organisation: string | null
      logo: string | null
    } | null
  } | null

  badge_propriete:
    | {
        badge: {
          badge_name: string | null
          badge_image: string | null
        } | null
      }
    | Array<{
        badge: {
          badge_name: string | null
          badge_image: string | null
        } | null
      }>
    | null
}

export type JsonObject = Record<string, unknown>

export type SendTemplateEmailInput<
  TVariables extends JsonObject = JsonObject,
> = {
  to: string
  template_id: string
  subject?: string
  variables: TVariables
}

export type SendTemplateEmailVariables<
  TVariables extends JsonObject = JsonObject,
> = {
  to: string
  template_id: string
  subject?: string
  variables: TVariables
}

export type SendTemplateEmailResult = {
  email_id: string | null
  success: boolean
  message: string | null
  email_ids?: Array<string | number>
}

export type SendTemplateEmailData = {
  sendTemplateEmail: SendTemplateEmailResult | null
}

export const WELCOME_ONBOARDING_TEMPLATE_ID = "welcome_onboarding"

export type WelcomeEmailVariables = {
  userName: string
}

export type WelcomeEmailInput = {
  to: string
  userName: string
  subject?: string
}

export const NEW_VISIT_NOTIFICATION_TEMPLATE_ID = "nouvelle_visite_immobiliere"

export type NewVisitNotificationEmailVariables = {
  userName: string
  date: string
  timeVisit: string
}

export type NewVisitNotificationEmailInput = {
  to: string
  userName: string
  date: string
  timeVisit: string
  subject?: string
}

export const MAINTENANCE_NOTIFICATION_TEMPLATE_ID = "new_maintenance_immobiliere"

export type MaintenanceNotificationEmailVariables = {
  userName: string
  categorie_maintenance: string
  description: string
  image_illustration: string
}

export type MaintenanceNotificationEmailInput = {
  to: string
  userName: string
  categorie_maintenance: string
  description: string
  image_illustration: string
  subject?: string
}

export const ENCAISSEMENT_LOYER_TEMPLATE_ID = "encaissement_loyer"

export type EncaissementLoyerEmailVariables = {
  tenantName: string
  receiptPeriods: string
  landlordName: string
  landlordAddress: string
}

export type EncaissementLoyerEmailInput = {
  to: string
  tenantName: string
  receiptPeriods: string
  landlordName: string
  landlordAddress: string
  subject?: string
}

export const NEW_DEMANDE_TEMPLATE_ID = "nouvelle_demande_immobiliere"

export type NewDemandeEmailVariables = {
  userName: string
  requestDescription: string
}

export type NewDemandeEmailInput = {
  to: string
  userName: string
  requestDescription: string
  subject?: string
}

export const NEW_PROPERTY_TEMPLATE_ID = "nouveau_bien_immobilier"

export type NewPropertyEmailVariables = {
  userName: string
  title: string
  surface: string
  price: string
  property_type: string
  full_marketing_description: string
  location: string
  reference: string
  short_description: string
  canonical_link: string
  cover_image: string
  preheader: string
}

export type NewPropertyEmailInput = NewPropertyEmailVariables & {
  to: string
  subject?: string
}

export const NEW_BOOKING_PROPERTY_TEMPLATE_ID = "reservation_bien_immobilier"

export type NewBookingPropertyEmailVariables = {
  guest_first_name: string
  checkin_date: string
  checkout_date: string
  guest_count: string
  property_name: string
  bathrooms: string
  bedrooms: string
  total_price: string
  max_guests: string
  checkin_time: string
  checkout_time: string
  property_address: string
  booking_url: string
  confirmation_code: string
  support_url: string
}

export type NewBookingPropertyEmailInput = NewBookingPropertyEmailVariables & {
  to: string
  subject?: string
}

export type PayWithFedaPayInput = {
  description: string
  amount: number
  firstname: string
  lastname: string
  phone: string
  callback_url: string
  email: string
  country_code?: string
  currency?: string
}

export type PayWithFedaPayVariables = {
  input: PayWithFedaPayInput
}

export type PayWithFedaPayResult = {
  transaction_id: string | null
  success: boolean
  message: string | null
  payment_url: string | null
  raw_response: JsonObject | string | null
}

export type PayWithFedaPayData = {
  payWithFedaPay: PayWithFedaPayResult | null
}

export interface PaymentApi {
  payWithFedaPay(input: PayWithFedaPayInput): Promise<PayWithFedaPayResult>
}

export type VisiteInput = {
  date_visite: string
  heure_visite: string
  propriete_id: number
  proprietaire_id?: number
  user_id?: number
  email_visitor?: string
  telephone_visitor?: string
  fullname_visitor?: string
}

export type SaveVisitTourInput = VisiteInput

export type SaveVisitTourVariables = {
  input: VisiteInput
}

export type VisitTourUser = {
  id: string | number | null
  name: string | null
  email: string | null
  phone: string | null
}

export type VisitTourProperty = {
  id: string | number
  nuo: number | null
  titre: string | null
}

export type SaveVisitTourResult = {
  id: string | number
  date_visite: string
  heure_visite: string
  statut: number | null
  email_visitor: string | null
  telephone_visitor: string | null
  fullname_visitor: string | null
  propriete: VisitTourProperty
  visiteur: VisitTourUser | null
  proprietaire: VisitTourUser | null
}

export type SaveVisitTourData = {
  createVisite: SaveVisitTourResult | null
}

export interface VisitApi {
  saveVisitTour(
    input: SaveVisitTourInput,
    accessToken?: string | null,
  ): Promise<SaveVisitTourResult>
}

export type ReservationInput = {
  date_arrive: string
  date_depart: string
  propriete_id: number
  proprietaire_id: number
  user_id?: number
  adulte?: number
  enfant?: number
  statut?: number
  pickup_place?: string
  email_reservateur?: string
  phone_reservateur?: string
  fullname_reservateur?: string
}

export type SaveFurnishedBookingInput = ReservationInput

export type SaveFurnishedBookingVariables = {
  input: ReservationInput
}

export type FurnishedBookingUser = VisitTourUser

export type FurnishedBookingProperty = VisitTourProperty

export type SaveFurnishedBookingResult = {
  id: string | number
  date_arrive: string
  date_depart: string
  pickup_place: string | null
  email_reservateur: string | null
  phone_reservateur: string | null
  fullname_reservateur: string | null
  statut: number | null
  adulte: number | null
  enfant: number | null
  propriete: FurnishedBookingProperty
  client: FurnishedBookingUser | null
  proprietaire: FurnishedBookingUser | null
}

export type SaveFurnishedBookingData = {
  createReservation: SaveFurnishedBookingResult | null
}

export interface ReservationApi {
  saveFurnishedBooking(
    input: SaveFurnishedBookingInput,
    accessToken?: string | null,
  ): Promise<SaveFurnishedBookingResult>
}

export type ProjectInput = {
  final_date: string
  description: string
  project_category: string
  user_id?: number
  start_date?: string
  statut?: number
  project_name?: string
  project_document?: string
}

export type SendPropertyInquiryInput = ProjectInput

export type SendPropertyInquiryVariables = {
  input: ProjectInput
}

export type PropertyInquiryUser = {
  id: string | number | null
  name: string | null
  email: string | null
  phone: string | null
}

export type SendPropertyInquiryResult = {
  id: string | number
  user: PropertyInquiryUser | null
  final_date: string | null
  start_date: string | null
  statut: number | null
  description: string | null
  project_name: string | null
  project_category: string | null
  project_document: string | null
}

export type SendPropertyInquiryData = {
  createProject: SendPropertyInquiryResult | null
}

export interface InquiryApi {
  sendPropertyInquiry(
    input: SendPropertyInquiryInput,
    accessToken?: string | null,
  ): Promise<SendPropertyInquiryResult>
}

export interface EmailApi {
  sendTemplateEmail<TVariables extends JsonObject = JsonObject>(
    input: SendTemplateEmailInput<TVariables>,
  ): Promise<SendTemplateEmailResult>
  sendWelcomeEmail(input: WelcomeEmailInput): Promise<SendTemplateEmailResult>
  sendNewVisitNotificationEmail(
    input: NewVisitNotificationEmailInput,
  ): Promise<SendTemplateEmailResult>
  sendMaintenanceNotificationEmail(
    input: MaintenanceNotificationEmailInput,
  ): Promise<SendTemplateEmailResult>
  sendEncaissementLoyerEmail(
    input: EncaissementLoyerEmailInput,
  ): Promise<SendTemplateEmailResult>
  sendNewDemandeEmail(input: NewDemandeEmailInput): Promise<SendTemplateEmailResult>
  sendNewPropertyEmail(input: NewPropertyEmailInput): Promise<SendTemplateEmailResult>
  sendNewBookingPropertyEmail(
    input: NewBookingPropertyEmailInput,
  ): Promise<SendTemplateEmailResult>
}