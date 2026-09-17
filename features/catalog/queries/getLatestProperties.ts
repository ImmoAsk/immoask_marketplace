"use server"

import { propertyApi } from "@/lib/api/properties"

import { toCatalogProperty } from "./getProperties"

export async function getLatestProperties({
  usage,
  limit = 9,
}: {
  usage?: number
  limit?: number
} = {}) {
  const properties = await propertyApi.getLatestProperties({
    usage,
    limit,
  })

  return properties.map(toCatalogProperty)
}
