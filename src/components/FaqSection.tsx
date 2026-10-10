"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs, FaqItem } from "@/data/clinicData";
import Reveal from "@/components/Reveal";
import {
  ChevronDown,
  Info,
} from "lucide-react";

export default function FaqSection() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "faq-1": true, // First FAQ open by default
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Appointments", "Treatments", "Pricing & Insurance", "General"];

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-[#f8fafc] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Quick answers about appointments, treatments, and dental care.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-teal-600 text-white shadow-sm font-semibold"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-teal-400 hover:text-navy-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Interactive Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = !!openIds[faq.id];
            return (
              <Reveal key={faq.id} delay={idx * 0.04}>
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-colors duration-200">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/60 transition cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-navy-950">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-teal-50 text-teal-700" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100/70">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Quick Contact Banner */}
        <Reveal delay={0.2} className="mt-10 p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs text-teal-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-700 shrink-0" />
            <span>Have a clinical question not answered here? Our team is always ready to assist.</span>
          </div>
          <a
            href="tel:+18005553368"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs whitespace-nowrap shadow-xs transition"
          >
            Call +1 (800) 555-DENT
          </a>
        </Reveal>
      </div>
    </section>
  );
}
