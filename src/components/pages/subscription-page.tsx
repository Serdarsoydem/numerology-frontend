"use client";

import React, { useState, useEffect } from "react";
import { SubscriptionModal } from "./subscription-modal";
import { toast } from "react-toastify";

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
}

export default function SubscriptionPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Kullanıcı ve token örnek, gerçek projede auth context vs. kullan
  const userId = "1";
  const token = "jwt-token-ornek";

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/plans`);
        const data = await res.json();

        const formattedPlans: Plan[] = data.data.map((item: any) => ({
          id: item.id,
          name: item.attributes.name,
          price: item.attributes.price,
          description: item.attributes.description,
        }));

        setPlans(formattedPlans);
      } catch (error) {
        toast.error("Planlar yüklenirken hata oluştu.");
      }
    }
    fetchPlans();
  }, []);

  const openModalWithPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Abonelik Planları</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
              <div
                  key={plan.id}
                  className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
                  onClick={() => openModalWithPlan(plan)}
              >
                <h2 className="text-lg font-semibold">{plan.name}</h2>
                <p className="text-sm text-gray-600">{plan.description}</p>
                <p className="mt-2 font-bold">{plan.price}₺ / aylık</p>
              </div>
          ))}
        </div>

        {selectedPlan && (
            <SubscriptionModal
                plan={selectedPlan}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}

            />
        )}
      </div>
  );
}
