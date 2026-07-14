"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add(styles.loaded);
  }, []);

  return (
    <header className={styles.hero} id="hero" ref={ref}>
      {/* Background Video & Glowing Orbs */}
      <div className={styles.videoWrapper}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.video}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-digital-network-loop-41870-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className={styles.overlay} />
      </div>

      {/* Modern Tech Background Glowing Orbs */}
      <div className={styles.glowingOrb1} />
      <div className={styles.glowingOrb2} />

      <div className={styles.content}>
        <div className={styles.text}>
          <p className={styles.greeting}>สวัสดีครับ, ผมชื่อ</p>
          <h1 className={styles.name}>
            ธนธรณ์ <span className={styles.gradientText}>ศิริพันธ์</span>
          </h1>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Full-Stack Developer
          </div>
          <p className={styles.desc}>
            นักพัฒนาซอฟต์แวร์ที่มุ่งเน้นการสร้างเว็บแอปพลิเคชันที่มีคุณภาพ
            ออกแบบ UI/UX ที่เรียบง่ายแต่ทรงพลัง และพัฒนาระบบหลังบ้านที่มั่นคง
          </p>
          <div className={styles.actions}>
            <a href="#contact" className={`${styles.btn} ${styles.btnPrimary}`}>
              ติดต่อผม
            </a>
            <a href="#projects" className={`${styles.btn} ${styles.btnOutline}`}>
              ดูผลงาน
            </a>
          </div>
        </div>

        {/* Premium Developer Glassmorphic Card instead of basic circle */}
        <div className={styles.visual}>
          <div className={styles.codeCard}>
            <div className={styles.cardHeader}>
              <div className={styles.windowButtons}>
                <span className={styles.dotRed}></span>
                <span className={styles.dotYellow}></span>
                <span className={styles.dotGreen}></span>
              </div>
              <span className={styles.cardTitle}>developer.json</span>
            </div>
            <div className={styles.cardBody}>
              <pre>
                <code>
                  <span className={styles.syntaxBrace}>{"{"}</span>{"\n"}
                  {"  "}<span className={styles.syntaxKey}>"name"</span>: <span className={styles.syntaxString}>"Thanathorn Siriphan"</span>,{"\n"}
                  {"  "}<span className={styles.syntaxKey}>"role"</span>: <span className={styles.syntaxString}>"Full-Stack Developer"</span>,{"\n"}
                  {"  "}<span className={styles.syntaxKey}>"education"</span>: <span className={styles.syntaxString}>"UTCC (หอการค้าไทย)"</span>,{"\n"}
                  {"  "}<span className={styles.syntaxKey}>"frontend"</span>: <span className={styles.syntaxBrace}>{"["}</span><span className={styles.syntaxString}>"React"</span>, <span className={styles.syntaxString}>"Next.js"</span><span className={styles.syntaxBrace}>{"]"}</span>,{"\n"}
                  {"  "}<span className={styles.syntaxKey}>"backend"</span>: <span className={styles.syntaxBrace}>{"["}</span><span className={styles.syntaxString}>"Spring Boot"</span>, <span className={styles.syntaxString}>"Node.js"</span><span className={styles.syntaxBrace}>{"]"}</span>,{"\n"}
                  {"  "}<span className={styles.syntaxKey}>"database"</span>: <span className={styles.syntaxBrace}>{"["}</span><span className={styles.syntaxString}>"MySQL"</span>, <span className={styles.syntaxString}>"PostgreSQL"</span>, <span className={styles.syntaxString}>"MongoDB"</span><span className={styles.syntaxBrace}>{"]"}</span>{"\n"}
                  <span className={styles.syntaxBrace}>{"}"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
