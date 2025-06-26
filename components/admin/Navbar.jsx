"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/speak-logo.png";
import Link from "next/link";
import styles from "./Navbar.module.css";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blogs" },
  ];

  return (
    <section className={styles.navbar}>
      <nav className={`${styles.navContainer} container`}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={logo} width={120} alt="speak-logo-image" />
          </Link>
        </div>

        <ul className={`${styles.links} `}>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`${styles.link} ${
                  pathName === link.href ? styles.active : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
