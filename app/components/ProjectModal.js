"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function ProjectModal({ project, isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => setIsVisible(false), 300); // fade out duration
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;
  if (!project) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-transform duration-300 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 text-black/60 hover:text-black rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1">
          {/* Header Image */}
          <div className="w-full h-[250px] sm:h-[350px] bg-gray-100 relative">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : project.icon ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <project.icon className="w-24 h-24 opacity-50" strokeWidth={1} />
              </div>
            ) : null}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose max-w-none text-gray-600 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.projects.overview}</h3>
                <p className="leading-relaxed">{project.desc}</p>
                {project.fullDesc && (
                  <p className="leading-relaxed mt-2 whitespace-pre-line">{project.fullDesc}</p>
                )}
              </div>

              {project.challenges && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.projects.challenges}</h3>
                  <p className="leading-relaxed whitespace-pre-line">{project.challenges}</p>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="mt-10 flex flex-wrap gap-4 pt-6 border-t border-gray-100">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {project.demo.includes("fastwork.co") ? t.projects.fastwork : t.projects.liveDemo}
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {t.projects.github}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
