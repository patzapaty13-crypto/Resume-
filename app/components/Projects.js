"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { MessageSquare, BarChart3, ArrowRight } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { useLanguage } from "../contexts/LanguageContext";

const projects = [
  {
    title: "Full-Stack Web Development (Spring Boot, Vue 3, React)",
    desc: "รับพัฒนาเว็บไซต์ Full-Stack ระบบเสถียร รองรับผู้ใช้จำนวนมาก ออกแบบโครงสร้างซับซ้อนอย่างเป็นระเบียบ",
    fullDesc: "บริการรับพัฒนาเว็บไซต์ Full-Stack ระบบเสถียร รองรับผู้ใช้จำนวนมาก ออกแบบโครงสร้างซับซ้อนอย่างเป็นระเบียบ ดูแลรักษาง่าย พร้อมระบบ Role-Based System Access Control (RBAC), การออกแบบ Database Schema และการจัดการ Caching เพื่อประสิทธิภาพสูงสุด",
    challenges: "- ออกแบบ Database Schema ให้รองรับข้อมูลขนาดใหญ่\n- จัดการสิทธิ์การเข้าถึงของผู้ใช้แต่ละระดับ (RBAC)\n- ทำ Caching เพื่อลดภาระของ Database และเพิ่มความเร็วในการโหลด",
    tags: ["Spring Boot", "Java", "Vue 3", "React", "Supabase", "PostgreSQL"],
    image: "/fullstack-service.jpg",
    github: null,
    demo: "https://fastwork.co/byob/KJCm6w4Jbs?openExternalBrowser=1&source=byob",
  },
  {
    title: "AI Automation (n8n & Make)",
    desc: "รับวางระบบ AI Automation และการเชื่อมต่อ API ด้วย n8n และ Make (Integromat)",
    fullDesc: "บริการรับวางระบบ AI Automation และการเชื่อมต่อ API ด้วย n8n และ Make (Integromat) เพื่อลดการทำงานที่ซ้ำซ้อนและเพิ่มประสิทธิภาพให้ธุรกิจของคุณอย่างอัตโนมัติ เชื่อมโยงระบบอีเมล CRM ฐานข้อมูล และระบบแจ้งเตือนเข้าด้วยกัน",
    challenges: "- เชื่อมต่อ API ของหลายแพลตฟอร์มเข้าด้วยกันแบบไร้รอยต่อ\n- จัดการ Error Handling และ Retry Logic เพื่อความเสถียรของ Workflow",
    tags: ["n8n", "Make.com", "AI Automation", "API Integration", "Workflow Automation"],
    image: "/ai-automation-service.jpg",
    github: null,
    demo: "https://fastwork.co/byob/KJCm6w4Jbs?openExternalBrowser=1&source=byob",
  },
  {
    title: "UTCC Internship Portal",
    desc: "ระบบบริหารจัดการการฝึกงานและศึกษาดูงานแบบครบวงจรสำหรับมหาวิทยาลัยหอการค้าไทย",
    fullDesc: "ระบบบริหารจัดการการฝึกงานและศึกษาดูงานแบบครบวงจรสำหรับมหาวิทยาลัยหอการค้าไทย เชื่อมโยงนักศึกษา อาจารย์ เจ้าหน้าที่ และสถานประกอบการไว้ในแพลตฟอร์มเดียว เพื่อความสะดวกในการติดตามสถานะและประเมินผล",
    challenges: "- ระบบมีผู้ใช้งานหลายประเภท ต้องออกแบบ UI/UX ให้เหมาะกับแต่ละกลุ่ม\n- การจัดการสถานะของเอกสารที่ซับซ้อน",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: "/utcc-project.png",
    github: "https://github.com/patzapaty13-crypto",
    demo: "https://utcc-tp-indol.vercel.app",
  },
  {
    title: "Real-time Chat Application",
    desc: "แอปพลิเคชันแชทแบบ Real-time ด้วย React, Node.js และ Socket.IO รองรับห้องแชท การส่งไฟล์ และการแจ้งเตือน",
    fullDesc: "แอปพลิเคชันแชทแบบ Real-time ด้วย React, Node.js และ Socket.IO รองรับห้องแชทส่วนตัวและกลุ่มแบบเรียลไทม์",
    challenges: "- การจัดการ Connection ของ Socket.IO ในกรณีที่ผู้ใช้เน็ตหลุด\n- การสเกลระบบ Socket.IO ให้รองรับผู้ใช้จำนวนมาก",
    tags: ["React", "Node.js", "Socket.IO", "Express.js"],
    image: "/chat-architecture.png",
    icon: MessageSquare,
    github: "https://github.com/patzapaty13-crypto",
    demo: "/chat",
  },
  {
    title: "Task Management Dashboard",
    desc: "ระบบจัดการงาน (Kanban Board) พัฒนาด้วย React, Express.js และ MongoDB พร้อม Drag & Drop และ Analytics Dashboard",
    fullDesc: "ระบบจัดการงาน (Kanban Board) พัฒนาด้วย React, Express.js และ MongoDB พร้อมฟีเจอร์ Drag & Drop เพื่อความลื่นไหลในการใช้งาน และหน้า Analytics Dashboard สำหรับดูสถิติ",
    challenges: "- การทำ Drag & Drop ให้ลื่นไหลและอัปเดตข้อมูลลงฐานข้อมูลแบบ Optimistic UI",
    tags: ["React", "Express.js", "MongoDB", "Node.js"],
    image: "/task-dashboard.png",
    icon: BarChart3,
    github: "https://github.com/patzapaty13-crypto",
    demo: null,
  },
];

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
        <h2 className="text-3xl font-semibold tracking-tight mb-12 relative inline-block after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-sm">
          {t.projects.title}
        </h2>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {projects.map((p, i) => (
            <ScrollReveal key={i} delay={i * 120}>
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
                  <h3 className="text-base font-semibold mb-2 leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
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
