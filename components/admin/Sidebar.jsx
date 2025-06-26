"use client";
import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function SideBar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Manage Blogs</h2>
      <ul className={styles.menu}>
        <li>
          <Link href="/share">
            <span className={styles.link}>➕ Add a Blog</span>
          </Link>
        </li>
        <li>
          <Link href={"/admin/subscribers"} className={styles.link}>
            📝 Manage Subscribers
          </Link>
        </li>
      </ul>
    </aside>
  );
}
