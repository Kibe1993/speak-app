"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/speak-logo.png";
import styles from "./Navbar.module.css";
import { SignOutButton } from "@clerk/nextjs";

export default function AdminNavbar() {
  const pathName = usePathname();

  const links = [
    { name: "Subscribers", href: "/admin/subscribers" },
    { name: "Dashboard", href: "/admin" },
  ];

  return (
    <section className={styles.navbar}>
      <nav className={`${styles.navContainer} container`}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={logo} width={120} alt="speak-logo-image" />
          </Link>
        </div>

        <ul className={`${styles.links}`}>
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

        <SignOutButton>
          <button className={styles.adminButton}>Sign Out</button>
        </SignOutButton>
      </nav>
    </section>
  );
}
