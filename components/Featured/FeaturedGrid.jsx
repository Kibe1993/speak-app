import FeaturedItem from "./FeaturedItem";
import styles from "./FeaturedGrid.module.css";

export default function FeaturedGrid({ blogs }) {
  return (
    <section className={styles.gridContainer}>
      <div className={styles.gridWrapper}>
        {blogs.slice(0, 6).map((item, index) => (
          <FeaturedItem key={index} item={item} />
        ))}
      </div>
    </section>
  );
}
