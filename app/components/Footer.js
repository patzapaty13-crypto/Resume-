"use client";

import { Heart } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="text-center py-10 border-t border-gray-200 bg-white">
      <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
        &copy; {new Date().getFullYear()} {t.footer.by} — {t.footer.madeWith}
        <Heart className="w-3.5 h-3.5 text-red-500 animate-[heartbeat_1.5s_ease_infinite]" fill="currentColor" strokeWidth={0} />
        Next.js & Tailwind
      </p>
    </footer>
  );
}
