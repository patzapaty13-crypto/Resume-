"use client";

import ScrollReveal from "./ScrollReveal";

const timeline = [
  {
    date: "2024 – ปัจจุบัน",
    title: "Full-Stack Developer",
    company: "Freelance / Personal Projects",
    items: [
      "พัฒนาเว็บแอปพลิเคชันด้วย React, Next.js และ Node.js",
      "ออกแบบ RESTful API ด้วย Express.js และ Spring Boot",
      "จัดการฐานข้อมูล MySQL, MongoDB และ PostgreSQL",
      "ใช้ Git/GitHub สำหรับ Version Control",
    ],
    active: true,
  },
  {
    date: "2022 – 2024",
    title: "Frontend Developer Intern",
    company: "โปรเจกต์มหาวิทยาลัย",
    items: [
      "พัฒนา UI/UX ด้วย React และ Tailwind CSS",
      "สร้าง Responsive Web Design สำหรับทุกอุปกรณ์",
      "ทำงานร่วมกับทีมด้วย Agile/Scrum methodology",
    ],
    active: false,
  },
  {
    date: "2020 – ปัจจุบัน",
    title: "ปริญญาตรี",
    company: "มหาวิทยาลัยหอการค้าไทย",
    items: [
      "สาขาวิทยาการคอมพิวเตอร์ / วิศวกรรมซอฟต์แวร์",
      "ศึกษาด้าน Data Structures, Algorithms, Software Engineering",
      "เข้าร่วมกิจกรรมชมรมคอมพิวเตอร์และ Hackathon",
    ],
    active: false,
  },
];

export default function Experience() {
  return (
    <section className="py-24" id="experience">
      <div className="max-w-[1100px] mx-auto px-8">
        <h2 className="text-3xl font-semibold tracking-tight mb-12 relative inline-block after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-sm">
          ประสบการณ์
        </h2>

        <div className="relative pl-16 max-md:pl-10 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-gray-200">
          {timeline.map((item, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div className={`relative ${i < timeline.length - 1 ? "mb-16" : ""}`}>
                {/* Dot */}
                <div
                  className={`absolute -left-16 max-md:-left-10 top-2 w-[13px] h-[13px] rounded-full border-2 border-primary z-[1] ${
                    item.active ? "bg-primary" : "bg-[#fafafa]"
                  }`}
                />
                {/* Card */}
                <div className="bg-white border border-gray-200 rounded-2xl px-8 py-6 transition-all duration-300 hover:shadow-md hover:border-transparent">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary inline-block mb-1">
                    {item.date}
                  </span>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{item.company}</p>
                  <ul className="list-none p-0">
                    {item.items.map((li, j) => (
                      <li
                        key={j}
                        className="text-sm text-gray-500 pl-5 relative mb-2 leading-relaxed before:absolute before:left-0 before:top-[10px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-gray-200"
                      >
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
