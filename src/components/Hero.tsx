"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface HeroProps {
  onBookClick?: () => void;
  onExploreServicesClick?: () => void;
}

export default function Hero({ onBookClick, onExploreServicesClick }: HeroProps) {
  const scrollToBooking = () => {
    if (onBookClick) {
      onBookClick();
    } else {
      const el = document.getElementById("booking");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    if (onExploreServicesClick) {
      onExploreServicesClick();
    } else {
      const el = document.getElementById("services");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-10 pb-16 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-slate-50/50 to-teal-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 lg:space-y-8 text-center lg:text-left"
          >
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-950 leading-[1.12]">
              Your Smile Deserves{" "}
              <span className="relative inline-block text-teal-600 underline decoration-teal-300/60 decoration-wavy decoration-2">
                Expert Care.
              </span>
            </h1>

            {/* Supporting Text - Streamlined & Crisp */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Experience gentle, high-precision dental care in a serene, modern clinic. From routine checkups to full smile makeovers, our board-certified specialists put your comfort first.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-base transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer group"
              >
                <Calendar className="w-5 h-5 text-teal-200 group-hover:scale-110 transition-transform" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToServices}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-navy-900 font-semibold text-base border border-slate-200 transition-colors duration-200 shadow-xs hover:border-slate-300 cursor-pointer"
              >
                <span>Explore Our Services</span>
              </motion.button>
            </div>

            {/* Trust Indicators / Checkmark Features */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-medium">Same-Day Emergencies</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-medium">Pain-Free Technology</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-medium">Major Insurance & 0% Plans</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Clinic Hero Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/5] sm:aspect-[4/4.6]">
                <Image
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern serene dental clinic suite with high-tech dental chair"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-2xl bg-navy-950/70 backdrop-blur-md border border-white/10 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Apex Dental Clinic Suite 320</span>
                    <span className="text-slate-300 text-xs">San Francisco</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 truncate">
                    Equipped with iTero 3D scanners & gentle laser treatment units
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

