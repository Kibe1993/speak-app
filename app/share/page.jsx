"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import styles from "./page.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import LexicalEditor from "@/components/editor/LexicalEditor";

export default function SharePage() {
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [resetEditor, setResetEditor] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const file = fileRef.current.files[0];

    if (!file) {
      toast.error("Please select an image.");
      setLoading(false);
      return;
    }

    try {
      const cloudForm = new FormData();
      cloudForm.append("file", file);
      cloudForm.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const resCloud = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: cloudForm }
      );
      const cloudData = await resCloud.json();

      if (!cloudData.secure_url) throw new Error("Image upload failed");

      const blogData = {
        title: form.title.value,
        author: form.author.value,
        category: form.category.value,
        message: editorContent,
        image: cloudData.secure_url,
      };

      const res = await axios.post("/api/blog", blogData);
      toast.success(res.data.message);
      form.reset();
      setPreview(null);
      setEditorContent("");
      setResetEditor((prev) => prev + 1);
    } catch (err) {
      console.error(err);
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
          <label>Blog</label>
          <LexicalEditor
            key={resetEditor}
            onChange={setEditorContent}
            reset={resetEditor}
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Submitting..." : "Submit Blog"}
        </button>
      </form>
    </div>
  );
}
