import Link from "next/link";
import { ArrowLeft, Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-teal-50/20 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl shadow-card border border-slate-100">
        <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl font-bold font-mono">404</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mb-8">
          The dental care page or resource you are looking for may have been moved or does not exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-teal-600 text-white font-medium hover:bg-teal-700 transition shadow-sm text-sm"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
          <a
            href="tel:+18005553368"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-navy-900 font-medium hover:bg-slate-200 transition text-sm"
          >
            <Phone className="w-4 h-4 text-teal-600" />
            Contact Clinic
          </a>
        </div>
      </div>
    </div>
  );
}
