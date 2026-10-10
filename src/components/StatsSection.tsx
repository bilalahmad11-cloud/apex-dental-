"use client";

import { motion, type Variants } from "framer-motion";
import { trustStats } from "@/data/clinicData";
import { Award, Users, Smile, ShieldCheck } from "lucide-react";

export default function StatsSection() {
  const statIcons = [
    <Smile key="smile" className="w-6 h-6 text-teal-600" />,
    <Award key="award" className="w-6 h-6 text-teal-600" />,
    <Users key="users" className="w-6 h-6 text-teal-600" />,
    <ShieldCheck key="shield" className="w-6 h-6 text-teal-600" />,
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="stats-section" className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Trust Metrics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {trustStats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/20 transition-colors duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200/60 flex items-center justify-center mb-4">
                {statIcons[idx]}
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
                  {stat.value}
                </span>
              </div>

              <h2 className="text-sm sm:text-base font-bold text-navy-900 mt-1">
                {stat.label}
              </h2>

              <p className="text-xs text-slate-500 mt-1 leading-snug">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Clinical Technology Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-500"
        >
          <span>iTero® 3D Element Digital Scanner</span>
          <span>Piezo Ultra-Gentle Scaling Technology</span>
          <span>Low-Dose Digital Panoramic CBCT</span>
          <span>Hospital-Grade Sterilization Protocol</span>
        </motion.div>
      </div>
    </section>
  );
}
