"use client";
import FeaturedSection from "@/components/Featured/Featured";

import Hero from "@/components/hero/Hero";
import RecentPost from "@/components/recentPosts/RecentPost";

import Subscription from "@/components/subscriptions/Subsciption";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);

      console.log(blogs);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <Hero blogs={blogs} />
      <FeaturedSection blogs={blogs} />
      <Subscription />
      <RecentPost blogs={blogs} />
    </>
  );
}
