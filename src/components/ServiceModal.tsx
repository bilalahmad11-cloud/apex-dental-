"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DentalService } from "@/data/clinicData";
import {
  X,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  RotateCcw,
  CreditCard,
} from "lucide-react";

interface ServiceModalProps {
  service: DentalService | null;
  isOpen: boolean;
  onClose: () => void;
  onBookService: (serviceTitle: string) => void;
}

export default function ServiceModal({
  service,
  isOpen,
  onClose,
  onBookService,
}: ServiceModalProps) {
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

  if (!isOpen || !service) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
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
        {/* Header Image with close button */}
        <div className="relative h-48 sm:h-56 w-full bg-slate-900">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-85"
            sizes="(max-width: 768px) 100vw, 700px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition cursor-pointer"
            aria-label="Close service modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Service Title on Image */}
          <div className="absolute bottom-4 left-6 right-6">
            <h2
              id="service-modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-white"
            >
              {service.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Tagline */}
          <p className="text-base text-slate-700 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            {service.tagline}
          </p>

          {/* Full description */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Treatment Overview
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Key Patient Benefits */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Clinical & Lifestyle Benefits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Clock className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <span className="block text-xs text-slate-500 font-medium">Duration</span>
              <span className="text-xs font-bold text-navy-900">{service.duration}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <RotateCcw className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <span className="block text-xs text-slate-500 font-medium">Frequency</span>
              <span className="text-xs font-bold text-navy-900">{service.frequency}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <CreditCard className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <span className="block text-xs text-slate-500 font-medium">Pricing</span>
              <span className="text-xs font-bold text-navy-900">{service.samplePrice}</span>
            </div>
          </div>

          {/* Demo Pricing Notice */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-slate-500" />
            <span>
              Sample Pricing Notice: Fees shown are illustrative demo benchmarks. Actual quotes depend on patient diagnostic findings.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-slate-600 hover:text-navy-950 font-medium text-sm transition cursor-pointer"
          >
            Close Details
          </button>

          <button
            onClick={() => {
              onClose();
              onBookService(service.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition shadow-sm hover:shadow cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book This Service</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
