"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "../contexts/LanguageContext";
import {
  User,
  Code,
  ShieldCheck,
  Cpu,
  Briefcase,
  Layout,
  Sparkles,
  ChevronRight,
  X,
  Award,
  Terminal,
  CheckCircle2,
  Users,
  ExternalLink,
  Share2,
  Check,
  Copy,
} from "lucide-react";

// Custom SVG Brand Icon for Github
const Github = (props) => (
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

export default function Team() {
  const { t } = useLanguage();
  const [selectedMember, setSelectedMember] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyLink = (id, e) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/resume/${id}`;
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const getRoleIcon = (role) => {
    if (role.includes("Frontend") || role.includes("UX/UI")) return Layout;
    if (role.includes("Backend") || role.includes("Cybersecurity")) return ShieldCheck;
    if (role.includes("Project Manager")) return Briefcase;
    if (role.includes("Google Student Ambassador") || role.includes("AI Engineer")) return Sparkles;
    return Cpu;
  };

  const getBadgeColor = (id) => {
    switch (id) {
      case "wananon":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "ekarin":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "bawornwit":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "kathapong":
        return "bg-rose-50 text-rose-600 border-rose-200";
      case "thanathorn":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="team">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-[1100px] mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-semibold text-primary mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>TEAM RESUME</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 relative inline-block after:absolute after:-bottom-3 after:left-0 after:w-12 after:h-[3px] after:bg-primary after:rounded-full">
              {t.team.title}
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl text-base">
              {t.team.subtitle}
            </p>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.team.members.map((member, index) => {
            const RoleIcon = getRoleIcon(member.role);
            return (
              <ScrollReveal key={member.id} delay={index * 100}>
                <div
                  onClick={() => setSelectedMember(member)}
                  className="group relative bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer flex flex-col justify-between h-full overflow-hidden"
                >
                  {/* Top Bar Accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${member.color} transition-all duration-300 group-hover:h-2`}
                  />

                  <div>
                    {/* Header with Avatar & Badge */}
                    <div className="flex items-start justify-between gap-4 mb-4 pt-1">
                      <div className="relative">
                        {member.avatar ? (
                          <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform border border-gray-200">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${member.color} text-white font-bold text-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                          >
                            {member.initials}
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full p-1 shadow-sm flex items-center justify-center border border-gray-100">
                          <RoleIcon className="w-3.5 h-3.5 text-gray-700" />
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${getBadgeColor(
                            member.id
                          )}`}
                        >
                          {member.badge}
                        </span>
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-900 transition-colors"
                            title="GitHub Profile"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Name & Role */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 mt-1 mb-4 flex items-center gap-1.5">
                      <span>{member.role}</span>
                    </p>

                    {/* Skill Tags Preview */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {member.skills.slice(0, 4).map((skill, si) => (
                        <span
                          key={si}
                          className="text-[11px] bg-gray-100 group-hover:bg-primary/5 text-gray-600 group-hover:text-primary px-2.5 py-1 rounded-md transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 4 && (
                        <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                          +{member.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Bar / Action */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-medium">
                    <button
                      onClick={(e) => handleCopyLink(member.id, e)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all font-bold shadow-2xs ${
                        copiedId === member.id
                          ? "bg-emerald-600 text-white"
                          : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                      }`}
                    >
                      {copiedId === member.id ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedId === member.id ? "คัดลอกลิงก์แล้ว!" : "คัดลอกลิงก์ Resume"}</span>
                    </button>

                    <a
                      href={`/resume/${member.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-gray-400 hover:text-primary transition-colors text-[11px] font-semibold"
                      title="เปิดหน้า Resume เต็ม"
                    >
                      <span>เปิดดู</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedMember.color} text-white font-bold text-xl flex items-center justify-center shadow-lg shrink-0`}
              >
                {selectedMember.initials}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>{selectedMember.badge}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedMember.name}
                </h3>
                <p className="text-sm font-medium text-gray-500">
                  {selectedMember.role}
                </p>
                {selectedMember.github && (
                  <a
                    href={selectedMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-700 hover:text-primary font-medium mt-1 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>{selectedMember.github.replace("https://github.com/", "@")}</span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </a>
                )}
              </div>
            </div>

            {/* Competency Sections */}
            <div className="space-y-6">
              {selectedMember.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50/80 border border-gray-100 rounded-2xl p-5"
                >
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-3 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    <span>{section.title}</span>
                  </h4>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="text-sm text-gray-600 flex items-start gap-2.5 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* All Skill Badges */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Technical Tags & Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((s, si) => (
                    <span
                      key={si}
                      className="text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg border border-gray-200/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <a
                href={`/resume/${selectedMember.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white hover:bg-blue-600 rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <Share2 className="w-4 h-4" />
                <span>เปิดหน้า Resume สำหรับส่งกรรมการ</span>
              </a>

              <div className="flex items-center gap-2">
                {selectedMember.github && (
                  <a
                    href={selectedMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}

                <button
                  onClick={() => setSelectedMember(null)}
                  className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-semibold hover:bg-gray-800 transition-colors"
                >
                  {t.team.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
