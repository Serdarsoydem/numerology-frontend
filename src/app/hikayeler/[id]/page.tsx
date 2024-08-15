import { Modal } from '@/components/layouts/modal';
import {stories} from "@/dummyData";
import Story from "@/components/layouts/story-layout";

export default function PhotoModal({
                                       params: { id: photoId },
                                   }: {
    params: { id: string };
}) {

    const story = stories.find((story) => story.id === photoId )

    return(
        <div>
            <Modal>
                { story && <Story story={story}/>}
            </Modal>
        </div>
    )
}
