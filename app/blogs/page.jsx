import BlogCard from "@/components/Blog/BlogCard";
import styles from "./page.module.css";
import blogAssets from "@/public/assets";
import dummyImg from "@/public/dummyImg.jpg";

export default function Blogs() {
  return (
    <section className={styles.blogs}>
      <div className={`${styles.blogContainer} container`}>
        <div className={styles.top}>
          <div className={styles.header}>
            <h1>Our Blog</h1>
          </div>
          <div className={styles.filters}>
            <button className={styles.filterBtn}>All</button>
            <button className={styles.filterBtn}>Lifestyle</button>
            <button className={styles.filterBtn}>Startup</button>
            <button className={styles.filterBtn}>Technology</button>
          </div>
        </div>

        <div className={styles.grid}>
          {blogAssets.map((blog, i) => (
            <BlogCard key={i} blog={blog} img={dummyImg} />
          ))}
        </div>
      </div>
    </section>
  );
}
