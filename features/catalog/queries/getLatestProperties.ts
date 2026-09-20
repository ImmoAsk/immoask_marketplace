"use server"

import { propertyApi } from "@/lib/api/properties"

import { toCatalogProperty } from "./getProperties"

export async function getLatestProperties({
  paysId,
  usage,
  limit,
}: {
  paysId: number
  usage: number
  limit: number
}) {
  const properties = await propertyApi.getLatestProperties({
    paysId,
    usage,
    limit,
  })

  return properties.map(toCatalogProperty)
}
