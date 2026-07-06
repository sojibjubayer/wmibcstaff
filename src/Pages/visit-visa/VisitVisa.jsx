import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plane,
  CreditCard,
  ChevronRight,
  Map,
  X,
  CheckCircle2,
  Info,
  Sparkles,
} from "lucide-react";

/**
 * VisitVisa Component - 2026 Blue Premium Edition
 * Optimized: Slim Header, No Footer, Scrollable Body
 */
const VisitVisa = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (selectedCountry) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCountry]);

  const visaData = {
    USA: {
      name: "B-2 Visitor/Tourist Visa",
      validity: "Up to 10 Years (Multiple Entry)",
      fee: "675 QAR (Non-refundable)",
      docs: [
        "Passport (Valid 6+ Months) + Copies",
        "DS-160 Confirmation Page",
        "U.S. Spec Digital Photo",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statements",
        "Travel Itinerary & Hotel Bookings",
        "Employment / Sponsor Letter",
        "Invitation Letter (If Applicable)",
      ],
    },
    Canada: {
      name: "Visitor Visa (TRV)",
      validity: "Up to 10 Years / Passport Expiry",
      fee: "500 QAR + 425 QAR Biometrics",
      docs: [
        "Passport (Valid 6 Months)",
        "Qatar ID (QID)",
        "TRV (IMM 5257) & Family Info (IMM 5645)",
        "6 Months Bank Statements & Pay Slips",
        "NOC from Employer (Position/Salary)",
        "Two Recent Photos (White Background)",
        "Flight & Hotel Itinerary",
        "Cover Letter (Purpose of Visit)",
      ],
    },
    Australia: {
      name: "Visitor Visa (Subclass 600)",
      validity: "3 to 12 Months (Single/Multiple)",
      fee: "460 QAR + 210 QAR Biometrics",
      docs: [
        "Passport (Valid 6 Months)",
        "Online Application (ImmiAccount)",
        "Passport-size Photos",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statement",
        "3-6 Months Salary Slips",
        "Flight & Hotel Itinerary",
        "Employment / Sponsor Letter",
        "Proof of Ties to Home Country",
      ],
    },
    UK: {
      name: "Standard Visitor Visa",
      validity: "6 Months / 2, 5, or 10 Years",
      fee: "659 QAR + VFS Service Fee",
      docs: [
        "Passport (Valid 6+ Months) + Copies",
        "Online Application Confirmation",
        "Passport-size Photo",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statements",
        "Travel Itinerary & Hotel Bookings",
        "Employment / Sponsor Letter",
        "Invitation Letter (If Applicable)",
        "Proof of Ties (Financial/Job/Property)",
        "Business Trade License (If Self-Employed)",
      ],
    },
    "New Zealand": {
      name: "Visitor Visa (Tourist)",
      validity: "Typically 6 to 9 Months",
      fee: "961 QAR (Incl. IVL Levy)",
      docs: [
        "Passport (Valid 6+ Months) + Copies",
        "Online Application (Immigration NZ)",
        "Passport-size Photo",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statements",
        "Travel Itinerary & Hotel Bookings",
        "Employment / Sponsor Letter",
        "Invitation Letter (If Applicable)",
      ],
    },
    France: {
      name: "Schengen Short-Stay Visa (Type C)",
      validity: "Up to 90 Days (within 180-day period)",
      fee: "400 QAR + 150 QAR VFS Service Fee",
      docs: [
        "Passport (Valid 6 Months)",
        "Completed Schengen Application Form",
        "Two Recent Passport-size Photos",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statements",
        "Confirmed Flight Itinerary",
        "Hotel Booking / Accommodation Proof",
        "Travel Medical Insurance (€30k Coverage)",
        "Employment / Sponsor Letter",
        "Proof of Ties (Job, Salary, Assets)",
      ],
    },
    Germany: {
      name: "Schengen Short-Stay Visa (Type C)",
      validity: "Up to 90 Days (within 180-day period)",
      fee: "365 QAR + 130 QAR VFS Service Fee",
      docs: [
        "Passport (Valid 6 Months)",
        "Completed Schengen Application Form",
        "Two Recent Passport-size Photos",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statements",
        "Confirmed Flight Itinerary",
        "Hotel Booking / Accommodation Proof",
        "Travel Medical Insurance (€30k Coverage)",
        "Employment / Sponsor Letter",
        "Proof of Ties (Job, Salary, Assets)",
      ],
    },
    Italy: {
      name: "Schengen Short-Stay Visa (Type C)",
      validity: "Up to 90 Days (within 180-day period)",
      fee: "400 QAR + 150 QAR VFS Service Fee",
      docs: [
        "Passport (Valid 6 Months)",
        "Completed Schengen Application Form",
        "Two Recent Passport-size Photos",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statements",
        "Confirmed Flight Itinerary",
        "Hotel Booking / Accommodation Proof",
        "Travel Medical Insurance (€30k Coverage)",
        "Employment / Sponsor Letter",
        "Proof of Ties (Job, Salary, Assets)",
      ],
    },
    Spain: {
      name: "Schengen Short-Stay Visa (Type C)",
      validity: "Up to 90 Days (within 180-day period)",
      fee: "400 QAR + 150 QAR BLS Service Fee",
      docs: [
        "Passport (Valid 6 Months)",
        "Completed Schengen Application Form",
        "Two Recent Passport-size Photos",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statements",
        "Confirmed Flight Itinerary",
        "Hotel Booking / Accommodation Proof",
        "Travel Medical Insurance (€30k Coverage)",
        "Employment / Sponsor Letter",
        "Proof of Ties (Job, Salary, Assets)",
      ],
    },
    Greece: {
      name: "Schengen Short-Stay Visa (Type C)",
      validity: "Up to 90 Days (within 180-day period)",
      fee: "400 QAR + 150 QAR VFS Service Fee",
      docs: [
        "Passport (Valid 6 Months)",
        "Completed Schengen Application Form",
        "Two Recent Passport-size Photos",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statements",
        "Confirmed Flight Itinerary",
        "Hotel Booking / Accommodation Proof",
        "Travel Medical Insurance (€30k Coverage)",
        "Employment / Sponsor Letter",
        "Proof of Ties (Job, Salary, Assets)",
      ],
    },
    Switzerland: {
      name: "Schengen Short-Stay Visa (Type C)",
      validity: "Up to 90 Days (within 180-day period)",
      fee: "400 QAR + 150 QAR VFS Service Fee",
      docs: [
        "Passport (Valid 6 Months)",
        "Completed Schengen Application Form",
        "Passport-size Photos",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statements",
        "Confirmed Flight Itinerary",
        "Hotel / Accommodation Proof",
        "Travel Medical Insurance (€30k Coverage)",
        "Employment / Sponsor Letter",
        "Proof of Ties (Job, Family, Assets)",
      ],
    },
    Netherlands: {
      name: "Schengen Short-Stay Visa (Type C)",
      validity: "Up to 90 Days (within 180-day period)",
      fee: "400 QAR + 150 QAR VFS Service Fee",
      docs: [
        "Passport (Valid 6 Months)",
        "Schengen Application Form",
        "Passport-size Photos",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statements",
        "Flight & Hotel Bookings",
        "Travel Insurance (€30k Coverage)",
        "Employment / Sponsor Letter",
        "Proof of Ties to Home",
      ],
    },
    Austria: {
      name: "Schengen Short-Stay Visa (Type C)",
      validity: "Up to 90 Days (within 180-day period)",
      fee: "400 QAR + 150 QAR VFS Service Fee",
      docs: [
        "Passport (Valid 6 Months)",
        "Schengen Application Form",
        "Passport-size Photos",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statements",
        "Flight & Accommodation Proof",
        "Travel Insurance (€30k Coverage)",
        "Employment / Sponsor Letter",
        "Proof of Ties to Home",
      ],
    },
    Turkey: {
      name: "Tourist Visa",
      validity: "Up to 180 Days (30-day stay)",
      fee: "810 QAR (Single Entry)",
      docs: [
        "Passport (Valid 6 Months)",
        "Visa Application Form",
        "Passport-size Photos",
        "Qatar ID (QID) Copy",
        "Bank Statements",
        "Flight & Hotel Booking",
        "Employment / Sponsor Letter",
        "Proof of Ties to Home",
      ],
    },
    Thailand: {
      name: "Tourist Visa (TR) / E-Visa",
      validity: "60 Days (Extendable for 30 Days)",
      fee: "150 QAR (Single) / 750 QAR (Multiple)",
      docs: [
        "Passport (Valid 6 Months)",
        "E-Visa Application (thaievisa.go.th)",
        "Recent Passport-size Photo",
        "Qatar ID (QID) Copy",
        "Proof of Funds (min. 3,000 QAR)",
        "Confirmed Round-trip Ticket",
        "Hotel Booking / Accommodation Proof",
        "Travel Insurance (Mandatory)",
        "Digital Arrival Card (TDAC)",
      ],
    },
    China: {
      name: "Visitor Visa (L-Visa)",
      validity: "30 Days (Stay) / Up to 10 Years (Validity)",
      fee: "210 QAR (Single) + 175 QAR Service Fee",
      docs: [
        "Passport (Valid 6 Months)",
        "Completed Application Form (COVA)",
        "Passport-size Photo (China Specs)",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statement",
        "Round-trip Flight Tickets",
        "Confirmed Hotel Bookings",
        "Detailed Travel Itinerary",
        "Employment / Salary Certificate",
      ],
    },
    Singapore: {
      name: "Entry Visa (Tourist)",
      validity: "Up to 2 Years (Multiple Entry) / 30-day Stay",
      fee: "80 QAR (Visa) + ~150-280 QAR Agent Fee",
      docs: [
        "Passport (Valid 6 Months) + A4 Photocopy",
        "Completed Form 14A",
        "Recent Passport Photo (White Background)",
        "Qatar ID (QID) Copy",
        "Confirmed Flight Itinerary & Hotel Booking",
        "Letter of Introduction (Form V39A) if required",
        "Employment Letter (Position/Salary)",
        "6 Months Bank Statements",
      ],
    },
    "South Korea": {
      name: "Tourist Visa (C-3-9) / K-ETA",
      validity: "90 Days (Stay) / Up to 5-10 Years (Multiple)",
      fee: "160-200 QAR (Visa) / ~30 QAR (K-ETA)",
      docs: [
        "Passport (Valid 6+ Months) + Copy",
        "Visa Application Form / K-ETA Approval",
        "Recent Passport-size Photo (White Background)",
        "Qatar ID (QID) Copy (Valid 3+ Months)",
        "3-6 Months Bank Statements",
        "Employment Certificate (Position, Salary, Date)",
        "Confirmed Round-trip Air Ticket",
        "Hotel Reservation",
        "Travel Record (Copy of visas/stamps from last 5 years)",
        "Online e-Arrival Card (Mandatory from 2026)",
      ],
    },
    Japan: {
      name: "Short-Term Stay Visa / Visa Waiver",
      validity: "90 Days (Stay) / 3 Years (Waiver Registration)",
      fee: "73 QAR (Single) / 146 QAR (Multiple) / Free (Waiver)",
      docs: [
        "Passport (Valid 6+ Months) + Copy",
        "Visa Application Form (Sticker Visa)",
        "Waiver Registration (For Qatari e-Passports via JAVES)",
        "Recent Passport Photo (4.5 x 3.5 cm)",
        "Qatar ID (QID) Copy",
        "6 Months Bank Statements",
        "Detailed Daily Travel Itinerary",
        "Confirmed Flight & Hotel Bookings",
        "Employment Letter (Position, Salary, Purpose)",
        "Visit Japan Web QR Code (Customs/Immigration)",
      ],
    },
    India: {
      name: "e-Tourist Visa / Regular Sticker Visa",
      validity: "30 Days, 1 Year, or 5 Years (Multiple Entry)",
      fee: "e-Visa: $25 (Apr-Jun) / $40 (Jul-Mar) | Regular: ~400+ QAR",
      docs: [
        "Passport (Valid 6 Months) - Scanned Bio Page",
        "Recent Digital Photo (White Background, No Specs)",
        "Qatar ID (QID) Copy",
        "Confirmed Return/Onward Flight Ticket",
        "Hotel Booking / Local Reference Address",
        "Proof of Sufficient Funds (Bank Statement)",
        "Employment Letter (For Regular Visa Application)",
        "Previous India Visa Copy (If Applicable)",
      ],
    },
    Malaysia: {
      name: "Tourist Visa / Visa-Free Entry",
      validity: "90 Days (Visa-Free) / 30 Days (e-Visa)",
      fee: "Free (Exempt) / ~110 QAR (e-Visa) / 25 QAR (Embassy)",
      docs: [
        "Passport (Valid 6+ Months) + Copy",
        "MDAC (Malaysia Digital Arrival Card) - Mandatory",
        "Qatar ID (QID) Copy",
        "2 Recent Photos (White Background)",
        "Confirmed Round-trip Ticket",
        "Hotel Booking / Accommodation Proof",
        "3 Months Bank Statements",
        "NOC / Employment Letter (For non-exempt)",
        "Yellow Fever Certificate (If traveling from risk zones)",
      ],
    },
    "Saudi Arabia": {
      name: "Tourist Visa ",
      validity: "30 Days",
      fee: "650 QAR (Service Charge)",
      docs: [
        "Passport - 6 months validity",
        "Qatar ID (QID) - 3 months validity",
        "Passport Size Photo",
        "Valid visa from the US/UK/Schengen countries (if any)",
      ],
    },
  };

  const countries = [
    "USA",
    "Canada",
    "Australia",
    "New Zealand",
    "UK",
    "France",
    "Germany",
    "Italy",
    "Spain",
    "Greece",
    "Switzerland",
    "Netherlands",
    "Austria",
    "Turkey",
    "Thailand",
    "China",
    "Singapore",
    "South Korea",
    "Japan",
    "India",
    "Malaysia",
    "Saudi Arabia",
  ];

  const closeModal = () => setSelectedCountry(null);

  return (
    <div className="min-h-screen bg-[#071a3d] p-4 md:p-10 font-sans text-white relative overflow-hidden">
      {/* --- Premium Radial Blue Ambience --- */}
      <div className="pointer-events-none absolute left-1/3 -top-40 h-120 w-120 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-2xl shadow-2xl border border-white/15 backdrop-blur-md">
              <Plane className="text-cyan-400 w-7 h-7" />
            </div>
            <div>
              <div className="mb-1 inline-flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-cyan-300">
                <Sparkles size={10} /> Global Tourism 2026
              </div>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                Visit Visa
              </h1>
            </div>
          </div>

          <Link
            to="/visit-visa/payment-terms"
            className="group flex items-center gap-3 bg-white/5 border border-white/10 text-blue-100 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:border-cyan-400/50 hover:bg-white/10 shadow-xl backdrop-blur-sm active:scale-95"
          >
            <CreditCard size={16} className="text-cyan-400" />
            Payment Terms
            <ChevronRight
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400"
            />
          </Link>
        </div>

        {/* --- Countries Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {countries.map((country, index) => (
            <button
              key={index}
              onClick={() => setSelectedCountry(country)}
              className="relative group bg-white/6 rounded-3xl p-6 border border-white/10 shadow-2xl backdrop-blur-md hover:border-cyan-400/40 hover:bg-white/12 transition-all duration-300 h-28 md:h-32 flex flex-col justify-between overflow-hidden text-left"
            >
              <Map className="absolute -right-2 -bottom-2 w-16 h-16 text-white/2 group-hover:text-cyan-400/5 transition-colors duration-300" />
              <div className="z-10">
                <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                  View Requirements
                </p>
                <span className="text-sm md:text-base font-black text-blue-50 uppercase tracking-tight group-hover:text-white transition-colors">
                  {country}
                </span>
              </div>
              <div className="w-8 h-1 bg-white/10 group-hover:bg-cyan-400 group-hover:w-full transition-all duration-500 rounded-full" />
            </button>
          ))}
        </div>
      </div>

      {/* --- Dynamic Premium Modal Overlay --- */}
      {selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={closeModal}
          ></div>

          <div className="relative bg-[#0b224e] w-full max-w-lg rounded-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10 flex flex-col max-h-[85vh]">
            {/* MODAL HEADER */}
            <div className="bg-linear-to-r from-[#0d2a63] to-[#081d45] px-6 py-5 text-white shrink-0 flex items-center justify-between border-b border-white/5">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-white">
                  {selectedCountry}
                </h2>
                <p className="text-cyan-400 text-[8px] font-black uppercase tracking-widest mt-0.5">
                  Official Entry Requirements
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-slate-950 transition-colors border border-white/10"
              >
                <X size={16} />
              </button>
            </div>

            {/* SCROLLABLE BODY */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar bg-[#091e46]">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-blue-200/50 uppercase tracking-widest">
                    Visa Category
                  </p>
                  <p className="text-sm font-bold text-white">
                    {visaData[selectedCountry]?.name || "Tourist Visa"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-blue-200/50 uppercase tracking-widest">
                    Validity
                  </p>
                  <p className="text-sm font-bold text-white">
                    {visaData[selectedCountry]?.validity || "Varies"}
                  </p>
                </div>
              </div>

              <div className="bg-white/4 rounded-2xl p-4 border border-white/5 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2">
                  <CreditCard className="text-cyan-400" size={16} />
                  <p className="text-[10px] font-black uppercase text-blue-200 tracking-tight">
                    Embassy / VFS Fee
                  </p>
                </div>
                <p className="text-base font-black text-cyan-300">
                  {visaData[selectedCountry]?.fee || "Quote on Request"}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-cyan-400" />
                  Required Documentation
                </h3>
                <div className="grid grid-cols-1 gap-1.5">
                  {(
                    visaData[selectedCountry]?.docs || [
                      "Passport Copy",
                      "QID Copy",
                      "NOC Letter",
                      "Bank Statement",
                      "Medical Insurance",
                    ]
                  ).map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/3 border border-transparent hover:border-white/5 transition-all group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 mt-1.5 shrink-0 shadow-glow" />
                      <p className="text-xs font-semibold text-blue-100/80 group-hover:text-white transition-colors">
                        {doc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-cyan-500/5 rounded-xl border border-cyan-400/10">
                <Info size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-[9px] leading-relaxed text-blue-200/70 font-medium italic">
                  Fees are approximate for Qatar residents in 2026. Embassy
                  regulatory conditions and paperwork channels may evolve without explicit notice.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Smooth Premium Custom Scrollbar --- */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #22d3ee; border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
};

export default VisitVisa;