import blogAssets from "@/public/assets";
import RecentPostItem from "./RecentPostItem";
import styles from "./RecentPost.module.css";

export default function RecentPost() {
  return (
    <section className={styles.section}>
      <div className={`${styles.recentPostContainer} container`}>
        <header className={styles.header}>
          <h2>Recent Posts</h2>
        </header>
        <main className={styles.main}>
          {blogAssets.map((blog, index) => (
            <RecentPostItem item={blog} key={index} />
          ))}
        </main>
      </div>
    </section>
  );
}
