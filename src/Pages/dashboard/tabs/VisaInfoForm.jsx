import React, { useState } from "react";
import axios from "axios";
import {
  Briefcase, Clock, Wallet, Globe, MapPin, Send, Plus, X, 
  Calendar, Calculator, LayoutPanelLeft, ShieldCheck, ChevronDown
} from "lucide-react";

const COUNTRIES = ["Greece", "Portugal", "Poland", "Bulgaria", "Croatia", "Other"];

const VisaTemplateEditor = () => {
  const [newJob, setNewJob] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Removed the "0" strings so inputs start clean and clickable
  const [formData, setFormData] = useState({
    countrySelection: "Greece",
    manualCountry: "",
    salaryPackage: "800 – 1200 €",
    processingTime: "6-8 Months",
    workHours: "8 Hrs + OT",
    workDays: "6 Days",
    availableJobs: ["General Labor"],
    qatar1st: "", qatar2nd: "", qatar3rd: "", qatarFinal: "",
    bd1st: "", bd2nd: "", bd3rd: "", bdFinal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Numeric check: If it's a payment field, only allow numbers
    if (name.startsWith('qatar') || name.startsWith('bd')) {
      const onlyNums = value.replace(/[^0-9]/g, "");
      setFormData(prev => ({ ...prev, [name]: onlyNums }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddJob = (e) => {
    if (e) e.preventDefault();
    if (newJob.trim() !== "") {
      setFormData(prev => ({
        ...prev,
        availableJobs: [...prev.availableJobs, newJob.trim()],
      }));
      setNewJob("");
    }
  };

  const calculateTotal = (prefix) => {
    const sum =
      Number(formData[`${prefix}1st`] || 0) +
      Number(formData[`${prefix}2nd`] || 0) +
      Number(formData[`${prefix}3rd`] || 0) +
      Number(formData[`${prefix}Final`] || 0);
    return sum.toLocaleString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("/api/visa-templates", formData);
      alert("Template Saved!");
    } catch (error) {
      alert("Failed to save.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-6 text-slate-700 font-sans">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-3 rounded-2xl shadow-lg">
              <LayoutPanelLeft className="text-pink-400" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Template Configurator</h1>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">WMIBC GLOBAL</p>
            </div>
          </div>
          <div className="px-6 py-2 bg-pink-50 rounded-full border border-pink-100 flex items-center gap-2">
            <ShieldCheck size={14} className="text-pink-500" />
            <span className="text-[10px] font-black text-pink-600 uppercase">Secure Admin</span>
          </div>
        </div>

        {/* COUNTRY */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 flex flex-col items-center gap-6 relative shadow-2xl">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-400">Target Destination</span>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl justify-center z-10">
            <select
              name="countrySelection"
              value={formData.countrySelection}
              onChange={handleChange}
              className="w-full sm:w-1/2 bg-slate-800 border border-slate-700 text-white rounded-2xl px-6 py-4 font-bold outline-none appearance-none"
            >
              {COUNTRIES.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
            {formData.countrySelection === "Other" && (
              <input
                type="text" name="manualCountry" placeholder="Country..."
                className="w-full sm:w-1/2 px-6 py-4 bg-slate-800 border border-slate-700 text-pink-400 rounded-2xl font-black uppercase outline-none"
                value={formData.manualCountry} onChange={handleChange}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* JOBS */}
          <section className="lg:col-span-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-10">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-8">
              <Briefcase size={18} className="text-pink-500" /> Job Openings
            </h2>
            <div className="flex gap-3 mb-10 bg-slate-50 p-2 rounded-3xl border border-slate-100">
              <input
                type="text" placeholder="Add position..."
                className="flex-1 px-6 py-4 bg-transparent outline-none font-bold text-slate-700"
                value={newJob} onChange={(e) => setNewJob(e.target.value)}
              />
              <button type="button" onClick={handleAddJob} className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-black transition-all shadow-lg"><Plus size={24} /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.availableJobs.map((job, index) => (
                <div key={index} className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-white hover:border-pink-200 transition-all">
                  <span className="font-bold text-slate-800 uppercase text-[11px] tracking-wide">{job}</span>
                  <button type="button" onClick={() => setFormData(p => ({...p, availableJobs: p.availableJobs.filter((_, i) => i !== index)}))} className="text-slate-300 hover:text-rose-500"><X size={16} /></button>
                </div>
              ))}
            </div>
          </section>

          {/* TERMS */}
          <aside className="lg:col-span-4 space-y-6">
            <section className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Salary Range</label>
                  <input name="salaryPackage" value={formData.salaryPackage} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none font-bold text-slate-800" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input name="workHours" value={formData.workHours} onChange={handleChange} className="bg-slate-50 border rounded-2xl p-4 font-bold text-xs outline-none" placeholder="Hours" />
                  <input name="workDays" value={formData.workDays} onChange={handleChange} className="bg-slate-50 border rounded-2xl p-4 font-bold text-xs outline-none" placeholder="Days" />
                </div>
                <input name="processingTime" value={formData.processingTime} onChange={handleChange} className="text-center w-full bg-slate-900 text-pink-400 rounded-2xl p-4 font-black text-sm outline-none" />
              </div>
            </section>
          </aside>
        </div>

        {/* FINANCIALS - THE FIXED INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Qatar */}
          <section className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
            <h2 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-10 flex items-center gap-3">
              <Globe size={20} className="text-blue-500" /> Qatar Branch (QAR)
            </h2>
            <div className="space-y-4">
              {["1st", "2nd", "3rd", "Final"].map(step => (
                <div key={step} className="flex items-center justify-between border-b border-slate-50 py-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase">{step} Payment</label>
                  <input 
                    type="text" name={`qatar${step}`} value={formData[`qatar${step}`]} 
                    onChange={handleChange} placeholder="0"
                    className="text-right font-black text-slate-900 outline-none bg-slate-50 px-4 py-2 rounded-xl w-32 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-blue-200"
                  />
                </div>
              ))}
              <div className="mt-10 p-6 bg-slate-900 rounded-4xl text-white flex justify-between items-center">
                <div>
                    <span className="text-[9px] font-black text-slate-500 uppercase">Total QAR</span>
                    <div className="text-2xl font-black text-blue-400">{calculateTotal('qatar')}</div>
                </div>
                <Calculator size={20} className="text-slate-700" />
              </div>
            </div>
          </section>

          {/* Bangladesh */}
          <section className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
            <h2 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-10 flex items-center gap-3">
              <MapPin size={20} className="text-emerald-500" /> Bangladesh Branch (BDT)
            </h2>
            <div className="space-y-4">
              {["1st", "2nd", "3rd", "Final"].map(step => (
                <div key={step} className="flex items-center justify-between border-b border-slate-50 py-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase">{step} Payment</label>
                  <input 
                    type="text" name={`bd${step}`} value={formData[`bd${step}`]} 
                    onChange={handleChange} placeholder="0"
                    className="text-right font-black text-slate-900 outline-none bg-slate-50 px-4 py-2 rounded-xl w-32 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all border border-transparent focus:border-emerald-200"
                  />
                </div>
              ))}
              <div className="mt-10 p-6 bg-slate-900 rounded-4xl text-white flex justify-between items-center">
                <div>
                    <span className="text-[9px] font-black text-slate-500 uppercase">Total BDT</span>
                    <div className="text-2xl font-black text-emerald-400">{calculateTotal('bd')}</div>
                </div>
                <Calculator size={20} className="text-slate-700" />
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-center pb-12">
          <button type="submit" className="px-16 py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-black transition-all active:scale-95 shadow-2xl">
            <Send size={18} className="text-pink-500" /> Publish Template
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisaTemplateEditor;