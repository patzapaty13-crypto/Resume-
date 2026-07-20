"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Hero() {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const anim = (delay) =>
    loaded
      ? { opacity: 1, transform: "translateY(0)", transition: `all 0.7s ease ${delay}s` }
      : { opacity: 0, transform: "translateY(24px)" };

  return (
    <header className="relative min-h-screen flex items-center py-24 overflow-hidden bg-[#0a0a0c]" id="hero" ref={ref}>
      {/* Background Video */}
      <div className="absolute inset-0 z-[1]">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-25 saturate-[1.2]">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-digital-network-loop-41870-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,10,12,0.2)_0%,#0a0a0c_80%)] z-[2]" />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] z-[2] blur-[40px] animate-[floatOrb_10s_ease-in-out_infinite_alternate]" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)] z-[2] blur-[50px] animate-[floatOrb_14s_ease-in-out_infinite_alternate-reverse]" />

      <div className="relative z-[3] max-w-[1100px] mx-auto px-8 flex items-center justify-between gap-16 w-full max-lg:gap-10 max-md:flex-col max-md:text-center max-md:pt-16 max-md:gap-12">
        {/* Text */}
        <div className="flex-[1.1] max-w-[600px]" style={anim(0)}>
          <p className="text-lg text-white/60 font-normal mb-1 tracking-wider" style={anim(0)}>
            {t.hero.greeting}
          </p>
          <h1 className="text-5xl max-md:text-4xl font-bold tracking-tight leading-[1.2] mb-4 text-white" style={anim(0.15)}>
            ธนธรณ์ <span className="bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">ศิริพันธ์</span>
          </h1>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium mb-6" style={anim(0.3)}>
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3b82f6] animate-[pulseDot_2s_infinite]" />
            {t.hero.role}
          </div>
          <div className="flex flex-wrap gap-4 max-md:justify-center" style={anim(0.6)}>
            <a href="#contact" className="inline-flex items-center justify-center px-7 py-3 rounded-lg text-sm font-medium bg-white text-[#0a0a0c] hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,255,255,0.1)] transition-all">
              {t.hero.contactMe}
            </a>
            <a href="#projects" className="inline-flex items-center justify-center px-7 py-3 rounded-lg text-sm font-medium bg-white/[0.03] text-white border border-white/15 backdrop-blur-sm hover:border-white hover:bg-white/[0.08] hover:-translate-y-0.5 transition-all">
              {t.hero.viewWork}
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-sm font-medium bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm hover:bg-primary/20 hover:border-primary/30 hover:-translate-y-0.5 transition-all">
              <Download className="w-4 h-4" /> {t.hero.resume}
            </a>
          </div>
        </div>

        {/* Code Card */}
        <div className="flex-[0.9] flex justify-center items-center max-md:w-full" style={anim(0.35)}>
          <div className="w-full max-w-[440px] bg-[rgba(20,20,25,0.6)] backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden font-mono max-md:max-w-full">
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[11px] text-white/40 tracking-wider">developer.json</span>
            </div>
            <div className="px-6 py-5 text-xs leading-[1.8] text-gray-200 overflow-x-auto">
              <pre><code>
{`{`}
{"\n"}{"  "}<span className="text-blue-400">{`"name"`}</span>: <span className="text-emerald-400">{`"Thanathorn Siriphan"`}</span>,
{"\n"}{"  "}<span className="text-blue-400">{`"role"`}</span>: <span className="text-emerald-400">{`"Full-Stack Developer"`}</span>,
{"\n"}{"  "}<span className="text-blue-400">{`"education"`}</span>: <span className="text-emerald-400">{`"UTCC (หอการค้าไทย)"`}</span>,
{"\n"}{"  "}<span className="text-blue-400">{`"frontend"`}</span>: <span className="text-yellow-400">[</span><span className="text-emerald-400">"React"</span>, <span className="text-emerald-400">"Next.js"</span><span className="text-yellow-400">]</span>,
{"\n"}{"  "}<span className="text-blue-400">{`"backend"`}</span>: <span className="text-yellow-400">[</span><span className="text-emerald-400">"Spring Boot"</span>, <span className="text-emerald-400">"Node.js"</span><span className="text-yellow-400">]</span>,
{"\n"}{"  "}<span className="text-blue-400">{`"database"`}</span>: <span className="text-yellow-400">[</span><span className="text-emerald-400">"MySQL"</span>, <span className="text-emerald-400">"PostgreSQL"</span>, <span className="text-emerald-400">"MongoDB"</span><span className="text-yellow-400">]</span>
{"\n"}{`}`}
              </code></pre>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
