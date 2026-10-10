"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { dentalServices, DentalService } from "@/data/clinicData";
import ServiceModal from "@/components/ServiceModal";
import {
  ShieldCheck,
  Activity,
  Smile,
  HeartPulse,
  Gem,
  Droplets,
  Stethoscope,
  Sun,
  Clock,
  ChevronRight,
  Calendar,
} from "lucide-react";

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export default function ServicesSection({
  onSelectServiceForBooking,
}: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<DentalService | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = [
    { id: "all", label: "All Treatments" },
    { id: "preventative", label: "Preventative" },
    { id: "cosmetic", label: "Cosmetic" },
    { id: "restorative", label: "Restorative" },
    { id: "specialized", label: "Specialized" },
  ];

  const filteredServices =
    activeCategory === "all"
      ? dentalServices
      : dentalServices.filter((s) => s.category === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case "Sun":
        return <Sun className="w-5 h-5 text-teal-600" />;
      case "Activity":
        return <Activity className="w-5 h-5 text-teal-600" />;
      case "Smile":
        return <Smile className="w-5 h-5 text-teal-600" />;
      case "HeartPulse":
        return <HeartPulse className="w-5 h-5 text-teal-600" />;
      case "Gem":
        return <Gem className="w-5 h-5 text-teal-600" />;
      case "Droplets":
        return <Droplets className="w-5 h-5 text-teal-600" />;
      case "Stethoscope":
        return <Stethoscope className="w-5 h-5 text-rose-500" />;
      default:
        return <Smile className="w-5 h-5 text-teal-600" />;
    }
  };

  const handleOpenModal = (service: DentalService) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleBookFromCard = (serviceTitle: string) => {
    onSelectServiceForBooking(serviceTitle);
    const bookingEl = document.getElementById("booking");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#f8fafc] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Comprehensive Dental Care For Every Smile
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Preventative, cosmetic, and restorative dental medicine delivered with gentle precision.
          </p>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-teal-600 text-white shadow-sm font-semibold"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-teal-400 hover:text-navy-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 8 Dental Service Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                key={service.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-teal-300 shadow-xs hover:shadow-card-hover transition-colors duration-300 flex flex-col"
              >
                {/* Card Image Thumbnail */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <h3 className="text-lg font-bold text-navy-950 group-hover:text-teal-700 transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Duration & Key meta */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      {service.duration}
                    </span>
                    <span className="text-slate-600 font-medium">
                      {service.samplePrice.split(" ")[0]} {service.samplePrice.split(" ")[1]}
                    </span>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleOpenModal(service)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleBookFromCard(service.title)}
                      className="w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center gap-1 transition shadow-xs cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detail Modal Component */}
      <ServiceModal
        service={selectedService}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onBookService={(serviceTitle) => handleBookFromCard(serviceTitle)}
      />
    </section>
  );
}
