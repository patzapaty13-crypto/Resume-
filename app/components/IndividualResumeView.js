"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";
import ScrollReveal from "./ScrollReveal";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProjectModal from "./ProjectModal";
import { projectsData } from "../data/projectsData";
import {
  GraduationCap,
  Code,
  Rocket,
  ArrowLeft,
  Award,
  ExternalLink,
  CheckCircle2,
  Terminal,
  Sparkles,
  Copy,
  Check,
  Briefcase,
  Share2,
  Mail,
  FolderGit2,
  Users,
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

export default function IndividualResumeView({ memberId }) {
  const { t } = useLanguage();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find target team member
  const member =
    t.team?.members?.find((m) => m.id === memberId) || t.team?.members?.[0];

  // Filter projects contributed by this member
  const memberProjects = projectsData.filter((p) =>
    p.memberIds?.includes(member.id)
  );

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/resume/${member.id}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const cards = [
    {
      icon: GraduationCap,
      title: t.about.educationTitle,
      highlight: member.education?.highlight || "มหาวิทยาลัยหอการค้าไทย",
      text: member.education?.text || t.about.educationDesc,
      sub: member.education?.sub || "University of the Thai Chamber of Commerce",
    },
    {
      icon: Code,
      title: "ความเชี่ยวชาญ",
      highlight: null,
      text: member.expertise,
      sub: null,
    },
    {
      icon: Rocket,
      title: "เป้าหมาย",
      highlight: null,
      text: member.goals,
      sub: null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8">
          {/* Top Banner & Judge Copy Link Bar */}
          <div className="bg-white border border-gray-200 rounded-3xl p-5 md:p-6 mb-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับสู่หน้าหลักเว็บไซต์</span>
            </Link>

            {/* Switcher & Direct Copy Link Button */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Member Switcher */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-2xl border border-gray-200">
                {t.team?.members?.map((m) => {
                  const active = m.id === member.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => router.push(`/resume/${m.id}`)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                        active
                          ? "bg-white text-gray-900 shadow-xs border border-gray-200"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {m.name.split(" ")[0]}
                    </button>
                  );
                })}
              </div>

              {/* Copy Link Button for Judges */}
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-blue-600 transition-all shadow-xs shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>คัดลอกลิงก์แล้ว!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>คัดลอกลิงก์ Resume ส่งกรรมการ</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Member Hero Header Banner */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl shrink-0 flex items-center justify-center bg-gray-800">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    className="w-full h-full object-cover"
                    alt={member.name}
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${member.color} text-white font-bold text-3xl flex items-center justify-center`}
                  >
                    {member.initials}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-semibold mb-3 border border-white/10">
                  <Award className="w-3.5 h-3.5" />
                  <span>{member.badge}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
                  {member.name}
                </h1>
                <p className="text-sm font-semibold text-blue-400 mb-4 uppercase tracking-wider">
                  {member.roleUpper || member.role}
                </p>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-2xl">
                  {member.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-gray-900 hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? "คัดลอกลิงก์สำเร็จ!" : "ส่งลิงก์ Resume ให้กรรมการ"}</span>
                  </button>

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{member.email}</span>
                    </a>
                  )}

                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub Profile</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Screenshot-Matched Layout: Profile Card (Left) + 3 Info Cards (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start mb-16">
            {/* Left Profile Card */}
            <ScrollReveal delay={50}>
              <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 flex flex-col items-center text-center h-full shadow-xs">
                <div className="relative w-[170px] h-[170px] mb-6 rounded-full overflow-hidden border-[3px] border-gray-200 shadow-inner flex items-center justify-center shrink-0">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      className="w-full h-full object-cover"
                      alt={member.name}
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${member.color} text-white font-bold text-3xl flex items-center justify-center`}
                    >
                      {member.initials}
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs text-primary font-bold mb-4 tracking-wider uppercase">
                    {member.roleUpper || member.role}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed text-left mb-6">
                    {member.bio}
                  </p>

                  <div className="flex flex-col gap-2.5 w-full">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-primary text-white hover:bg-blue-600 transition-colors shadow-2xs"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate">{member.email}</span>
                      </a>
                    )}

                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors border border-gray-200"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>{member.github.replace("https://github.com/", "@")}</span>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Info Cards (3 Stacked) */}
            <div className="flex flex-col gap-4">
              {cards.map((card, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="bg-white border border-gray-200 rounded-3xl px-8 py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-transparent group">
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

          {/* Technical Competencies Breakdown */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 mb-12 shadow-xs">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              <span>รายละเอียดทักษะเฉพาะทาง (Technical Competencies)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {member.sections?.map((sec, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-200/80 rounded-2xl p-6"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>{sec.title}</span>
                  </h4>
                  <ul className="space-y-2">
                    {sec.items?.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="text-xs text-gray-600 flex items-start gap-2.5 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Skill Tags */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Key Skills & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {member.skills?.map((s, si) => (
                  <span
                    key={si}
                    className="text-xs font-semibold bg-gray-100 text-gray-800 px-3.5 py-1.5 rounded-xl border border-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contributed Projects Section */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-semibold text-primary mb-2">
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>PROJECT PORTFOLIO</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                  ผลงานและโครงการที่ร่วมพัฒนา (Contributed Projects & Engineering Work)
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  ผลงานซอฟต์แวร์และระบบที่ {member.name} ได้มีส่วนร่วมในการออกแบบและพัฒนา
                </p>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memberProjects.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 100}>
                  <div
                    onClick={() => openModal(p)}
                    className="bg-gray-50/70 border border-gray-200/90 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary group cursor-pointer flex flex-col h-full"
                  >
                    {/* Project Image */}
                    <div className="h-[160px] bg-gray-200 flex items-center justify-center overflow-hidden shrink-0 relative">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                          ดูรายละเอียด
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-5 flex flex-col flex-1">
                      <h4 className="text-sm font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-1">
                        {p.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                        {p.desc}
                      </p>

                      {/* Contributors */}
                      <div className="mb-4 pt-3 border-t border-gray-200/60">
                        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Users className="w-3 h-3 text-primary" />
                          <span>ทีมผู้พัฒนา:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {p.contributors.map((cName) => (
                            <span
                              key={cName}
                              className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                                cName.includes(member.name.split(" ")[0])
                                  ? "bg-primary text-white font-bold"
                                  : "bg-gray-200/80 text-gray-700"
                              }`}
                            >
                              {cName.split(" ")[0]}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {p.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </main>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <Footer />
    </div>
  );
}
