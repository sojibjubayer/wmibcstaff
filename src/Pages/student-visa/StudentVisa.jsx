import React, { useState, useMemo } from "react";
// Note: Ensure you have lucide-react installed (npm install lucide-react)
import { Search, CheckCircle, Globe, GraduationCap, Banknote, ListChecks, ArrowUpRight } from "lucide-react";

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
  "Last Degree Certificate",
  "All Transcripts (Official)",
  "IELTS / MOI Certificate",
  "Updated CV / Resume",
  "Passport Size Photos (White Background)",
  "Bank Statement (Last 6 Months)",
  "SOP (Statement of Purpose)",
  "2 Recommendation Letters (LOR)",
  "Health Insurance / Medical Cover"
];

export default function GlobalStudyVisaPortal() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [checkedDocs, setCheckedDocs] = useState([]);

  const regions = ["All", "Europe", "North America", "Oceania", "Asia"];

  const filteredData = useMemo(() => {
    return countryData.filter((item) => {
      const matchesSearch = item.country.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = selectedRegion === "All" || item.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [search, selectedRegion]);

  const progress = Math.round((checkedDocs.length / checklistItems.length) * 100);

  const toggleDocument = (doc) => {
    setCheckedDocs(prev => 
      prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Study Visa 2026</h1>
            <p className="text-slate-500 font-medium">Global Admission & Visa Requirements</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by country..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Region Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {regions.map(r => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                selectedRegion === r ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-400"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Table Container */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Country</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">IELTS (UG / PG)</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Annual Tuition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-4">
                        <div className="font-bold text-slate-800 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-indigo-500" /> {item.country}
                        </div>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase">{item.region}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center items-center gap-3">
                            <span className="text-sm font-mono font-semibold text-indigo-600">{item.bachelorIELTS}</span>
                            <div className="h-4 w-px bg-slate-200" />
                            <span className="text-sm font-mono font-semibold text-purple-600">{item.msIELTS}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-medium text-slate-600 flex items-center gap-1">
                          <Banknote className="w-4 h-4 text-emerald-500" /> {item.fee}
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
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                  <ListChecks className="text-indigo-600" /> Document Checklist
                </h3>
                <span className="text-xs font-black bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">{progress}%</span>
              </div>
              
              <div className="w-full bg-slate-100 h-1.5 rounded-full mb-6">
                <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>

              <div className="space-y-3">
                {checklistItems.map((doc, i) => (
                  <label key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded accent-indigo-600" 
                      checked={checkedDocs.includes(doc)}
                      onChange={() => toggleDocument(doc)}
                    />
                    <span className={`text-sm ${checkedDocs.includes(doc) ? "text-slate-400 line-through" : "text-slate-700 font-medium"}`}>{doc}</span>
                  </label>
                ))}
              </div>

              <button className="w-full mt-6 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-slate-200">
                Generate SOP Guide <ArrowUpRight size={16} />
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
