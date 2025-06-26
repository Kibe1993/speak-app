"use client";

import Navbar from "@/components/admin/Navbar";
import SideBar from "@/components/admin/Sidebar";
import styles from "./page.module.css";
import ProjectTable from "@/components/admin/ProjectTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/api/blogs/${blogId}`);
      toast.success(response.data.msg);
      router.push("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    }
    fetchBlogs();
  };

  return (
    <>
      <Navbar />
      <div className={styles.adminContainer}>
        <SideBar />
        <ProjectTable blogs={blogs} handleDelete={handleDelete} />
      </div>
    </>
  );
}
