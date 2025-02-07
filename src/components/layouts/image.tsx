"use client"
import {EventResponseTypeAPI, StoryResponseTypeAPI} from "@/types/api-types";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";
import {StoryCTA} from "@/components/StoryCTA";

function ImageLayout({ story }: { story: StoryResponseTypeAPI}) {

    return (
        <div className="relative w-[400px] h-[90vh] snap-start rounded-2xl bg-gray-200">
            <img className="w-full h-full object-fill rounded-lg" src={story.data.attributes.storyMedia.data.attributes.url} alt={story.data.attributes.title} />
            <div className="absolute bottom-2.5 flex flex-col w-full px-4">
                <div className="flex overflow-hidden">
                    <div
                        className={`whitespace-nowrap inline-block text-white text-base ${story.data.attributes.title.length > 80 ? 'animate-marquee' : ''}`}>
                        {story.data.attributes.title}
                    </div>
                </div>
                <div className="flex items-center justify-between pr-2">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/images/IHOPE-BRAND.svg"
                            width={40}
                            height={40}
                            alt="logo"
                            className="w-[160px] h-[80px]"
                        />
                    </Link>
                    {story.data.attributes.cta.map((cta, index) => (

                        <StoryCTA key={ index} cta={cta}/>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImageLayout;
