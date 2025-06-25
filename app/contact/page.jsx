"use client";

import Image from "next/image";
import { Mail, Phone, Globe, Send } from "lucide-react";
import styles from "./page.module.css";

export default function ContactPage() {
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
            <Mail size={20} /> contact@easyhomes.com
          </li>
          <li>
            <Phone size={20} /> +1 234 567 890
          </li>
          <li>
            <Globe size={20} /> www.easyhomes.com
          </li>
        </ul>
      </section>

      {/* Subscription Form */}
      <section className={`${styles.formSection} container`}>
        <h2>Subscribe for Updates</h2>
        <form className={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            <Send size={16} /> Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
