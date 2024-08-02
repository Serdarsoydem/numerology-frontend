import FeaturedPosts from "@/components/pages/feature-section";
import RecentPosts from "@/components/pages/recent-posts";
import Stories from "@/components/pages/story-section";
import {DialogCloseButton} from "@/components/layouts/story-layout";


export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center mt-20 ">
          <Stories/>
          <DialogCloseButton/>
          <FeaturedPosts/>
          <RecentPosts/>
      </main>
  );
}
