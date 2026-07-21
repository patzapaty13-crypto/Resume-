-- ========================================================
-- CR7XMESSI AND YAMAL CHAMPION - Supabase Database Schema
-- Run this script in your Supabase SQL Editor
-- ========================================================

-- 1. Create table for storing Chat Logs and AI Assistant messages
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    sender TEXT NOT NULL, -- 'user' or 'ai'
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create table for Team Members Resume Knowledge Base
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_key TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    email TEXT NOT NULL,
    github_url TEXT,
    bio TEXT,
    skills TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create table for Team Software Projects Portfolio
CREATE TABLE IF NOT EXISTS public.team_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name TEXT NOT NULL,
    description TEXT NOT NULL,
    live_url TEXT,
    github_url TEXT,
    contributors TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for fast query performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_team_members_key ON public.team_members(member_key);

-- ========================================================
-- Seed Initial Data: 5 Team Members & Projects
-- ========================================================

INSERT INTO public.team_members (member_key, full_name, role_title, email, github_url, bio, skills) VALUES
('wananon', 'วนนนท์ แสงทอง', 'Frontend Developer & UX/UI Designer', '2310511101014@live4.utcc.ac.th', 'https://github.com/Nonperchica', 'เชี่ยวชาญการพัฒนา Frontend ด้วย React, Vue.js, TypeScript และ Figma Design System', ARRAY['Frontend Web/Mobile', 'Responsive Architecture', 'Component System', 'UX Research', 'Figma', 'Vue.js', 'React']),
('ekarin', 'เอกรินทร์ นีระมนต์', 'Full-Stack Developer & AI Automation Specialist', 'mikp1919@gmail.com', 'https://github.com/Xkaroy', 'เชี่ยวชาญการพัฒนาระบบครบวงจร Full-Stack และการสร้างระบบทำงานอัตโนมัติด้วย AI', ARRAY['Full-Stack', 'UX/UI Architecture', 'AI Automation Workflows', 'n8n', 'Make.com', 'API Integration']),
('bawornwit', 'บวรวิชญ์ สุรินทร์', 'Project Manager & Full-Stack Developer', 'bavonvit99@gmail.com', 'https://github.com/Bobangely', 'รับหน้าที่บริหารและประสานงานโครงการ (PM) ผ่านการฝึกอบรม Cybersecurity Certified', ARRAY['Software Project Management', 'Cybersecurity Governance', 'Full-Stack', 'Agile/Scrum', 'Risk Assessment']),
('kathapong', 'คฑาพงษ์ มากรุง', 'Backend Developer & Cybersecurity Specialist', 'kathapong123@hotmail.com', 'https://github.com/KMluvcod11', 'เชี่ยวชาญการพัฒนาระบบหลังบ้าน ป้องกันช่องโหว่ความปลอดภัย และจัดการข้อมูลขนาดใหญ่', ARRAY['Backend Engineering', 'Cybersecurity Architecture', 'High-Volume Data Handling', 'Data Analytics', 'PostgreSQL']),
('thanathorn', 'ธนธรณ์ ศิริพันธ์', 'Full-Stack Developer & Google Student Ambassador', 'patzapaty13@gmail.com', 'https://github.com/patzapaty13-crypto', 'ปฏิบัติหน้าที่ Google Student Ambassador และ Tactical Support ในงาน Google Cloud AI Lab', ARRAY['Google Cloud AI Support', 'Full-Stack', 'Cybersecurity Audit', 'Data Analytics', 'Next.js', 'Spring Boot'])
ON CONFLICT (member_key) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role_title = EXCLUDED.role_title,
    email = EXCLUDED.email,
    github_url = EXCLUDED.github_url,
    bio = EXCLUDED.bio,
    skills = EXCLUDED.skills;

INSERT INTO public.team_projects (project_name, description, live_url, github_url, contributors) VALUES
('FaceCheck Web', 'ระบบสแกนและยืนยันตัวตนด้วยใบหน้าผ่านเว็บแบบ Real-time', 'https://facecheck-web.vercel.app', 'https://github.com/Mickeyyok/-facecheckWeb', ARRAY['วนนนท์ แสงทอง', 'ธนธรณ์ ศิริพันธ์', 'เอกรินทร์ นีระมนต์']),
('FaceCheck Backend', 'ระบบบริการหลังบ้านประมวลผลการจดจำใบหน้า การจัดการสิทธิ์ผู้ใช้ และความปลอดภัยข้อมูล', NULL, 'https://github.com/KMluvcod11/facecheck-backend', ARRAY['คฑาพงษ์ มากรุง', 'บวรวิชญ์ สุรินทร์', 'ธนธรณ์ ศิริพันธ์']),
('FaceCheck Mobile App', 'แอปพลิเคชันมือถือสแกนใบหน้าและเช็กชื่อผ่านสมาร์ตโฟน', NULL, 'https://github.com/Mickeyyok/FacecheckApp', ARRAY['วนนนท์ แสงทอง', 'เอกรินทร์ นีระมนต์', 'บวรวิชญ์ สุรินทร์']),
('UTCC Internship Portal', 'ระบบบริหารจัดการการฝึกงานและศึกษาดูงานแบบครบวงจร ม.หอการค้าไทย', 'https://utcc-tp-indol.vercel.app', 'https://github.com/patzapaty13-crypto', ARRAY['ธนธรณ์ ศิริพันธ์', 'วนนนท์ แสงทอง', 'บวรวิชญ์ สุรินทร์', 'คฑาพงษ์ มากรุง']);
