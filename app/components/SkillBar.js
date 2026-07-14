"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Skills.module.css";

export default function SkillBar({ level }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(level);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className={styles.bar} ref={ref}>
      <div
        className={styles.progress}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
