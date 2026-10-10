"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { Dentist } from "@/data/clinicData";
import {
  X,
  GraduationCap,
  Calendar,
  CheckCircle2,
} from "lucide-react";

interface DentistModalProps {
  dentist: Dentist | null;
  isOpen: boolean;
  onClose: () => void;
  onBookDentist: (dentistName: string) => void;
}

export default function DentistModal({
  dentist,
  isOpen,
  onClose,
  onBookDentist,
}: DentistModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !dentist) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dentist-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 my-8"
      >
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-850 p-6 sm:p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close dentist profile"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg shrink-0 bg-slate-800">
              <BlurFade duration={0.4} blur="6px" className="w-full h-full">
                <Image
                  src={dentist.image}
                  alt={dentist.name}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </BlurFade>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <p className="text-xs text-teal-300 font-semibold">
                {dentist.specialization} Specialist
              </p>
              <h2
                id="dentist-modal-title"
                className="text-2xl sm:text-3xl font-extrabold text-white"
              >
                {dentist.name}
              </h2>
              <p className="text-sm text-slate-300">{dentist.role}</p>

              <p className="text-xs text-slate-400 pt-1">
                {dentist.rating} rating ({dentist.reviewsCount} patient reviews) • {dentist.experienceYears}+ years clinical experience
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Bio */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Clinician Background
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {dentist.bio}
            </p>
          </div>

          {/* Education */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Education & Credentials
              </h4>
              <p className="text-sm text-navy-950 font-medium mt-0.5">
                {dentist.education}
              </p>
            </div>
          </div>

          {/* Career Highlights */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Clinical Accreditations
            </h3>
            <div className="space-y-2">
              {dentist.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Consultation Days */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Standard In-Clinic Consultation Days
            </h3>
            <div className="flex flex-wrap gap-2">
              {dentist.availableDays.map((day) => (
                <span
                  key={day}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Fictional medical credentials displayed for website demonstration purposes.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-slate-600 hover:text-navy-950 font-medium text-sm transition cursor-pointer"
          >
            Close Profile
          </button>

          <button
            onClick={() => {
              onClose();
              onBookDentist(dentist.name);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition shadow-sm hover:shadow cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book with {dentist.name.split(",")[0]}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
