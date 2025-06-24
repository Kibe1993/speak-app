"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";

export default function EditBlogPage() {
  const { blogId } = useParams();
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    image: "",
    category: "",
    message: "",
    author: "",
  });

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get(`/api/blogs/${blogId}`);

        setForm({
          title: res.data.title,
          image: res.data.image,
          category: res.data.category,
          message: res.data.message,
          author: res.data.author,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to load blog");
        setLoading(false);
      }
    }

    if (blogId) fetchBlog();
  }, [blogId]);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`/api/blogs/${blogId}`, form);
      router.push(`/blogs/${blogId}`);
    } catch (err) {
      setError("Failed to update blog");
    }
  }

  if (loading) return <p>Loading blog...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Edit Blog</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className={styles.input}
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className={styles.input}
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className={styles.input}
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          required
          className={styles.textarea}
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Update Blog
        </button>
      </form>
    </div>
  );
}
