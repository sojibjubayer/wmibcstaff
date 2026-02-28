import React, { useState, useMemo } from "react";
import {
  Search,
  Globe,
  Banknote,
  ListChecks,
  ArrowUpRight,
  GraduationCap,
  MapPin,
} from "lucide-react";

const countryData = [
  {
    country: "Germany",
    bachelorIELTS: "6.0–6.5",
    msIELTS: "6.5",
    fee: "€0–€3,000 (Public)",
    region: "Europe",
  },
  {
    country: "Netherlands",
    bachelorIELTS: "6.5",
    msIELTS: "6.5–7.0",
    fee: "€9,000–€20,000",
    region: "Europe",
  },
  {
    country: "Sweden",
    bachelorIELTS: "6.5",
    msIELTS: "6.5–7.0",
    fee: "€8,500–€18,000",
    region: "Europe",
  },
  {
    country: "Denmark",
    bachelorIELTS: "6.5",
    msIELTS: "6.5",
    fee: "€6,500–€16,000",
    region: "Europe",
  },
  {
    country: "Poland",
    bachelorIELTS: "5.5–6.0",
    msIELTS: "6.0",
    fee: "€2,500–€6,000",
    region: "Europe",
  },
  {
    country: "Romania",
    bachelorIELTS: "6.0",
    msIELTS: "6.5",
    fee: "€2,200–€5,000",
    region: "Europe",
  },
  {
    country: "France",
    bachelorIELTS: "6.0",
    msIELTS: "6.5",
    fee: "€3,000–€12,000",
    region: "Europe",
  },
  {
    country: "Italy",
    bachelorIELTS: "6.0",
    msIELTS: "6.5",
    fee: "€1,000–€4,500",
    region: "Europe",
  },
  {
    country: "Malta",
    bachelorIELTS: "6.0",
    msIELTS: "6.0–6.5",
    fee: "€6,500–€15,000",
    region: "Europe",
  },
  {
    country: "Hungary",
    bachelorIELTS: "6.0",
    msIELTS: "6.5",
    fee: "€3,000–€8,500",
    region: "Europe",
  },
  {
    country: "Lithuania",
    bachelorIELTS: "5.5–6.0",
    msIELTS: "6.0",
    fee: "€3,000–€6,500",
    region: "Europe",
  },
  {
    country: "Estonia",
    bachelorIELTS: "6.0",
    msIELTS: "6.5",
    fee: "€4,000–€9,000",
    region: "Europe",
  },
  {
    country: "USA",
    bachelorIELTS: "6.5",
    msIELTS: "6.5–7.5",
    fee: "$20,000–$45,000",
    region: "North America",
  },
  {
    country: "Canada",
    bachelorIELTS: "6.0",
    msIELTS: "6.5",
    fee: "CAD 18,000–35,000",
    region: "North America",
  },
  {
    country: "Australia",
    bachelorIELTS: "6.0",
    msIELTS: "6.5",
    fee: "AUD 22,000–38,000",
    region: "Oceania",
  },
  {
    country: "New Zealand",
    bachelorIELTS: "6.0",
    msIELTS: "6.5",
    fee: "NZD 20,000–40,000",
    region: "Oceania",
  },
  {
    country: "UK",
    bachelorIELTS: "6.0",
    msIELTS: "6.5",
    fee: "£13,000–26,000",
    region: "Europe",
  },
  {
    country: "Malaysia",
    bachelorIELTS: "5.5–6.0",
    msIELTS: "6.0",
    fee: "$4,500–$11,000",
    region: "Asia",
  },
];

const checklistItems = [
  "Passport (Valid for 6+ months)",
  "Last Degree Certificate",
  "All Transcripts (Official)",
  "IELTS / MOI Certificate",
  "Updated CV / Resume",
  "Passport Size Photos (White Background)",
  "Bank Statement (Last 6 Months)",
  "SOP (Statement of Purpose)",
  "2 Recommendation Letters (LOR)",
  "Health Insurance / Medical Cover",
];

export default function GlobalStudyVisaPortal() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [checkedDocs, setCheckedDocs] = useState([]);

  const regions = ["All", "Europe", "North America", "Oceania", "Asia"];

  const filteredData = useMemo(() => {
    return countryData.filter((item) => {
      const matchesSearch = item.country
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRegion =
        selectedRegion === "All" || item.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [search, selectedRegion]);

  const progress = Math.round(
    (checkedDocs.length / checklistItems.length) * 100,
  );

  const toggleDocument = (doc) => {
    setCheckedDocs((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc],
    );
  };

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
                Global Admission Database
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
                    <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">
                      Destination
                    </th>
                    <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] text-center">
                      IELTS (UG / PG)
                    </th>
                    <th className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">
                      Annual Tuition
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredData.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-pink-50/20 transition-colors group"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-pink-100 transition-colors">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-600" />
                          </div>
                          <div>
                            <p className="font-black text-slate-800 text-xs uppercase">
                              {item.country}
                            </p>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                              {item.region}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center items-center gap-4">
                          <div className="text-center">
                            <p className="text-[7px] font-black text-slate-300 uppercase mb-0.5">
                              UG
                            </p>
                            <span className="text-xs font-black text-slate-700">
                              {item.bachelorIELTS}
                            </span>
                          </div>
                          <div className="h-6 w-px bg-slate-100" />
                          <div className="text-center">
                            <p className="text-[7px] font-black text-slate-300 uppercase mb-0.5">
                              PG
                            </p>
                            <span className="text-xs font-black text-pink-600">
                              {item.msIELTS}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl w-fit group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
                          <Banknote className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[11px] font-bold text-slate-600">
                            {item.fee}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Checklist Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-xl shadow-slate-200/40">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-slate-900 flex items-center gap-3 text-sm uppercase tracking-tight">
                  <ListChecks className="text-pink-600 w-5 h-5" /> Documents
                </h3>
                <span className="text-[10px] font-black bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                  {progress}%
                </span>
              </div>

              <div className="w-full bg-slate-100 h-1.5 rounded-full mb-8 overflow-hidden">
                <div
                  className="bg-pink-600 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(219,39,119,0.3)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="space-y-3">
                {checklistItems.map((doc, i) => (
                  <label
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                      checkedDocs.includes(doc)
                        ? "bg-slate-50 border-transparent"
                        : "bg-white border-slate-50 hover:border-pink-100"
                    }`}
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="peer appearance-none w-4 h-4 rounded border-2 border-slate-200 checked:bg-pink-600 checked:border-pink-600 transition-all cursor-pointer"
                        checked={checkedDocs.includes(doc)}
                        onChange={() => toggleDocument(doc)}
                      />
                      <svg
                        className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    {/* No line-through here */}
                    <span
                      className={`text-[11px] font-bold transition-colors ${
                        checkedDocs.includes(doc)
                          ? "text-slate-400"
                          : "text-slate-700"
                      }`}
                    >
                      {doc}
                    </span>
                  </label>
                ))}
              </div>

              <button className="w-full mt-8 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-pink-600 transition-all shadow-lg active:scale-95">
                Generate Report <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
























// import React from "react";
// import { Link } from "react-router-dom";

// const studentVisaEurope = [
//   "Germany",
//   "Netherlands",
//   "Sweden",
//   "Denmark",
//   "Poland",
//   "France",
//   "Italy",
//   "Malta",
//   "Hungary",
//   "Lithuania",
//   "Estonia",
// ];

// const studentVisaOther = ["USA", "Canada", "Australia", "New Zealand", "UK", "Malaysia"];

// // Function to create route-friendly country code
// const countryRoute = (country) => `${country.replace(/\s+/g, "")}`;

// const StudentVisa = () => {
//   return (
//     <div className="py-16 px-4 md:px-16">
//       <h1 className="text-4xl font-bold text-purple-800 text-center">
//         Student Visa Countries
//       </h1>
//       <p className="text-center text-purple-700 mt-2 mb-12">
//         Explore the student visa options available across Europe and other popular countries.
//       </p>

//       {/* Europe Countries */}
//       <div className="mb-12">
//         <h2 className="text-2xl font-semibold text-purple-700 mb-4">Europe</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {studentVisaEurope.map((country) => (
//             <Link
//               key={country}
//               to={`/student-visa/${countryRoute(country)}`}
//               className="bg-purple-100 text-purple-800 py-3 rounded-lg shadow hover:bg-purple-200 transition text-center font-medium"
//             >
//               {country}
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Other Countries */}
//       <div>
//         <h2 className="text-2xl font-semibold text-purple-700 mb-4">Other Countries</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {studentVisaOther.map((country) => (
//             <Link
//               key={country}
//               to={`/student-visa/${countryRoute(country)}`}
//               className="bg-purple-100 text-purple-800 py-3 rounded-lg shadow hover:bg-purple-200 transition text-center font-medium"
//             >
//               {country}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentVisa;
