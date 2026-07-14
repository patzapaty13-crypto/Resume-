"use client";

import ScrollReveal from "./ScrollReveal";
import styles from "./Experience.module.css";

const timeline = [
  {
    date: "2024 – ปัจจุบัน",
    title: "Full-Stack Developer",
    company: "Freelance / Personal Projects",
    items: [
      "พัฒนาเว็บแอปพลิเคชันด้วย React, Next.js และ Node.js",
      "ออกแบบ RESTful API ด้วย Express.js และ Spring Boot",
      "จัดการฐานข้อมูล MySQL, MongoDB และ PostgreSQL",
      "ใช้ Git/GitHub สำหรับ Version Control",
    ],
    active: true,
  },
  {
    date: "2022 – 2024",
    title: "Frontend Developer Intern",
    company: "โปรเจกต์มหาวิทยาลัย",
    items: [
      "พัฒนา UI/UX ด้วย React และ Tailwind CSS",
      "สร้าง Responsive Web Design สำหรับทุกอุปกรณ์",
      "ทำงานร่วมกับทีมด้วย Agile/Scrum methodology",
    ],
    active: false,
  },
  {
    date: "2020 – ปัจจุบัน",
    title: "ปริญญาตรี",
    company: "มหาวิทยาลัยหอการค้าไทย",
    items: [
      "สาขาวิทยาการคอมพิวเตอร์ / วิศวกรรมซอฟต์แวร์",
      "ศึกษาด้าน Data Structures, Algorithms, Software Engineering",
      "เข้าร่วมกิจกรรมชมรมคอมพิวเตอร์และ Hackathon",
    ],
    active: false,
  },
];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <h2 className="section-title">ประสบการณ์</h2>
        <div className={styles.timeline}>
          {timeline.map((item, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div className={styles.item}>
                <div
                  className={`${styles.dot} ${item.active ? styles.dotActive : ""}`}
                />
                <div className={styles.content}>
                  <span className={styles.date}>{item.date}</span>
                  <h3>{item.title}</h3>
                  <p className={styles.company}>{item.company}</p>
                  <ul>
                    {item.items.map((li, j) => (
                      <li key={j}>{li}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
