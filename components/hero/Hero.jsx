import Image from "next/image";
import Link from "next/link";
import heroImg from "@/public/speak-hero-4.png";
import styles from "./Hero.module.css";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.heroContainer}`}>
        <header className={styles.header}>
          <p>Find Your Family</p>
          <h1>Where Silence Finds A Voice</h1>
          <Link href="/share" className={styles.getStartedBtn}>
            Get Started <ArrowRight size={18} />
          </Link>
        </header>

        <main className={styles.main}>
          <Image
            src={heroImg}
            alt="Hero Image"
            className={styles.heroImage}
            priority
            placeholder="blur"
          />
        </main>
      </div>
    </section>
  );
}
