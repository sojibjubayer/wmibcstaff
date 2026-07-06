import React, { useState, useMemo } from "react";
import {
  Search,
  Briefcase,
  Building2,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Globe,
  FileText,
  Sparkles,
  ChevronRight,
  Layers,
  ArrowUpRight
} from "lucide-react";

const corporateData = [
  {
    country: "Germany",
    visaType: "Self-Employment / Entrepreneur Visa",
    minInvestment: "No Fixed Min. (€25k-50k recommended)",
    setupTime: "3–6 Months",
    keyBenefit: "Access to EU's Largest Domestic Market",
    requirements: [
      "Economic interest or regional demand in Germany",
      "Viable business plan & secure financing",
      "GmbH corporate registration (€25,000 share capital)",
      "Proof of pension plan if age 45+"
    ],
    region: "Western Europe"
  },
  {
    country: "Netherlands",
    visaType: "Dutch Startup / Innovative Visa",
    minInvestment: "No Fixed Min. (Requires seed capital)",
    setupTime: "2–3 Months",
    keyBenefit: "Highly skilled migrant tax perks (30% ruling)",
    requirements: [
      "Collaboration with a certified Dutch facilitator",
      "Highly innovative product/service step",
      "Detailed step-by-step operational plan",
      "Sufficient financial means to live for 1 year"
    ],
    region: "Western Europe"
  },
  {
    country: "France",
    visaType: "Talent Passport: Business Investor",
    minInvestment: "€300,000 (Tangible/Intangible assets)",
    setupTime: "2–4 Months",
    keyBenefit: "4-Year Multi-entry Residency directly",
    requirements: [
      "Own at least 10% of the company being funded",
      "Create or commit to safeguarding jobs within 4 years",
      "Direct investment or via a company managed by applicant",
      "Approved validation by French ministry"
    ],
    region: "Western Europe"
  },
  {
    country: "Portugal",
    visaType: "D2 Immigrant Entrepreneur Visa",
    minInvestment: "€5,000+ (Flexible corporate setup)",
    setupTime: "3–5 Months",
    keyBenefit: "Path to EU Passport in 5 Years",
    requirements: [
      "Incorporate a Portuguese LDA company",
      "Solid business structure with local economic impact",
      "Capital proof in a local Portuguese bank account",
      "Clear corporate transparency compliance"
    ],
    region: "Southern Europe"
  },
  {
    country: "Spain",
    visaType: "Spanish Entrepreneur Visa (Ley 14/2013)",
    minInvestment: "No Fixed Min. (Project validation scaled)",
    setupTime: "20–30 Days (Fast-Track)",
    keyBenefit: "3-Year initial permit with family inclusion",
    requirements: [
      "Business plan approved by ENISA (Innovation Dept)",
      "Professional profile proving sector competence",
      "Creation of technological or high-value job options",
      "Sufficient personal derivatives & health safety"
    ],
    region: "Southern Europe"
  },
  {
    country: "Malta",
    visaType: "Malta Startup Residence Programme",
    minInvestment: "€25,000 (Co-founders scaled up)",
    setupTime: "3–4 Months",
    keyBenefit: "100% English-speaking business jurisdiction",
    requirements: [
      "Concrete innovative enterprise setup",
      "Physical presence and co-living status inside Malta",
      "Tangible job generation within 3 years",
      "Approval by Malta Enterprise agency"
    ],
    region: "Southern Europe"
  },
  {
    country: "Ireland",
    visaType: "STEP (Start-up Entrepreneur Programme)",
    minInvestment: "€50,000 (Funding requirements)",
    setupTime: "3–4 Months",
    keyBenefit: "Only English-speaking Eurozone economy",
    requirements: [
      "Innovative business proposition targeting scale",
      "Headquarters physically setup in Ireland",
      "Experienced management tier background documentation",
      "Clear funding source confirmation"
    ],
    region: "Western Europe"
  },
  {
    country: "Estonia",
    visaType: "Estonian Startup Visa & E-Residency",
    minInvestment: "No Min. (Scalable tech focus)",
    setupTime: "1–2 Months",
    keyBenefit: "0% Corporate Tax on reinvested profits",
    requirements: [
      "Technology-driven global business framework",
      "Pre-approval by the Estonian Startup Committee",
      "Adequate operational runway (€150/month minimum)",
      "Digital identity processing framework"
    ],
    region: "Eastern Europe"
  },
];

export default function BusinessVisa() {
  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState(corporateData[0]);

  const filteredData = useMemo(() => {
    return corporateData.filter((item) =>
      item.country.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#071a3d] p-4 md:p-8 font-sans text-white relative overflow-hidden">
      {/* --- Ambient Lighting Layers --- */}
      <div className="pointer-events-none absolute left-1/4 -top-40 h-120 w-120 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* --- Header Architecture --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-2xl shadow-2xl border border-white/15 backdrop-blur-md">
              <Building2 className="text-cyan-400 w-7 h-7" />
            </div>
            <div>
              <div className="mb-1 inline-flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-cyan-300">
                <Sparkles size={10} /> Corporate Expansion 2026
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
                Euro-Corporate Setup & Visas
              </h1>
              <p className="text-blue-200/50 text-[10px] font-black uppercase tracking-[0.2em]">
                Non-EU Executive Entry & Jurisdictional Framework
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200/40 group-focus-within:text-cyan-400 transition-colors w-4 h-4" />
            <input
              type="text"
              placeholder="Search European jurisdictions..."
              className="w-full pl-12 pr-4 py-3 bg-white/6 border border-white/10 rounded-2xl text-white placeholder-blue-200/30 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-400/50 outline-none transition-all font-bold text-xs backdrop-blur-md"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                // Auto-select first search item if available to avoid view mismatch
                const filtered = corporateData.filter(item => item.country.toLowerCase().includes(e.target.value.toLowerCase()));
                if(filtered.length > 0) setActiveCountry(filtered[0]);
              }}
            />
          </div>
        </div>

        {/* --- Master / Detail Split Grid Interface --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Jurisdictional Matrix List (5 Columns) */}
          <div className="lg:col-span-5 space-y-3 max-h-[72vh] overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400 px-2">Select Target Market</p>
            {filteredData.length === 0 ? (
              <p className="text-xs text-blue-200/40 p-4 italic">No matching jurisdictions recorded.</p>
            ) : (
              filteredData.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCountry(item)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${
                    activeCountry.country === item.country
                      ? "bg-linear-to-r from-[#0d2a63] to-[#091e46] border-cyan-400/50 shadow-xl"
                      : "bg-white/3 border-white/5 hover:border-white/10 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3.5 relative z-10">
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      activeCountry.country === item.country 
                        ? "bg-cyan-400 border-cyan-300 text-slate-950" 
                        : "bg-white/5 border-white/5 text-blue-300 group-hover:text-cyan-400"
                    }`}>
                      <Briefcase size={16} />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-white tracking-wide uppercase">{item.country}</h3>
                      <p className="text-[10px] text-blue-200/50 font-bold truncate max-w-50 sm:max-w-70">{item.visaType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 relative z-10 text-right">
                    <div className="hidden sm:block">
                      <p className="text-[8px] font-black uppercase text-cyan-400/70 tracking-wider">Est. Setup</p>
                      <p className="text-xs font-bold text-white">{item.setupTime}</p>
                    </div>
                    <ChevronRight size={16} className={`transition-transform duration-300 ${
                      activeCountry.country === item.country ? "text-cyan-400 translate-x-1" : "text-blue-200/20 group-hover:text-white"
                    }`} />
                  </div>
                </button>
              ))
            )}
          </div>

          {/* RIGHT: Detailed Intelligence Suite Component (7 Columns) */}
          <div className="lg:col-span-7">
            {activeCountry && (
              <div className="bg-white/4 rounded-4xl border border-white/10 shadow-2xl backdrop-blur-md p-6 md:p-8 space-y-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <Layers className="absolute -right-8 -top-8 w-40 h-40 text-white/1 pointer-events-none" />
                
                {/* Panel Header Summary */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-md border border-cyan-400/10">
                      {activeCountry.region}
                    </span>
                    <h2 className="text-2xl font-black uppercase text-white tracking-tight mt-2 flex items-center gap-2">
                      {activeCountry.country} Corporate Blueprint
                    </h2>
                    <p className="text-xs font-bold text-blue-200/70 mt-1">{activeCountry.visaType}</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-left sm:text-right w-full sm:w-auto shrink-0 shadow-inner">
                    <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Min Allocation Cap</p>
                    <p className="text-base font-black text-emerald-300 tracking-tight mt-0.5">{activeCountry.minInvestment}</p>
                  </div>
                </div>

                {/* Core Corporate Intelligence Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#091e46]/40 border border-white/5 p-4 rounded-2xl space-y-1">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <TrendingUp size={14} />
                      <span className="text-[9px] font-black uppercase tracking-wider">Primary Jurisdictional Alpha</span>
                    </div>
                    <p className="text-xs font-bold text-blue-100/90 leading-relaxed">{activeCountry.keyBenefit}</p>
                  </div>

                  <div className="bg-[#091e46]/40 border border-white/5 p-4 rounded-2xl space-y-1">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Globe size={14} />
                      <span className="text-[9px] font-black uppercase tracking-wider">Schengen Area Capability</span>
                    </div>
                    <p className="text-xs font-bold text-blue-100/90 leading-relaxed">Full corporate mobility rights & unstructured 90-day multi-travel integration privileges.</p>
                  </div>
                </div>

                {/* Concrete Mandatory Directives List */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                    <FileText size={14} className="text-cyan-400" /> Mandatory Setup Prerequisites
                  </h4>
                  <div className="space-y-2">
                    {activeCountry.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#091e46]/30 border border-white/5 group hover:border-cyan-400/20 transition-all">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-glow" />
                        <p className="text-xs font-semibold text-blue-100/80 group-hover:text-white transition-colors leading-relaxed">
                          {req}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* External Verification Notice Block */}
                <div className="flex items-start gap-3 p-4 bg-cyan-500/5 rounded-2xl border border-cyan-400/10 text-blue-200/60 text-[9px] leading-relaxed italic">
                  <ShieldCheck size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    Investment directives and statutory minimum configurations denote baseline standards applicable for non-EU corporate citizens in 2026. Official notary evaluation, registry fees, and legal framework components scale dynamically based on individual corporate structures.
                  </span>
                </div>

                {/* CTA Invariant Anchor */}
                {/* <div className="pt-2">
                  <button className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-2xl transition-all shadow-xl shadow-cyan-500/10 flex items-center justify-center gap-2 active:scale-[0.99]">
                    Initiate Incorporation Assessment <ArrowUpRight size={14} />
                  </button>
                </div> */}

              </div>
            )}
          </div>

        </div>

      </div>

      {/* --- Dynamic Premium Custom Scrollbar Injection --- */}
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
}