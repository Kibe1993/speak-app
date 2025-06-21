import FeaturedGrid from "./FeaturedGrid";
import styles from "./Featured.module.css";
import Link from "next/link";

export default function FeaturedSection() {
  return (
    <section className={styles.section}>
      <div className={`${styles.featuredContainer} container`}>
        <main className={styles.mainContent}>
          <header className={styles.header}>
            <h2>Featured Blogs</h2>
          </header>
          <FeaturedGrid />

          <div>
            <Link href={"/blogs"} className={styles.seeAllBtn}>
              See All
            </Link>
          </div>
        </main>
      </div>
    </section>
  );
}
