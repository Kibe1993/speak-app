"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProjectTable.module.css";
import { toast } from "react-toastify";

export default function ProjectTable({ blogs, handleDelete }) {
  const [localBlogs, setLocalBlogs] = useState(blogs);

  useEffect(() => {
    setLocalBlogs(blogs);
  }, [blogs]);

  const handleToggle = async (id, field, currentValue) => {
    try {
      const response = await axios.patch(`/api/blogs/${id}`, {
        [field]: !currentValue,
      });
      setLocalBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === id ? { ...blog, [field]: !currentValue } : blog
        )
      );
      console.log(localBlogs);

      toast.success(response.data.msg);
    } catch (error) {
      toast.error(`Failed to update ${field} status`, error);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <h1>Manage Your Blogs</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Approved</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {localBlogs.map((blog, index) => (
            <tr key={blog._id}>
              <td>{index + 1}</td>
              <td>
                <Link href={`/blogs/${blog._id}`} className={styles.titleLink}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.approved ? (
                  "Approved"
                ) : (
                  <button
                    className={styles.pendingButton}
                    onClick={() =>
                      handleToggle(blog._id, "approved", blog.approved)
                    }
                  >
                    Pending
                  </button>
                )}
              </td>
              <td>
                <button
                  className={`${styles.featuredButton} ${
                    blog.featured ? styles.featuredActive : ""
                  }`}
                  onClick={() =>
                    handleToggle(blog._id, "featured", blog.featured)
                  }
                >
                  {blog.featured ? "Featured" : "Not Featured"}
                </button>
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
