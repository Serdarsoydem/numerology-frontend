"use client"


import {isEventWithImage} from "@/utils";
import Video from "@/components/layouts/video";
import ImageLayout from "@/components/layouts/image";
import { StoryResponseTypeAPI} from "@/types/api-types";

const Story = ({story} : {story : StoryResponseTypeAPI}) => {

    return (
        <div className="relative  h-[90vh] w-full max-w-[450px] overflow-scroll snap-y snap-mandatory hide-scrollbar">
            {isEventWithImage(story) ? (
                <div className="flex flex-col items-center justify-center">
                    <ImageLayout story={story}/>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <Video story={story}/>
                </div>
            )}
        </div>
    );
}

export default Story
