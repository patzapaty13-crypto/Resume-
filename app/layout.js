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
  title: "CR7XMESSI AND YAMAL CHAMPION | Software & AI Engineering Team",
  description: "เว็บไซต์และ Portfolio ทีม CR7XMESSI AND YAMAL CHAMPION — ทีมวิศวกรซอฟต์แวร์ 5 คน เชี่ยวชาญ Frontend, Backend, Cybersecurity, Data Analytics และ AI Automation Workflows",
  keywords: ["CR7XMESSI AND YAMAL CHAMPION", "Software Team", "Full-Stack Developer", "React", "Next.js", "Spring Boot", "Cybersecurity", "AI Automation", "ทีมโปรแกรมเมอร์"],
  openGraph: {
    title: "CR7XMESSI AND YAMAL CHAMPION | Software & AI Engineering Team",
    description: "Portfolio & Resumes ทีม CR7XMESSI AND YAMAL CHAMPION — รวมผลงานและโปรไฟล์ทีมวิศวกรซอฟต์แวร์ 5 คน",
    url: "https://thanathorn-portfolio.vercel.app",
    siteName: "CR7XMESSI AND YAMAL CHAMPION Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CR7XMESSI AND YAMAL CHAMPION Team",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CR7XMESSI AND YAMAL CHAMPION | Software & AI Engineering Team",
    description: "Portfolio & Resumes ทีม CR7XMESSI AND YAMAL CHAMPION",
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
