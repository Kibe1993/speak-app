"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import dummyImg from "@/public/dummyImg.jpg";
import { toast } from "react-toastify";

export default function BlogDetails() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { blogId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/blogs/${blogId}`);
        setBlog(response.data.updated);
      } catch (err) {
        setError("Could not load blog");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchBlog();
  }, [blogId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/api/blogs/${blogId}`);
      toast.success(response.data.msg);
      router.push("/blogs");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <section className={styles.section}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && blog && (
        <div className={`${styles.blogContainer} container`}>
          <header className={styles.header}>
            <h1 className={styles.title}>{blog.title}</h1>
            <div className={styles.meta}>
              <p>{blog.author}</p>
              <p>{blog.category}</p>
            </div>
            <div className={styles.imageContainer}>
              <Image
                src={blog.image || dummyImg}
                width={600}
                height={400}
                alt="blog image"
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
              <button onClick={handleDelete} className={styles.deleteButton}>
                Delete
              </button>
            </div>
          </main>
        </div>
      )}
    </section>
  );
}
