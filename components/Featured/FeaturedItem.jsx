import Link from "next/link";
import Image from "next/image";
import styles from "./FeaturedItem.module.css";

export default function FeaturedItem({ item }) {
  const dateToUse = item.createdAt ? new Date(item.createdAt) : new Date();
  const formattedDate = dateToUse.toLocaleDateString();
  return (
    <div className={styles.card}>
      {item.image && (
        <Link href={`/blogs/${item._id}`}>
          <div className={styles.imageWrapper}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              className={styles.image}
            />
          </div>
        </Link>
      )}

      <div className={styles.header}>
        <h3 className={styles.title}>{item.title}</h3>
        <span className={styles.category}>{item.category}</span>
      </div>

      <div
        className={styles.blogContent}
        dangerouslySetInnerHTML={{ __html: item.message }}
      />

      <div className={styles.meta}>
        <p>{item.author}</p>
        <p>{formattedDate}</p>
      </div>

      {/* Read More link */}
      <Link href={`/blogs/${item._id}`} className={styles.readMore}>
        Read More
      </Link>
    </div>
  );
}
