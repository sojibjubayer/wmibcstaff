import React, { useState, useMemo } from "react";
import {
  Search,
  Banknote,
  ListChecks,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Globe,
  FileText
} from "lucide-react";

const countryData = [
  { country: "Germany", bachelorIELTS: "6.0–6.5", msIELTS: "6.5", fee: "€0–€3,000 (Public)", region: "Europe" },
  { country: "Netherlands", bachelorIELTS: "6.5", msIELTS: "6.5–7.0", fee: "€9,000–€20,000", region: "Europe" },
  { country: "Sweden", bachelorIELTS: "6.5", msIELTS: "6.5–7.0", fee: "€8,500–€18,000", region: "Europe" },
  { country: "Denmark", bachelorIELTS: "6.5", msIELTS: "6.5", fee: "€6,500–€16,000", region: "Europe" },
  { country: "Poland", bachelorIELTS: "5.5–6.0", msIELTS: "6.0", fee: "€2,500–€6,000", region: "Europe" },
  { country: "Romania", bachelorIELTS: "6.0", msIELTS: "6.5", fee: "€2,200–€5,000", region: "Europe" },
  { country: "France", bachelorIELTS: "6.0", msIELTS: "6.5", fee: "€3,000–€12,000", region: "Europe" },
  { country: "Italy", bachelorIELTS: "6.0", msIELTS: "6.5", fee: "€1,000–€4,500", region: "Europe" },
  { country: "Malta", bachelorIELTS: "6.0", msIELTS: "6.0–6.5", fee: "€6,500–€15,000", region: "Europe" },
  { country: "Hungary", bachelorIELTS: "6.0", msIELTS: "6.5", fee: "€3,000–€8,500", region: "Europe" },
  { country: "Lithuania", bachelorIELTS: "5.5–6.0", msIELTS: "6.0", fee: "€3,000–€6,500", region: "Europe" },
  { country: "Estonia", bachelorIELTS: "6.0", msIELTS: "6.5", fee: "€4,000–€9,000", region: "Europe" },
  { country: "USA", bachelorIELTS: "6.5", msIELTS: "6.5–7.5", fee: "$20,000–$45,000", region: "North America" },
  { country: "Canada", bachelorIELTS: "6.0", msIELTS: "6.5", fee: "CAD 18,000–35,000", region: "North America" },
  { country: "Australia", bachelorIELTS: "6.0", msIELTS: "6.5", fee: "AUD 22,000–38,000", region: "Oceania" },
  { country: "New Zealand", bachelorIELTS: "6.0", msIELTS: "6.5", fee: "NZD 20,000–40,000", region: "Oceania" },
  { country: "UK", bachelorIELTS: "6.0", msIELTS: "6.5", fee: "£13,000–26,000", region: "Europe" },
  { country: "Malaysia", bachelorIELTS: "5.5–6.0", msIELTS: "6.0", fee: "$4,500–$11,000", region: "Asia" },
];

const checklistItems = [
  "Passport (Valid for 6+ months)",
  "Last Degree Transcript with Certificate",
  "CV and Passport size photo",
  "English Proficiency Certificate | IELTS/PTE/TOEFL/Duolingo",
  "Recommendation Letter (LOR)",
  "Bank Statement (Last 6 Months)",
];

export default function GlobalStudyVisaPortal() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const regions = ["All", "Europe", "North America", "Oceania", "Asia"];

  const filteredData = useMemo(() => {
    return countryData.filter((item) => {
      const matchesSearch = item.country.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = selectedRegion === "All" || item.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [search, selectedRegion]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-pink-600 p-3 rounded-2xl shadow-lg shadow-pink-200">
              <GraduationCap className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                Study Visa 2026
              </h1>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                WMIBC Global Admission Database
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors w-4 h-4" />
            <input
              type="text"
              placeholder="Search destination country..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                selectedRegion === r
                  ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                  : "bg-white border-transparent text-slate-500 hover:text-pink-600"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table Content */}
          <div className="lg:col-span-2 bg-white rounded-4xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="overflow-x-auto max-h-175 overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-slate-900">
                    <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">Destination</th>
                    <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] text-center">IELTS (UG / PG)</th>
                    <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">Annual Tuition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-pink-50/20 transition-colors group">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-pink-100 transition-colors">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-600" />
                          </div>
                          <div>
                            <p className="font-black text-slate-800 text-xs uppercase">{item.country}</p>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{item.region}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center items-center gap-4">
                          <div className="text-center">
                            <p className="text-[7px] font-black text-slate-300 uppercase mb-0.5">UG</p>
                            <span className="text-xs font-black text-slate-700">{item.bachelorIELTS}</span>
                          </div>
                          <div className="h-6 w-px bg-slate-100" />
                          <div className="text-center">
                            <p className="text-[7px] font-black text-slate-300 uppercase mb-0.5">PG</p>
                            <span className="text-xs font-black text-pink-600">{item.msIELTS}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl w-fit group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
                          <Banknote className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[11px] font-bold text-slate-600">{item.fee}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Screenshot-Ready Checklist Sidebar */}
          <div className="space-y-6">
            <div className="bg-pink-100 p-6 rounded-4xl border border-slate-100 shadow-xl shadow-slate-200/40">
              
              {/* BRANDED CAPTURE HEADER */}
              <div className="border-b-2 border-slate-50 pb-3 mb-2 flex justify-between items-end">
                <div>
                  <h2 className="text-xl font-black text-slate-900 leading-none">WMIBC</h2>
                  <p className="text-[8px] font-black text-pink-600 uppercase tracking-widest mt-1">Study Visa Unit</p>
                </div>
                <div className="text-right">
                  <p className="text-[7px] font-black text-slate-500 uppercase">Admission Year</p>
                  <p className="text-[10px] font-black text-slate-900">2026 SESSION</p>
                </div>
              </div>

              {/* CHECKLIST CONTENT */}
              <div className="mb-4">
                <h3 className="font-black text-slate-900 flex items-center gap-2 text-[11px] uppercase tracking-tight mb-4">
                  <ListChecks className="text-pink-600 w-4 h-4" /> Required Document List
                </h3>
                
                <div className="space-y-2">
                  {checklistItems.map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-2 rounded-xl bg-white border border-slate-100"
                    >
                      <div className="mt-0.5">
                        <FileText size={14} className="text-pink-500" />
                      </div>
                      <span className="text-[10px] font-bold leading-tight text-slate-700">
                        {doc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* VERIFICATION FOOTER */}
              <div className="mt-2 pt-4 border-t border-white flex justify-between items-center opacity-70">
                 <div className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-slate-500" />
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">WMIBC Verified</span>
                 </div>
                 <div className="flex items-center gap-1.5 text-right">
                    <Globe size={12} className="text-slate-500" />
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-tight">www.wmibc.com</span>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}