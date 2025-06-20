"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_URL

interface LocationComponent {
  id: string
  __component: string
  platform?: string
  url?: string
  address?: string
  district?: string
  city?: string
}

interface Event {
  id: string
  title: string
  slug: string
  description: string
  date: string
  location: LocationComponent[] | null
  capacity: number
  attendees: number
  zoomJoinUrl?: string
  image?: {
    data?: {
      attributes?: {
        url?: string
      }
    }
  }
}

function formatLocation(location: LocationComponent[] | null): string {
  if (!location || location.length === 0) return "Belirtilmedi"

  const locationData = location[0]
  if (locationData.__component === "shared.online-location") {
    return locationData.url || "Çevrimiçi etkinlik"
  } else if (locationData.__component === "shared.on-site") {
    const { address, district, city } = locationData
    return [address, district, city].filter(Boolean).join(", ")
  }

  return "Belirtilmedi"
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${STRAPI_API_URL}/api/events?populate=*`)

        if (!response.ok) {
          throw new Error("Etkinlik verileri alınamadı.")
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API yanıtı JSON formatında değil!")
        }

        const json = await response.json()

        if (!json.data || !Array.isArray(json.data)) {
          throw new Error("API yanıtında etkinlik verisi bulunamadı veya hatalı formatta.")
        }

        const mappedEvents = json.data.map((item: any) => ({
          id: item.id,
          title: item.attributes.title,
          description: item.attributes.description,
          date: item.attributes.date,
          location: item.attributes.location ?? null,
          capacity: item.attributes.capacity || 0,
          attendees: item.attributes.users?.data?.length || 0,
          zoomJoinUrl: item.attributes.zoomJoinUrl,
          image: item.attributes.image,
          slug: item.attributes.slug,
        }))

        setEvents(mappedEvents)
      } catch (err) {
        console.error("Veri çekme hatası:", err)
        setError(err instanceof Error ? err.message : "Veriler yüklenirken bir hata oluştu")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent absolute top-0 left-0 animate-pulse"></div>
            </div>
            <p className="mt-4 text-purple-600 font-medium animate-pulse">Etkinlikler yükleniyor...</p>
          </div>
        </div>
    )
  }

  if (error) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Bir Hata Oluştu</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Tekrar Dene
            </Button>
          </div>
        </div>
    )
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-fade-in-up">
                Etkinlikler
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full animate-scale-in"></div>
            </div>
            <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
              Katılabileceğiniz heyecan verici etkinlikleri keşfedin
            </p>
          </div>

          {events.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CalendarIcon className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Henüz Etkinlik Yok</h3>
                <p className="text-gray-500">Yakında heyecan verici etkinlikler eklenecek!</p>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                    <Card
                        key={event.id}
                        className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Gradient Border Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>

                      <CardHeader className="relative">
                        {event.image?.data?.attributes?.url && (
                            <div className="w-full h-48 relative mb-4 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                              <Link href={"/events/" + event.slug}>
                                <div className="absolute inset-0 w-full h-full [&>*]:w-full [&>*]:h-full [&>*]:object-cover [&>*]:object-center">
                                  <Image
                                      src={event.image.data.attributes.url || "/placeholder.svg"}
                                      alt={event.title}
                                      fill
                                      className="object-cover"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </Link>
                            </div>
                        )}
                        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 text-gray-600">
                          <div className="p-1 bg-purple-100 rounded-full">
                            <CalendarIcon className="h-4 w-4 text-purple-600" />
                          </div>
                          {new Date(event.date).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">{event.description}</p>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                            <div className="p-1 bg-green-100 rounded-full">
                              <MapPinIcon className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-700 flex-1">{formatLocation(event.location)}</span>
                          </div>

                          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                            <div className="p-1 bg-blue-100 rounded-full">
                              <UsersIcon className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-700">
                        {event.attendees} / {event.capacity} katılımcı
                      </span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                              <div
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${Math.min((event.attendees / event.capacity) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="flex justify-between items-center pt-6">
                        <Badge
                            variant="outline"
                            className={`${
                                event.attendees >= event.capacity
                                    ? "bg-red-50 text-red-700 border-red-200"
                                    : "bg-green-50 text-green-700 border-green-200"
                            } font-medium px-3 py-1`}
                        >
                          {event.attendees >= event.capacity ? "🔴 Dolu" : "🟢 Müsait"}
                        </Badge>

                        {event.zoomJoinUrl ? (
                            <a href={event.zoomJoinUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                Etkinliğe Katıl
                              </Button>
                            </a>
                        ) : (
                            <Button variant="outline" disabled className="opacity-50 cursor-not-allowed">
                              Etkinliğe Katıl
                            </Button>
                        )}
                      </CardFooter>
                    </Card>
                ))}
              </div>
          )}
        </div>

        <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
        }
      `}</style>
      </div>
  )
}
