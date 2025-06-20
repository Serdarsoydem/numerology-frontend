import { Icons } from "@/utils/icons"
import type { ContactPageAPIResponse } from "@/types/api-types"
import { Mail, Phone, MessageCircle, Facebook, Instagram } from "lucide-react"
import Link from "next/link"
import ContactMessage from "@/components/forms/contact-message"

export default async function Contact() {
    const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_URL

    if (!STRAPI_API_URL) {
        throw new Error("STRAPI_API_URL environment variable is not defined")
    }

    const contactPageInfo = await fetchContactInfo(STRAPI_API_URL)

    if (!contactPageInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="p-8 text-center text-red-600 bg-white rounded-2xl shadow-lg">
                    İletişim bilgileri şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.
                </div>
            </div>
        )
    }

    const { email, phone, socials } = contactPageInfo.data.attributes

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-slate-600 mb-6">
                    <MessageCircle className="w-4 h-4" />
                    İletişim
                </div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight py-2">
                    Buyrun Konuşalım
                </h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Kendi potansiyelinizi keşfedin, iç huzura ulaşmak için numeroloji rehberliğimizden yararlanın. Size özel bir
                    yolculuğa başlamak için bize ulaşın.
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-8">
                {/* Contact Info Cards */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Email Card */}
                    <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
                                <a
                                    href={`mailto:${email}`}
                                    className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                                >
                                    {email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Phone Card */}
                    <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Telefon Numarası</h3>
                                <a
                                    href={`tel:${phone}`}
                                    className="text-slate-600 hover:text-green-600 transition-colors duration-200 font-medium"
                                >
                                    {phone}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Card */}
                    {socials?.length > 0 && (
                        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Sosyal Medya</h3>
                            <div className="flex gap-4">
                                {socials.map((social, index) => (
                                    <div key={index} className="group">
                                        {social.link ? (
                                            <>
                                                {social.platform === "Facebook" && (
                                                    <Link
                                                        target="_blank"
                                                        href={social.link}
                                                        className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                                                    >
                                                        <div className="text-white">
                                                            <Facebook className="w-5 h-5" />
                                                        </div>
                                                    </Link>
                                                )}
                                                {social.platform === "Instagram" && (
                                                    <Link
                                                        target="_blank"
                                                        href={social.link}
                                                        className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                                                    >
                                                        <div className="text-white">
                                                            <Instagram className="w-5 h-5" />
                                                        </div>
                                                    </Link>
                                                )}
                                                {social.platform === "X" && (
                                                    <Link
                                                        target="_blank"
                                                        href={social.link}
                                                        className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                                                    >
                                                        <div className="text-white">
                                                            <Icons.twitter />
                                                        </div>
                                                    </Link>
                                                )}
                                                {social.platform === "Tiktok" && (
                                                    <Link
                                                        target="_blank"
                                                        href={social.link}
                                                        className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                                                    >
                                                        <div className="text-white">
                                                            <Icons.tiktok />
                                                        </div>
                                                    </Link>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {social.platform === "Facebook" && (
                                                    <div
                                                        title="Bağlantı bulunamadı"
                                                        className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl shadow-lg opacity-50"
                                                    >
                                                        <div className="text-white">
                                                            <Facebook className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                )}
                                                {social.platform === "Instagram" && (
                                                    <div
                                                        title="Bağlantı bulunamadı"
                                                        className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl shadow-lg opacity-50"
                                                    >
                                                        <div className="text-white">
                                                            <Instagram className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                )}
                                                {social.platform === "X" && (
                                                    <div
                                                        title="Bağlantı bulunamadı"
                                                        className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl shadow-lg opacity-50"
                                                    >
                                                        <div className="text-white">
                                                            <Icons.twitter />
                                                        </div>
                                                    </div>
                                                )}
                                                {social.platform === "Tiktok" && (
                                                    <div
                                                        title="Bağlantı bulunamadı"
                                                        className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl shadow-lg opacity-50"
                                                    >
                                                        <div className="text-white">
                                                            <Icons.tiktok />
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Decorative Element */}
                    <div className="hidden lg:block">
                        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-3xl p-8 border border-blue-200/20">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                    <MessageCircle className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Size en uygun iletişim yöntemini seçin ve numeroloji yolculuğunuza başlayın.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3">
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
                        <ContactMessage />
                    </div>
                </div>
            </div>

            {/* Bottom Decorative Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
                <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    )
}

// API'den iletişim verisini çeken fonksiyon
const fetchContactInfo = async (url: string): Promise<ContactPageAPIResponse | null> => {
    try {
        const response = await fetch(`${url}/api/contact?populate=*`, { cache: "no-store" })

        if (!response.ok) {
            console.error("Strapi API response error:", response.statusText)
            return null
        }

        return (await response.json()) as ContactPageAPIResponse
    } catch (error) {
        console.error("Strapi API fetch error:", error)
        return null
    }
}
