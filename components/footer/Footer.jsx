import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import logo from "@/public/speak-logo.png";

export default function Footer() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  const categories = ["Lifestyle", "Technology", "Startup", "General"];

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContainer} container`}>
        <div className={styles.logoArea}>
          <Link href="/">
            <Image src={logo} width={120} alt="speak-logo-image" />
          </Link>
        </div>

        <div>
          <h5 className={styles.sectionTitle}>Quick Links</h5>
          {links.map((link, i) => (
            <Link key={i} href={link.href} className={styles.linkItem}>
              {link.name}
            </Link>
          ))}
        </div>

        <div>
          <h5 className={styles.sectionTitle}>Categories</h5>
          {categories.map((cat, index) => (
            <p key={index} className={styles.linkItem}>
              {cat}
            </p>
          ))}
        </div>

        <div>
          <h5 className={styles.sectionTitle}>Connect</h5>
          <div className={styles.socials}>
            <Mail className={styles.icon} />
            <Facebook className={styles.icon} />
            <Twitter className={styles.icon} />
            <Instagram className={styles.icon} />
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>
          &copy; 2025 <strong>Speak</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
