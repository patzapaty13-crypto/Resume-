"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "../contexts/LanguageContext";
import {
  GraduationCap,
  Code,
  Rocket,
  ChevronRight,
  ExternalLink,
  Users,
  Copy,
  Check,
  Share2,
  Mail,
} from "lucide-react";

// Custom Github SVG Icon
const GithubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function About() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Selected team member index for the interactive resume view
  const [selectedId, setSelectedId] = useState(t.team?.members?.[0]?.id || "wananon");

  // Find currently active team member profile
  const activeMember =
    t.team?.members?.find((m) => m.id === selectedId) ||
    t.team?.members?.[0];

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && activeMember) {
      const url = `${window.location.origin}/resume/${activeMember.id}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const cards = [
    {
      icon: GraduationCap,
      title: t.about.educationTitle,
      highlight: activeMember?.education?.highlight || "มหาวิทยาลัยหอการค้าไทย",
      text: activeMember?.education?.text || t.about.educationDesc,
      sub: activeMember?.education?.sub || "University of the Thai Chamber of Commerce",
    },
    {
      icon: Code,
      title: "ความเชี่ยวชาญ",
      highlight: null,
      text: activeMember?.expertise,
      sub: null,
    },
    {
      icon: Rocket,
      title: "เป้าหมาย",
      highlight: null,
      text: activeMember?.goals,
      sub: null,
    },
  ];

  return (
    <section className="py-24 bg-[#fafafa]" id="about">
      <div className="max-w-[1100px] mx-auto px-8">
        {/* Header & Team Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 relative inline-block after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-sm">
              {t.about.title}
            </h2>
            <p className="text-sm text-gray-500 mt-3">
              {t.about.subtitle}
            </p>
          </div>

          {/* Member Switcher Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-gray-200/80 p-1.5 rounded-2xl border border-gray-300/60 self-start md:self-auto">
            {t.team?.members?.map((m) => {
              const isActive = m.id === activeMember?.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-white text-gray-900 shadow-sm border border-gray-300/80"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/40"
                  }`}
                >
                  {m.name.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Member Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          {/* Profile Card (Left) */}
          <ScrollReveal delay={50}>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 flex flex-col items-center text-center h-full shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-[170px] h-[170px] mb-6 rounded-full overflow-hidden border-[3px] border-gray-200 shadow-inner flex items-center justify-center shrink-0">
                {activeMember?.avatar ? (
                  <img
                    src={activeMember.avatar}
                    className="w-full h-full object-cover"
                    alt={activeMember.name}
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${activeMember?.color} text-white font-bold text-3xl flex items-center justify-center`}
                  >
                    {activeMember?.initials}
                  </div>
                )}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(59,130,246,0.15)] rounded-full pointer-events-none" />
              </div>

              <div className="w-full">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {activeMember?.name}
                </h3>
                <p className="text-[11px] text-primary font-bold mb-4 tracking-wider uppercase">
                  {activeMember?.roleUpper || activeMember?.role}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed text-left mb-6">
                  {activeMember?.bio}
                </p>

                {/* Actions & Links */}
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5 items-center">
                  <button
                    onClick={handleCopyLink}
                    className={`inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      copied
                        ? "bg-emerald-600 text-white"
                        : "bg-primary text-white hover:bg-blue-600"
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "คัดลอกลิงก์แล้ว!" : "คัดลอกลิงก์ Resume ส่งกรรมการ"}</span>
                  </button>

                  <Link
                    href={`/resume/${activeMember?.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl text-xs font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    <span>ดูโปรไฟล์ Resume เต็ม</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  {activeMember?.email && (
                    <a
                      href={`mailto:${activeMember.email}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-1.5 px-4 rounded-xl text-xs font-medium text-gray-600 hover:text-primary transition-colors border border-gray-200/80 bg-gray-50"
                    >
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      <span className="truncate">{activeMember.email}</span>
                    </a>
                  )}

                  {activeMember?.github && (
                    <a
                      href={activeMember.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-1.5 px-4 rounded-xl text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Info Cards (Right - 3 Cards Stacked) */}
          <div className="flex flex-col gap-4">
            {cards.map((card, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-white border border-gray-200 rounded-3xl px-8 py-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-transparent group">
                  <card.icon
                    className="w-8 h-8 mb-3 text-primary transition-colors group-hover:text-accent"
                    strokeWidth={1.6}
                  />
                  <h3 className="text-base font-bold mb-1 text-gray-900">
                    {card.title}
                  </h3>
                  {card.highlight && (
                    <p className="text-sm text-primary font-semibold mb-1">
                      {card.highlight}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {card.text}
                  </p>
                  {card.sub && (
                    <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
