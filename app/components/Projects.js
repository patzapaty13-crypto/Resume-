"use client";

import ScrollReveal from "./ScrollReveal";
import styles from "./Projects.module.css";

const projects = [
  {
    title: "Full-Stack Web Development (Spring Boot, Vue 3, React)",
    desc: "รับพัฒนาเว็บไซต์ Full-Stack ระบบเสถียร รองรับผู้ใช้จำนวนมาก ออกแบบโครงสร้างซับซ้อนอย่างเป็นระเบียบ ดูแลรักษาง่าย พร้อมระบบ Role-Based System Access Control (RBAC), การออกแบบ Database Schema และการจัดการ Caching เพื่อประสิทธิภาพสูงสุด",
    tags: ["Spring Boot", "Java", "Vue 3", "React", "Supabase", "PostgreSQL"],
    image: "/fullstack-service.jpg",
    github: null,
    demo: "https://fastwork.co/byob/KJCm6w4Jbs?openExternalBrowser=1&source=byob",
  },
  {
    title: "AI Automation (n8n & Make)",
    desc: "รับวางระบบ AI Automation และการเชื่อมต่อ API ด้วย n8n และ Make (Integromat) เพื่อลดการทำงานที่ซ้ำซ้อนและเพิ่มประสิทธิภาพให้ธุรกิจของคุณอย่างอัตโนมัติ เชื่อมโยงระบบอีเมล CRM ฐานข้อมูล และระบบแจ้งเตือนเข้าด้วยกัน",
    tags: ["n8n", "Make.com", "AI Automation", "API Integration", "Workflow Automation"],
    image: "/ai-automation-service.jpg",
    github: null,
    demo: "https://fastwork.co/byob/KJCm6w4Jbs?openExternalBrowser=1&source=byob",
  },
  {
    title: "UTCC Internship Portal",
    desc: "ระบบบริหารจัดการการฝึกงานและศึกษาดูงานแบบครบวงจรสำหรับมหาวิทยาลัยหอการค้าไทย เชื่อมโยงนักศึกษา อาจารย์ เจ้าหน้าที่ และสถานประกอบการไว้ในแพลตฟอร์มเดียว",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: "/utcc-project.png",
    github: "https://github.com/patzapaty13-crypto",
    demo: "https://utcc-tp-indol.vercel.app",
  },
  {
    title: "Real-time Chat Application",
    desc: "แอปพลิเคชันแชทแบบ Real-time ด้วย React, Node.js และ Socket.IO รองรับห้องแชท การส่งไฟล์ และการแจ้งเตือน",
    tags: ["React", "Node.js", "Socket.IO", "Express.js"],
    image: "/chat-architecture.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01" />
        <path d="M12 10h.01" />
        <path d="M16 10h.01" />
      </svg>
    ),
    github: "https://github.com/patzapaty13-crypto",
    demo: "/chat",
  },
  {
    title: "Task Management Dashboard",
    desc: "ระบบจัดการงาน (Kanban Board) พัฒนาด้วย React, Express.js และ MongoDB พร้อม Drag & Drop และ Analytics Dashboard",
    tags: ["React", "Express.js", "MongoDB", "Node.js"],
    image: "/task-dashboard.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
        <rect x="2" y="2" width="20" height="20" rx="2" />
      </svg>
    ),
    github: "https://github.com/patzapaty13-crypto",
    demo: null,
  },
];

export default function Projects() {
  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <h2 className="section-title">ผลงาน</h2>
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className={styles.card}>
                <div className={styles.image}>
                  {p.image ? (
                    <img src={p.image} alt={p.title} className={styles.projectImg} />
                  ) : (
                    <div className={styles.placeholder}>{p.icon}</div>
                  )}
                </div>
                <div className={styles.info}>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className={styles.tags}>
                    {p.tags.map((tag) => (
                      <span className={styles.tag} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={styles.links}>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        GitHub →
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        {p.demo.includes("fastwork.co") ? "จ้างงานบน Fastwork →" : "Live Demo →"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
