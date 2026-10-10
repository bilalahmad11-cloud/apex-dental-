"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import DentistsSection from "@/components/DentistsSection";
import AppointmentBooking from "@/components/AppointmentBooking";
import TestimonialsSection from "@/components/TestimonialsSection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDentist, setSelectedDentist] = useState<string>("");

  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  const handleSelectDentistForBooking = (dentistName: string) => {
    setSelectedDentist(dentistName);
  };

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDentists = () => {
    const el = document.getElementById("dentists");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfdff]">
      {/* Sticky Top Navbar */}
      <Navbar onOpenBookingModal={scrollToBooking} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onBookClick={scrollToBooking}
          onExploreServicesClick={scrollToServices}
        />

        {/* 2. Trust & Statistics Section */}
        <StatsSection />

        {/* 3. Dental Services Section (8 Services with Interactive Modal) */}
        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* 4. About the Clinic Section */}
        <AboutSection onMeetTeamClick={scrollToDentists} />

        {/* 5. Our Dentists Section (Specialist Filters & Profile Modal) */}
        <DentistsSection
          onSelectDentistForBooking={handleSelectDentistForBooking}
        />

        {/* 6. Interactive Appointment Booking Engine */}
        <AppointmentBooking
          preselectedService={selectedService}
          preselectedDentist={selectedDentist}
        />

        {/* 7. Before & After Smile Gallery (Interactive Drag Slider) */}
        <BeforeAfterGallery />

        {/* 8. Patient Testimonials Carousel */}
        <TestimonialsSection />

        {/* 9. Interactive FAQ Accordion */}
        <FaqSection />

        {/* 10. Contact & Location Section (Working Form + WhatsApp) */}
        <ContactSection />
      </main>

      {/* 11. Comprehensive Clinic Footer */}
      <Footer />
    </div>
  );
}
