"use client";

// ⬇️ Imports
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import dummyImg from "@/public/dummyImg.jpg";
import styles from "./page.module.css";
import { toast } from "react-toastify";
import CommentCard from "@/components/Blog/CommentCard";
import { useUser } from "@clerk/nextjs";

export default function BlogDetails() {
  // 🧠 Blog state
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { blogId } = useParams();
  const router = useRouter();

  // 🧠 Comment state
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const formRef = useRef(null);

  // 🛡️ Admin check
  const { user, isSignedIn } = useUser();
  const isAdmin =
    isSignedIn &&
    [
      "kiberichard.kr@gmail.com",
      "denniskariuki337@gmail.com",
      "richardkibe.dev@gmail.com",
    ].includes(user?.primaryEmailAddress?.emailAddress?.toLowerCase());

  // 📡 Fetch blog on mount
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/blogs/${blogId}`);
        setBlog(res.data.updated);
      } catch (err) {
        setError("Could not load blog");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchBlog();
  }, [blogId]);

  // 💬 Fetch comments
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

  // 🔗 Make links open in new tab
  useEffect(() => {
    if (!loading && blog) {
      document
        .querySelectorAll(`.${styles.blogContent} a`)
        .forEach((anchor) => {
          anchor.setAttribute("target", "_blank");
          anchor.setAttribute("rel", "noopener noreferrer");
        });
    }
  }, [loading, blog]);

  // 🧹 Handle outside click on comment form
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

  // 📤 Submit comment
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

  // 🧽 Handle comment delete from child
  const handleCommentDelete = (id) => {
    setComments((prevComments) => prevComments.filter((c) => c._id !== id));
  };

  // 🗑️ Delete blog
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

  // ===========================
  // 🖼️ RENDER
  // ===========================

  return (
    <section className={styles.section}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

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

          {/* 📃 Blog Content */}
          <main className={styles.main}>
            <div
              className={styles.blogContent}
              dangerouslySetInnerHTML={{ __html: blog.message }}
            />

            {/* ✅ Admin-only actions */}
            {isAdmin && (
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
            )}
          </main>

          {/* 💬 Comments Section */}
          <section className={styles.commentSection}>
            <h2 className={styles.commentTitle}>Comments</h2>

            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className={styles.addCommentBtn}
              >
                Add a Comment
              </button>
            )}

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
                  onChange={(e) =>
                    setCommentForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email (optional)"
                  value={commentForm.email}
                  onChange={(e) =>
                    setCommentForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
                <textarea
                  name="message"
                  placeholder="Write your comment..."
                  value={commentForm.message}
                  onChange={(e) =>
                    setCommentForm((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  required
                ></textarea>
                <button type="submit" className={styles.commentSubmitBtn}>
                  Submit Comment
                </button>
              </form>
            )}

            <div className={styles.commentList}>
              {comments.length === 0 && <p>No comments yet.</p>}
              {comments.map((comment) => (
                <CommentCard
                  key={comment._id}
                  comment={comment}
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
