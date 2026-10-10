"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/clinicData";
import Reveal from "@/components/Reveal";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const activeReview = testimonials[currentIndex];

  return (
    <section
      id="reviews"
      className="py-20 lg:py-28 bg-gradient-to-b from-[#f8fafc] to-white relative overflow-hidden"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Patient Stories
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Real experiences from patients who trust our specialists.
          </p>
        </Reveal>

        {/* Testimonials Carousel Component */}
        <Reveal delay={0.1} className="max-w-4xl mx-auto relative">
          {/* Main Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-100 relative min-h-[300px] flex flex-col justify-between">
            {/* Top Row: Stars + Quote Icon */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < activeReview.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs font-semibold text-slate-700">
                  5.0 rating
                </span>
              </div>
              <Quote className="w-10 h-10 text-teal-100" />
            </div>

            {/* Animated Quote Body */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <blockquote className="text-lg sm:text-xl text-navy-950 font-normal leading-relaxed italic mb-8">
                  “{activeReview.quote}”
                </blockquote>

                {/* Bottom Meta */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-navy-950 text-base">
                        {activeReview.patientName}
                      </h3>
                      <span className="text-xs text-slate-500">
                        • Verified Patient
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {activeReview.treatment} • Dr. {activeReview.dentistName}
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={prevSlide}
                      className="p-3 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 transition border border-slate-200 cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextSlide}
                      className="p-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white transition shadow-xs cursor-pointer"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? "w-8 bg-teal-600"
                    : "w-2.5 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Jump to review ${idx + 1}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
