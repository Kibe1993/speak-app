"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import axios from "axios";
import { useParams } from "next/navigation";

export default function BlogDetails() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { blogId } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/blogs/${blogId}`);
        setBlog(response.data);
      } catch (err) {
        setError("Could not load blog");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchBlog();
  }, [blogId]);

  return (
    <section className={styles.section}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && (
        <div className={`${styles.blogContainer} container`}>
          <header className={styles.header}>
            <h1 className={styles.title}>{blog.title}</h1>
            <div className={styles.meta}>
              <p>{blog.author}</p>
              <p>{blog.category}</p>
            </div>
            <div className={styles.imageContainer}>
              <Image
                src={blog.image}
                alt={blog.title}
                width={600}
                height={400}
              />
            </div>
          </header>

          <main className={styles.main}>
            <p className={styles.message}>{blog.message}</p>
            <div className={styles.actions}>
              <Link
                href={`/blogs/${blogId}/edit`}
                className={styles.editButton}
              >
                Edit
              </Link>
              <button className={styles.deleteButton}>Delete</button>
            </div>
          </main>
        </div>
      )}
    </section>
  );
}
