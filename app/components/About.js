"use client";

import ScrollReveal from "./ScrollReveal";
import styles from "./About.module.css";

const GraduationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const cards = [
  {
    icon: <GraduationIcon />,
    title: "การศึกษา",
    highlight: "มหาวิทยาลัยหอการค้าไทย",
    text: "ปริญญาตรี สาขาวิทยาการคอมพิวเตอร์",
    sub: "University of the Thai Chamber of Commerce",
  },
  {
    icon: <CodeIcon />,
    title: "ความเชี่ยวชาญ",
    highlight: null,
    text: "Full-Stack Web Development — ออกแบบและพัฒนาเว็บแอปพลิเคชันครบวงจร ตั้งแต่ UI/UX ไปจนถึงระบบ Backend และฐานข้อมูล",
    sub: null,
  },
  {
    icon: <RocketIcon />,
    title: "เป้าหมาย",
    highlight: null,
    text: "มุ่งมั่นพัฒนาทักษะอย่างต่อเนื่อง สร้างสรรค์ผลิตภัณฑ์ดิจิทัลที่มีคุณภาพ และเติบโตในสายงาน Software Development",
    sub: null,
  },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title">เกี่ยวกับผม</h2>
        <div className={styles.grid}>
          {cards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className={styles.card}>
                <div className={styles.icon}>{card.icon}</div>
                <h3>{card.title}</h3>
                {card.highlight && (
                  <p className={styles.highlight}>{card.highlight}</p>
                )}
                <p className={styles.text}>{card.text}</p>
                {card.sub && <p className={styles.sub}>{card.sub}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
