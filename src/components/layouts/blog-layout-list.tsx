"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {formatDate} from "@/utils";
import {ResourceResponseCustomType, ResourceResponseTypeAPI} from "@/types/api-types";

type BlogLayoutThreeProps = {
    article: ResourceResponseTypeAPI["data"]
    resourceName : string
}

const BlogLayoutList: React.FC<BlogLayoutThreeProps> = ({ article, resourceName }) => {
    const { attributes } = article;

    return (
        <div className="group flex flex-col items-center text-dark dark:text-light bg-card w-[280px]">
            <div  className="w-full rounded-xl overflow-hidden flex-shrink-0">
                <Image
                    src={attributes.image.data.attributes.url}
                    alt={attributes.title}
                    width={200}
                    height={150}
                    className="object-cover transition-transform group-hover:scale-105 duration-300 h-[180px] w-[360px]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            <Link href={`/${resourceName}/${attributes.slug}`}>
            <div className="flex flex-col w-full mt-4  px-2">
                <h2 className="font-semibold capitalize text-base sm:text-lg">
                    <span
                        className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50
                        group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
                    >
                        {attributes.title}
                    </span>
                </h2>
                <span className="capitalize text-gray dark:text-light/50 font-semibold text-sm sm:text-base">
                    {attributes.publishedAt ? formatDate(attributes.publishedAt) : ""}
                </span>
            </div>
            </Link>
            </div>
        </div>
    );
};


export default BlogLayoutList;
