"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {useAuth} from "@/contexts/auth-context";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface Plan {
    id: string;
    name: string;
    price: number;
    description?: string;
}

interface SubscriptionModalProps {
    plan: Plan;
    isOpen: boolean;
    onClose: () => void;

}

export function SubscriptionModal({ plan, isOpen, onClose }: SubscriptionModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [paymentWindow, setPaymentWindow] = useState<Window | null>(null);
    const {isLoggedIn,fetchWithAuth} = useAuth();
    // Popup izleme için effect
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;
            if (event.data?.paymentStatus === 'completed') {
                toast.success("Ödeme başarılı!");
                onClose();
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onClose]);

    // Ödeme penceresini izle
    useEffect(() => {
        if (!paymentWindow) return;

        const checkWindow = setInterval(() => {
            if (paymentWindow.closed) {
                clearInterval(checkWindow);
                toast.info("Ödeme penceresi kapandı");
                setPaymentWindow(null);
            }
        }, 500);

        return () => clearInterval(checkWindow);
    }, [paymentWindow]);

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 16) {
            const formatted = value.replace(/(.{4})/g, "$1 ").trim();
            setCardNumber(formatted);
        }
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 4) {
            setExpiry(value.length >= 3 ? `${value.slice(0, 2)}/${value.slice(2, 4)}` : value);
        }
    };

    const validateForm = () => {
        // Kart numarası (16 haneli)
        if (!cardNumber || cardNumber.replace(/\s/g, "").length !== 16) {
            setError("Geçerli bir kart numarası giriniz (16 hane)");
            return false;
        }

        // Kart sahibi adı (en az 5 karakter)
        if (!cardName || cardName.trim().length < 5) {
            setError("Kart sahibi adı soyadı eksik (en az 5 karakter)");
            return false;
        }

        // Son kullanma tarihi (MM/YY formatında)
        if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
            setError("Son kullanma tarihi doğru formatta olmalı (MM/YY)");
            return false;
        }

        // CVC (3 veya 4 haneli)
        if (!cvc || cvc.length < 3 || cvc.length > 4) {
            setError("CVC kodu eksik (3 veya 4 hane)");
            return false;
        }

        setError(null);
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Form validasyonu
        if (!validateForm()) return;

        // Token kontrolü
        if (!isLoggedIn) {
            toast.error("Ödeme yapabilmek için giriş yapmalısınız");
            return;
        }

        setIsSubmitting(true);

        try {
            // Tarih bilgisini parçala
            const [expireMonth, expireYear] = expiry.split("/");

            // Backend'e ödeme başlatma isteği
            const response = await fetchWithAuth(`${STRAPI_API_URL}/api/payment/hash`, {
                method: "POST",
                body: JSON.stringify({
                    total: plan.price,

                }),
            });

            // HTTP hata kodlarını yakala
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Sunucu hatası: ${response.status} - ${errorText}`);
            }

            // JSON yanıtını işle
            const result = await response.json();

            // Ödeme URL kontrolü
            if (!result.paymentUrl) {
                throw new Error("Ödeme URL'si alınamadı");
            }

            // 3D Secure sayfasını yeni pencerede aç
            const newWindow = window.open(
                result.paymentUrl,
                "_blank",
                "width=500,height=700,toolbar=no,location=no,status=no"
            );

            if (!newWindow) {
                throw new Error("Popup engellendi. Lütfen tarayıcı ayarlarınızdan popup'lara izin verin.");
            }

            setPaymentWindow(newWindow);

        } catch (err: any) {
            // Hata mesajını işle
            const errorMessage = err.message || "Ödeme işlemi sırasında bir hata oluştu";

            // Detaylı hata loglama
            console.error("Ödeme Hatası:", {
                error: err,
                plan,
                card: `${cardNumber.substring(0, 6)}******${cardNumber.substring(12)}`
            });

            // Kullanıcıya bildir
            toast.error(errorMessage);

        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    {/* Başlık ve Kapatma Butonu */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">
                            {plan.name} Aboneliği
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Kapat"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Plan Bilgileri */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">Abonelik Tutarı</h3>
                            <span className="text-xl font-bold text-blue-600">
                {plan.price.toFixed(2)} TL
              </span>
                        </div>
                        {plan.description && (
                            <p className="mt-2 text-gray-600 text-sm">{plan.description}</p>
                        )}
                    </div>

                    {/* Ödeme Formu */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Kart Numarası */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kart Numarası
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    maxLength={19}
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    disabled={isSubmitting}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 3v2m10-2v2M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Kart Sahibi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kart Sahibi
                            </label>
                            <input
                                type="text"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder="Ad Soyad"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Tarih ve CVC */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Son Kullanma Tarihi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Son Kullanma Tarihi (AA/YY)
                                </label>
                                <input
                                    type="text"
                                    value={expiry}
                                    onChange={handleExpiryChange}
                                    maxLength={5}
                                    placeholder="AA/YY"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* CVC */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Güvenlik Kodu (CVC)
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value)}
                                        maxLength={4}
                                        placeholder="123"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={isSubmitting}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hata Mesajı */}
                        {error && (
                            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Ödeme Butonu */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  İşleniyor...
                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 3v2m10-2v2M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" />
                  </svg>
                  ÖDEMEYİ TAMAMLA ({plan.price.toFixed(2)} TL)
                </span>
                            )}
                        </button>

                        {/* Güvenlik Uyarısı */}
                        <div className="text-center text-xs text-gray-500 mt-4">
                            <p>Ödeme işleminiz 256-bit SSL güvenlik sertifikası ile korunmaktadır</p>
                            <div className="flex justify-center mt-2 space-x-2">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-10" />
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-10" />
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-10" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}