"use client"

import {StoryType} from "@/types/api-types";
import {isStoryWithImage} from "@/utils";
import Video from "@/components/layouts/video";
import ImageLayout from "@/components/layouts/image";

const Story = ({story} : {story : StoryType}) => {

    return (
        <div className="relative  h-[90vh] w-full max-w-[450px] overflow-scroll snap-y snap-mandatory hide-scrollbar">
            {isStoryWithImage(story) ? (
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
