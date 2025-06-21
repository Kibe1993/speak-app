import { Mail } from "lucide-react";
import styles from "./Subscription.module.css";

export default function Subscription() {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.subContainer} container`}>
        <header className={styles.header}>
          <Mail size={24} color="#fff" />
          <h2>Stay Updated</h2>
        </header>

        <main className={styles.main}>
          <p>
            Subscribe to our newsletter and never miss our latest articles and
            insights.
          </p>

          <form className={styles.form}>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email"
              required
            />
            <button className={styles.button} type="submit">
              Subscribe
            </button>
          </form>
        </main>
      </div>
    </section>
  );
}
