import FeaturedPosts from "@/components/pages/feature-section";
import RecentPosts from "@/components/pages/recent-posts";
import Stories from "@/components/pages/story-section";
import {stories} from "@/dummyData";


export default function Home() {
   // let photos = Array.from({ length: 6 }, (_, i) => i + 1);
  return (
      <div className="flex w-full min-h-screen flex-col items-center justify-center mt-20 ">
          <Stories stories={stories}/>
          <FeaturedPosts/>
          <RecentPosts/>
      </div>
  );
}
