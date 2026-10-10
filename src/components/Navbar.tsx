"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { clinicInfo } from "@/data/clinicData";
import {
  Menu,
  X,
  Phone,
  Calendar,
  Activity,
  Clock,
  Shield,
  ChevronRight,
} from "lucide-react";

interface NavbarProps {
  onOpenBookingModal?: () => void;
}

export default function Navbar({ onOpenBookingModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ["home", "about", "services", "dentists", "reviews", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Our Dentists", href: "#dentists", id: "dentists" },
    { name: "Reviews", href: "#reviews", id: "reviews" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookingClick = () => {
    setMobileMenuOpen(false);
    if (onOpenBookingModal) {
      onOpenBookingModal();
    } else {
      const element = document.getElementById("booking");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-[1px] sm:top-[5px] z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-nav shadow-subtle border-b border-slate-200/80 py-3"
            : "bg-white/95 backdrop-blur-md py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-navy-900 flex items-center gap-1">
                  Apex<span className="text-teal-600">Dental</span>
                </span>
                <span className="block text-[10px] font-semibold tracking-wider text-slate-600 uppercase -mt-0.5">
                  Elite Dental Care
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.href)}
                    className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? "text-teal-700 bg-teal-50/80 font-semibold"
                        : "text-slate-600 hover:text-navy-900 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>

            {/* Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  handleBookingClick();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium transition-colors shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={handleBookingClick}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-teal-600 text-white cursor-pointer"
              >
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-navy-900 hover:bg-slate-100 transition focus:outline-none"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden fixed inset-x-0 top-[102px] bg-white border-b border-slate-200 shadow-xl px-4 py-6 z-50"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-left text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50/60 transition cursor-pointer"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}

                <div className="pt-4 mt-2 border-t border-slate-100 space-y-3">
                  <button
                    onClick={handleBookingClick}
                    className="w-full py-3 px-4 rounded-xl bg-teal-600 text-white font-medium flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book an Appointment</span>
                  </button>

                  <div className="flex items-center justify-between px-2 pt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-teal-600" />
                      New Patients Welcome
                    </span>
                    <a
                      href={`tel:${clinicInfo.phoneRaw}`}
                      className="font-semibold text-teal-700 flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      {clinicInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
