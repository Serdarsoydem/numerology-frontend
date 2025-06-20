import FeaturedPosts from "@/components/pages/feature-section";
import Stories from "@/components/pages/story-section";
import ListResources from "@/components/layouts/list-resourses";
import { ResourceResponseTypeAPIList, StoryResponseTypeAPIList } from "@/types/api-types";
import { blogsEndpoint, eventsEndpoint, interviewEndpoint, newsEndpoint, storiesEndpoint } from "@/utils/endpoints";

export default async function Page() {
    const blogPosts = await fetchResources<ResourceResponseTypeAPIList>(blogsEndpoint);
    const interviews = await fetchResources<ResourceResponseTypeAPIList>(interviewEndpoint);
    const newses = await fetchResources<ResourceResponseTypeAPIList>(newsEndpoint);
    const stories = await fetchResources<StoryResponseTypeAPIList>(storiesEndpoint);
    const events = await fetchResources<ResourceResponseTypeAPIList>(eventsEndpoint);

    return (
        <div className="flex w-full min-h-screen flex-col items-center justify-center mt-0 md:mt-5">
            {(stories && stories.meta.pagination.total > 0) &&  <Stories stories={stories} />}
            {blogPosts && <FeaturedPosts blogs={blogPosts} />}
            {(blogPosts && blogPosts.meta.pagination.total) && <ListResources resourceName="blogs" resources={blogPosts} />}
            {(interviews && interviews.meta.pagination.total > 0) && <ListResources resourceName="interviews" resources={interviews} />}
            {(newses && newses.meta.pagination.total > 0) && <ListResources resourceName="newses" resources={newses} />}
            {(events && events.meta.pagination.total > 0) && <ListResources resourceName="events" resources={events} />}
        </div>
    );
}

async function fetchResources<T>(endpoint: string): Promise<T | null> {
    const response = await fetch(`${endpoint}?populate=*`, { cache: "no-store" });

    if (!response.ok) {
        console.error(`Failed to fetch resources from ${endpoint}`);
        return null;
    }
    return (await response.json()) as T;
}
