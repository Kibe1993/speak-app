"use client";
import { useEffect, useState } from "react";
import BlogCard from "@/components/Blog/BlogCard";
import styles from "./page.module.css";
import axios from "axios";

export default function Blogs() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [filtered, setfiltered] = useState("All");
  const [loading, setIsLoading] = useState(false);

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const hasMore = visibleCount < blogs.length;

  const handleFiltered = (filter) => {
    setfiltered(filter);
  };

  const filteredBlogs =
    filtered === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === filtered);

  return (
    <section className={styles.blogs}>
      <div className={`${styles.blogContainer} container`}>
        <div className={styles.top}>
          <div className={styles.header}>
            <h1>Our Blogs</h1>
          </div>
          <div className={styles.filters}>
            {["All", "Lifestyle", "Startup", "Technology"].map((cat) => (
              <button
                key={cat}
                onClick={() => handleFiltered(cat)}
                className={`${styles.filterBtn} ${
                  filtered === cat ? styles.active : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {loading && <p className={styles.loadingText}>Loading blogs...</p>}

        <div className={styles.grid}>
          {filteredBlogs.slice(0, visibleCount).map((blog, i) => (
            <BlogCard key={i} blog={blog} />
          ))}
        </div>

        {hasMore && (
          <div className={styles.showMoreWrapper}>
            <button onClick={showMore} className={styles.showMoreBtn}>
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
