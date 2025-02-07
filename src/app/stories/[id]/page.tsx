import { Modal } from '@/components/layouts/modal';
import Story from "@/components/layouts/story-layout";
import {storiesEndpoint} from "@/utils/endpoints";
import {StoryResponseTypeAPI} from "@/types/api-types";


export default async function StoryModal({
                                             params: { id: photoId },
                                         }: {
    params: { id: string };
}) {

    const story = await fetchEvent(photoId);

    console.log(story)
    return(
        <div>
            <Modal>
                { story && <Story story={story}/>}
            </Modal>
        </div>
    )
}

const fetchEvent = async (id : string) => {
    console.log(`${storiesEndpoint}/${id}?populate=*`);
    const response = await fetch(`${storiesEndpoint}/${id}?populate[storyMedia]=true&populate[cta][populate]=*`, )

    if (!response.ok) {
        return null;
    }

    return  await response.json() as StoryResponseTypeAPI

}

export const fetchCache = 'force-no-store';
