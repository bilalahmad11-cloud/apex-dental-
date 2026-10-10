"use client";

import { useState } from "react";
import Link from "next/link";
import { clinicInfo, dentalServices } from "@/data/clinicData";
import Reveal from "@/components/Reveal";
import {
  Activity,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  Shield,
  ArrowUp,
  X,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTitle, setLegalModalTitle] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openLegalModal = (title: string) => {
    setLegalModalTitle(title);
    setLegalModalOpen(true);
  };

  return (
    <footer className="bg-navy-950 text-white pt-16 pb-12 border-t border-navy-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-navy-850">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white shadow-md">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Apex<span className="text-teal-400">Dental</span>
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Gentle, high-precision dental care in a calm, modern environment. Dedicated to lasting oral wellness and comfort.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <p className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-teal-400" />
                <span>ADA & AACD Compliant Standards</span>
              </p>
              <p className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Designed For Anxious & Sensitive Patients</span>
              </p>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#home" className="hover:text-teal-300 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-300 transition">
                  About Clinic
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition">
                  Dental Services
                </a>
              </li>
              <li>
                <a href="#dentists" className="hover:text-teal-300 transition">
                  Our Specialists
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-teal-300 transition">
                  Patient Reviews
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-teal-300 transition">
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-teal-300 transition">
                  Contact & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Treatments List (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Specialized Care
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {dentalServices.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a href="#services" className="hover:text-teal-300 transition truncate block">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              San Francisco Clinic
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{clinicInfo.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${clinicInfo.phoneRaw}`} className="hover:text-white font-medium">
                  {clinicInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${clinicInfo.email}`} className="hover:text-white">
                  {clinicInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Monday - Friday: 8am - 7pm</span>
                  <span className="block text-slate-300">Saturday: 9am - 4pm</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            <span>© {currentYear} {clinicInfo.name}. All rights reserved. </span>
            <span className="text-teal-400/90 font-medium ml-1">
              • Professional Dental Website Client Demo
            </span>
          </div>

          {/* Legal Links & Back to Top */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => openLegalModal("Privacy Policy")}
              className="hover:text-teal-300 transition cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => openLegalModal("Terms of Service")}
              className="hover:text-teal-300 transition cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-navy-900 hover:bg-navy-850 text-slate-300 hover:text-white transition flex items-center gap-1 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>

      {/* Legal Demo Modal */}
      {legalModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm"
        >
          <div className="bg-white text-navy-950 max-w-lg w-full rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="text-lg font-bold">{legalModalTitle} (Demo Showcase)</h3>
              <button
                onClick={() => setLegalModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy-900 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-2.5 max-h-60 overflow-y-auto">
              <p>
                This website is an interactive demonstration built to showcase high-performance dental clinic web solutions.
              </p>
              <p>
                Patient data submitted through any form on this demo site is handled locally and is not permanently stored or shared with any third party.
              </p>
              <p>
                HIPAA Notice: In production client deployments, all appointment scheduling and patient intakes are configured with encrypted HIPAA-compliant endpoints and business associate agreements.
              </p>
            </div>
            <div className="mt-5 text-right">
              <button
                onClick={() => setLegalModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
