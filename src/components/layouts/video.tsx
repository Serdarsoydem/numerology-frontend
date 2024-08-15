"use client"
import React, { useRef, useState } from "react";
import { Play } from "lucide-react";
import { StoryType } from "@/types/api-types";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";

function Video({ story }: { story: Extract<StoryType, { video: string }> }) {
    const [playing, setPlaying] = useState(true);
    const [subs, setSubs] = useState(false);

    const videoRef = useRef(null);
    const handleVideoPress = () => {
        if (playing) {
            setPlaying(false);
            // @ts-ignore
            videoRef.current.pause();
        } else {
            // @ts-ignore
            videoRef.current.play();
            setPlaying((play) => !play);
        }
    };

    const handleSubscribe = () => {
        setSubs((sub) => !sub);
    };

    return (
        <div className="relative w-[400px] h-[90vh] snap-start rounded-2xl bg-gray-200">
            <video
                id={story.id}
                className="w-full h-full object-fill rounded-lg"
                onClick={handleVideoPress}
                loop
                ref={videoRef}
                src={story.video}
                autoPlay={true}
            />
            {!playing && (
                <button
                    onClick={handleVideoPress}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full w-24 h-24 m-auto"
                >
                    <Play color="white" size={64} />
                </button>
            )}

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
                        onClick={handleSubscribe}
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

export default Video;
