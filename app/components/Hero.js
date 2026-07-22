"use client";

import { useEffect, useState } from "react";
import { Users, ArrowRight, Sparkles, ShieldCheck, Cpu, Layers } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { t, locale } = useLanguage();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const anim = (delay) =>
    loaded
      ? { opacity: 1, transform: "translateY(0)", transition: `all 0.6s ease ${delay}s` }
      : { opacity: 0, transform: "translateY(20px)" };

  const teamMembers = [
    {
      id: "wananon",
      name: "วนนนท์ แสงทอง",
      nameEn: "Wananon S.",
      role: "UX/UI & Customer Journey",
      avatar: "/wananon.jpg",
      initials: "WS",
      color: "from-blue-600 to-indigo-700",
    },
    {
      id: "ekarin",
      name: "เอกรินทร์ นีระมนต์",
      nameEn: "Ekarin N.",
      role: "Automation & Integration",
      avatar: "/ekarin.jpg",
      initials: "EN",
      color: "from-emerald-600 to-teal-700",
    },
    {
      id: "bawornwit",
      name: "บวรวิชญ์ สุรินทร์",
      nameEn: "Bawornwit S.",
      role: "PM & Risk Control",
      avatar: "/bawornwit.jpg",
      initials: "BS",
      color: "from-purple-600 to-violet-700",
    },
    {
      id: "kathapong",
      name: "คฑาพงษ์ มากรุง",
      nameEn: "Kathapong M.",
      role: "Backend & Security",
      avatar: "/kathapong.jpg",
      initials: "KM",
      color: "from-rose-600 to-amber-700",
    },
    {
      id: "thanathorn",
      name: "ธนธรณ์ ศิริพันธ์",
      nameEn: "Thanathorn S.",
      role: "Cloud AI & Innovation",
      avatar: "/thanathorn.jpg",
      initials: "TS",
      color: "from-cyan-600 to-blue-700",
    },
  ];

  return (
    <header className="relative min-h-[92vh] flex items-center py-20 overflow-hidden bg-[#090a0f]" id="hero">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-purple-600/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1150px] mx-auto px-6 md:px-8 w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Clean Team Overview */}
        <div style={anim(0)} className="flex flex-col text-left">
          {/* Team Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6 w-fit backdrop-blur-md">
            <Users className="w-3.5 h-3.5" />
            <span>{locale === "th" ? "ทีมวิศวกรซอฟต์แวร์ 5 คน ครบวงจร" : "5-Member End-to-End Software Engineering Team"}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.2]">
            CR7XMESSI & <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              YAMAL CHAMPION
            </span>
          </h1>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-8 max-w-xl">
            {locale === "th"
              ? "พวกเราคือทีมพัฒนาซอฟต์แวร์ที่ผสานความเชี่ยวชาญ 5 ด้านหลัก (UX/UI Design, Full-Stack, Security Architecture, Cloud AI และ Workflow Automation) เพื่อส่งมอบผลิตภัณฑ์ดิจิทัลที่มีคุณภาพ ปลอดภัย และเสถียรสูงสุด"
              : "We are an integrated software engineering team uniting 5 core domains (UX/UI Design, Full-Stack, Security Architecture, Cloud AI, and Workflow Automation) to deliver secure, high-performance digital solutions."}
          </p>

          {/* Key Team Competencies Pills */}
          <div className="grid grid-cols-2 gap-3 mb-8 max-w-lg">
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-gray-300">
              <Layers className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Full-Stack & UX/UI</span>
            </div>
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cybersecurity Certified</span>
            </div>
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-gray-300">
              <Cpu className="w-4 h-4 text-purple-400 shrink-0" />
              <span>AI & Workflow Automation</span>
            </div>
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-gray-300">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Google Cloud Support</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
            >
              <span>{locale === "th" ? "ดูสมาชิกและ Resume" : "Explore Team Resumes"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all hover:-translate-y-0.5"
            >
              {t.hero.viewWork}
            </a>
          </div>
        </div>

        {/* Right Side: Clean Team Roster Card (Teamwork Showcase) */}
        <div style={anim(0.2)} className="flex justify-center items-center w-full">
          <div className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  {locale === "th" ? "สมาชิกทีมทั้งหมด (5 คน)" : "Team Members Roster (5)"}
                </span>
              </div>
              <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                Agile Team
              </span>
            </div>

            {/* Member Cards List */}
            <div className="flex flex-col gap-3">
              {teamMembers.map((m) => (
                <a
                  key={m.id}
                  href={`#about`}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-blue-500/40 hover:bg-white/[0.07] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 shrink-0 flex items-center justify-center bg-gray-800">
                      {m.avatar ? (
                        <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${m.color} text-white font-bold text-xs flex items-center justify-center`}>
                          {m.initials}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                        {locale === "th" ? m.name : m.nameEn}
                      </h4>
                      <p className="text-[11px] text-gray-400">{m.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400 group-hover:text-white transition-colors bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                    View
                  </span>
                </a>
              ))}
            </div>

            {/* Footer note in card */}
            <div className="mt-5 pt-4 border-t border-white/10 text-center">
              <p className="text-[11px] text-gray-400">
                {locale === "th"
                  ? "🤝 ทำงานประสานกันในรูปแบบทีม เพื่อส่งมอบงานที่มีคุณภาพสูงสุด"
                  : "🤝 Working seamlessly as a team to deliver high-quality software."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}

