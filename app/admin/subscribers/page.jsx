"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./page.module.css";

export default function SubscribersPage() {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/subscribe");
      setEmails(response.data.emails);
    } catch (error) {
      toast.error("Failed to fetch subscribers");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this subscriber?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`/api/subscribe/${id}`);
      setEmails((prev) => prev.filter((email) => email._id !== id));
    } catch (error) {
      toast.error("Failed to delete subscriber.");
    }
  };

  useEffect(() => {
    const loadEmails = async () => {
      await fetchEmails();
      toast.success("Emails retrieved successfully");
    };

    loadEmails();
  }, []);

  return (
    <div className={`${styles.pageContainer} container`}>
      <h1 className={styles.title}>📧 Subscribers List</h1>

      {emails.length === 0 ? (
        <p className={styles.empty}>No subscribers yet.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((entry, index) => (
              <tr key={entry._id}>
                <td>{index + 1}</td>
                <td>{entry.email}</td>
                <td className={styles.status}>Approved</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(entry._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
