"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { MessageSquare, BarChart3, Users, Sparkles } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { useLanguage } from "../contexts/LanguageContext";

import { projectsData as projects } from "../data/projectsData";

export default function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="py-24 bg-gray-100" id="projects">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-semibold text-primary mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>TEAM COLLABORATION</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 relative inline-block after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-sm">
              {t.projects.title}
            </h2>
            <p className="text-sm text-gray-500 mt-3">
              {t.projects.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {projects.map((p, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div 
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-transparent group cursor-pointer flex flex-col h-full"
                onClick={() => openModal(p)}
              >
                {/* Image */}
                <div className="h-[180px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden shrink-0 relative">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : p.icon ? (
                    <p.icon className="w-14 h-14 text-gray-400 transition-transform duration-500 group-hover:scale-110" strokeWidth={1} />
                  ) : null}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white text-gray-900 text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                      {t.projects.details}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-bold mb-2 leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
                  
                  {/* Contributors Badge */}
                  <div className="mb-4 pt-3 border-t border-gray-100">
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Users className="w-3 h-3 text-primary" />
                      <span>{t.projects.teamMembers || "ผู้พัฒนาในโครงการ:"}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {p.contributors.slice(0, 3).map((name) => (
                        <span key={name} className="text-[10px] bg-gray-100 text-gray-700 font-medium px-2 py-0.5 rounded-md">
                          {name.split(" ")[0]}
                        </span>
                      ))}
                      {p.contributors.length > 3 && (
                        <span className="text-[10px] bg-primary/10 text-primary font-medium px-1.5 py-0.5 rounded-md">
                          +{p.contributors.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 bg-primary/[0.06] text-primary text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                    {p.tags.length > 3 && (
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        +{p.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </section>
  );
}
