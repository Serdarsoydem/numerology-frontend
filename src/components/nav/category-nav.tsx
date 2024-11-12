"use client"
import React, {useEffect, useState} from 'react';
import {env} from "@/env.mjs";
import {CategoryAPIResponse} from "@/types/api-types";

interface CategoryNavProps {
    onCategoryChange: (value: string) => void;
    isLoading?: boolean;
    selectedCategory: string;
}

const CategoryNav = ({
                         onCategoryChange,
                         isLoading = false,
                         selectedCategory
                     }: CategoryNavProps) => {
    const [isPending, startTransition] = React.useTransition();
    const [categories, setCategories] = useState<string[]>(["All"]);

    const handleCategoryClick = (category: string) => {
        if (isLoading) return;
        onCategoryChange(category);
    };

    useEffect(() => {
        startTransition(async () => {
            const categoryResponse = await fetchCategories()

            if (categoryResponse?.data) {
                // Create a new array with "All" and the fetched categories
                const categoryList = ["All", ...categoryResponse.data.map(category => category.attributes.title)];
                setCategories(categoryList);
            }
        })
    }, []); // Empty dependency array since we only want to fetch once

    return (
        <div className="w-full bg-white border-b relative">
            {(isLoading || isPending) && (
                <div className="absolute top-0 left-0 w-full h-0.5 bg-slate-100 overflow-hidden">
                    <div className="h-full bg-slate-400 animate-slide-loading" />
                </div>
            )}

            <div className="relative">
                <div className="flex overflow-x-auto pb-2 pt-2 px-4 no-scrollbar">
                    <div className="overflow-x-auto mx-6 md:mx-8 md:px-6 py-2 hide-scrollbar">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                disabled={isLoading}
                                onClick={() => handleCategoryClick(category)}
                                className={`
                                    relative flex-none mx-1 px-3 py-1.5 rounded-full text-sm 
                                    whitespace-nowrap transition-all duration-300 ease-in-out 
                                    first:ml-0
                                    ${isLoading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
                                    ${selectedCategory === category
                                    ? 'bg-accentDark text-white scale-105'
                                    : 'bg-slate-100 hover:bg-slate-200 text-gray-800 hover:scale-105'
                                }
                                `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const fetchCategories = async () => {
    const response = await fetch(env.NEXT_PUBLIC_STRAPI_URL+"/api/categories");

    if (!response.ok) {
        return undefined;
    }

    return await response.json() as CategoryAPIResponse;
}

export default CategoryNav;
