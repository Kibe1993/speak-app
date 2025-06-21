import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./RecentPostItem.module.css";

export default function RecentPostItem({ item }) {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h4 className={styles.title}>{item.title}</h4>
        <p className={styles.author}>By {item.author}</p>
        <p className={styles.meta}>
          <Calendar size={18} />
          <span>{item.date}</span>
        </p>
      </div>

      <Link href={`/blogs/${item._id}`} className={styles.link}>
        <ArrowRight size={20} />
      </Link>
    </div>
  );
}
