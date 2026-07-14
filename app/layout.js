import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

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
  title: "ธนธรณ์ ศิริพันธ์ | Full-Stack Developer",
  description:
    "Resume ของนายธนธรณ์ ศิริพันธ์ — Full-Stack Developer ที่เชี่ยวชาญ React, Next.js, Spring Boot, Node.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${inter.variable} ${notoSansThai.variable}`}>
      <body style={{ fontFamily: "var(--font-inter), var(--font-noto-thai), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
