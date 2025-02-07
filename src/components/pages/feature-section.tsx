"use client"

import React from "react";
import BlogLayoutSmall from "@/components/layouts/blog-layout-small";
import BlogLayoutLarge from "@/components/layouts/blog-layout-large";
import {ResourceResponseTypeAPI, ResourceResponseTypeAPIList} from "@/types/api-types";
import HorizontalScroll from "@/components/horizontal-scroll";
import BlogLayoutList from "@/components/layouts/blog-layout-list";

const FeaturedPosts = ({blogs} : {blogs : ResourceResponseTypeAPIList   }) => {

    const firstBlog = blogs.data[0]

    return (
        <section className="w-full px-5 sm:px-10 sxl:px-32 flex flex-col items-center justify-center overflow-y-auto">
            <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
                Öne Çıkanlar
            </h2>
            <div
                className="hidden lg:grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-6 mt-2">
                {(blogs.data.length >= 1 && blogs.data.length < 3) ?
                    <>
                        {blogs.data.map((b, i) => {
                            return (
                                <article key={i} className="col-span-1 sm:col-span-1 row-span-1 relative">
                                    <BlogLayoutSmall article={blogs.data[i]}/>
                                </article>
                            )
                        })}
                    </> :
                    <>
                        <article className=" col-span-1 sxl:col-span-1 row-span-2 relative">
                            <BlogLayoutLarge blog={blogs.data[0]}/>
                        </article>
                        <article className="col-span-1 sm:col-span-1 row-span-1 relative">
                            <BlogLayoutSmall article={blogs.data[1]}/>
                        </article>
                        <article className="col-span-1 sm:col-span-1 row-span-1 relative">
                            <BlogLayoutSmall article={blogs.data[2]}/>
                        </article>
                    </>}
            </div>
            <HorizontalScroll className="flex lg:hidden w-full overflow-x-auto hide-scrollbar">
                <div className="flex top-2 gap-4 p-1">
                    {blogs.data.map((resource, index) => (
                        index <= 15 && (
                            <article key={index} className="">
                                <BlogLayoutList article={resource} resourceName={"blogs"}/>
                            </article>
                        )
                    ))}
                </div>
            </HorizontalScroll>
        </section>
    )
};

export default FeaturedPosts;
