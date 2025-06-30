"use client";

// ⬇️ Import hooks and utilities
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import dummyImg from "@/public/dummyImg.jpg";
import { toast } from "react-toastify";
import CommentCard from "@/components/Blog/CommentCard";

export default function BlogDetails() {
  // 📌 Core blog state and routing
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { blogId } = useParams();
  const router = useRouter();

  // ============================
  // 🧠 BLOG FUNCTIONS
  // ============================

  // 🔁 Fetch blog data on page load
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

  // 🗑️ Handle blog deletion
  // const handleDelete = async () => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this blog?"
  //   );
  //   if (!confirmDelete) return;

  //   try {
  //     const response = await axios.delete(`/api/blogs/${blogId}`);
  //     toast.success(response.data.msg);
  //     router.push("/blogs");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to delete blog");
  //   }
  // };

  // ============================
  // 💬 COMMENT STATE + FUNCTIONS
  // ============================

  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const formRef = useRef(null);

  // 🔁 Fetch blog comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${blogId}`);
        setComments(res.data.comments);
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    };

    if (blogId) fetchComments();
  }, [blogId]);

  const handleCommentDelete = (id) => {
    setComments((prevComments) => prevComments.filter((c) => c._id !== id));
  };

  // 🎯 Detect outside click to close comment form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  // ✍️ Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 📤 Submit a comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/comments", {
        ...commentForm,
        blogId,
      });
      toast.success("Comment posted!");
      setCommentForm({ name: "", email: "", message: "" });
      setShowForm(false);

      // Refresh comments
      const res = await axios.get(`/api/comments/${blogId}`);
      setComments(res.data.comments);
    } catch (err) {
      toast.error("Failed to post comment.");
      console.error(err);
    }
  };

  // ============================
  // 🔲 RENDER UI
  // ============================

  return (
    <section className={styles.section}>
      {/* ⏳ Loading & error display */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* ✅ Blog Content */}
      {!loading && blog && (
        <div className={`${styles.blogContainer} container`}>
          {/* 📰 Blog Header */}
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

          {/* 📃 Blog Body */}
          <main className={styles.main}>
            <p className={styles.message}>{blog.message}</p>
            <div className={styles.actions}>
              <Link
                href={`/blogs/${blogId}/edit`}
                className={styles.editButton}
              >
                Edit
              </Link>
            </div>
          </main>

          {/* 💬 Comments Section */}
          <section className={styles.commentSection}>
            <h2 className={styles.commentTitle}>Comments</h2>

            {/* ➕ Show Add Comment Button */}
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className={styles.addCommentBtn}
              >
                Add a Comment
              </button>
            )}

            {/* 📝 Comment Form */}
            {showForm && (
              <form
                ref={formRef}
                onSubmit={handleCommentSubmit}
                className={styles.commentForm}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={commentForm.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email (optional)"
                  value={commentForm.email}
                  onChange={handleInputChange}
                />
                <textarea
                  name="message"
                  placeholder="Write your comment..."
                  value={commentForm.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <button type="submit" className={styles.commentSubmitBtn}>
                  Submit Comment
                </button>
              </form>
            )}

            {/* 🗂️ Comment List */}
            <div className={styles.commentList}>
              {comments.length === 0 && <p>No comments yet.</p>}
              {comments.map((comment) => (
                <CommentCard
                  comment={comment}
                  key={comment._id}
                  onDelete={handleCommentDelete}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
