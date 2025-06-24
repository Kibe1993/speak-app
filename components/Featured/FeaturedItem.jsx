import Link from "next/link";
import Image from "next/image";
import styles from "./FeaturedItem.module.css";

export default function FeaturedItem({ item }) {
  return (
    <div className={styles.card}>
      {item.image && (
        <Link href={`/blogs/${item._id}`}>
          <div className={styles.imageWrapper}>
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
        </Link>
      )}

      <div className={styles.header}>
        <h3 className={styles.title}>{item.title}</h3>
        <span className={styles.category}>{item.category}</span>
      </div>

      <div className={styles.message}>
        <p>{item.message}</p>
      </div>

      <div className={styles.meta}>
        <p>{item.author}</p>
        <p>
          {item.date
            ? new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
        </p>
      </div>

      {/* Read More link */}
      <Link href={`/blogs/${item._id}`} className={styles.readMore}>
        Read More
      </Link>
    </div>
  );
}
