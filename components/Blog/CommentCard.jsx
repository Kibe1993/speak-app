"use client";

import styles from "./CommentCard.module.css";
import { toast } from "react-toastify";
import axios from "axios";

export default function CommentCard({ comment, onDelete }) {
  const handleDeleteComment = async () => {
    const confirm = window.confirm("Delete this comment?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/comments/${comment._id}`);
      toast.success("Comment deleted");
      onDelete(comment._id); // Let parent remove from state
    } catch (err) {
      toast.error("Failed to delete comment");
      console.error(err);
    }
  };

  return (
    <div className={styles.card}>
      <p className={styles.author}>{comment.name}</p>
      <p>{comment.message}</p>
      <p className={styles.date}>
        {new Date(comment.date).toLocaleDateString()}
      </p>

      <button onClick={handleDeleteComment} className={styles.deleteBtn}>
        Delete
      </button>
    </div>
  );
}
