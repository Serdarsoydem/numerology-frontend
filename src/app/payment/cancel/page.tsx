"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import { toast } from "react-toastify"

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function PaymentCancelPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const updateSubscriptionStatus = async () => {
      const planId = searchParams.get("plan");
      const userId = searchParams.get("user");
      
      if (!planId || !userId) {
        setError("Plan veya kullanıcı bilgisi bulunamadı");
        setLoading(false);
        return;
      }

      try {
        // Burada başarısız ödeme sonrası işlemleri yapabilirsiniz
        toast.info("Ödeme işlemi iptal edildi");
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("İşlem sırasında bir hata oluştu");
        setLoading(false);
      }
    };

    updateSubscriptionStatus();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hata Oluştu</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Button onClick={() => router.push("/")}>Ana Sayfaya Dön</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 mb-4">
          <XCircle className="h-16 w-16 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Ödeme İptal Edildi</h1>
        <p className="text-gray-600 mb-8">
          Ödeme işleminiz iptal edildi. Dilediğiniz zaman tekrar deneyebilirsiniz.
        </p>
        <div className="space-x-4">
          <Button onClick={() => router.push("/subscription")} variant="outline">
            Planları İncele
          </Button>
          <Button onClick={() => router.push("/")}>Ana Sayfaya Dön</Button>
        </div>
      </div>
    </div>
  )
} 