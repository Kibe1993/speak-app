import blogAssets from "@/public/assets";
import FeaturedItem from "./FeaturedItem";
import styles from "./FeaturedGrid.module.css";

export default function FeaturedGrid() {
  return (
    <section className={styles.gridContainer}>
      <div className={styles.gridWrapper}>
        {blogAssets.slice(0, 3).map((item, index) => (
          <FeaturedItem key={index} item={item} />
        ))}
      </div>
    </section>
  );
}
