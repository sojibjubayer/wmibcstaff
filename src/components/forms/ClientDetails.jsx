import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaGlobe,
  FaMoneyBillWave,
  FaArrowLeft,
  FaEdit,
  FaFileDownload,
  FaHandshake,
  FaFileAlt,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

import logoImg from "../../assets/company-logo.jpg";

import {
  formatDate,
  formatDateTime,
  generateClientReportPDF,
} from "../../utils/clientPdfUtils";

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [newRemark, setNewRemark] = useState("");
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = storedUser?.role?.toLowerCase();

  const isAuthorized = userRole === "admin" || userRole === "accountant";

  useEffect(() => {
    setLoading(true);

    fetch(`https://wmibcstaff-server.vercel.app/api/clients/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Client not found");
        return res.json();
      })
      .then((data) => {
        setClient(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load client details");
        setLoading(false);
      });
  }, [id]);

  const downloadPDF = () => {
    generateClientReportPDF({
      client,
      logoImg,
    });
  };

  const handleAddRemark = async () => {
    if (!newRemark.trim()) {
      toast.error("Please enter a remark");
      return;
    }

    try {
      const response = await fetch(
        `https://wmibcstaff-server.vercel.app/api/clients/${id}/remarks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newRemark,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add remark");
      }

      const updatedClient = await response.json();

      setClient(updatedClient);
      setNewRemark("");
      toast.success("Remark added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add remark");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-950">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-2 border-sky-400/20 border-b-sky-300" />

        <p className="animate-pulse text-xs font-black uppercase tracking-widest text-blue-100/60">
          Loading Database...
        </p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-8">
        <p className="rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 text-sm font-black text-blue-100/60">
          Client details not found.
        </p>
      </div>
    );
  }

  const currency = client.currency || "Riyal";
  const lastUpdate = client.updatedBy?.[client.updatedBy.length - 1];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 p-4 md:p-8">
      <Toaster />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.34),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.22),transparent_34%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[44px_44px] opacity-20" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-100/60 transition-all hover:text-sky-300"
          >
            <FaArrowLeft />
            Back
          </button>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-black text-blue-50 shadow-lg shadow-blue-950/25 transition-all hover:border-sky-300/30 hover:bg-sky-400/10 active:scale-95"
            >
              <FaFileDownload className="text-sky-300" />
              PDF REPORT
            </button>

            {isAuthorized && (
              <Link
                to={`/edit-client/${id}`}
                className="flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 px-5 py-2 text-xs font-black text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-400/45 active:scale-95"
              >
                <FaEdit />
                EDIT
              </Link>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/[0.07] shadow-2xl shadow-blue-950/60 backdrop-blur-2xl md:rounded-[2.5rem]">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 bg-linear-to-r from-blue-950 via-blue-900 to-sky-900 p-5 text-white sm:flex-row">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight">
                {client.clientName || "—"}
              </h1>

              <p className="text-[10px] font-black uppercase tracking-widest text-blue-100/60">
                Consultant: {client.consultant || "—"}
              </p>
            </div>

            {lastUpdate && (
              <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-blue-100/60">
                Last Updated By: {lastUpdate.name || "—"}
                <br />
                at {formatDateTime(lastUpdate.date)}
              </p>
            )}
          </div>

          <div className="p-5 sm:p-6 md:p-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 border-b border-white/10 pb-2 text-[10px] font-black uppercase tracking-widest text-sky-300">
                  <FaUser />
                  Identity
                </h3>

                <InfoBox label="Full Name" value={client.clientName} />
                <InfoBox label="Contact No" value={client.contactNo} />
                <InfoBox label="Passport" value={client.passport} />

                {client.newPassport && (
                  <InfoBox label="New Passport" value={client.newPassport} />
                )}

                <InfoBox label="Nationality" value={client.nationality} />
                <InfoBox label="ID Number" value={client.ID} />
              </div>

              <div className="space-y-4">
                <h3 className="flex items-center gap-2 border-b border-white/10 pb-2 text-[10px] font-black uppercase tracking-widest text-sky-300">
                  <FaGlobe />
                  Journey
                </h3>

                <InfoBox label="Current Country" value={client.currentCountry} />
                <InfoBox label="Destination" value={client.destinationCountry} />

                {client.changedDestination && (
                  <InfoBox
                    label="Changed Destination" 
                    value={client.changedDestination}
                  />
                )}

                <InfoBox label="Visa Type" value={client.visaType} />
                <InfoBox label="Trade / Job" value={client.trade} />

                <InfoBox
                  label="Submission Date"
                  value={formatDate(client.fileSubmissionDate)}
                />
              </div>

              <div className="space-y-4 rounded-3xl border border-sky-300/15 bg-slate-950/35 p-5 shadow-inner shadow-blue-950/20">
                <h3 className="flex items-center gap-2 border-b border-white/10 pb-2 text-[10px] font-black uppercase tracking-widest text-sky-300">
                  <FaMoneyBillWave />
                  Accounts
                </h3>

                <InfoBox
                  label="Total Service Charge"
                  value={`${client.totalServiceCharge || 0} ${currency}`}
                />

                <InfoBox label="Payment Terms" value={client.paymentTerms} />

                <div className="mt-4 space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-sky-500">
                    Payment Received
                  </p>

                  {client.amountReceived?.length ? (
                    client.amountReceived.map((pay, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-xl border border-sky-300/15 bg-slate-950/45 p-3 shadow-sm"
                      >
                        <div>
                          <p className="text-[8px] font-bold uppercase text-blue-100/45">
                            {pay.paymentType || "Payment"}
                          </p>

                          <span className="text-[9px] text-blue-100/55">
                            {pay.paymentMethod || "Cash"} •{" "}
                            {formatDate(pay.paymentDate)}
                          </span>
                        </div>

                        <span className="text-xs font-black text-sky-300">
                          {pay.amount || 0} {currency}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-xl border border-dashed border-white/10 bg-slate-950/35 p-3 text-xs italic text-blue-100/50">
                      No payments recorded.
                    </p>
                  )}
                </div>

                <div className="mt-2 border-t border-white/10 pt-4">
                  <InfoBox
                    label="Pending Balance"
                    value={`${client.pendingBalance || 0} ${currency}`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
              <InfoBox label="Agreement Status" value={client.agreementPaper} />
              <InfoBox label="Handover Status" value={client.handover} />
              <InfoBox label="Refund Policy" value={client.refundTerms} />

              <InfoBox
                label="Application Status"
                value={client.applicationStatus || "Pending"}
              />

              <div className="mt-8 border-t border-white/10 pt-6 md:col-span-4">
                <h3 className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white">
                  <FaFileAlt className="text-sky-300" />
                  Office Remarks History
                </h3>

                <div className="mb-6 max-h-100 space-y-3 overflow-y-auto pr-2">
                  {client.remarksHistory?.length ? (
                    [...client.remarksHistory].reverse().map((remark, index) => (
                      <div
                        key={index}
                        className="group relative rounded-2xl border border-white/10 bg-slate-950/35 p-4 transition-all hover:border-sky-300/30"
                      > 
                        <span className="absolute right-4 top-4 text-[8px] font-bold italic text-blue-100/45">
                          {formatDateTime(remark.date)}
                        </span>

                        <p className="pr-24 text-sm font-medium leading-relaxed text-blue-50">
                          {remark.text}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-xl border border-dashed border-white/10 bg-slate-950/35 p-4 text-xs italic text-blue-100/50">
                      No history recorded yet.
                    </p>
                  )}
                </div>

                <div className="rounded-3xl border-2 border-dashed border-white/10 bg-slate-950/35 p-2 transition-all focus-within:border-sky-300/70">
                  <textarea
                    value={newRemark}
                    onChange={(e) => setNewRemark(e.target.value)}
                    placeholder="Type a new update..."
                    className="min-h-20 w-full bg-transparent p-4 text-sm text-white outline-none placeholder:text-blue-100/35"
                  />

                  <div className="flex justify-end p-2">
                    <button
                      onClick={handleAddRemark}
                      className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-400/45 active:scale-95"
                    >
                      <FaHandshake />
                      Add New Remark
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoBox = ({ label, value }) => (
  <div className="border-b border-white/10 p-2">
    <p className="text-[9px] font-black uppercase tracking-widest text-blue-100/45">
      {label}
    </p>

    <p className="text-sm font-black leading-relaxed text-blue-50">
      {value || "—"}
    </p>
  </div>
);