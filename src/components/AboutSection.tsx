"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { ShieldCheck, Heart, Award, Users, ArrowRight } from "lucide-react";

interface AboutSectionProps {
  onMeetTeamClick?: () => void;
}

const values = [
  { icon: ShieldCheck, title: "Hospital-grade safety", text: "Strict sterilization in every suite." },
  { icon: Heart, title: "Gentle by design", text: "Calm rooms and comfort-first care." },
  { icon: Award, title: "Specialists in-house", text: "Cosmetic, ortho and endo under one roof." },
];

export default function AboutSection({ onMeetTeamClick }: AboutSectionProps) {
  const handleMeetTeam = () => {
    if (onMeetTeamClick) {
      onMeetTeamClick();
    } else {
      document.getElementById("dentists")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <Reveal x={-30} y={0} className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-xl border-4 border-slate-50 aspect-[4/5] bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80"
                alt="Dentist discussing a treatment plan with a patient"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Copy */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
                Dental visits that feel calm, not clinical.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
                Apex Dental pairs boutique comfort with precise, modern dentistry, so every visit is relaxed and every result lasts.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {values.map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={0.1 + i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="h-full p-4 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <h3 className="text-sm font-bold text-navy-900">{title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{text}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3} className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMeetTeam}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-navy-900 hover:bg-navy-950 text-white font-semibold text-sm transition-colors shadow-sm cursor-pointer"
              >
                <Users className="w-4 h-4 text-teal-400" />
                <span>Meet Our Team</span>
                <ArrowRight className="w-4 h-4 text-white/70" />
              </motion.button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
