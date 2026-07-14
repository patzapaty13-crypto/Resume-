"use client";

import ScrollReveal from "./ScrollReveal";
import SkillBar from "./SkillBar";
import styles from "./Skills.module.css";
import * as Icons from "./TechIcons";

const categories = [
  {
    label: "Frontend Development",
    skills: [
      { name: "React", level: 90, icon: <Icons.ReactIcon /> },
      { name: "Next.js", level: 85, icon: <Icons.NextjsIcon /> },
      { name: "TypeScript", level: 85, icon: <Icons.TypescriptIcon /> },
      { name: "HTML / CSS", level: 95, icon: <Icons.HtmlIcon /> },
      { name: "Tailwind CSS", level: 80, icon: <Icons.TailwindIcon /> },
      { name: "Vue.js", level: 70, icon: <Icons.VueIcon /> },
    ],
  },
  {
    label: "Backend Development",
    skills: [
      { name: "Node.js", level: 85, icon: <Icons.NodeIcon /> },
      { name: "Spring Boot", level: 80, icon: <Icons.SpringBootIcon /> },
      { name: "Express.js", level: 85, icon: <Icons.ExpressIcon /> },
      { name: "REST API", level: 90, icon: <Icons.ApiIcon /> },
      { name: "Java", level: 75, icon: <Icons.JavaIcon /> },
      { name: "Python", level: 70, icon: <Icons.PythonIcon /> },
    ],
  },
  {
    label: "Database & DevOps",
    skills: [
      { name: "MySQL", level: 85, icon: <Icons.MysqlIcon /> },
      { name: "MongoDB", level: 80, icon: <Icons.MongodbIcon /> },
      { name: "PostgreSQL", level: 75, icon: <Icons.PostgresIcon /> },
      { name: "Docker", level: 70, icon: <Icons.DockerIcon /> },
      { name: "Git / GitHub", level: 90, icon: <Icons.GitIcon /> },
      { name: "AWS / Cloud", level: 65, icon: <Icons.AwsIcon /> },
    ],
  },
];

export default function Skills() {
  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <h2 className="section-title">ทักษะ</h2>

        {categories.map((cat, ci) => (
          <div className={styles.category} key={ci}>
            <h3 className={styles.label}>{cat.label}</h3>
            <div className={styles.grid}>
              {cat.skills.map((skill, si) => (
                <ScrollReveal key={si} delay={si * 60}>
                  <div className={styles.card}>
                    <div className={styles.cardHeader}>
                      <div className={styles.infoLeft}>
                        <div className={styles.iconWrapper}>{skill.icon}</div>
                        <span className={styles.name}>{skill.name}</span>
                      </div>
                      <span className={styles.percentage}>{skill.level}%</span>
                    </div>
                    <SkillBar level={skill.level} />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
