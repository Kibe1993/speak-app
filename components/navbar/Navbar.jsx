"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/speak-logo.png";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathName = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blogs" },
    { name: "Share", href: "/share" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <section className={styles.navbar}>
      <nav className={`${styles.navContainer} container`}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={logo} width={120} alt="speak-logo-image" />
          </Link>
        </div>

        <div
          className={styles.mobileIcon}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X color="white" size={28} />
          ) : (
            <Menu color="white" size={28} />
          )}
        </div>

        <ul className={`${styles.links} ${menuOpen ? styles.show : ""}`}>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`${styles.link} ${
                  pathName === link.href ? styles.active : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <form role="search" className={styles.searchForm}>
          <input
            type="search"
            name="q"
            placeholder="Search..."
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>

        <Link href="/admin" className={styles.adminButton}>
          Admin
        </Link>
      </nav>
    </section>
  );
}
