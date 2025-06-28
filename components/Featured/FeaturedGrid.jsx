import FeaturedItem from "./FeaturedItem";
import styles from "./FeaturedGrid.module.css";

export default function FeaturedGrid({ blogs }) {
  const featuredBlogs = blogs.filter((blog) => blog.featured === true);

  const shuffledBlogs = [...featuredBlogs].sort(() => 0.5 - Math.random());
  return (
    <section className={styles.gridContainer}>
      <div className={styles.gridWrapper}>
        {shuffledBlogs.slice(0, 4).map((item, index) => (
          <FeaturedItem key={index} item={item} />
        ))}
      </div>
    </section>
  );
}
