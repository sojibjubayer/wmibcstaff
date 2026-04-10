import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaUserPlus, FaEdit, FaTimes, FaPassport, FaEnvelope, FaShieldAlt, FaTrash } from 'react-icons/fa';

const API_URL = "https://wmibcstaff-server.vercel.app/api/auth/consultants";

const Consultants = ({ searchQuery }) => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // New: Prevent double clicks
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'consultant'
  });

  const fetchConsultants = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setConsultants(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load consultants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchConsultants(); }, []);

  const filteredConsultants = consultants.filter(user => 
    user.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    user.email?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    user.role?.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

  const handleDelete = async (id) => {
    const target = consultants.find(c => c._id === id);
    if (target?.role === 'admin') {
      toast.error("System Policy: Admins cannot be deleted.");
      setDeleteId(null);
      return;
    }

    const deleteOp = axios.delete(`${API_URL}/${id}`);
    toast.promise(deleteOp, {
      loading: 'Processing deletion...',
      success: 'Record removed! 🗑️',
      error: (err) => err.response?.data?.message || 'Delete failed',
    });

    try {
      await deleteOp;
      setDeleteId(null);
      fetchConsultants();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Guard against multiple submissions

    setIsSubmitting(true);

    const saveOperation = async () => {
      if (editingUser) {
        const res = await axios.put(`${API_URL}/${editingUser._id}`, formData);
        return "Profile updated! ✨";
      } else {
        const res = await axios.post(`${API_URL}/register`, formData);
        return "New staff registered! 🚀";
      }
    };

    toast.promise(saveOperation(), {
      loading: 'Saving changes...',
      success: (msg) => {
        // Clean up state ONLY after success
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({ name: '', email: '', password: '', role: 'consultant' });
        fetchConsultants();
        setIsSubmitting(false);
        return msg;
      },
      error: (err) => {
        setIsSubmitting(false);
        return err.response?.data?.message || "Operation failed";
      },
    });
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, password: '', role: user.role });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 font-sans">
      <Toaster position="top-right" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-2">
        <div>
          <h2 className="text-lg font-black text-pink-500 tracking-tight uppercase italic">
            Manage <span className="text-pink-500">Staff</span>
          </h2>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">
            WMIBC Access Control Hub
          </p>
        </div>

        <button 
          onClick={() => { setEditingUser(null); setFormData({name:'', email:'', password:'', role:'consultant'}); setIsModalOpen(true); }}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-pink-600 hover:-translate-y-1 transition-all active:scale-95 shadow-xl shadow-slate-200"
        >
          <FaUserPlus size={14} /> Add New Consultant
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-white overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-slate-400 text-[9px] uppercase font-black tracking-widest">
              <th className="px-8 py-6">Member Details</th>
              <th className="px-8 py-6">Role</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {loading ? (
              <tr><td colSpan="3" className="p-20 text-center animate-pulse text-slate-300 font-black uppercase text-[10px]">Syncing Records...</td></tr>
            ) : filteredConsultants.length === 0 ? (
              <tr><td colSpan="3" className="p-20 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">No matching results</td></tr>
            ) : (
              filteredConsultants.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 capitalize text-base">{user.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold tracking-tight">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className={`w-24 inline-flex items-center justify-center py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
                      user.role === 'admin' ? 'bg-pink-500 text-white' : 
                      user.role === 'accountant' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.role}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right space-x-2">
                    {deleteId === user._id ? (
                      <div className="flex items-center justify-end gap-2 animate-in slide-in-from-right-2">
                        <span className="text-[10px] font-black text-pink-600 uppercase italic">Confirm?</span>
                        <button onClick={() => handleDelete(user._id)} className="bg-pink-600 text-white p-2.5 rounded-xl hover:bg-pink-700 shadow-lg shadow-pink-100"><FaTrash size={12}/></button>
                        <button onClick={() => setDeleteId(null)} className="bg-slate-200 text-slate-600 p-2.5 rounded-xl hover:bg-slate-300 transition-colors"><FaTimes size={12}/></button>
                      </div>
                    ) : (
                      <>
                        <button onClick={() => openEdit(user)} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"><FaEdit size={14} /></button>
                        <button onClick={() => setDeleteId(user._id)} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-pink-100 hover:text-pink-600 transition-all shadow-sm"><FaTrash size={14} /></button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-white flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in duration-150">
            <div className="p-8 bg-slate-900 text-white flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest italic">{editingUser ? "Modify Access" : "Grant Access"}</h3>
                <p className="text-[9px] text-slate-400 uppercase font-bold mt-1">Encrypted Security Module</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-500 transition-colors"><FaTimes /></button>
            </div>

            <div className="p-8 overflow-y-auto bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-2 flex items-center gap-2"><FaPassport size={8}/> Full Legal Name</label>
                  <input type="text" required value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:border-pink-200 focus:bg-white transition-all outline-none" placeholder="e.g., John Doe" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-2 flex items-center gap-2"><FaEnvelope size={8}/> Business Email</label>
                  <input type="email" required value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:border-pink-200 focus:bg-white transition-all outline-none" placeholder="staff@wmibc.com" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-2 flex items-center gap-2"><FaShieldAlt size={8}/> Password {editingUser && <span className="text-pink-500 lowercase font-medium ml-1">(Optional)</span>}</label>
                  <input type="password" required={!editingUser} value={formData.password} onChange={(e)=>setFormData({...formData, password:e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:border-pink-200 focus:bg-white transition-all outline-none" placeholder="••••••••" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Assigned Role</label>
                  <select value={formData.role} onChange={(e)=>setFormData({...formData, role:e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:border-pink-200 focus:bg-white transition-all outline-none appearance-none cursor-pointer">
                    <option value="consultant">Consultant</option>
                    <option value="accountant">Accountant</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-5 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-pink-500 shadow-slate-200'}`}
                >
                  {isSubmitting ? "Processing..." : editingUser ? "Update Staff Profile" : "Finalize Registration"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultants;