"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SubscriptionModal } from "@/components/pages/subscription-modal"
import { getPlans } from "@/services/strapi"
import { Plan } from "@/types/plan"

export function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPlans = async () => {
      const fetchedPlans = await getPlans()
      setPlans(fetchedPlans)
      setIsLoading(false)
    }

    fetchPlans()
  }, [])

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p>Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Planınızı Seçin</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          İhtiyaçlarınıza uygun abonelik planını seçin. Tüm planlar farklı erişim seviyelerinde temel özelliklerimizi içerir.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative overflow-hidden ${plan.highlighted ? "border-primary shadow-lg" : "border-slate-200"}`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                Popüler
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{plan.price}₺</span>
                <span className="text-slate-500 ml-1">/ay</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`mr-2 mt-1 ${feature.included ? "text-green-500" : "text-slate-300"}`}>
                      <Check size={16} />
                    </span>
                    <span className={feature.included ? "text-slate-700" : "text-slate-400"}>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full ${plan.highlighted ? "bg-primary hover:bg-primary/90" : ""}`}
              >
                Hemen Abone Ol
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedPlan && (
        <SubscriptionModal plan={selectedPlan} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
