"use client"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import HorizontalScroll from "@/components/horizontal-scroll";
import {StoryType} from "@/types/api-types";
import Link from "next/link";
import {extractText} from "@/utils";
import {useDevice} from "@/contexts/DeviceContext";



export default function Stories(
    {
        stories
    }: {
        stories: StoryType[];
    }
) {
    const {isMobile} = useDevice();
    const displayTitle = (title : string) => {
        const limit = (isMobile) ? 15 : 30; // Set character limit based on device type
        return title.length < limit ? title : extractText(title, limit) + "...";
    };

    return (
        <div className="flex w-full justify-center ">
            <HorizontalScroll className="gap-6 overflow-x-auto mx-6 md:mx-8 md:px-6 py-2 hide-scrollbar">
                {stories.map((story, index) => (
                            <Link href={"/hikayeler/" + story.id } key={index} passHref>
                                <div key={index} className="flex flex-col top-0">
                                    <div className="flex relative justify-center">
                                        <Avatar
                                            className={`w-[64px] h-[64px] md:w-[80px] md:h-[80px] border-4 border-[#fd79a8] ${story.isViewed ? 'border-[#fd79a8]' : 'animate-colorChange'}`}>
                                            <AvatarImage src={story.thumbnail}/>
                                            <AvatarFallback>JP</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <span
                                        className={`text-sm font-medium flex h-[60px] justify-center text-center  ${story.title.length > 20 ? ' break-words w-full max-w-[100px]' : 'w-full'}`}>
                                        {displayTitle(story.title)}
                                    </span>
                                </div>
                            </Link>
                ))}
            </HorizontalScroll>
        </div>
    )
}
