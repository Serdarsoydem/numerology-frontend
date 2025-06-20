"use client"
import BlogLayoutSmall from "@/components/layouts/blog-layout-small"
import BlogLayoutLarge from "@/components/layouts/blog-layout-large"
import type { ResourceResponseTypeAPIList } from "@/types/api-types"
import HorizontalScroll from "@/components/horizontal-scroll"
import BlogLayoutList from "@/components/layouts/blog-layout-list"

const FeaturedPosts = ({ blogs }: { blogs: ResourceResponseTypeAPIList }) => {
    // Blog2'yi filtrele - sadece "Blog Deneme" gibi gerçek featured içerikleri göster
    const featuredBlogs = blogs.data.filter(
        (blog) => blog.attributes.title !== "Blog2" && blog.attributes.title !== "blog2",
    )

    if (featuredBlogs.length === 0) return null

    return (
        <section className="w-full px-4 md:px-8 lg:px-16 py-12 bg-gradient-to-b from-white to-amber-50">
            <div className="max-w-7xl mx-auto">
                {/* Başlık ve dekoratif çizgi */}
                <div className="mb-12 text-center relative">
                    <h2 className="inline-block font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-amber-900 mb-6 relative z-10 px-6 bg-white">
                        Öne Çıkanlar
                    </h2>
                    <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent z-0 rounded-full"></div>
                </div>

                {/* Desktop Grid - Tam Fit Tasarım */}
                <div className="hidden lg:block">
                    {featuredBlogs.length >= 2 ? (
                        <div className="grid grid-cols-5 gap-6">
                            {/* Ana Featured Blog - 3/5 */}
                            <div className="col-span-3">
                                <div className="relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border border-amber-100">
                                    <div className="aspect-[16/9] relative">
                                        <div className="absolute inset-0 w-full h-full [&>*]:w-full [&>*]:h-full [&>*]:object-cover [&>*]:object-center">
                                            <BlogLayoutLarge blog={featuredBlogs[0]} />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold py-2 px-4 rounded-full shadow-lg z-10">
                                            ÖNE ÇIKAN
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Yan Bloglar - 2/5 */}
                            <div className="col-span-2 space-y-6">
                                {featuredBlogs.slice(1, 3).map((blog, i) => (
                                    <div
                                        key={blog.id}
                                        className="relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-white border border-amber-100"
                                    >
                                        <div className="aspect-[16/9] relative">
                                            <div className="absolute inset-0 w-full h-full [&>*]:w-full [&>*]:h-full [&>*]:object-cover [&>*]:object-center">
                                                <BlogLayoutSmall article={blog} />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                            {i === 0 && (
                                                <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md z-10">
                                                    POPÜLER
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Tek blog varsa
                        <div className="max-w-4xl mx-auto">
                            <div className="relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border border-amber-100">
                                <div className="aspect-[16/9] relative">
                                    <div className="absolute inset-0 w-full h-full [&>*]:w-full [&>*]:h-full [&>*]:object-cover [&>*]:object-center">
                                        <BlogLayoutLarge blog={featuredBlogs[0]} />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold py-2 px-4 rounded-full shadow-lg z-10">
                                        ÖNE ÇIKAN
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Horizontal Scroll - Tam Fit */}
                <div className="lg:hidden">
                    <HorizontalScroll>
                        <div className="flex space-x-4 py-4">
                            {featuredBlogs.slice(0, 3).map((resource, index) => (
                                <div
                                    key={resource.id}
                                    className="min-w-[80vw] md:min-w-[40vw] bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-amber-100"
                                >
                                    <div className="aspect-[16/9] relative">
                                        <div className="absolute inset-0 w-full h-full [&>*]:w-full [&>*]:h-full [&>*]:object-cover [&>*]:object-center">
                                            <BlogLayoutList article={resource} resourceName={"blogs"} />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                        {index === 0 && (
                                            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md z-10">
                                                ÖNE ÇIKAN
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </HorizontalScroll>
                </div>

                {/* Tümünü Görüntüle Butonu */}
                <div className="text-center mt-12">
                    <button className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        Tümünü Görüntüle
                        <span className="ml-2">→</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default FeaturedPosts
