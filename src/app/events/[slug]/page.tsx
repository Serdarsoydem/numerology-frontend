import {eventsEndpoint} from "@/utils/endpoints";
import {EventResponseCustomType, EventResponseTypeAPI} from "@/types/api-types";
import EventPage from "@/components/pages/event";
import {redirect} from "next/navigation";

export default async function StoryModal({
                                             params: { slug },
                                         }: {
    params: { slug: string };
}) {

    const event = await fetchEvent(slug);
    console.log("event", event);
    if (!event) redirect("/")

    return(
        <div>
            <EventPage event={event}/>
        </div>
    )
}

const fetchEvent = async (slug : string) => {

    const response = await fetch(`${eventsEndpoint}/slug/${slug}`, )

    if (!response.ok) {
        return null;
    }

    return  await response.json() as EventResponseCustomType

}
