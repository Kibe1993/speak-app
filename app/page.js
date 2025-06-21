import FeaturedSection from "@/components/Featured/Featured";

import Hero from "@/components/hero/Hero";
import RecentPost from "@/components/recentPosts/RecentPost";

import Subscription from "@/components/subscriptions/Subsciption";

export default function Home() {
  const item = [];
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Subscription />
      <RecentPost />
    </>
  );
}
