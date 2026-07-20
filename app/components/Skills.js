"use client";

import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Atom, Globe, FileCode, Layers, Wind, Triangle,
  Server, Leaf, Zap, Link, Coffee, Code,
  Database, CircleDot, HardDrive, Container, GitBranch, Cloud,
} from "lucide-react";

const categories = [
  {
    label: "Frontend Development",
    skills: [
      { name: "React", icon: Atom },
      { name: "Next.js", icon: Globe },
      { name: "TypeScript", icon: FileCode },
      { name: "HTML / CSS", icon: Layers },
      { name: "Tailwind CSS", icon: Wind },
      { name: "Vue.js", icon: Triangle },
    ],
  },
  {
    label: "Backend Development",
    skills: [
      { name: "Node.js", icon: Server },
      { name: "Spring Boot", icon: Leaf },
      { name: "Express.js", icon: Zap },
      { name: "REST API", icon: Link },
      { name: "Java", icon: Coffee },
      { name: "Python", icon: Code },
    ],
  },
  {
    label: "Database & DevOps",
    skills: [
      { name: "MySQL", icon: Database },
      { name: "MongoDB", icon: CircleDot },
      { name: "PostgreSQL", icon: HardDrive },
      { name: "Docker", icon: Container },
      { name: "Git / GitHub", icon: GitBranch },
      { name: "AWS / Cloud", icon: Cloud },
    ],
  },
];

export default function Skills() {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-gray-100" id="skills">
      <div className="max-w-[1100px] mx-auto px-8">
        <h2 className="text-3xl font-semibold tracking-tight mb-12 relative inline-block after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-sm">
          {t.skills.title}
        </h2>

        {categories.map((cat, ci) => (
          <div className={`${ci < categories.length - 1 ? "mb-14" : ""}`} key={ci}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
              {ci === 0 ? t.skills.frontend : ci === 1 ? t.skills.backend : t.skills.database}
            </h3>
            <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
              {cat.skills.map((skill, si) => (
                <ScrollReveal key={si} delay={si * 60}>
                  <div className="bg-white border border-gray-200 rounded-xl px-5 py-3.5 flex items-center gap-3 transition-all duration-300 hover:border-primary hover:bg-primary/[0.04] hover:-translate-y-0.5 hover:shadow-sm group cursor-default">
                    <skill.icon className="w-5 h-5 text-gray-400 transition-colors group-hover:text-primary" strokeWidth={1.8} />
                    <span className="text-sm font-medium text-gray-900">{skill.name}</span>
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
