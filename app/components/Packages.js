"use client";

import ScrollReveal from "./ScrollReveal";
import { Check, Globe, Laptop, Cpu, Layers } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Packages() {
  const { t } = useLanguage();

  const packages = [
    {
      title: t.packages.basic.title,
      subtitle: t.packages.basic.desc,
      price: t.packages.basic.price,
      period: "3 - 5 Days",
      icon: Globe,
      features: [
        t.packages.basic.f1,
        t.packages.basic.f2,
        t.packages.basic.f3,
        t.packages.basic.f4,
      ],
      popular: false,
      ctaLink: "#contact",
    },
    {
      title: t.packages.pro.title,
      subtitle: t.packages.pro.desc,
      price: t.packages.pro.price,
      period: "7 - 14 Days",
      icon: Layers,
      features: [
        t.packages.pro.f1,
        t.packages.pro.f2,
        t.packages.pro.f3,
        t.packages.pro.f4,
      ],
      popular: false,
      ctaLink: "https://fastwork.co/byob/KJCm6w4Jbs?openExternalBrowser=1&source=byob",
    },
    {
      title: t.packages.automation.title,
      subtitle: t.packages.automation.desc,
      price: t.packages.automation.price,
      period: "3 - 7 Days",
      icon: Cpu,
      features: [
        t.packages.automation.f1,
        t.packages.automation.f2,
        t.packages.automation.f3,
        t.packages.automation.f4,
      ],
      popular: false,
      ctaLink: "https://fastwork.co/byob/KJCm6w4Jbs?openExternalBrowser=1&source=byob",
    }
  ];

  return (
    <section className="py-24 bg-white" id="packages">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4 relative inline-block after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-10 after:h-[3px] after:bg-primary after:rounded-sm">
            {t.packages.title}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6 max-2xl:grid-cols-3 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {packages.map((pkg, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className="relative flex flex-col h-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md rounded-2xl p-6 transition-all duration-300 group"
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <pkg.icon className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                    <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md">
                      {pkg.period}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-snug">{pkg.title}</h3>
                  <p className="text-xs text-gray-500 min-h-[32px] leading-relaxed mb-4">{pkg.subtitle}</p>
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-2xl font-black text-gray-900 tracking-tight">{pkg.price}</span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <ul className="flex-1 space-y-2.5 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-auto">
                  <a
                    href="https://fastwork.co/byob/KJCm6w4Jbs?openExternalBrowser=1&source=byob"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all duration-200"
                  >
                    {t.packages.fastwork} →
                  </a>
                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center py-2 px-4 rounded-xl text-xs font-semibold bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200"
                  >
                    {t.packages.contactDirect}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
