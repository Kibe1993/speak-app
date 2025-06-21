import Link from "next/link";
import styles from "./FeaturedItem.module.css";

export default function FeaturedItem({ item }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{item.title}</h3>
        <span className={styles.category}>{item.category}</span>
      </div>

      <div className={styles.message}>
        <p>{item.message}</p>
      </div>

      <div className={styles.meta}>
        <p>{item.author}</p>
        <p>{item.date}</p>
      </div>

      <Link href={`/blogs/${item._id}`} className={styles.readMore}>
        Read More
      </Link>
    </div>
  );
}
