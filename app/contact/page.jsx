"use client";

import { Mail, Phone, Globe, Send } from "lucide-react";
import styles from "./page.module.css";
import { useState } from "react";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);

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
    <div className={styles.container}>
      <section className={`${styles.heroSection} container`}>
        <div className={styles.heroContent}>
          <div className={styles.textArea}>
            <h1>Let's Stay Connected</h1>
            <p>Subscribe for blog updates or contact us directly</p>
          </div>
          <div className={styles.imageArea}></div>
        </div>
      </section>

      {/* Contact Info */}
      <section className={`${styles.contactSection} container`}>
        <h2>Contact Information</h2>
        <ul className={styles.contactList}>
          <li>
            <Mail size={20} /> speakapp@gmail.com
          </li>
          <li>
            <Phone size={20} /> +254 727-709-092
          </li>
          <li>
            <Globe size={20} /> www.speakapp.com
          </li>
        </ul>
      </section>

      {/* Subscription Form */}
      <section className={`${styles.formSection} container`}>
        <h2>Subscribe for Updates</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? (
              "Subscribing..."
            ) : (
              <>
                <Send size={16} /> Subscribe
              </>
            )}
          </button>
        </form>
      </section>
    </div>
  );
}
