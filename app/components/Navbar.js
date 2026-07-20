"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Navbar.module.css";

const navItems = [
  { href: "#about", label: "เกี่ยวกับ" },
  { href: "#skills", label: "ทักษะ" },
  { href: "#experience", label: "ประสบการณ์" },
  { href: "#projects", label: "ผลงาน" },
  { href: "#contact", label: "ติดต่อ" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const linksRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Slide the active indicator pill under the current link */
  const updateIndicator = useCallback(() => {
    if (!linksRef.current || !activeSection) {
      setIndicatorStyle({ opacity: 0 });
      return;
    }
    const activeLink = linksRef.current.querySelector(
      `a[href="#${activeSection}"]`
    );
    if (activeLink) {
      const parent = linksRef.current.getBoundingClientRect();
      const rect = activeLink.getBoundingClientRect();
      setIndicatorStyle({
        left: rect.left - parent.left,
        width: rect.width,
        opacity: 1,
      });
    }
  }, [activeSection]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 70;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className={`${styles.navbar} ${visible ? styles.visible : ""}`}>
      {/* Top shimmer line */}
      <div className={styles.shimmerLine} />

      <div className={styles.container}>
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className={styles.logoText}>ธ.ศ.</span>
        </a>

        <ul
          ref={linksRef}
          className={`${styles.links} ${mobileOpen ? styles.open : ""}`}
        >
          {/* Sliding active indicator (desktop only) */}
          <li className={styles.indicatorWrapper} aria-hidden>
            <span className={styles.indicator} style={indicatorStyle} />
          </li>

          {navItems.map((item, i) => (
            <li key={item.href} style={{ "--i": i }}>
              <a
                href={item.href}
                className={
                  activeSection === item.href.slice(1) ? styles.active : ""
                }
                onClick={(e) => scrollTo(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`${styles.toggle} ${
            mobileOpen ? styles.toggleActive : ""
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
