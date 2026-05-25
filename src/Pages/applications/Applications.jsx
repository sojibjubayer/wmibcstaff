import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Globe2, MapPin, Plane, Search } from "lucide-react";

const fromCountries = [
  { name: "Qatar", slug: "qatar" },
  { name: "Bangladesh", slug: "bangladesh" },
  { name: "India", slug: "india" },
  { name: "UAE", slug: "uae" },
  { name: "Saudi Arabia", slug: "saudi-arabia" },
  { name: "Oman", slug: "oman" },
  { name: "Kuwait", slug: "kuwait" },
  { name: "Bahrain", slug: "bahrain" },
];

const destinationCountries = [
  { name: "Portugal", slug: "portugal" },
  { name: "Germany", slug: "germany" },
  { name: "Greece", slug: "greece" },
  { name: "Bulgaria", slug: "bulgaria" },
  { name: "Canada", slug: "canada" },
  { name: "Australia", slug: "australia" },
  { name: "New Zealand", slug: "new-zealand" },
  { name: "United Kingdom", slug: "united-kingdom" },
  { name: "Turkey", slug: "turkey" },
  { name: "Cyprus", slug: "cyprus" },
];

export default function Applications() {
  const navigate = useNavigate();

  const [fromCountry, setFromCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");

  const selectedFrom = fromCountries.find((item) => item.slug === fromCountry);
  const selectedDestination = destinationCountries.find(
    (item) => item.slug === destinationCountry
  );

  const handleGoToPage = () => {
    if (!fromCountry || !destinationCountry) {
      alert("Please select both From country and Destination country");
      return;
    }

    navigate(`/applications/${fromCountry}/${destinationCountry}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 p-5 text-white shadow-xl shadow-slate-900/10 sm:p-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
              <Globe2 className="h-4 w-4" />
              Application Manager
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
              Select Application Route
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Choose the applicant location and destination country to open the
              correct visa application page.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-end">
            <SelectBox
              label="Select From"
              icon={<MapPin className="h-5 w-5" />}
              value={fromCountry}
              onChange={(e) => setFromCountry(e.target.value)}
              options={fromCountries}
              placeholder="Choose applicant country"
            />

            <div className="hidden pb-4 md:flex md:justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>

            <SelectBox
              label="Destination"
              icon={<Plane className="h-5 w-5" />}
              value={destinationCountry}
              onChange={(e) => setDestinationCountry(e.target.value)}
              options={destinationCountries}
              placeholder="Choose destination country"
            />
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-500">
              Selected Route
            </p>

            <div className="mt-2 flex flex-col gap-2 text-lg font-bold text-slate-950 sm:flex-row sm:items-center">
              <span>{selectedFrom?.name || "From country"}</span>
              <ArrowRight className="hidden h-5 w-5 text-blue-600 sm:block" />
              <span>{selectedDestination?.name || "Destination country"}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoToPage}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-blue-700 sm:w-auto"
          >
            <Search className="h-5 w-5" />
            Go to Application Page
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </main>
  );
}

function SelectBox({ label, icon, value, onChange, options, placeholder }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
        <span className="text-blue-600">{icon}</span>
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      >
        <option value="">{placeholder}</option>

        {options.map((country) => (
          <option key={country.slug} value={country.slug}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}