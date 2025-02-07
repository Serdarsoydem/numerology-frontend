"use client"

import {useCallback, useEffect, useState} from 'react';
import {resourceNameMap} from "@/utils/constants";
import {getEndpoint} from "@/utils/endpoints";
import {ResourceResponseTypeAPI, ResourceResponseTypeAPIList} from "@/types/api-types";
import BlogLayoutList from "@/components/layouts/blog-layout-list";
import CategoryNav from "@/components/nav/category-nav";
import {useToast} from "@/components/ui/use-toast";

type InfiniteScrollArticlesProps = {
    articleType: keyof typeof resourceNameMap
};

const InfiniteScrollArticles = ({articleType}: InfiniteScrollArticlesProps) => {
    const [articles, setArticles] = useState<ResourceResponseTypeAPI["data"][]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [hasMore, setHasMore] = useState(true);
    const { toast } = useToast();

    // Reset state when category changes
    const handleCategoryChange = async (category: string) => {
      //  setIsLoading(true);
        setSelectedCategory(category);
        setPage(1); // Reset to first page
        setArticles([]); // Clear existing articles
        setHasMore(true); // Reset hasMore flag
    };

    // Construct the API URL based on category
    const getFilteredEndpoint = useCallback((pageNum: number) => {
        let endpoint = `${getEndpoint(articleType)}?pagination[page]=${pageNum}&pagination[pageSize]=8&populate=*`;

        if (selectedCategory !== "All") {
            endpoint += `&filters[category][title][$eq]=${encodeURIComponent(selectedCategory)}`;
        }

        console.log("endpoint",endpoint)
        return endpoint;
    }, [articleType, selectedCategory]);

    // Fetch articles from Strapi
    const fetchArticles = useCallback(async () => {
        console.log("here")
        if (!hasMore || isLoading) return;
        console.log("not here")

        setIsLoading(true);
        try {
            const res = await fetch(getFilteredEndpoint(page));
            if (!res.ok) {
                toast({
                    title: "Yüklenme Başarısız",
                    variant: "destructive",
                });
                return
            }
            const data = await res.json() as ResourceResponseTypeAPIList;

            if (page === 1) {
                setArticles(data.data); // Replace articles for first page
            } else {
                setArticles((prevArticles) => [...prevArticles, ...data.data]); // Append for subsequent pages
            }

            setHasMore(data.meta.pagination.page < data.meta.pagination.pageCount);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setIsLoading(false);
        }
    }, [getFilteredEndpoint, hasMore, isLoading, page]);

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100 // Increased threshold for earlier loading
            ) {
                fetchArticles();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [fetchArticles]);

    // Initial fetch and category change handler
    useEffect(() => {
        fetchArticles();
    }, [selectedCategory]); // Re-fetch when category changes

    return (
        <div className="container mx-auto px-4 space-y-8">
            <CategoryNav
                onCategoryChange={handleCategoryChange}
                isLoading={isLoading}
                selectedCategory={selectedCategory}
            />

            {/* Articles grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {articles.map((article) => (
                    <BlogLayoutList
                        key={article.id}
                        article={article}
                        resourceName={articleType}
                    />
                ))}
            </div>

            {/* Loading and end states */}
            {isLoading && (
                <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-accentDark border-slate-200"/>
                </div>
            )}

            {!isLoading && articles.length === 0 && (
                <p className="text-center py-4 text-gray-600">
                    Bu kategoride yazımız bulunmamaktadır
                </p>
            )}
        </div>
    );
};

export default InfiniteScrollArticles;
