import FeaturedPosts from "@/components/pages/feature-section";
import Stories from "@/components/pages/story-section";
import { stories } from "@/dummyData";
import ListResources from "@/components/layouts/list-resourses";
import { ResourceResponseTypeAPIList } from "@/types/api-types";
import {blogsEndpoint, interviewEndpoint, newsEndpoint} from "@/utils/endpoints";

export default async function Page() {
    // Fetching data using the generic fetchResources function
    const blogPosts = await fetchResources(blogsEndpoint);
    const interviews = await fetchResources(interviewEndpoint);
    const newses = await fetchResources(newsEndpoint);


    return (
        <div className="flex w-full min-h-screen flex-col items-center justify-center mt-0 md:mt-5">
            <Stories stories={stories} />
            {blogPosts && <FeaturedPosts blogs={blogPosts} />}
            {(blogPosts && blogPosts.meta.pagination.total) && <ListResources resourceName="blogs" resources={blogPosts} />}
            {(interviews && interviews.meta.pagination.total >0) && <ListResources resourceName="interviews" resources={interviews} />}
            {(newses && newses.meta.pagination.total >0) && <ListResources resourceName="newses" resources={newses} />}
        </div>
    );
}

// Generic fetch function for different types of resources
const fetchResources = async (endpoint: string): Promise<ResourceResponseTypeAPIList | null> => {
    const response = await fetch(`${endpoint}?populate=*`);

    if (!response.ok) {
        console.error(`Failed to fetch resources from ${endpoint}`);
        return null;
    }
    return (await response.json()) as ResourceResponseTypeAPIList;
};
