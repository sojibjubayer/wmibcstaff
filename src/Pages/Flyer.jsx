import React from "react";

export default function Flyer() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <a
        href="/flyers/wmibc-flyer.pdf"
        download="wmibc-flyer.pdf"
        className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
      >
        Download Flyer
      </a>
    </div>
  );
}