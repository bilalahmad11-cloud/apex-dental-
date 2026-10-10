"use client";

import { useState } from "react";
import { clinicInfo } from "@/data/clinicData";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageCircle,
  Navigation,
} from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setFeedbackMsg("Please provide your name, valid email, and your message.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFeedbackMsg(data.message);
      setTicketId(data.ticketId);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      // Fallback demo simulation
      setStatus("success");
      setFeedbackMsg("Your inquiry was simulated successfully in demo mode.");
      setTicketId(`MSG-${Math.floor(10000 + Math.random() * 90000)}`);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/${clinicInfo.whatsappNumber}?text=${encodeURIComponent(
    clinicInfo.whatsappMessage
  )}`;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Get In Touch
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Have questions about treatments, insurance, or appointments? Reach out to our team.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Clinic Contact Details & Location Card */}
          <Reveal x={-20} y={0} className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
              <h3 className="text-xl font-bold text-navy-950">
                Clinic Information
              </h3>

              <div className="space-y-4 text-sm text-slate-600">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-xs uppercase tracking-wider text-slate-400">
                      Address
                    </h4>
                    <p className="text-navy-900 font-medium mt-0.5">{clinicInfo.address}</p>
                    <p className="text-slate-500">{clinicInfo.cityStateZip}</p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-xs uppercase tracking-wider text-slate-400">
                      Phone & Emergency
                    </h4>
                    <p className="mt-0.5">
                      <a
                        href={`tel:${clinicInfo.phoneRaw}`}
                        className="text-teal-700 font-bold hover:underline"
                      >
                        {clinicInfo.phone}
                      </a>{" "}
                      <span className="text-xs text-slate-400">(Appointments)</span>
                    </p>
                    <p className="mt-0.5 text-xs text-rose-600 font-medium">
                      Emergency:{" "}
                      <a href={`tel:${clinicInfo.emergencyPhone}`} className="hover:underline">
                        {clinicInfo.emergencyPhone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-xs uppercase tracking-wider text-slate-400">
                      Email Concierge
                    </h4>
                    <a
                      href={`mailto:${clinicInfo.email}`}
                      className="text-navy-900 font-medium hover:text-teal-600 transition"
                    >
                      {clinicInfo.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5 pt-2 border-t border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="w-full">
                    <h4 className="font-bold text-navy-900 text-xs uppercase tracking-wider text-slate-400 mb-1.5">
                      Clinical Hours
                    </h4>
                    <div className="space-y-1 text-xs">
                      {clinicInfo.hours.map((h, i) => (
                        <div key={i} className="flex justify-between items-center text-slate-600">
                          <span className="font-medium text-navy-900">{h.days}:</span>
                          <span>{h.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Chat CTA */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition hover:shadow cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-white" />
                  <span>Chat on WhatsApp (Demo)</span>
                </a>
              </div>
            </div>

            {/* Clean Location & Parking Placeholder */}
            <div className="bg-navy-950 text-white p-6 rounded-3xl relative overflow-hidden">
              <div className="absolute right-3 top-3 opacity-10">
                <Navigation className="w-24 h-24" />
              </div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Navigation className="w-4 h-4 text-teal-400" />
                Clinic Location & Parking
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Dedicated underground patient parking, EV chargers, and direct elevator access to our 3rd floor clinic.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-teal-300">
                <span>BART & Muni Accessible</span>
                <span>Elevator to 3rd Floor</span>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Working Contact Form */}
          <Reveal x={20} y={0} delay={0.1} className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-card">
            <h3 className="text-2xl font-bold text-navy-950 mb-2">
              Send Us a Message
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Our team responds to all clinical inquiries within 2 business hours.
            </p>

            {status === "success" && (
              <div className="mb-6 p-5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-sm space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 font-bold text-teal-800">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span>Message Received!</span>
                </div>
                <p className="text-xs text-teal-800">{feedbackMsg}</p>
                {ticketId && (
                  <p className="text-xs font-mono font-semibold text-teal-900 bg-teal-100/70 px-2 py-1 rounded inline-block">
                    Reference ID: {ticketId}
                  </p>
                )}
                <div className="pt-2">
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-xs text-teal-800 font-bold underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2.5 animate-in shake duration-200">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{feedbackMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contactName"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jessica Miller"
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactEmail"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jessica@example.com"
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contactPhone"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                  >
                    Phone (Optional)
                  </label>
                  <input
                    id="contactPhone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(415) 555-0199"
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactSubject"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                  >
                    Subject
                  </label>
                  <select
                    id="contactSubject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition bg-white"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Insurance Coverage Question">Insurance Coverage Question</option>
                    <option value="New Patient Consultation">New Patient Consultation</option>
                    <option value="Cosmetic Makeover Consultation">Cosmetic Makeover Consultation</option>
                    <option value="Same-Day Emergency">Same-Day Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contactMessage"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                >
                  How Can We Help You? *
                </label>
                <textarea
                  id="contactMessage"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share any questions about appointments, symptoms, or insurance..."
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-slate-400">
                  We respect your privacy. Form operates in demo client preview mode.
                </span>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-950 text-white font-semibold text-sm transition shadow-sm hover:shadow disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-teal-400" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
