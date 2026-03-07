import React, { useState, useEffect, useCallback } from 'react';
import { FaUsers, FaFilter, FaTimes, FaFilePdf } from 'react-icons/fa';
import Pagination from '../components/Pagination';
import { downloadVisitorPDF } from '../utils/pdfReports';
import axios from 'axios';

const CONSULTANTS = ["nizam", "sandesh", "saru", "shohag", "adil"];
const API_URL = "https://wmibcstaff-server.vercel.app/api/visitor";

const Visitors = ({ searchQuery }) => {
  const [visitors, setVisitors] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterConsultant, setFilterConsultant] = useState("");
  const [page, setPage] = useState(1);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const itemsPerPage = 12;

  const fetchVisitors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          page,
          limit: itemsPerPage,
          consultant: filterConsultant,
          searchQuery: searchQuery
        }
      });

      // ✅ FIX: Extracting from the object { visitors: [...], total: 51 }
      const fetchedData = response.data.visitors || [];
      const fetchedTotal = response.data.total || 0;

      setVisitors(fetchedData);
      setTotal(fetchedTotal);
    } catch (error) {
      console.error("Error fetching visitors:", error);
      setVisitors([]);
    } finally {
      setLoading(false);
    }
  }, [page, filterConsultant, searchQuery]);

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setPage(1);
  }, [filterConsultant, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Stats & Filter Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-700 p-5 rounded-3xl shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-pink-400/20 p-3 rounded-2xl text-pink-300"><FaUsers size={20} /></div>
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Total Results</p>
              <h4 className="text-xl font-black text-white">{total}</h4>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="relative flex-1">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <select 
              value={filterConsultant}
              onChange={(e) => setFilterConsultant(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-[11px] font-bold uppercase outline-none appearance-none"
            >
              <option value="">Filter By Consultant</option>
              {CONSULTANTS.map(name => <option key={name} value={name}>{name.toUpperCase()}</option>)}
            </select>
          </div>
          <button onClick={() => setFilterConsultant("")} className="px-6 py-3 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-2xl hover:bg-slate-200 transition-colors">Clear</button>
        </div>
      </div>

      {/* Main Table Container */}
      
      <div className="bg-white rounded-4xl shadow-xl border border-white overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30">
          <h3 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em]">Global Visitor Registry</h3>
        </div>
        
        <div className="overflow-x-auto min-h-100">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em] border-b">
                <th className="px-8 py-4">Name</th>
                <th className="px-8 py-4">Consultant</th>
                <th className="px-8 py-4">Interested In</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest animate-pulse">Loading Data...</td>
                </tr>
              ) : visitors.length > 0 ? (
                visitors.map((v) => (
                  <tr key={v._id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-8 py-5 font-bold text-slate-900 text-sm">{v.name}</td>
                    <td className="px-8 py-5">
                      <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                        {v.consultant || "N/A"}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-400 text-xs">{v.interestedCountry}</td>
                    <td className="px-8 py-5 font-bold text-slate-400 text-xs">
                      {new Date(v.date || v.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => setSelectedVisitor(v)} 
                        className="bg-white border border-slate-200 text-slate-900 text-[10px] px-4 py-2 rounded-xl font-black uppercase hover:bg-pink-200 hover:border-pink-200 transition-all shadow-sm"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">No Visitors Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <Pagination 
          currentPage={page} 
          totalItems={total} 
          itemsPerPage={itemsPerPage} 
          onPageChange={setPage} 
        />
      </div>

      {/* Detail Modal */}
      {selectedVisitor && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden scale-in-center">
            <div className="p-5 bg-slate-900 flex justify-between items-center">
              <h3 className="text-white font-black text-sm uppercase tracking-widest">Visitor Profile</h3>
              <button onClick={() => setSelectedVisitor(null)} className="text-slate-400 hover:text-white transition-colors"><FaTimes /></button>
            </div>
            <div className="p-8 bg-white space-y-4 text-sm max-h-[60vh] overflow-y-auto custom-scrollbar">
              {Object.entries(selectedVisitor).map(([k, val]) => (
                !['_id', '__v', 'updatedAt'].includes(k) && (
                  <div key={k} className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">{k.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-slate-900 font-bold">{String(val)}</span>
                  </div>
                )
              ))}
            </div>
            <div className="p-6 bg-slate-50 flex gap-2">
              <button onClick={() => downloadVisitorPDF(selectedVisitor)} className="flex-1 py-4 bg-pink-200 text-slate-900 rounded-2xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-pink-300 transition-all shadow-lg shadow-pink-200/50">
                <FaFilePdf /> Generate PDF Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visitors;