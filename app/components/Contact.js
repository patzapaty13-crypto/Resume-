"use client";

import ScrollReveal from "./ScrollReveal";
import { Mail, Phone, Briefcase } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

// Custom SVG Brand Icons since Lucide v0.300+ removed them
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

const Linkedin = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const { t } = useLanguage();

  const contacts = [
    {
      href: "mailto:wakakawananon@gmail.com",
      label: "Team Email",
      value: "wakakawananon@gmail.com",
      icon: Mail,
    },
    {
      href: "tel:+66919145670",
      label: "โทรศัพท์",
      value: "091-914-5670",
      icon: Phone,
    },
    {
      href: "https://github.com/patzapaty13-crypto",
      label: "GitHub",
      value: t.contact.github,
      icon: Github,
      external: true,
    },
    {
      href: "https://www.linkedin.com/in/%E0%B8%98%E0%B8%99%E0%B8%98%E0%B8%A3%E0%B8%93%E0%B9%8C-%E0%B8%A8%E0%B8%B4%E0%B8%A3%E0%B8%B4%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B9%8C-6832b23a9/",
      label: "LinkedIn",
      value: t.contact.linkedin,
      icon: Linkedin,
      external: true,
    },
    {
      href: "https://fastwork.co/byob/KJCm6w4Jbs?openExternalBrowser=1&source=byob",
      label: "Fastwork",
      value: t.contact.fastwork,
      icon: Briefcase,
      external: true,
    },
  ];

  return (
    <section className="py-24" id="contact">
      <div className="max-w-[1100px] mx-auto px-8 text-center">
        <h2 className="text-3xl font-semibold tracking-tight mb-4 relative inline-block after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-10 after:h-[3px] after:bg-primary after:rounded-sm">
          {t.contact.title}
        </h2>
        <p className="text-sm text-gray-500 mt-2 mb-12">
          {t.contact.subtitle}
        </p>
        <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 text-left">
          {contacts.map((c, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <a
                href={c.href}
                className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary group"
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <c.icon className="w-6 h-6 text-gray-400 mb-3 transition-colors group-hover:text-primary" strokeWidth={1.8} />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {c.label}
                </span>
                <span className="text-sm font-medium text-gray-900 break-words">
                  {c.value}
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
