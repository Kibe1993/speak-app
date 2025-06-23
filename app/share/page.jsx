"use client";
import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import styles from "./page.module.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function SharePage() {
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    formData.append("image", fileRef.current.files[0]);

    try {
      const res = await axios.post("/api/blog", formData);
      toast.success(res.data.message);
      form.reset();
      setPreview(null);
    } catch (err) {
      toast.error("❌ Failed to submit blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.sharePage}>
      <div className={styles.header}>
        <h1>📝 Share Your Mind</h1>
        <p>Write a blog post and inspire others.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.uploadLabel}>
            <Upload size={28} />
            <span>Click to upload image</span>
          </label>
          <input
            ref={fileRef}
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className={styles.hiddenInput}
            accept="image/*"
            required
          />
          {preview && (
            <img src={preview} alt="preview" className={styles.previewImg} />
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Your name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Blog title"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className={styles.selectInput}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="General">General</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Technology">Technology</option>
            <option value="Startup">Startup</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Blog</label>
          <textarea
            id="message"
            name="message"
            rows="8"
            placeholder="What's on your mind..."
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Submitting..." : "Submit Blog"}
        </button>
      </form>
    </div>
  );
}
