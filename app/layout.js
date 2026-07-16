import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/Providers";
import AiChatPopup from "./components/AiChatPopup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://thanathorn-portfolio.vercel.app"),
  title: "ธนธรณ์ ศิริพันธ์ | Full-Stack Developer",
  description: "Resume ของนายธนธรณ์ ศิริพันธ์ — Full-Stack Developer ที่เชี่ยวชาญ React, Next.js, Spring Boot, Node.js และระบบ AI Automation",
  keywords: ["ธนธรณ์ ศิริพันธ์", "Thanathorn Siriphan", "Full-Stack Developer", "React", "Next.js", "Spring Boot", "รับทำเว็บ", "หาโปรแกรมเมอร์", "AI Automation"],
  openGraph: {
    title: "ธนธรณ์ ศิริพันธ์ | Full-Stack Developer",
    description: "Resume ของนายธนธรณ์ ศิริพันธ์ — Full-Stack Developer ที่เชี่ยวชาญ React, Next.js, Spring Boot, Node.js และระบบ AI Automation",
    url: "https://thanathorn-portfolio.vercel.app", // Adjust this URL as needed
    siteName: "Thanathorn Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Create an og-image.jpg in the public folder (1200x630px)
        width: 1200,
        height: 630,
        alt: "Thanathorn Siriphan - Full Stack Developer",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ธนธรณ์ ศิริพันธ์ | Full-Stack Developer",
    description: "Resume ของนายธนธรณ์ ศิริพันธ์ — Full-Stack Developer ที่เชี่ยวชาญ React, Next.js, Spring Boot, Node.js",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${inter.variable} ${notoSansThai.variable}`}>
      <body style={{ fontFamily: "var(--font-inter), var(--font-noto-thai), sans-serif" }}>
        <Providers>
          {children}
          <AiChatPopup />
        </Providers>
      </body>
    </html>
  );
}
