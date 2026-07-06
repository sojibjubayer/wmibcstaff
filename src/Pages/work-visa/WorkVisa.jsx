import React from "react";
import {
  Globe2,
  BriefcaseBusiness,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const WorkVisa = () => {
  const countries = [
    "Australia",
    "New Zealand",
    "Canada",
    "Greece",
    "Poland",
    "qatar-portugal",
    "Bulgaria",
    "Germany",
    "Croatia",
    "Cyprus",
    "Serbia",
    "North Macedonia",
    "Montenegro",
    "Bosnia",
    "Turkey",
    "UK",
    "Albania",
    "Moldova",
    "Slovakia",
  ];

  const countryFlagStyles = {
    Greece: "linear-gradient(to bottom, #0D5EAF 50%, #ffffff 50%)",
    Poland: "linear-gradient(to bottom, #ffffff 50%, #DC143C 50%)",
    "qatar-portugal":
      "radial-gradient(circle at 40% 50%, #FFD700 0 12%, transparent 13%), linear-gradient(to right, #006600 0%, #006600 40%, #FF0000 40%, #FF0000 100%)",
    Bulgaria:
      "linear-gradient(to bottom, #FFFFFF 33%, #00966E 33%, #00966E 66%, #D62612 66%)",
    Cyprus: "linear-gradient(45deg, #FFFFFF 70%, #D57800 70%)",
    Croatia:
      "linear-gradient(to bottom, #FF0000 33%, #FFFFFF 33%, #FFFFFF 66%, #002395 66%)",
    Serbia:
      "linear-gradient(to bottom, #FF0000 33%, #002395 33%, #002395 66%, #FFFFFF 66%)",
    "North Macedonia": "radial-gradient(circle, #FFD700 20%, #D20000 21%)",
    Montenegro: "linear-gradient(#C8102E, #C8102E)",
    Bosnia:
      "linear-gradient(135deg, #002395 65%, #FCD116 65%, #FCD116 75%, #002395 75%)",
    Turkey:
      "linear-gradient(135deg, #E30A17 0%, #E30A17 75%, #FFFFFF 75%, #FFFFFF 100%)",
    UK:
      "linear-gradient(135deg, #012169 0%, #012169 45%, #FFFFFF 45%, #FFFFFF 55%, #C8102E 55%, #C8102E 65%, #FFFFFF 65%, #FFFFFF 75%, #012169 75%, #012169 100%)",
    Australia:
      "linear-gradient(to bottom, #002395 33%, #FFFFFF 33%, #FFFFFF 66%, #FF0000 66%)",
    "New Zealand":
      "linear-gradient(135deg, #002395 80%, #FFFFFF 80%, #FFFFFF 85%, #FF0000 85%)",
    Albania:
      "linear-gradient(to bottom, #FF0000 33%, #000000 33%, #000000 66%, #FF0000 66%)",
    Moldova:
      "linear-gradient(to bottom, #0033A0 33%, #FFD700 33%, #FFD700 66%, #CE1126 66%)",
    Slovakia:
      "linear-gradient(to right, #FFFFFF 33%, #0B4EA2 33%, #0B4EA2 66%, #EE1C25 66%)",
    Canada:
      "linear-gradient(90deg, #d52b1e 0%, #d52b1e 25%, #ffffff 25%, #ffffff 75%, #d52b1e 75%, #d52b1e 100%)",
    Germany:
      "linear-gradient(180deg, #000000 0%, #000000 33.33%, #dd0000 33.33%, #dd0000 66.66%, #ffce00 66.66%, #ffce00 100%)",
  };

  const displayName = (country) => {
    if (country === "qatar-portugal") return "Qatar to Portugal";
    return country;
  };

  const routeName = (country) =>
    country.toLowerCase().replace(/\s+/g, "-");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#071a3d] px-4 py-10 text-white md:px-10 md:py-16">
      {/* Premium blue background */}
      <div className="pointer-events-none absolute left-1/2 -top-45 h-140 w-140 -translate-x-1/2 rounded-full bg-blue-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-30 top-32 h-105 w-105 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-30 h-105 w-105 rounded-full bg-sky-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-2xl shadow-blue-950/50 backdrop-blur">
            <BriefcaseBusiness className="h-8 w-8 text-cyan-300" />
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" />
             Work Visa Programs
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            Work Visa Destinations
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100/75 md:text-base">
            Explore international employment pathways, job categories, salary
            opportunities, and documentation requirements for the 2026 work
            permit season.
          </p>
        </div>

        {/* Country Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {countries.map((country) => (
            <a
              key={country}
              href={`/work-visa/${routeName(country)}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] p-5 shadow-xl shadow-black/20 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/12 hover:shadow-2xl hover:shadow-cyan-950/40"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-5 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-cyan-300/30 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Flag Circle */}
                  <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white/85 shadow-2xl shadow-black/35 transition-transform duration-300 group-hover:scale-105 md:h-28 md:w-28">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          countryFlagStyles[country] ||
                          "linear-gradient(#cbd5e1, #cbd5e1)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    {/* Soft premium shine */}
                    <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/25 via-transparent to-black/10" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-950/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-6 w-6 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="flex min-h-10 items-center justify-center text-sm font-black uppercase tracking-wide text-white">
                  {displayName(country)}
                </h3>

                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-blue-300/15 bg-blue-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-100/80">
                  <Globe2 className="h-3 w-3 text-cyan-300" />
                  Work Route
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.07] p-6 text-center shadow-xl shadow-black/20 backdrop-blur md:p-8">
          <p className="mx-auto max-w-3xl text-sm leading-7 text-blue-100/75">
            Select a destination to view available job sectors, estimated salary
            ranges, processing requirements, and documentation details for the{" "}
            <span className="font-bold text-cyan-200">
              2026 Work Permit Season
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkVisa;