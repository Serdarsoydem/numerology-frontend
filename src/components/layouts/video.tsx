"use client"

import React, {useEffect, useRef} from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useMedia} from "@/contexts/media-context";
import {StoryResponseTypeAPI} from "@/types/api-types";
import {StoryCTA} from "@/components/StoryCTA";

function Video({ story }: { story: StoryResponseTypeAPI}) {

    console.log(story)
    const {playMedia, stopMedia, isPlaying,setIsPlaying, setVideoRef} = useMedia()

    const videoRef = useRef<HTMLVideoElement>(null);
    const handleVideoPress = () => {

        console.log("handling video click")
        if (isPlaying) {
            stopMedia()
        } else {
            console.log("playing");
            if (videoRef.current) playMedia(videoRef.current);
        }
    };

    useEffect(() => {
        // Check if the video is currently playing when the component mounts
        const videoElement = videoRef.current;

        if (videoElement) {
            console.log("videoElement is not undefined ")
            const isCurrentlyPlaying = !videoElement.paused && !videoElement.ended && videoElement.readyState > 2;
            setIsPlaying(isCurrentlyPlaying);
        }
    }, [setIsPlaying]);


    return (
        <div className="relative w-[400px] h-[90vh] snap-start rounded-2xl bg-gray-200">
            <video
                id={story.data.id}
                className="w-full h-full object-fill rounded-lg"
                onClick={handleVideoPress}
                loop
                ref={videoRef}
                src={story.data.attributes.storyMedia.data.attributes.url}
                autoPlay={true}
                onPlay={() => {
                    if (videoRef.current) {
                        setVideoRef(videoRef.current)
                        setIsPlaying(true)
                    }
                }}
            />
            {!isPlaying && (
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
                            <StoryCTA key={index} cta={cta}/>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Video;
