import { NextResponse } from "next/server";

// System Prompt / Knowledge Base for AI Chatbot Assistant
const TEAM_KNOWLEDGE = {
  teamName: "CR7XMESSI AND YAMAL CHAMPION",
  teamEmail: "wakakawananon@gmail.com",
  phone: "091-914-5670",
  university: "มหาวิทยาลัยหอการค้าไทย (UTCC)",
  members: [
    {
      name: "วนนนท์ แสงทอง (Wananon Saengthong)",
      role: "Frontend Developer & UX/UI Designer",
      email: "2310511101014@live4.utcc.ac.th",
      github: "https://github.com/Nonperchica",
      skills: ["Frontend Web/Mobile", "Responsive Design", "Component Architecture", "UX Research", "Figma Design System", "Vue.js", "React", "TypeScript"],
      resumeUrl: "/resume/wananon"
    },
    {
      name: "เอกรินทร์ นีระมนต์ (Ekarin Neeramon)",
      role: "Full-Stack Developer & AI Automation Specialist",
      email: "mikp1919@gmail.com",
      github: "https://github.com/Xkaroy",
      skills: ["Full-Stack", "UX/UI Design", "AI Automation Workflows", "n8n", "Make.com", "API Integration"],
      resumeUrl: "/resume/ekarin"
    },
    {
      name: "บวรวิชญ์ สุรินทร์ (Bawornwit Surin)",
      role: "Project Manager & Full-Stack Developer",
      email: "bavonvit99@gmail.com",
      github: "https://github.com/Bobangely",
      skills: ["Software Project Management", "Cybersecurity Governance", "Full-Stack Systems", "Agile & Scrum", "Risk Assessment"],
      resumeUrl: "/resume/bawornwit"
    },
    {
      name: "คฑาพงษ์ มากรุง (Kathapong Makroong)",
      role: "Backend Developer & Cybersecurity Specialist",
      email: "kathapong123@hotmail.com",
      github: "https://github.com/KMluvcod11",
      skills: ["Backend Engineering", "Cybersecurity Architecture", "High-Volume Data Handling", "Data Analytics & Statistics", "PostgreSQL"],
      resumeUrl: "/resume/kathapong"
    },
    {
      name: "ธนธรณ์ ศิริพันธ์ (Thanathorn Siriphan)",
      role: "Full-Stack Developer & Google Student Ambassador",
      email: "patzapaty13@gmail.com",
      github: "https://github.com/patzapaty13-crypto",
      skills: ["Google Cloud AI Lab Tactical Support", "Full-Stack Engineering", "Cybersecurity Audit", "Data Analytics", "Next.js", "Spring Boot"],
      resumeUrl: "/resume/thanathorn"
    }
  ],
  projects: [
    {
      name: "FaceCheck Web",
      desc: "ระบบสแกนและยืนยันตัวตนด้วยใบหน้าผ่านเว็บแบบ Real-time",
      url: "https://facecheck-web.vercel.app",
      github: "https://github.com/Mickeyyok/-facecheckWeb",
      devs: "วนนนท์ แสงทอง, ธนธรณ์ ศิริพันธ์, เอกรินทร์ นีระมนต์"
    },
    {
      name: "FaceCheck Backend",
      desc: "ระบบหลังบ้านประมวลผลการจดจำใบหน้า การจัดการสิทธิ์ผู้ใช้ และความปลอดภัยข้อมูล",
      github: "https://github.com/KMluvcod11/facecheck-backend",
      devs: "คฑาพงษ์ มากรุง, บวรวิชญ์ สุรินทร์, ธนธรณ์ ศิริพันธ์"
    },
    {
      name: "FaceCheck Mobile App",
      desc: "แอปพลิเคชันมือถือสแกนใบหน้าและเช็กชื่อผ่านสมาร์ตโฟน",
      github: "https://github.com/Mickeyyok/FacecheckApp",
      devs: "วนนนท์ แสงทอง, เอกรินทร์ นีระมนต์, บวรวิชญ์ สุรินทร์"
    },
    {
      name: "UTCC Internship Portal",
      desc: "ระบบบริหารจัดการการฝึกงานและศึกษาดูงานแบบครบวงจรสำหรับ ม.หอการค้าไทย",
      url: "https://utcc-tp-indol.vercel.app",
      github: "https://github.com/patzapaty13-crypto",
      devs: "ธนธรณ์, วนนนท์, บวรวิชญ์, คฑาพงษ์"
    }
  ],
  packages: [
    { name: "Basic Website", price: "เริ่มต้น 5,000฿", detail: "Landing page / เว็บองค์กร ประสิทธิภาพสูง พร้อม SEO และโฮสติ้ง 1 ปี" },
    { name: "Web Application & Portal", price: "เริ่มต้น 15,000฿", detail: "ระบบหลังบ้าน แดชบอร์ดจัดการข้อมูล ระบบสมาชิก RBAC และ API" },
    { name: "AI & Workflow Automation", price: "เริ่มต้น 8,000฿", detail: "เชื่อมต่อ API ข้ามแพลตฟอร์ม วางระบบทำงานอัตโนมัติด้วย n8n / Make / AI" }
  ]
};

export async function POST(request) {
  try {
    const body = await request.json();
    const userMsg = (body.chatInput || body.message || body.prompt || "").toString().trim();
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    // Trained AI Assistant logic for matching latest resume context
    const getTrainedAIResponse = (query) => {
      const q = query.toLowerCase();

      // Check member specific queries
      if (q.includes("วนนนท์") || q.includes("wananon") || q.includes("frontend")) {
        return "วนนนท์ แสงทอง (Wananon Saengthong)\n• ตำแหน่ง: Frontend Developer & UX/UI Designer\n• อีเมล: 2310511101014@live4.utcc.ac.th\n• GitHub: https://github.com/Nonperchica\n• ความเชี่ยวชาญ: React, Vue.js, TypeScript, Figma Design System, UX Research\n• ดู Resume ตรง: /resume/wananon";
      }

      if (q.includes("เอกรินทร์") || q.includes("ekarin") || q.includes("full-stack")) {
        return "เอกรินทร์ นีระมนต์ (Ekarin Neeramon)\n• ตำแหน่ง: Full-Stack Developer & AI Automation Specialist\n• อีเมล: mikp1919@gmail.com\n• GitHub: https://github.com/Xkaroy\n• ความเชี่ยวชาญ: Full-Stack Web, n8n, Make.com, AI Workflows Automation\n• ดู Resume ตรง: /resume/ekarin";
      }

      if (q.includes("บวรวิชญ์") || q.includes("bawornwit") || q.includes("pm") || q.includes("project manager")) {
        return "บวรวิชญ์ สุรินทร์ (Bawornwit Surin)\n• ตำแหน่ง: Project Manager & Full-Stack Developer\n• อีเมล: bavonvit99@gmail.com\n• GitHub: https://github.com/Bobangely\n• ความเชี่ยวชาญ: Software Project Governance (Agile/Scrum), Cybersecurity Certified\n• ดู Resume ตรง: /resume/bawornwit";
      }

      if (q.includes("คฑาพงษ์") || q.includes("kathapong") || q.includes("backend")) {
        return "คฑาพงษ์ มากรุง (Kathapong Makroong)\n• ตำแหน่ง: Backend Developer & Cybersecurity Specialist\n• อีเมล: kathapong123@hotmail.com\n• GitHub: https://github.com/KMluvcod11\n• ความเชี่ยวชาญ: Backend Architecture, High-Volume Data Handling, Security Audit\n• ดู Resume ตรง: /resume/kathapong";
      }

      if (q.includes("ธนธรณ์") || q.includes("thanathorn") || q.includes("ambassador") || q.includes("google")) {
        return "ธนธรณ์ ศิริพันธ์ (Thanathorn Siriphan)\n• ตำแหน่ง: Full-Stack Developer & Google Student Ambassador\n• อีเมล: patzapaty13@gmail.com\n• GitHub: https://github.com/patzapaty13-crypto\n• ความเชี่ยวชาญ: Tactical Support Google Cloud AI Lab, Full-Stack, Next.js, Data Analytics\n• ดู Resume ตรง: /resume/thanathorn";
      }

      // Check team members query
      if (q.includes("สมาชิก") || q.includes("ทีม") || q.includes("ใครบ้าง") || q.includes("คน")) {
        return `ทีม ${TEAM_KNOWLEDGE.teamName} มีสมาชิกทั้งหมด 5 คน ได้แก่:\n1. วนนนท์ แสงทอง (Frontend Developer & UX/UI Designer)\n2. เอกรินทร์ นีระมนต์ (Full-Stack & AI Automation)\n3. บวรวิชญ์ สุรินทร์ (Project Manager & Cybersecurity)\n4. คฑาพงษ์ มากรุง (Lead Backend & Security)\n5. ธนธรณ์ ศิริพันธ์ (Full-Stack & Google Student Ambassador)\n\nท่านสามารถคลิกดู Resume แยกรายบุคคลได้จากแถบเมนูด้านบนครับ`;
      }

      // Check projects query
      if (q.includes("facecheck") || q.includes("สแกนหน้า") || q.includes("ผลงาน") || q.includes("โปรเจกต์")) {
        return `ผลงานพัฒนาซอฟต์แวร์เด่นของทีมเรา:\n1. FaceCheck Web: ระบบยืนยันตัวตนสแกนใบหน้า Real-time (https://facecheck-web.vercel.app)\n2. FaceCheck Backend: API Service ประมวลผลความปลอดภัยข้อมูล\n3. FaceCheck Mobile App: แอปมือถือสแกนใบหน้าลงเวลา\n4. UTCC Internship Portal: ระบบบริหารจัดการการฝึกงาน ม.หอการค้าไทย (https://utcc-tp-indol.vercel.app)`;
      }

      // Check pricing & packages
      if (q.includes("ราคา") || q.includes("บริการ") || q.includes("แพ็กเกจ") || q.includes("จ้าง")) {
        return `ขอบเขตบริการของทีม ${TEAM_KNOWLEDGE.teamName}:\n- Basic Website: เริ่มต้น 5,000฿ (Landing Page / เว็บองค์กร)\n- Web Application & Portal: เริ่มต้น 15,000฿ (ระบบหลังบ้าน / แดชบอร์ด / RBAC)\n- AI & Workflow Automation: เริ่มต้น 8,000฿ (เชื่อมต่อ n8n / Make / AI APIs)\n\nสามารถกดปุ่ม "จ้างงานผ่าน Fastwork" เพื่อการันตีการส่งมอบงานได้ครับ`;
      }

      // Check contact
      if (q.includes("ติดต่อ") || q.includes("เมล") || q.includes("อีเมล") || q.includes("email") || q.includes("เบอร์")) {
        return `ช่องทางการติดต่อทีม ${TEAM_KNOWLEDGE.teamName}:\n• อีเมลกลางทีม: ${TEAM_KNOWLEDGE.teamEmail}\n• โทรศัพท์: ${TEAM_KNOWLEDGE.phone}\n• มหาวิทยาลัย: ${TEAM_KNOWLEDGE.university}`;
      }

      return `สวัสดีครับ! พวกเราคือ AI Assistant ของทีม ${TEAM_KNOWLEDGE.teamName}\nพวกเราพร้อมให้บริการพัฒนา Web Application, Mobile App, Backend API และ AI Workflow Automation ครับ\n\nท่านสามารถพิมพ์สอบถามเกี่ยวกับ ประวัติสมาชิกทั้ง 5 คน, ผลงาน FaceCheck, แพ็กเกจราคา หรือช่องทางการติดต่อได้เลยครับ!`;
    };

    if (!webhookUrl || webhookUrl.includes("example.com")) {
      return NextResponse.json({
        reply: getTrainedAIResponse(userMsg),
      });
    }

    // Forward request to n8n Webhook
    try {
      const n8nResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatInput: userMsg,
          message: userMsg,
          teamKnowledge: TEAM_KNOWLEDGE
        }),
      });

      if (n8nResponse.ok) {
        const text = await n8nResponse.text();
        let data = {};
        try {
          data = text ? JSON.parse(text) : {};
        } catch (e) {
          data = { reply: text };
        }

        return NextResponse.json({
          reply:
            data.reply ||
            data.output ||
            data.message ||
            (text ? text : getTrainedAIResponse(userMsg)),
        });
      }
    } catch (n8nErr) {
      console.warn("n8n Webhook fetch failed, using fallback:", n8nErr);
    }

    return NextResponse.json({
      reply: getTrainedAIResponse(userMsg),
    });
  } catch (error) {
    console.error("n8n Proxy Error:", error);
    return NextResponse.json(
      { reply: "ขออภัยครับ เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่อีกครั้งครับ" },
      { status: 500 }
    );
  }
}
