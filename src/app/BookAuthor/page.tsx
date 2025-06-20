"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { UserIcon, BookOpenIcon, PencilIcon } from "@heroicons/react/24/outline"

interface Author {
    id: number
    name: string
    description: string
    image?: {
        data?: {
            attributes?: {
                url?: string
            }
        } | null
    } | null
}

const baseUrl = "http://localhost:1337"

export default function BookAuthorPage() {
    const [authors, setAuthors] = useState<Author[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${baseUrl}/api/book-authors?populate=*`)
            .then((res) => res.json())
            .then((data) => {
                const formatted: Author[] = data.data.map((item: any) => ({
                    id: item.id,
                    name: item.attributes.AuthorName,
                    description: item.attributes.Description,
                    image: item.attributes.Image ?? null,
                }))
                setAuthors(formatted)
                setLoading(false)
            })
            .catch((err) => {
                console.error("Veri çekme hatası:", err)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent absolute top-0 left-0"></div>
                    </div>
                    <p className="mt-4 text-purple-700 font-medium animate-pulse">Yazarlar yükleniyor...</p>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Floating Book Icons */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-12 h-12 text-purple-300/30 animate-float">
                    <BookOpenIcon className="w-full h-full" />
                </div>
                <div className="absolute top-40 right-32 w-10 h-10 text-blue-300/30 animate-float animation-delay-1000">
                    <PencilIcon className="w-full h-full" />
                </div>
                <div className="absolute bottom-32 right-20 w-14 h-14 text-indigo-300/30 animate-float animation-delay-2000">
                    <UserIcon className="w-full h-full" />
                </div>
            </div>

            <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-block">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-purple-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
                            Yazarlar
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-500 mx-auto rounded-full"></div>
                    </div>
                    <p className="text-purple-700 mt-6 text-lg max-w-2xl mx-auto font-light">
                        Eserlerini sizlerle buluşturan değerli yazarlarımızı keşfedin
                    </p>
                </div>

                {/* Authors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {authors.map((author, index) => {
                        const imageUrlRaw = author.image?.data?.attributes?.url
                        const imageUrl = imageUrlRaw?.startsWith("http") ? imageUrlRaw : imageUrlRaw ? baseUrl + imageUrlRaw : null

                        return (
                            <div
                                key={author.id}
                                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-white/20 animate-fade-in-up"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                {/* Gradient Border Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>

                                {/* Image Section */}
                                <div className="relative">
                                    {imageUrl ? (
                                        <div className="w-full h-64 relative overflow-hidden rounded-t-2xl">
                                            <div className="absolute inset-0 w-full h-full [&>*]:w-full [&>*]:h-full [&>*]:object-cover [&>*]:object-center">
                                                <Image
                                                    src={imageUrl || "/placeholder.svg"}
                                                    alt={author.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    priority
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-blue-100 rounded-t-2xl flex items-center justify-center">
                                            <UserIcon className="w-20 h-20 text-purple-400" />
                                        </div>
                                    )}

                                    {/* Author Badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-700 border border-purple-200">
                                        ✍️ Yazar
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">{author.name.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                                            {author.name}
                                        </h2>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed text-sm mb-4">{author.description}</p>

                                    {/* Author Stats */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <BookOpenIcon className="w-4 h-4" />
                                            <span>Kitap Yazarı</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-60"
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Effect Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        )
                    })}
                </div>

                {/* Empty State */}
                {authors.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <UserIcon className="w-12 h-12 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Henüz Yazar Eklenmemiş</h3>
                        <p className="text-gray-500">Yakında değerli yazarlarımızı burada görebileceksiniz!</p>
                    </div>
                )}
            </section>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
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
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </main>
    )
}
