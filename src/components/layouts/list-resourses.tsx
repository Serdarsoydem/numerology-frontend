"use client"

import Link from "next/link";
import React from "react";
import BlogLayoutList from "@/components/layouts/blog-layout-list";
import HorizontalScroll from "../horizontal-scroll";
import {ResourceResponseTypeAPIList} from "@/types/api-types";
import {resourceNameMap} from "@/utils/constants";
import {useMediaQuery} from "@studio-freight/hamo";

const ListResources = (
    {
        resourceName,
        resources
    }:{
        resourceName: "newses" | "interviews" | "blogs" | "services"
        resources : ResourceResponseTypeAPIList
    }
) => {
    return (
        <section
            className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 sxl:px-32 flex flex-col items-center justify-center overflow-y-auto">
            <div className="w-full flex justify-between py-2">
                <h2 className="w-fit inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
                    {resourceNameMap[resourceName]}
                </h2>
                <Link
                    href={"/" + resourceName}
                    className="inline-block font-medium text-purple-600 dark:text-accentDark underline underline-offset-2 text-base md:text-lg"
                >
                    Daha Fazla
                </Link>
            </div>

            <HorizontalScroll className="flex w-full overflow-x-auto hide-scrollbar">
                <div className="flex top-2 gap-4 p-1">
                    {resources.data.map((resource, index) => (
                        index <= 15 && (
                            <article key={index} className="">
                                <BlogLayoutList article={resource} resourceName={resourceName}/>
                            </article>
                        )
                    ))}
                </div>
            </HorizontalScroll>
        </section>
    );
};

export default ListResources;
