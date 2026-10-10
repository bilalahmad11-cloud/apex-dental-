"use client";

import { useState } from "react";
import Image from "next/image";
import { dentists, Dentist } from "@/data/clinicData";
import DentistModal from "@/components/DentistModal";
import Reveal from "@/components/Reveal";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronRight,
} from "lucide-react";

interface DentistsSectionProps {
  onSelectDentistForBooking: (dentistName: string) => void;
}

export default function DentistsSection({
  onSelectDentistForBooking,
}: DentistsSectionProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("All");
  const [activeDentist, setActiveDentist] = useState<Dentist | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const specialties = [
    "All",
    "Cosmetic & Implants",
    "Orthodontics",
    "Endodontics",
    "General",
  ];

  const filteredDentists =
    selectedSpecialty === "All"
      ? dentists
      : dentists.filter((d) => d.specialization === selectedSpecialty);

  const handleOpenProfile = (dentist: Dentist) => {
    setActiveDentist(dentist);
    setModalOpen(true);
  };

  const handleBookWithDentist = (dentistName: string) => {
    onSelectDentistForBooking(dentistName);
    const bookingEl = document.getElementById("booking");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="dentists" className="py-20 lg:py-28 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Meet Our Dentists
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Experienced specialists focused on comfort and lasting results.
          </p>

          {/* Specialization Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedSpecialty === spec
                    ? "bg-navy-900 text-white shadow-sm font-semibold"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-teal-400 hover:text-navy-900"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Dentists Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDentists.map((dentist, i) => (
              <motion.div
                layout
                key={dentist.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-teal-300 shadow-xs hover:shadow-card-hover transition-colors duration-300 flex flex-col"
              >
                {/* Doctor Headshot with MagicUI BlurFade */}
                <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                  <BlurFade delay={0.1 + i * 0.06} duration={0.45} blur="8px" inView={true} className="w-full h-full">
                    <Image
                      src={dentist.image}
                      alt={dentist.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </BlurFade>
                </div>

                {/* Dentist Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-navy-950 group-hover:text-teal-700 transition-colors">
                      {dentist.name}
                    </h3>
                    <p className="text-xs text-teal-700 font-semibold mt-0.5">
                      {dentist.specialization}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {dentist.experienceYears}+ years experience
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenProfile(dentist)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <span>View Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleBookWithDentist(dentist.name)}
                      className="w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center gap-1 transition shadow-xs cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-10 text-center text-xs text-slate-400">
          Sample dentist profiles for demonstration.
        </p>
      </div>

      {/* Dentist Profile Modal */}
      <DentistModal
        dentist={activeDentist}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onBookDentist={(name) => handleBookWithDentist(name)}
      />
    </section>
  );
}
