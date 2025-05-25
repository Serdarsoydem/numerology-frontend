"use client"

import type React from "react"

import { useState } from "react"
import { X, CreditCard, Calendar, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { strapiEndpoint } from "@/utils/endpoints"

type Plan = {
  id: string
  name: string
  price: number
  description: string
  features: { included: boolean; text: string }[]
  highlighted?: boolean
}

interface SubscriptionModalProps {
  plan: Plan
  isOpen: boolean
  onClose: () => void
}

export function SubscriptionModal({ plan, isOpen, onClose }: SubscriptionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [expiry, setExpiry] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cvc, setCvc] = useState("")
  const [hashKey, setHashKey] = useState("")

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // Remove non-digits
    if (value.length <= 4) {
      if (value.length >= 2) {
        setExpiry(`${value.slice(0, 2)}/${value.slice(2)}`)
      } else {
        setExpiry(value)
      }
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // Remove non-digits
    if (value.length <= 16) {
      // Format the display value with spaces every 4 digits
      const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim()
      setCardNumber(formattedValue)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // First, get the hash_key
      const hashResponse = await fetch(`${strapiEndpoint}/payment/generate-hash`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total: plan.price.toFixed(2),
          installment: 1
        })
      })

      const { hash, invoice_id } = await hashResponse.json()
      
      if (hash) {
        // Now submit the form with the hash_key
        const form = e.target as HTMLFormElement
        
        // Update the invoice_id with the one from the response
        const invoiceInput = form.querySelector('input[name="invoice_id"]') as HTMLInputElement
        if (invoiceInput) {
          invoiceInput.value = invoice_id
        }
        
        // Add the hash key
        const hashInput = document.createElement('input')
        hashInput.type = 'hidden'
        hashInput.name = 'hash_key'
        hashInput.value = hash
        form.appendChild(hashInput)
        
        // Update card number to remove spaces
        const cardNumberInput = form.querySelector('input[name="cc_no"]') as HTMLInputElement
        if (cardNumberInput) {
          cardNumberInput.value = cardNumber.replace(/\s/g, '')
        }

        // Split name into name and surname
        const [name, ...surnameParts] = cardName.split(' ')
        const nameInput = document.createElement('input')
        nameInput.type = 'hidden'
        nameInput.name = 'name'
        nameInput.value = name
        form.appendChild(nameInput)

        const surnameInput = document.createElement('input')
        surnameInput.type = 'hidden'
        surnameInput.name = 'surname'
        surnameInput.value = surnameParts.join(' ')
        form.appendChild(surnameInput)
        
        form.submit()
      } else {
        throw new Error('Failed to get hash key')
      }
    } catch (error) {
      console.error('Payment error:', error)
      // Handle error (show error message to user)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{plan.name} Planına Abone Ol</DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-slate-600">{plan.description}</p>
              <p className="text-sm text-slate-500 mt-1">Aylık faturalandırma</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{plan.price}₺</p>
              <p className="text-sm text-slate-500">aylık</p>
            </div>
          </div>

          <form 
            action="https://provisioning.sipay.com.tr/ccpayment/api/paySmart3D" 
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input type="hidden" name="merchant_key" value={process.env.NEXT_PUBLIC_SIPAY_MERCHANT_KEY} />
            <input type="hidden" name="currency_code" value="TRY" />
            <input type="hidden" name="installments_number" value="1" />
            <input type="hidden" name="invoice_id" value={`order_${Date.now()}`} />
            <input type="hidden" name="invoice_description" value={`${plan.name} Plan Aboneliği`} />
            <input type="hidden" name="total" value={plan.price.toFixed(2)} />
            <input type="hidden" name="items" value={JSON.stringify([{ name: plan.name, price: plan.price }])} />
            <input type="hidden" name="return_url" value={`${window.location.origin}/payment/success`} />
            <input type="hidden" name="cancel_url" value={`${window.location.origin}/payment/cancel`} />
            <input type="hidden" name="is_commission_from_user" value="1" />
            <input type="hidden" name="commission_by" value="user" />
            <input type="hidden" name="order_type" value="1" />
            <input type="hidden" name="recurring_payment_number" value="12" />
            <input type="hidden" name="recurring_payment_cycle" value="M" />
            <input type="hidden" name="recurring_payment_interval" value="1" />
            <input type="hidden" name="recurring_web_hook_key" value={process.env.NEXT_PUBLIC_SIPAY_RECURRING_WEBHOOK_KEY} />

            <div className="space-y-2">
              <Label htmlFor="cc_holder_name">Kart Üzerindeki İsim</Label>
              <Input 
                id="cc_holder_name" 
                name="cc_holder_name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Ahmet Yılmaz" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cc_no">Kart Numarası</Label>
              <div className="relative">
                <Input 
                  id="cc_no" 
                  name="cc_no"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456" 
                  required 
                  className="pl-10"
                  maxLength={19} // 16 digits + 3 spaces
                />
                <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry_month">Son Kullanma Tarihi</Label>
                <div className="relative">
                  <Input 
                    id="expiry_month" 
                    name="expiry_month"
                    value={expiry.split('/')[0]}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      if (value.length <= 2) {
                        setExpiry(`${value}${expiry.split('/')[1] ? '/' + expiry.split('/')[1] : ''}`)
                      }
                    }}
                    placeholder="AA" 
                    required 
                    className="pl-10"
                    maxLength={2}
                  />
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiry_year">Yıl</Label>
                <div className="relative">
                  <Input 
                    id="expiry_year" 
                    name="expiry_year"
                    value={expiry.split('/')[1] || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      if (value.length <= 2) {
                        setExpiry(`${expiry.split('/')[0] ? expiry.split('/')[0] + '/' : ''}${value}`)
                      }
                    }}
                    placeholder="YY" 
                    required 
                    className="pl-10"
                    maxLength={2}
                  />
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVC</Label>
              <div className="relative">
                <Input 
                  id="cvv" 
                  name="cvv"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                  placeholder="123" 
                  required 
                  className="pl-10"
                  maxLength={3}
                />
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "İşleniyor..." : `Aylık ${plan.price}₺ ile Abone Ol`}
              </Button>
              <p className="text-xs text-center text-slate-500 mt-4">
                Abone olarak, Kullanım Koşullarımızı ve Gizlilik Politikamızı kabul etmiş olursunuz. Aboneliğinizi istediğiniz zaman iptal edebilirsiniz.
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
