export type PlanFeature = {
  included: boolean
  text: string
}

export type Plan = {
  id: string
  name: string
  price: number
  description: string
  features: PlanFeature[]
  highlighted?: boolean
  stripe_price_id?: string
} 