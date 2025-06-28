import { Mail } from "lucide-react";
import styles from "./Subscription.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export default function Subscription() {
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("/api/subscribe", { email });

      if (!res) return;

      toast.success(res.data.message);
      setEmail("");
    } catch (error) {
      toast.error("❌ Server error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email"
              required
              name="email"
              onChange={onChangeHandler}
              value={email}
            />
            <button className={styles.button} type="submit">
              {loading ? "Submiting..." : "Subscribe"}
            </button>
          </form>
        </main>
      </div>
    </section>
  );
}
