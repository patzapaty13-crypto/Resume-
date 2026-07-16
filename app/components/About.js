"use client";

import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "../contexts/LanguageContext";
import { GraduationCap, Code, Rocket } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: GraduationCap,
      title: t.about.educationTitle,
      highlight: "มหาวิทยาลัยหอการค้าไทย",
      text: t.about.educationDesc,
      sub: "University of the Thai Chamber of Commerce",
    },
    {
      icon: Code,
      title: "ความเชี่ยวชาญ",
      highlight: null,
      text: "Full-Stack Web Development — ออกแบบและพัฒนาเว็บแอปพลิเคชันครบวงจร ตั้งแต่ UI/UX ไปจนถึงระบบ Backend และฐานข้อมูล",
      sub: null,
    },
    {
      icon: Rocket,
      title: "เป้าหมาย",
      highlight: null,
      text: "มุ่งมั่นพัฒนาทักษะอย่างต่อเนื่อง สร้างสรรค์ผลิตภัณฑ์ดิจิทัลที่มีคุณภาพ และเติบโตในสายงาน Software Development",
      sub: null,
    },
  ];

  return (
    <section className="py-24" id="about">
      <div className="max-w-[1100px] mx-auto px-8">
        <h2 className="text-3xl font-semibold tracking-tight mb-12 relative inline-block after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-sm">
          {t.about.title}
        </h2>

        <div className="grid grid-cols-[0.9fr_1.1fr] gap-12 items-start max-lg:grid-cols-1 max-lg:gap-8">
          {/* Profile Card */}
          <ScrollReveal delay={50}>
            <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center text-center h-full">
              <div className="relative w-[180px] h-[180px] mb-8 rounded-full overflow-hidden border-[3px] border-gray-200">
                <img src="/profile.jpg" className="w-full h-full object-cover" alt="Thanathorn Siriphan" />
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(59,130,246,0.2)] rounded-full pointer-events-none" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">ธนธรณ์ ศิริพันธ์</h3>
                <p className="text-xs text-primary font-semibold mb-4 tracking-wider uppercase">
                  {t.hero.role} & AI Automation Specialist
                </p>
                <p className="text-sm text-gray-500 leading-relaxed text-left">
                  {t.about.bio}
                </p>
                
                {/* Download Resume Button inside About */}
                <div className="mt-8 flex justify-center">
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                    {t.hero.resume}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Info Cards */}
          <div className="flex flex-col gap-4">
            {cards.map((card, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-white border border-gray-200 rounded-2xl px-8 py-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-transparent group">
                  <card.icon className="w-9 h-9 mb-4 text-primary transition-colors group-hover:text-accent" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
                  {card.highlight && (
                    <p className="text-sm text-primary font-medium mb-0.5">{card.highlight}</p>
                  )}
                  <p className="text-sm text-gray-500 leading-relaxed">{card.text}</p>
                  {card.sub && <p className="text-xs text-gray-400 mt-1">{card.sub}</p>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
