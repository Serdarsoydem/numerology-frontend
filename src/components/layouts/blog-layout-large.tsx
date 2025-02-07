"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {ResourceResponseCustomType, ResourceResponseTypeAPI} from "@/types/api-types";

const BlogLayoutLarge = ({blog}: { blog: ResourceResponseTypeAPI["data"] }) => {
    const attrs = blog.attributes
    return (
        <div className="group inline-block overflow-hidden rounded-xl">
            <Link href={"blogs/" + attrs.slug} className="mt-6">

                <div
                    className="absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-xl z-10"
                />

                <div className="relative w-full  rounded-xl overflow-hidden">

                    <Image
                        src={attrs.image.data.attributes.url}
                        placeholder="blur"
                        blurDataURL={"blog.image.blurhashDataUrl"}
                        alt={attrs.title}
                        height={600}
                        width={650}
                        objectFit="cover"
                        className="object-center  group-hover:scale-105 transition-all ease duration-300"
                        sizes="(max-width: 1180px) 100vw, 50vw"
                    />
                </div>


                <div className="w-full absolute bottom-0 p-4 xs:p-6 sm:p-10 z-20">
                    <h2 className="font-bold capitalize text-sm xs:text-base sm:text-xl md:text-2xl text-light mt-2 sm:mt-4">
                    <span
                        className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50
                        group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
                    >
                      {attrs.title}
                    </span>
                    </h2>
                </div>
            </Link>
        </div>
    );
};

export default BlogLayoutLarge;
