"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { locale, toggleLocale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] bg-[rgba(250,250,250,0.85)] backdrop-blur-xl border-b border-gray-200 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-8 flex items-center justify-between h-[60px]">
        <a
          href="#hero"
          className="text-lg font-bold tracking-tight text-gray-900"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          ธ.ศ.
        </a>

        <div className="flex items-center gap-6 max-md:hidden">
          {["about", "skills", "experience", "projects", "packages", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`text-sm font-medium transition-colors ${
                activeSection === item ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={(e) => scrollTo(e, `#${item}`)}
            >
              {t.nav[item]}
            </a>
          ))}
          
          <div className="w-[1px] h-4 bg-gray-300" />
          
          <button
            onClick={toggleLocale}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            title="Toggle Language"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{locale}</span>
          </button>

          <button
            onClick={() => window.dispatchEvent(new Event("open-ai-chat"))}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            {t.nav.chat}
          </button>
        </div>

        <button
          className="hidden max-md:flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`w-[22px] h-[2px] bg-gray-900 rounded-sm transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`w-[22px] h-[2px] bg-gray-900 rounded-sm transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-[22px] h-[2px] bg-gray-900 rounded-sm transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-[60px] left-0 right-0 bg-[rgba(250,250,250,0.98)] backdrop-blur-xl border-b border-gray-200 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[500px] border-b" : "max-h-0 border-transparent"
        }`}
      >
        <ul className="flex flex-col p-6 gap-4">
          {["about", "skills", "experience", "projects", "packages", "contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
                onClick={(e) => scrollTo(e, `#${item}`)}
              >
                {t.nav[item]}
              </a>
            </li>
          ))}
          <li className="h-[1px] bg-gray-200 my-2" />
          <li className="flex items-center gap-4">
            <button
              onClick={toggleLocale}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{locale}</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setMobileOpen(false);
                window.dispatchEvent(new Event("open-ai-chat"));
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              {t.nav.chat}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
