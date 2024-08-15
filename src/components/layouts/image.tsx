"use client"
import { StoryType } from "@/types/api-types";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";

function ImageLayout({ story }: { story: Extract<StoryType, { image: string }> }) {

    return (
        <div className="relative w-[400px] h-[90vh] snap-start rounded-2xl bg-gray-200">
            <img className="w-full h-full object-fill rounded-lg" src={story.image} alt={story.title} />
            <div className="absolute bottom-2.5 flex flex-col w-full px-4">
                <div className="flex overflow-hidden">
                    <div
                        className={`whitespace-nowrap inline-block text-white text-base ${story.title.length > 80 ? 'animate-marquee' : ''}`}>
                        {story.title}
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
                    <Button
                        className={`ml-auto`}
                        variant={story.cta.buttonVariant}
                        onClick={() => console.log()}
                    >
                        <Link href={story.cta.buttonLink}>
                            {story.cta.title}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ImageLayout;
