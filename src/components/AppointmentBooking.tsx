"use client";

import { useState, useEffect, useId } from "react";
import {
  dentalServices,
  dentists,
  timeSlots,
  clinicInfo,
} from "@/data/clinicData";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
  Stethoscope,
  Info,
  Printer,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import Reveal from "@/components/Reveal";

interface AppointmentBookingProps {
  preselectedService?: string;
  preselectedDentist?: string;
}

interface ConfirmationData {
  confirmationId: string;
  patientName: string;
  email: string;
  phone: string;
  service: string;
  dentist: string;
  date: string;
  timeSlot: string;
  notes?: string;
  createdAt: string;
}

export default function AppointmentBooking({
  preselectedService = "",
  preselectedDentist = "",
}: AppointmentBookingProps) {
  // Form State
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(preselectedService || dentalServices[0]?.title || "");
  const [dentist, setDentist] = useState(preselectedDentist || dentists[0]?.name || "");
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [notes, setNotes] = useState("");

  // UI & Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<ConfirmationData | null>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  // Sync props when user clicks "Book Now" from services or dentists section
  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedDentist) {
      setDentist(preselectedDentist);
    }
  }, [preselectedDentist]);

  // Compute minimum selectable date (today) in YYYY-MM-DD
  const todayStr = new Date().toISOString().split("T")[0];

  // Set default date to tomorrow if none set
  useEffect(() => {
    if (!date) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split("T")[0]);
    }
  }, [date]);

  // Dynamically compute available slots based on date + doctor seed
  const getSlotAvailability = (slot: string) => {
    // Generate deterministic demo availability based on slot and dentist string hash
    const seed = (date + dentist + slot).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // 25% of slots show as already taken to demonstrate realistic real-time clinic capacity
    return seed % 4 !== 0;
  };

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  // Validation
  const validateForm = () => {
    if (!patientName.trim()) {
      return "Please enter your full name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address.";
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 8) {
      return "Please enter a valid phone number (at least 8 digits).";
    }
    if (!service) {
      return "Please select a dental service.";
    }
    if (!dentist) {
      return "Please select your preferred dentist.";
    }
    if (!date) {
      return "Please select a consultation date.";
    }
    if (date < todayStr) {
      return "Appointment date cannot be in the past.";
    }
    if (!selectedSlot) {
      return "Please select an available time slot.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submission

    setErrorMessage(null);
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: patientName,
          email,
          phone,
          service,
          dentist,
          date,
          timeSlot: selectedSlot,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to process appointment.");
      }

      setConfirmation(data.confirmation);

      // Trigger celebratory demo confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#0d9488", "#14b8a6", "#0284c7", "#38bdf8"],
        });
      } catch (err) {
        // Confetti optional
      }
    } catch (err: any) {
      // Fallback demo simulation if API fails or offline
      const demoConf: ConfirmationData = {
        confirmationId: `AD-${Math.floor(100000 + Math.random() * 900000)}`,
        patientName: patientName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service,
        dentist,
        date,
        timeSlot: selectedSlot,
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
      };
      setConfirmation(demoConf);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setConfirmation(null);
    setPatientName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setSelectedSlot("");
    setErrorMessage(null);
  };

  const printConfirmation = () => {
    window.print();
  };

  return (
    <section id="booking" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Book Your Appointment
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Pick a treatment, dentist and time. Demo requests are simulated.
          </p>
        </Reveal>

        {/* Booking Card */}
        <Reveal delay={0.1} className="max-w-4xl mx-auto bg-white rounded-3xl shadow-card border border-slate-200/90 overflow-hidden">
          {/* Top Medical Trust Banner */}
          <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-teal-900 p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span className="font-medium">No Waiting Times • Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span>Emergency triage available today</span>
              <a
                href={`tel:${clinicInfo.phoneRaw}`}
                className="underline hover:text-white font-semibold text-teal-300"
              >
                Call: {clinicInfo.phone}
              </a>
            </div>
          </div>

          {confirmation ? (
            /* Confirmation Voucher Screen */
            <div className="p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                  Thank You, {confirmation.patientName}!
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Your appointment request has been processed in our demo booking engine. Below is your clinical visit voucher.
                </p>
              </div>

              {/* Printable Dental Voucher Card */}
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 gap-2">
                  <div>
                    <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Confirmation ID</span>
                    <p className="text-xl font-mono font-bold text-teal-700">{confirmation.confirmationId}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Clinic Location</span>
                    <p className="text-xs font-semibold text-navy-950">{clinicInfo.name}</p>
                    <p className="text-[11px] text-slate-500">{clinicInfo.address}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
                  <div className="p-3 bg-white rounded-xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Service</span>
                    <p className="text-sm font-bold text-navy-900 mt-0.5">{confirmation.service}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Attending Doctor</span>
                    <p className="text-sm font-bold text-navy-900 mt-0.5">{confirmation.dentist}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Date</span>
                    <p className="text-sm font-bold text-navy-900 mt-0.5">
                      {new Date(confirmation.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Time Slot</span>
                    <p className="text-sm font-bold text-teal-700 mt-0.5">{confirmation.timeSlot}</p>
                  </div>
                </div>

                {/* Patient Contact Info Review */}
                <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                  <div>
                    <span className="font-semibold text-navy-900">Patient:</span> {confirmation.patientName} • {confirmation.email} • {confirmation.phone}
                  </div>
                  <span className="text-xs text-slate-500">
                    Demo booking record
                  </span>
                </div>
              </div>

              {/* Confirmation Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={printConfirmation}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-navy-900 font-semibold text-sm transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>Print Voucher</span>
                </button>

                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition shadow-sm cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Book Another Appointment</span>
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Booking Form */
            <form onSubmit={handleSubmit} suppressHydrationWarning className="p-6 sm:p-10 space-y-8">
              {/* Error Alert Banner */}
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-in shake duration-200">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Please check the booking information</p>
                    <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Step 1: Patient Information */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-navy-950">
                    Patient Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="patientName"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="patientName"
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        onBlur={() => handleBlur("patientName")}
                        placeholder="e.g. Jessica Miller"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="patientEmail"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="patientEmail"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleBlur("email")}
                        placeholder="jessica@example.com"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="patientPhone"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="patientPhone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        placeholder="(415) 555-0199"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Service & Specialist Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-navy-950">
                    Treatment & Preferred Clinician
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Dropdown */}
                  <div>
                    <label
                      htmlFor="serviceSelect"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      Dental Treatment *
                    </label>
                    <div className="relative">
                      <select
                        id="serviceSelect"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition bg-white"
                      >
                        {dentalServices.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title} ({s.duration})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dentist Dropdown */}
                  <div>
                    <label
                      htmlFor="dentistSelect"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      Attending Dentist *
                    </label>
                    <div className="relative">
                      <select
                        id="dentistSelect"
                        value={dentist}
                        onChange={(e) => setDentist(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition bg-white"
                      >
                        <option value="Any Available Specialist (Fastest Consultation)">
                          First Available Specialist (Fastest Available)
                        </option>
                        {dentists.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name} — {d.specialization}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Date & Interactive Time Slot */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-navy-950">
                      Date & Available Time Slot
                    </h3>
                  </div>

                  {/* Quick Date Helper Buttons */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setDate(todayStr)}
                      className={`text-xs px-2.5 py-1 rounded-md border transition cursor-pointer ${
                        date === todayStr
                          ? "bg-teal-50 text-teal-800 border-teal-300 font-semibold"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const tom = new Date();
                        tom.setDate(tom.getDate() + 1);
                        setDate(tom.toISOString().split("T")[0]);
                      }}
                      className="text-xs px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                    >
                      Tomorrow
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Date Input with min constraint */}
                  <div className="max-w-xs">
                    <label
                      htmlFor="appointmentDate"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      Select Date (Past Dates Disabled) *
                    </label>
                    <div className="relative">
                      <input
                        id="appointmentDate"
                        type="date"
                        required
                        min={todayStr}
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                          setSelectedSlot(""); // reset slot on date change
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition bg-white"
                      />
                    </div>
                  </div>

                  {/* Time Slots Grid */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Available Slots for {date || "Selected Date"} *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {timeSlots.map((slot) => {
                        const isAvailable = getSlotAvailability(slot);
                        const isSelected = selectedSlot === slot;

                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={!isAvailable}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all duration-150 flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                              !isAvailable
                                ? "bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-100 line-through"
                                : isSelected
                                ? "bg-teal-600 text-white shadow-sm ring-2 ring-teal-400 ring-offset-1 font-bold"
                                : "bg-white text-navy-900 border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40"
                            }`}
                          >
                            <span>{slot}</span>
                            <span className="text-[10px] font-normal">
                              {isAvailable ? "Open" : "Booked"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Notes Message */}
              <div>
                <label
                  htmlFor="appointmentNotes"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Notes or Specific Concerns (Optional)
                </label>
                <textarea
                  id="appointmentNotes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Sensitivity in lower right molar, previous dental anxiety, requesting sedation..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Free cancellation up to 24 hours prior to appointment</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Appointment...</span>
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="w-4 h-4" />
                      <span>Confirm Demo Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
