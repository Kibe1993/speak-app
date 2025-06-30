import Link from "next/link";
import Image from "next/image";
import styles from "./BlogCard.module.css";

export default function BlogCard({ blog }) {
  const dateToUse = blog.createdAt ? new Date(blog.createdAt) : new Date();
  const formattedDate = dateToUse.toLocaleString();
  return (
    <div className={styles.card}>
      <Link href={`/blogs/${blog._id}`} className={styles.imageWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className={styles.image}
            priority
          />
        </div>
      </Link>

      <div className={styles.header}>
        <h3 className={styles.title}>{blog.title}</h3>
        <span className={styles.category}>{blog.category}</span>
      </div>

      <div
        className={styles.blogContent}
        dangerouslySetInnerHTML={{ __html: blog.message }}
      />

      <div className={styles.meta}>
        <p>{blog.author}</p>
        <p>{formattedDate}</p>
      </div>

      <Link href={`/blogs/${blog._id}`} className={styles.readMore}>
        Read More
      </Link>
    </div>
  );
}
