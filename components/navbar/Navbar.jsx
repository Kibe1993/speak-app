"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/speak-logo.png";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { SignInButton, useUser, useClerk } from "@clerk/nextjs";
import { toast } from "react-toastify";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const normalizedEmail =
    user?.primaryEmailAddress?.emailAddress?.toLowerCase();

  const allowedEmail = [
    "kiberichard.kr@gmail.com",
    "denniskariuki337@gmail.com",
    "richardkibe.dev@gmail.com",
  ].map((email) => email.toLowerCase());

  useEffect(() => {
    if (isLoaded && isSignedIn && !allowedEmail.includes(normalizedEmail)) {
      toast.error("Access denied: Unauthorized email.");
      signOut();
    }
  }, [isLoaded, isSignedIn, user, signOut]);

  const links = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "Share", href: "/share" },
    { name: "Contact", href: "/contact" },
  ];

  const isAdmin = isSignedIn && allowedEmail.includes(normalizedEmail);

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
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.authButtons}>
          {!isLoaded ? null : isAdmin ? (
            <Link href="/admin" className={styles.adminButton}>
              Admin
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className={styles.adminButton}>Sign In</button>
            </SignInButton>
          )}
        </div>
      </nav>
    </section>
  );
}
