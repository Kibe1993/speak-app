"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./ProjectTable.module.css";

export default function ProjectTable({ blogs, handleDelete }) {
  const [approved, setApproved] = useState(false);

  const handleApprove = () => {
    setApproved((prev) => !prev);
  };

  return (
    <div className={styles.tableContainer}>
      <h1>Manage Your Blogs</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id}>
              <td>{index + 1}</td>
              <td>
                <Link href={`/blogs/${blog._id}`} className={styles.titleLink}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {approved ? (
                  "Approved"
                ) : (
                  <button
                    className={styles.pendingButton}
                    onClick={() => handleApprove(blog._id)}
                  >
                    Pending
                  </button>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
