export interface DentalService {
  id: string;
  title: string;
  category: "preventative" | "cosmetic" | "restorative" | "specialized";
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  benefits: string[];
  duration: string;
  recovery: string;
  frequency: string;
  samplePrice: string;
  image: string;
  featured?: boolean;
}

export interface Dentist {
  id: string;
  name: string;
  role: string;
  specialization: "General" | "Cosmetic & Implants" | "Orthodontics" | "Endodontics";
  experienceYears: number;
  education: string;
  bio: string;
  highlights: string[];
  availableDays: string[];
  image: string;
  rating: number;
  reviewsCount: number;
}

export interface Testimonial {
  id: string;
  patientName: string;
  city: string;
  rating: number;
  treatment: string;
  date: string;
  quote: string;
  dentistName: string;
  verified: boolean;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  category: "Cosmetic" | "Orthodontics" | "Implants" | "Whitening";
  beforeImage: string;
  afterImage: string;
  treatmentTime: string;
  dentist: string;
  description: string;
  metrics: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Appointments" | "Treatments" | "Pricing & Insurance" | "General";
}

export const clinicInfo = {
  name: "Apex Dental",
  tagline: "Your Smile Deserves Expert Care.",
  subheadline:
    "Experience gentle, world-class dental treatments in a calming spa-inspired clinic. From routine care to complete smile transformations, our board-certified team delivers precision and comfort.",
  phone: "+1 (800) 555-3368",
  phoneRaw: "+18005553368",
  emergencyPhone: "+1 (800) 555-9111",
  email: "care@apexdental-demo.com",
  address: "450 Medical Heights Blvd, Suite 320",
  cityStateZip: "San Francisco, CA 94108",
  fullAddress: "450 Medical Heights Blvd, Suite 320, San Francisco, CA 94108",
  hours: [
    { days: "Monday - Friday", hours: "8:00 AM – 7:00 PM" },
    { days: "Saturday", hours: "9:00 AM – 4:00 PM" },
    { days: "Sunday", hours: "Emergency Appointments Only" },
  ],
  whatsappNumber: "18005553368",
  whatsappMessage: "Hello Apex Dental, I would like to inquire about booking an appointment.",
  isDemoNotice: "Interactive Showcase Demo: All sample appointments and inquiries run in interactive demonstration mode.",
};

export const trustStats = [
  {
    id: "satisfaction",
    value: "99.4%",
    numeric: 99.4,
    suffix: "%",
    label: "Patient Satisfaction",
    subtext: "Based on 3,400+ verified post-care reviews",
    badge: "Top Rated 2026",
  },
  {
    id: "experience",
    value: "18+",
    numeric: 18,
    suffix: "+",
    label: "Years of Excellence",
    subtext: "Continuous compassionate family dentistry",
    badge: "Established 2008",
  },
  {
    id: "patients",
    value: "24,500+",
    numeric: 24500,
    suffix: "+",
    label: "Smiles Restored",
    subtext: "Across Northern California & Bay Area",
    badge: "Trusted Practice",
  },
  {
    id: "dentists",
    value: "12",
    numeric: 12,
    suffix: "",
    label: "Specialist Doctors",
    subtext: "Harvard, UCSF & NYU trained dental leaders",
    badge: "Board Certified",
  },
];

export const dentalServices: DentalService[] = [
  {
    id: "general-dentistry",
    title: "General Dentistry",
    category: "preventative",
    tagline: "Comprehensive oral health checkups, gentle restorations, and digital X-rays.",
    shortDesc: "Routine exams, minimally invasive tooth-colored fillings, and preventative oral screenings to preserve natural tooth structure.",
    fullDesc:
      "Our general dentistry program focuses on preserving your natural teeth through precision diagnosis, comfortable cleanings, high-resolution low-radiation digital scans, and biocompatible composite fillings. We prioritize pain-free preventative maintenance to protect your smile for life.",
    iconName: "ShieldCheck",
    benefits: [
      "Ultra-low radiation 3D digital imaging & panoramic scans",
      "Mercury-free, tooth-colored natural composite fillings",
      "Early periodontal and oral health screenings",
      "Comprehensive personalized preventive oral health roadmap",
    ],
    duration: "45 – 60 minutes",
    recovery: "Immediate; no downtime required",
    frequency: "Recommended every 6 months",
    samplePrice: "From $120 (Demo Estimate)",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening",
    category: "cosmetic",
    tagline: "Professional medical-grade whitening for up to 8 shades brighter in one hour.",
    shortDesc: "In-office LED laser whitening and customized take-home trays engineered for maximum brightness with zero enamel damage or sensitivity.",
    fullDesc:
      "Safely eliminate years of coffee, tea, wine, and age-related discoloration with our medical laser whitening system. Formulated with soothing potassium nitrate desensitizers, our treatments deliver luminous, natural-looking results in a single 60-minute visit.",
    iconName: "Sun",
    benefits: [
      "Lightens enamel by 6 to 8 shades in a single clinical session",
      "Special desensitizing formula prevents post-treatment tooth ache",
      "Includes custom-molded maintenance trays and touch-up serum",
      "Long-lasting brightness with professional color-stability protocol",
    ],
    duration: "60 minutes",
    recovery: "Zero downtime; avoid dark staining drinks for 48 hours",
    frequency: "Annual refresher or as recommended",
    samplePrice: "From $280 (Demo Estimate)",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    category: "restorative",
    tagline: "Permanent, titanium and zirconia root replacements that look and feel like natural teeth.",
    shortDesc: "Guided surgical placement of single or full-arch dental implants that restore 100% biting power and preserve youthful facial bone structure.",
    fullDesc:
      "Dental implants represent the gold standard in permanent tooth replacement. Using 3D computer-guided surgical templates and medical-grade biocompatible titanium fixtures, our specialists rebuild your bite, prevent bone resorption, and craft custom porcelain crowns that blend seamlessly.",
    iconName: "Activity",
    benefits: [
      "Permanent solution with a 98.7% long-term clinical success rate",
      "Restores 100% natural chewing strength and natural bite balance",
      "Prevents bone loss and preserves natural facial contours",
      "Individually hand-shaded ceramic crowns matching adjacent teeth",
    ],
    duration: "60 – 90 mins per placement",
    recovery: "Mild tenderness for 2-3 days; full osseointegration over 3 months",
    frequency: "Permanent lifelong solution with regular hygiene",
    samplePrice: "From $1,450 (Demo Estimate)",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "orthodontics-braces",
    title: "Orthodontics & Braces",
    category: "specialized",
    tagline: "Virtually invisible clear aligners and discreet modern braces for teens & adults.",
    shortDesc: "Invisalign® Diamond provider clear aligners and low-profile ceramic brackets designed to align teeth, correct bites, and enhance facial harmony.",
    fullDesc:
      "Achieve straight teeth and a balanced bite without metal brackets. We utilize modern iTero® 3D digital impressions—no messy putty—to simulate your smile outcome before you begin. Choose between clear removable aligners or sleek ceramic braces tailored to your lifestyle.",
    iconName: "Smile",
    benefits: [
      "Custom 3D virtual simulation lets you preview your final smile",
      "Virtually invisible aligners can be removed for eating and brushing",
      "Accelerated movement options reducing treatment time by up to 30%",
      "Specialized options for both growing teens and busy working adults",
    ],
    duration: "Initial 45 min scan & planning",
    recovery: "Minor adjustment pressure for 24-48 hours after new tray",
    frequency: "Monthly digital check-ins or in-clinic visits",
    samplePrice: "From $1,900 (Demo Estimate)",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "root-canal-treatment",
    title: "Root Canal Treatment",
    category: "restorative",
    tagline: "Gentle, microscopic endodontics to eliminate tooth pain and save your natural tooth.",
    shortDesc: "Modern microscopic rotary techniques that make root canal therapy as gentle and routine as a simple filling while eliminating infection.",
    fullDesc:
      "A root canal doesn't cause pain—it relieves it. Using state-of-the-art operating microscopes and rotary nickel-titanium instruments, our endodontic specialists gently cleanse the infected pulp chamber, disinfect the canals, and seal the tooth permanently to prevent extraction.",
    iconName: "HeartPulse",
    benefits: [
      "Microscope-guided precision preserves maximum natural tooth wall",
      "Virtually painless procedure with advanced computer-controlled local anesthesia",
      "Saves your natural tooth and avoids costly extraction and implants",
      "Rapid relief from acute throbbing pain and temperature sensitivity",
    ],
    duration: "60 – 75 minutes",
    recovery: "Immediate relief; mild tenderness for 24 hours managed with ibuprofen",
    frequency: "One-time permanent treatment with protective crown",
    samplePrice: "From $490 (Demo Estimate)",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    category: "cosmetic",
    tagline: "Handcrafted porcelain veneers, composite bonding, and bespoke smile makeovers.",
    shortDesc: "Artisanal porcelain veneers, gum line sculpting, and composite edge bonding that correct chips, gaps, and asymmetry for a red-carpet smile.",
    fullDesc:
      "Our cosmetic dentistry blends dental biology with fine aesthetic craftsmanship. Each porcelain veneer is custom-fabricated by master ceramists to mimic the exact light transmission and micro-texture of natural youthful enamel, delivering seamless, show-stopping smile symmetry.",
    iconName: "Gem",
    benefits: [
      "Handcrafted ultra-thin porcelain veneers requiring minimal enamel prep",
      "Minimally invasive composite bonding for same-day chip and gap repairs",
      "Harmonious aesthetic alignment tailored to your face shape and lips",
      "Stain-resistant ceramic that retains luster for 15+ years",
    ],
    duration: "Two visits of 90 minutes",
    recovery: "Minimal; immediate return to normal speech and smiling",
    frequency: "Long-lasting results with routine checkups",
    samplePrice: "From $750/tooth (Demo Estimate)",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dental-cleaning",
    title: "Dental Cleaning & Hygiene",
    category: "preventative",
    tagline: "Comfortable ultrasonic scaling, air polishing, and deep periodontal therapy.",
    shortDesc: "Gentle ultrasonic biofilm removal and airflow stain cleansing that leaves teeth slick, fresh, and completely protected from gum disease.",
    fullDesc:
      "Experience our spa-like dental hygiene session. We replace harsh scraping with gentle Piezo ultrasonic vibrations and warm-water airflow polishing that gently dissolves stubborn tartar, coffee stains, and bacterial colonies without scratching enamel or irritating sensitive gums.",
    iconName: "Droplets",
    benefits: [
      "Comfortable ultrasonic cleaning with warm antimicrobial rinse",
      "Airflow guided biofilm therapy for gentle stain removal",
      "Comprehensive periodontal pocket charting and gum health review",
      "Mineralizing fluoride or hydroxyapatite enamel strengthening finish",
    ],
    duration: "45 minutes",
    recovery: "Zero downtime; exceptionally clean, refreshed mouth feel",
    frequency: "Every 6 months for optimal gum health",
    samplePrice: "From $95 (Demo Estimate)",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "emergency-dental-care",
    title: "Emergency Dental Care",
    category: "specialized",
    tagline: "Same-day priority relief for severe toothaches, chipped teeth, and trauma.",
    shortDesc: "Emergency triage, pain relief, fractured tooth repair, and immediate stabilization available 7 days a week with dedicated on-call dentists.",
    fullDesc:
      "Dental emergencies are stressful and urgent. We reserve dedicated emergency treatment slots every single day for acute pain, broken or knocked-out teeth, lost crowns, and facial swelling. Our clinic team will stabilize your pain immediately and deliver emergency restorative care.",
    iconName: "Stethoscope",
    benefits: [
      "Guaranteed same-day emergency slots for severe pain or accidents",
      "Immediate digital diagnostics to pinpoint the root cause of distress",
      "Rapid pain alleviation protocols and emergency antibiotic therapy",
      "Dedicated 24/7 on-call triage line for after-hours patient guidance",
    ],
    duration: "30 – 60 mins immediate triage",
    recovery: "Same-day comfort restoration with targeted treatment plan",
    frequency: "As needed on emergency notice",
    samplePrice: "Priority Triage from $150 (Demo Estimate)",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  },
];

export const dentists: Dentist[] = [
  {
    id: "dr-sarah-mitchell",
    name: "Dr. Sarah Mitchell, DDS",
    role: "Clinical Director & Lead Cosmetic Surgeon",
    specialization: "Cosmetic & Implants",
    experienceYears: 16,
    education: "UCSF School of Dentistry • Fellow, American Academy of Cosmetic Dentistry (AACD)",
    bio: "Dr. Mitchell is an internationally recognized cosmetic clinician known for her natural, facial-driven smile designs and gentle chairside demeanor. She has restored over 4,000 smiles with porcelain veneers and full-mouth rehabilitation.",
    highlights: [
      "Top Cosmetic Dentist Award 2024 & 2025",
      "Pioneer in minimally invasive veneer prep",
      "Certified Digital Smile Design (DSD) Master",
      "Lecturer on aesthetic restorative materials",
    ],
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    rating: 4.98,
    reviewsCount: 312,
  },
  {
    id: "dr-david-chen",
    name: "Dr. David Chen, DMD, MS",
    role: "Director of Orthodontics & Facial Orthopedics",
    specialization: "Orthodontics",
    experienceYears: 12,
    education: "Harvard School of Dental Medicine • Master of Science in Orthodontics",
    bio: "Dr. Chen combines algorithmic biomechanics with subtle aesthetic sensibilities to treat complex misalignments. He is a Diamond Plus Invisalign® provider with over a decade of experience treating both teenagers and adult professionals.",
    highlights: [
      "Invisalign® Diamond Plus Top 1% Provider",
      "Specialist in airway-conscious orthodontics",
      "Member of the American Association of Orthodontists (AAO)",
      "Digital treatment planning precision expert",
    ],
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    rating: 4.96,
    reviewsCount: 248,
  },
  {
    id: "dr-elena-rostova",
    name: "Dr. Elena Rostova, DDS, MS",
    role: "Microscopic Endodontist & Microsurgeon",
    specialization: "Endodontics",
    experienceYears: 14,
    education: "NYU College of Dentistry • Specialty Certification in Endodontics",
    bio: "Dr. Rostova specializes in high-precision microscopic root canal treatments, preserving teeth that other clinics deem unsavable. Her patients consistently applaud her calm, relaxing bedside manner and entirely painless techniques.",
    highlights: [
      "Board Certified Diplomate, American Board of Endodontics",
      "Microscope-guided 3D canal disinfection specialist",
      "Over 6,500 successful tooth-saving therapies",
      "Expert in painless local block anesthesia",
    ],
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Saturday"],
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=80",
    rating: 4.99,
    reviewsCount: 194,
  },
  {
    id: "dr-marcus-vance",
    name: "Dr. Marcus Vance, DDS",
    role: "Senior General & Restorative Clinician",
    specialization: "General",
    experienceYears: 9,
    education: "University of the Pacific Arthur A. Dugoni School of Dentistry",
    bio: "Dr. Vance is passionate about preventative wellness, gentle restorative care, and emergency stabilization. He takes the time to explain every procedure clearly, eliminating dental anxiety for nervous patients and young families.",
    highlights: [
      "Fellow of the Academy of General Dentistry (FAGD)",
      "Dental Anxiety Relief Specialist",
      "Expert in biomimetic composite tooth restorations",
      "Lead clinician for same-day emergency triage",
    ],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Friday"],
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=800&q=80",
    rating: 4.94,
    reviewsCount: 178,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    patientName: "Emily R., Tech Executive",
    city: "San Francisco, CA",
    rating: 5,
    treatment: "Porcelain Veneers & Smile Makeover",
    date: "February 2026",
    quote:
      "I was nervous about veneers looking artificial, but Dr. Mitchell created an astonishingly natural smile that fits my face perfectly. The clinic feels more like a luxury boutique hotel than a dental office!",
    dentistName: "Dr. Sarah Mitchell",
    verified: true,
  },
  {
    id: "t2",
    patientName: "Marcus Sterling, Architect",
    city: "Marin County, CA",
    rating: 5,
    treatment: "Invisalign Clear Aligners",
    date: "January 2026",
    quote:
      "Dr. Chen corrected my severe crowding in just 9 months with zero discomfort in client meetings. The 3D preview was spot-on, and appointments were always on time.",
    dentistName: "Dr. David Chen",
    verified: true,
  },
  {
    id: "t3",
    patientName: "Sophia Hernandez, Educator",
    city: "Berkeley, CA",
    rating: 5,
    treatment: "Microscopic Root Canal Therapy",
    date: "March 2026",
    quote:
      "I walked in with excruciating tooth pain and absolute terror. Dr. Rostova was unbelievably gentle—I literally fell asleep during my root canal! Absolutely zero pain the following morning.",
    dentistName: "Dr. Elena Rostova",
    verified: true,
  },
  {
    id: "t4",
    patientName: "James Thornton, Finance Manager",
    city: "Palo Alto, CA",
    rating: 5,
    treatment: "Dental Implant & Crown",
    date: "December 2025",
    quote:
      "After breaking a front tooth in a cycling accident, Apex Dental had me evaluated same-day and placed a 3D guided implant. It feels and looks 100% like my natural tooth. Remarkable care.",
    dentistName: "Dr. Sarah Mitchell",
    verified: true,
  },
  {
    id: "t5",
    patientName: "Claire Dupont, Creative Director",
    city: "San Francisco, CA",
    rating: 5,
    treatment: "Laser Whitening & Hygiene Clean",
    date: "January 2026",
    quote:
      "The airflow hygiene clean was so gentle and my teeth are noticeably whiter without any sensitivity. The staff makes you feel calm and cared for from the moment you step in.",
    dentistName: "Dr. Marcus Vance",
    verified: true,
  },
];

export const beforeAfterCases: BeforeAfterCase[] = [
  {
    id: "case-1",
    title: "Porcelain Veneers Smile Restoration",
    category: "Cosmetic",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
    treatmentTime: "2 Visits (3 Weeks Total)",
    dentist: "Dr. Sarah Mitchell, DDS",
    description: "Correction of chipped upper enamel, tetracycline discoloration, and irregular midline with 8 custom feldspathic ceramic veneers.",
    metrics: "8 Shades Brighter • Symmetrical Smile Curve",
  },
  {
    id: "case-2",
    title: "Invisalign Clear Aligner Crowding Fix",
    category: "Orthodontics",
    beforeImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
    treatmentTime: "10 Months (24 Aligners)",
    dentist: "Dr. David Chen, DMD",
    description: "Resolution of severe lower anterior crowding and deep bite alignment without extracting any permanent teeth.",
    metrics: "100% Arch Alignment • Zero Extractions",
  },
  {
    id: "case-3",
    title: "Medical Laser Teeth Whitening",
    category: "Whitening",
    beforeImage: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    treatmentTime: "Single 60-Minute Session",
    dentist: "Dr. Marcus Vance, DDS",
    description: "Elimination of deep coffee and tobacco staining using our proprietary cold-laser accelerator gel with zero sensitivity.",
    metrics: "7 Vita Shade Improvement",
  },
  {
    id: "case-4",
    title: "Single Front Tooth Dental Implant",
    category: "Implants",
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    treatmentTime: "Guided Surgery + Final Zirconia Crown",
    dentist: "Dr. Sarah Mitchell, DDS",
    description: "Immediate guided implant placement following traumatic fracture, finished with a custom-milled zirconia abutment.",
    metrics: "Full Bite Strength • Natural Emergence Profile",
  },
];

export const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "How can I book an appointment?",
    category: "Appointments",
    answer:
      "You can easily book an appointment using our interactive online scheduler on this website, calling our concierge desk directly at +1 (800) 555-3368, or sending a message via WhatsApp. Select your desired service, preferred dentist, and convenient time slot for instant booking confirmation.",
  },
  {
    id: "faq-2",
    question: "Do you accept new patients?",
    category: "Appointments",
    answer:
      "Yes! We warmly welcome new patients of all ages to the Apex Dental family. New patient appointments include a comprehensive 3D digital scan, gentle periodontal evaluation, oral cancer screening, and a one-on-one consultation with your doctor.",
  },
  {
    id: "faq-3",
    question: "What should I bring to my first visit?",
    category: "General",
    answer:
      "Please bring a government photo ID, your dental insurance card (if applicable), and a list of any current medications or relevant medical history. If you have recent dental X-rays from the past 12 months, you may request your previous clinic to forward them, or we can take complimentary modern low-radiation digital scans.",
  },
  {
    id: "faq-4",
    question: "Do you offer emergency dental services?",
    category: "Treatments",
    answer:
      "Yes, we offer priority same-day emergency dental appointments for severe toothaches, chipped or knocked-out teeth, lost crowns, and acute infections. Call our emergency triage line immediately at +1 (800) 555-9111 or select 'Emergency Dental Care' in our online booking form.",
  },
  {
    id: "faq-5",
    question: "How much does a consultation cost?",
    category: "Pricing & Insurance",
    answer:
      "Standard new patient examinations start at $120 (illustrative sample pricing for demo purposes), which includes digital imaging and diagnosis. We accept most major PPO dental insurance networks and offer flexible 0% interest monthly payment options via CareCredit and Sunbit.",
  },
  {
    id: "faq-6",
    question: "How can I contact the clinic?",
    category: "General",
    answer:
      "You can contact our clinical reception via phone at +1 (800) 555-3368, email at care@apexdental-demo.com, or through our direct WhatsApp link. Our physical clinic is located at 450 Medical Heights Blvd, Suite 320, San Francisco, CA.",
  },
  {
    id: "faq-7",
    question: "Is dental treatment painful at Apex Dental?",
    category: "Treatments",
    answer:
      "Not at all. We pride ourselves on pain-free dentistry. We utilize computer-assisted anesthesia delivery, needle-free surface numbing gels, warming rinses, and noise-canceling headphones to ensure your treatment is completely comfortable and relaxing.",
  },
];

export const timeSlots = [
  "08:30 AM",
  "09:15 AM",
  "10:00 AM",
  "10:45 AM",
  "11:30 AM",
  "01:15 PM",
  "02:00 PM",
  "02:45 PM",
  "03:30 PM",
  "04:15 PM",
  "05:00 PM",
  "05:45 PM",
];
