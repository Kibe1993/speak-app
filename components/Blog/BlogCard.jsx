import Link from "next/link";
import Image from "next/image";
import styles from "./BlogCard.module.css";

export default function BlogCard({ blog, img }) {
  return (
    <div className={styles.card}>
      <Image
        src={img}
        alt={blog.title}
        className={styles.image}
        width={400}
        height={200}
      />

      <div className={styles.header}>
        <h3 className={styles.title}>{blog.title}</h3>
        <span className={styles.category}>{blog.category}</span>
      </div>

      <div className={styles.message}>
        <p>{blog.message}</p>
      </div>

      <div className={styles.meta}>
        <p>{blog.author}</p>
        <p>{blog.date}</p>
      </div>

      <Link href={`/blogs/${blog._id}`} className={styles.readMore}>
        Read More
      </Link>
    </div>
  );
}
