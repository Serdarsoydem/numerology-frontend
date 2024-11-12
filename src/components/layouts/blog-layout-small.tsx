"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {formatDate} from "@/utils";
import {ResourceResponseTypeAPI} from "@/types/api-types"; // Adjust the import path as needed

interface BlogLayoutTwoProps {
    article: ResourceResponseTypeAPI;
}

const BlogLayoutSmall: React.FC<BlogLayoutTwoProps> = ({article}) => {
    const {attributes} = article;

    return (
        <div className="group grid grid-cols-12 gap-4 items-center text-dark dark:text-light">
            <Link
                href={`/blogs/${attributes.slug}`}
                className="col-span-12 lg:col-span-4 h-full rounded-xl overflow-hidden"
            >
                <Image
                    src={attributes.image.data.attributes.url}
                    placeholder="blur"
                    blurDataURL={attributes.image.data.attributes.previewUrl || attributes.image.data.attributes.url}
                    alt={attributes.title}
                    width={100}
                    height={100}
                    className="aspect-square w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </Link>

            <div className="col-span-12 lg:col-span-8 w-full">
                <span
                    className="inline-block w-full uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
                    {attributes.tags[0]}
                </span>
                <Link href={`/blogs/${attributes.slug}`} className="inline-block my-1">
                    <h2 className="font-semibold capitalize text-base sm:text-lg">
                        <span
                            className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50
                            group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
                        >
                          {attributes.title}
                        </span>
                    </h2>
                </Link>
                <span
                    className="inline-block w-full capitalize text-gray dark:text-light/50 font-semibold text-xs sm:text-base">
                    {formatDate(attributes.publishedAt)}
                </span>
            </div>
        </div>
    );
};

export default BlogLayoutSmall;
