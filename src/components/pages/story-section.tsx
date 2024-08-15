"use client"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import HorizontalScroll from "@/components/horizontal-scroll";
import {StoryType} from "@/types/api-types";
import Link from "next/link";
import {extractText} from "@/utils";



export default function Stories(
    {
        stories
    }: {
        stories: StoryType[];
    }
) {
    return (
        <div className="flex w-full  justify-center ">
            <HorizontalScroll className="gap-2 overflow-x-auto md:px-3 hide-scrollbar">
                {stories.map((story, index) => (
                            <Link href={"/hikayeler/" + story.id } key={index} passHref>
                                <div key={index} className="flex flex-col top-0 gap-2">
                                    <div className="flex relative justify-center">
                                        <Avatar
                                            className={`w-20 h-20 border-4 border-[#fd79a8] ${story.isViewed ? 'border-[#fd79a8]' : 'animate-colorChange'}`}>
                                            <AvatarImage src={story.thumbnail}/>
                                            <AvatarFallback>JP</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <span
                                        className={`text-sm font-medium flex h-[60px] justify-center text-center ${story.title.length > 20 ? ' break-words w-full max-w-[100px]' : 'w-full'}`}>
                                        {story.title.length < 30 ? story.title : extractText(story.title,30) + "..."}
                                    </span>
                                </div>
                            </Link>
                ))}
            </HorizontalScroll>
        </div>
    )
}
