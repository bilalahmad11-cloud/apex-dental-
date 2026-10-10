"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { beforeAfterCases, BeforeAfterCase } from "@/data/clinicData";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { ArrowRight, X, Sliders } from "lucide-react";

export default function BeforeAfterGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [previewCase, setPreviewCase] = useState<BeforeAfterCase | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage for interactive slider

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPreviewCase(null);
      }
    };
    if (previewCase) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewCase]);

  const categories = ["All", "Cosmetic", "Orthodontics", "Whitening", "Implants"];

  const filteredCases =
    activeCategory === "All"
      ? beforeAfterCases
      : beforeAfterCases.filter((c) => c.category === activeCategory);

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Before & After
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Illustrative smile transformations.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-teal-600 text-white shadow-sm font-semibold"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-teal-400 hover:text-navy-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Gallery Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredCases.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-card-hover transition-shadow duration-300 flex flex-col"
            >
              {/* Split Before / After Images */}
              <div className="relative h-64 sm:h-72 w-full bg-slate-900 flex group">
                {/* Before Half */}
                <div className="relative w-1/2 h-full overflow-hidden border-r border-white/30">
                  <Image
                    src={c.beforeImage}
                    alt={`${c.title} Before`}
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-navy-950/20" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-navy-950/80 text-white text-[11px] font-bold backdrop-blur-sm uppercase tracking-wider">
                    Before
                  </span>
                </div>

                {/* After Half */}
                <div className="relative w-1/2 h-full overflow-hidden">
                  <Image
                    src={c.afterImage}
                    alt={`${c.title} After`}
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-teal-600 text-white text-[11px] font-bold shadow-sm uppercase tracking-wider">
                    After
                  </span>
                </div>

                {/* Zoom Preview CTA Overlay Button */}
                <button
                  onClick={() => {
                    setPreviewCase(c);
                    setSliderPosition(50);
                  }}
                  className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-sm backdrop-blur-[2px] cursor-pointer"
                >
                  <div className="bg-white text-navy-950 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 hover:scale-105 transition-transform">
                    <Sliders className="w-4 h-4 text-teal-600" />
                    <span>Interactive Slider View</span>
                  </div>
                </button>
              </div>

              {/* Case Information */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                      {c.category} Dentistry
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {c.treatmentTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-950">
                    {c.title}
                  </h3>
                </div>

                {/* Metrics & Doctor footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">
                    {c.metrics}
                  </span>
                  <button
                    onClick={() => {
                      setPreviewCase(c);
                      setSliderPosition(50);
                    }}
                    className="text-navy-900 font-bold hover:text-teal-600 flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>View Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-slate-400">
          Stock images for illustration only, not actual patients.
        </p>
      </div>

      {/* Interactive Slider Preview Modal */}
      {previewCase && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          <div
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm"
            onClick={() => setPreviewCase(null)}
          />

          <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100">
            {/* Header */}
            <div className="p-4 sm:p-6 bg-navy-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{previewCase.title}</h3>
              </div>
              <button
                onClick={() => setPreviewCase(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Before/After Drag Slider */}
            <div className="p-6">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden select-none shadow-inner bg-slate-900">
                {/* Background: After Image */}
                <Image
                  src={previewCase.afterImage}
                  alt="After Treatment"
                  fill
                  className="object-cover"
                />
                <span className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
                  AFTER
                </span>

                {/* Foreground: Before Image clipped */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="relative h-full w-[800px] sm:w-[900px]">
                    <Image
                      src={previewCase.beforeImage}
                      alt="Before Treatment"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute top-4 left-4 bg-navy-950/80 text-white text-xs font-bold px-3 py-1 rounded-md backdrop-blur-md">
                    BEFORE
                  </span>
                </div>

                {/* Divider Line & Handle */}
                <div
                  className="absolute inset-y-0 w-1 bg-white cursor-ew-resize shadow-2xl flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white text-navy-900 shadow-xl flex items-center justify-center font-bold text-xs border border-slate-300">
                    ↔
                  </div>
                </div>

                {/* Slider input control overlay */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                  aria-label="Drag before and after divider"
                />
              </div>

              {/* Interactive instruction hint */}
              <div className="flex items-center justify-between text-xs text-slate-500 mt-4 px-2">
                <span>← Slide left for After</span>
                <span className="font-semibold text-teal-700">Drag slider horizontally</span>
                <span>Slide right for Before →</span>
              </div>

              {/* Case Notes */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                <p>
                  <strong>Clinical Case Notes:</strong> {previewCase.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                  <span>
                    <strong>Duration:</strong> {previewCase.treatmentTime}
                  </span>
                  <span>
                    <strong>Dentist:</strong> {previewCase.dentist}
                  </span>
                  <span>
                    <strong>Outcome:</strong> {previewCase.metrics}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
              <button
                onClick={() => setPreviewCase(null)}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
