"use client"

import Link from "next/link"
import BlogLayoutList from "@/components/layouts/blog-layout-list"
import type { ResourceResponseTypeAPIList } from "@/types/api-types"
import { resourceNameMap } from "@/utils/constants"

const ListResources = ({
                           resourceName,
                           resources,
                       }: {
    resourceName: "newses" | "interviews" | "blogs" | "services" | "events"
    resources: ResourceResponseTypeAPIList
}) => {
    const formatDate = (dateString?: string) => {
        if (!dateString) return "Tarih Yok"
        try {
            return new Date(dateString).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        } catch {
            return "Geçersiz Tarih"
        }
    }

    const getAuthorName = (author: any) => {
        if (!author) return ""

        // Handle different Strapi data structures
        if (typeof author === "string") return author

        // Handle populated author relationship
        if (author?.data?.attributes?.name) return author.data.attributes.name
        if (author?.data?.attributes?.firstName && author?.data?.attributes?.lastName) {
            return `${author.data.attributes.firstName} ${author.data.attributes.lastName}`
        }
        if (author?.data?.attributes?.firstName) return author.data.attributes.firstName

        // Handle direct author object
        if (author?.attributes?.name) return author.attributes.name
        if (author?.attributes?.firstName && author?.attributes?.lastName) {
            return `${author.attributes.firstName} ${author.attributes.lastName}`
        }
        if (author?.attributes?.firstName) return author.attributes.firstName

        // Handle simple object
        if (author?.name) return author.name
        if (author?.firstName && author?.lastName) return `${author.firstName} ${author.lastName}`
        if (author?.firstName) return author.firstName

        return ""
    }

    return (
        <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-b from-amber-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-block">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-2 relative">
                            {resourceNameMap[resourceName]}
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full"></div>
                        </h2>
                    </div>
                    <p className="text-amber-700 mt-6 text-lg font-light max-w-2xl mx-auto">
                        Keşfetmeye değer içeriklerimizi inceleyin
                    </p>
                </div>

                {/* All Articles Grid - Compact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {resources.data.map((resource) => (
                        <article
                            key={resource.id}
                            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100"
                        >
                            <Link href={`/${resourceName}/${resource.attributes.slug}`} prefetch={false} className="block">
                                {/* Image Section - Compact */}
                                <div className="aspect-[16/10] bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden">
                                    <div className="absolute inset-0 w-full h-full [&>*]:w-full [&>*]:h-full [&>*]:object-cover [&>*]:object-center">
                                        <BlogLayoutList article={resource} resourceName={resourceName} />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Content Section - Minimal */}
                                <div className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full uppercase tracking-wide">
                      {resourceNameMap[resourceName]}
                    </span>
                                        <span className="text-amber-600 text-xs">{formatDate(resource.attributes.publishedAt)}</span>
                                    </div>

                                    <h3 className="font-serif font-bold text-slate-800 leading-tight text-base line-clamp-2 group-hover:text-amber-700 transition-colors duration-300 mb-2">
                                        {resource.attributes.title}
                                    </h3>

                                    {getAuthorName(resource.attributes.author) && (
                                        <div className="flex items-center gap-2 text-xs text-slate-600">
                                            <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                                                {getAuthorName(resource.attributes.author).charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium truncate">{getAuthorName(resource.attributes.author)}</span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link
                        href={`/${resourceName}`}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-500 text-white font-semibold rounded-full hover:from-amber-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        prefetch={false}
                    >
                        Tümünü Gör
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ListResources
