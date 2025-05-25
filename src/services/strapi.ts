import { Plan } from "../types/plan"

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_URL

export async function getPlans(): Promise<Plan[]> {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/plans?populate=features`)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error('Failed to fetch plans')
    }

    return data.data.map((plan: any) => ({
      id: plan.id,
      name: plan.attributes.name,
      price: plan.attributes.price,
      description: plan.attributes.description,
      features: plan.attributes.features.map((feature: any) => ({
        included: feature.included,
        text: feature.text
      })),
      highlighted: plan.attributes.highlighted,
      stripe_price_id: plan.attributes.stripe_price_id
    }))
  } catch (error) {
    console.error('Error fetching plans:', error)
    return []
  }
} 