import React, { useEffect, useMemo, useState } from "react";
import { Download, FileText, Loader2, Users } from "lucide-react";
import toast from "react-hot-toast";

const monthOptions = [
  { value: "2026-01", label: "January 2026" },
  { value: "2026-02", label: "February 2026" },
  { value: "2026-03", label: "March 2026" },
  { value: "2026-04", label: "April 2026" },
  { value: "2026-05", label: "May 2026" },
  { value: "2026-06", label: "June 2026" },
  { value: "2026-07", label: "July 2026" },
  { value: "2026-08", label: "August 2026" },
  { value: "2026-09", label: "September 2026" },
  { value: "2026-10", label: "October 2026" },
  { value: "2026-11", label: "November 2026" },
  { value: "2026-12", label: "December 2026" },
];

const employeeDayOff = {
  Adil: "Sat",
  Saiful: "Sat",
  Sumaiya: "Sat",
  Nizam: "Mon",
  Neshat: "Tue",
  Sandesh: "Tue",
  Imtiaz: "Sun",
  Razzak: "Thu",
  Tarikul: "Wed",
};

const SHIFT_START = "12:00";
const SHIFT_END = "21:00";
const FIXED_MONTHLY_MINUTES = 234 * 60;

function getMonthLabel(month) {
  return monthOptions.find((m) => m.value === month)?.label || month;
}

function formatQatarTime(value) {
  if (!value) return "-";

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";

  return d.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Qatar",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function timeToMinutes(time) {
  if (!time || time === "-") return null;

  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;

  return h * 60 + m;
}

function minutesToText(totalMinutes, showPlus = false) {
  if (totalMinutes === null || totalMinutes === undefined) return "-";
  if (totalMinutes === 0) return "0m";

  const sign = totalMinutes < 0 ? "-" : showPlus ? "+" : "";
  const abs = Math.abs(totalMinutes);

  const hrs = Math.floor(abs / 60);
  const mins = abs % 60;

  if (hrs > 0 && mins > 0) return `${sign}${hrs}h ${mins}m`;
  if (hrs > 0) return `${sign}${hrs}h`;
  return `${sign}${mins}m`;
}

function getDayName(dateStr) {
  const d = new Date(`${dateStr}T00:00:00+03:00`);
  if (Number.isNaN(d.getTime())) return "-";

  return d.toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: "Asia/Qatar",
  });
}

function getDayNumber(dateStr) {
  return Number(String(dateStr).split("-")[2]);
}

function getDaysInMonth(selectedMonth) {
  const [year, month] = selectedMonth.split("-").map(Number);
  return new Date(year, month, 0).getDate();
}

function getWorkingMinutes(item) {
  if (!item?.date || !item?.checkIn || !item?.checkOut) return 0;

  const checkInTime = formatQatarTime(item.checkIn);
  const checkOutTime = formatQatarTime(item.checkOut);

  if (checkInTime === "-" || checkOutTime === "-") return 0;

  const checkIn = new Date(`${item.date}T${checkInTime}:00+03:00`);
  let checkOut = new Date(`${item.date}T${checkOutTime}:00+03:00`);

  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
    return 0;
  }

  if (checkOut < checkIn) {
    checkOut = new Date(checkOut.getTime() + 24 * 60 * 60 * 1000);
  }

  return Math.floor((checkOut - checkIn) / (1000 * 60));
}

function isEmployeeDayOff(item) {
  if (!item?.date || !item?.userName) return false;

  const name = item.userName.trim(); // ✅ fix
  const dayName = getDayName(item.date);

  return employeeDayOff[name] === dayName;
}

function isLateOrEarly(item) {
  if (!item?.checkIn || !item?.checkOut) return false;
  if (isEmployeeDayOff(item)) return false;

  const inTime = formatQatarTime(item.checkIn);
  const outTime = formatQatarTime(item.checkOut);

  const inMinutes = timeToMinutes(inTime);
  const outMinutes = timeToMinutes(outTime);
  const shiftStartMinutes = timeToMinutes(SHIFT_START);
  const shiftEndMinutes = timeToMinutes(SHIFT_END);

  if (
    inMinutes === null ||
    outMinutes === null ||
    shiftStartMinutes === null ||
    shiftEndMinutes === null
  ) {
    return false;
  }

  return inMinutes > shiftStartMinutes || outMinutes < shiftEndMinutes;
}

function getExtraMinutes(item) {
  const working = getWorkingMinutes(item);

  if (!item?.checkIn || !item?.checkOut) return 0;

  if (isEmployeeDayOff(item)) {
    return working;
  }

  return working - 9 * 60;
}

export default function AttendanceReport() {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );

  const [records, setRecords] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState("");

  useEffect(() => {
    const fetchMonthData = async () => {
      try {
        setLoading(true);
        setSelectedStaff("");

        const res = await fetch(
          `https://wmibcstaff-server.vercel.app/api/attendance?monthly=true&month=${selectedMonth}`,
        );

        const data = await res.json();
        setRecords(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setRecords([]);
        toast.error("Failed to load attendance data");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthData();
  }, [selectedMonth]);

  const monthName = getMonthLabel(selectedMonth);
  const totalDates = getDaysInMonth(selectedMonth);
  const hasData = records.length > 0;

  const staffList = useMemo(() => {
    const set = new Set();

    records.forEach((item) => {
      if (item.userName) set.add(item.userName);
    });

    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [records]);

  const summaryRows = useMemo(() => {
    const map = {};

    records.forEach((item) => {
      const staffName = item.userName || "Unknown";

      if (!map[staffName]) {
        map[staffName] = {
          staffName,
          totalDays: 0,
          totalWorkingMinutes: 0,
        };
      }

      if (item.checkIn && item.checkOut) {
        map[staffName].totalDays += 1;
      }

      map[staffName].totalWorkingMinutes += getWorkingMinutes(item);
    });

    return Object.values(map).sort((a, b) =>
      a.staffName.localeCompare(b.staffName),
    );
  }, [records]);

  const staffMonthRows = useMemo(() => {
    if (!selectedStaff) return [];

    const recordMap = {};

    records
      .filter((item) => item.userName === selectedStaff)
      .forEach((item) => {
        recordMap[item.date] = item;
      });

    return Array.from({ length: totalDates }, (_, index) => {
      const day = String(index + 1).padStart(2, "0");
      const date = `${selectedMonth}-${day}`;

      return (
        recordMap[date] || {
          date,
          userName: selectedStaff,
          checkIn: null,
          checkOut: null,
          lunchOut: null,
          lunchIn: null,
        }
      );
    });
  }, [records, selectedStaff, selectedMonth, totalDates]);

const generateSummaryPdf = async () => {
  if (!hasData) {
    toast.error("No data found for selected month");
    return;
  }

  try {
    setGenerating("summary");

    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF("portrait", "mm", "a4");

    // Header background - light gray, ink friendly
    doc.setFillColor(230, 230, 230);
    doc.rect(0, 0, 210, 32, "F");

    // Header text - black
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.text("WMIBC Staff Attendance Report", 14, 14);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Attendance Summary", 14, 23);

    // Report details title
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Report Details", 14, 44);

    // Report details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Month Name: ${monthName}`, 14, 53);
    doc.text(`Total Date: ${totalDates}`, 14, 60);
    doc.text(`Total Staff: ${staffList.length}`, 14, 67);

    // Summary table
    autoTable(doc, {
      startY: 78,
      head: [["Staff Name", "Total Days", "Total Working Hours"]],
      body: summaryRows.map((item) => [
        item.staffName,
        item.totalDays,
        minutesToText(item.totalWorkingMinutes),
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 3,
        textColor: [0, 0, 0],
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [230, 230, 230],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      alternateRowStyles: {
        fillColor: [248, 248, 248],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
      },
      margin: {
        left: 14,
        right: 14,
      },
    });

    doc.save(
      `WMIBC-Attendance-Summary-${monthName.replaceAll(" ", "-")}.pdf`,
    );

    toast.success("Attendance summary downloaded");
  } catch (error) {
    console.error(error);
    toast.error("Failed to generate PDF");
  } finally {
    setGenerating("");
  }
};

  const generateStaffPdf = async () => {
    if (!selectedStaff) {
      toast.error("Please select staff");
      return;
    }

    try {
      setGenerating("staff");

      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF("portrait", "mm", "a4");

      const presentRows = staffMonthRows.filter(
        (item) => item.checkIn && item.checkOut,
      );

      const totalWorkingMinutes = staffMonthRows.reduce(
        (sum, item) => sum + getWorkingMinutes(item),
        0,
      );

      const totalExtraMinutes = totalWorkingMinutes - FIXED_MONTHLY_MINUTES;

      doc.setFillColor(220, 220, 220);
      doc.rect(0, 0, 210, 28, "F");

      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.text("WMIBC Staff Attendance Report", 14, 13);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Staff Monthly Attendance Report", 14, 21);

      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Employee Report", 14, 39);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(`Month Name: ${monthName}`, 14, 47);
      doc.text(`Employee Name: ${selectedStaff}`, 14, 54);
      doc.text(`Month Dates: ${totalDates}`, 14, 61);
      doc.text(`Present Dates: ${presentRows.length}`, 75, 61);
      doc.text(
        `Total Working Hour: ${minutesToText(totalWorkingMinutes)}`,
        14,
        68,
      );

      autoTable(doc, {
        startY: 75,
        head: [["Day", "Date", "In", "Out", "Working", "Extra"]],
        body: staffMonthRows.map((item) => [
          getDayNumber(item.date),
          `${getDayNumber(item.date)} ${monthName
            .split(" ")[0]
            .slice(0, 3)} (${getDayName(item.date)})`,
          formatQatarTime(item.checkIn),
          formatQatarTime(item.checkOut),
          minutesToText(getWorkingMinutes(item)),
          minutesToText(getExtraMinutes(item), true),
        ]),
        styles: {
          fontSize: 6,
          cellPadding: 1.1,
          overflow: "linebreak",
          valign: "middle",
          halign: "center",
          minCellHeight: 4.2,
        },
        headStyles: {
          fillColor: [15, 23, 42],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 6.5,
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250],
        },
        columnStyles: {
          0: { cellWidth: 12 },
          1: { cellWidth: 35 },
          2: { cellWidth: 25 },
          3: { cellWidth: 25 },
          4: { cellWidth: 35 },
          5: { cellWidth: 30 },
        },
        margin: { left: 12, right: 12 },
        pageBreak: "avoid",
        didParseCell: function (data) {
          if (data.section !== "body") return;

          const row = staffMonthRows[data.row.index];

          const isDayOff = isEmployeeDayOff(row);
          const isAbsent = !row?.checkIn && !isDayOff;

          if (isDayOff) {
            data.cell.styles.fillColor = [255, 240, 240];
            data.cell.styles.textColor = [120, 0, 0];
          } else if (isAbsent) {
            data.cell.styles.fillColor = [255, 200, 200];
            data.cell.styles.textColor = [120, 0, 0];
          }
        },
      });

      const finalY = doc.lastAutoTable?.finalY || 250;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text(
        `Total Working Hour: ${minutesToText(totalWorkingMinutes)}`,
        14,
        finalY + 7,
      );
      doc.text(
        `Total Extra Hour: ${minutesToText(totalExtraMinutes, true)}`,
        14,
        finalY + 13,
      );

      doc.save(
        `WMIBC-${selectedStaff.replaceAll(" ", "-")}-${monthName.replaceAll(
          " ",
          "-",
        )}.pdf`,
      );

      toast.success("Staff report downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate staff PDF");
    } finally {
      setGenerating("");
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="w-full rounded-[28px] border border-slate-200 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-sky-300">
            Admin Panel
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-white">
            WMIBC Staff Attendance Report
          </h1>

          <p className="mt-2 text-sm text-white/60">
            Select a month, then download attendance summary or staff-wise
            report.
          </p>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
          <label className="text-xs uppercase tracking-[0.18em] text-white/45">
            Select Month
          </label>

          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none md:w-72"
            >
              {monthOptions.map((month) => (
                <option
                  key={month.value}
                  value={month.value}
                  className="bg-slate-900 text-white"
                >
                  {month.label}
                </option>
              ))}
            </select>

            <button
              onClick={generateSummaryPdf}
              disabled={!hasData || loading || generating === "summary"}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              {generating === "summary" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
              Attendance Summary
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-white/45">Month</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {monthName}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-white/45">Total Dates</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {totalDates}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-white/45">Total Staff</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {loading ? "-" : staffList.length}
              </p>
            </div>
          </div>

          {!loading && !hasData && (
            <p className="mt-4 text-sm text-amber-300">
              No attendance data found for this month.
            </p>
          )}

          {loading && (
            <div className="mt-5 flex items-center gap-2 text-sm text-white/60">
              <Loader2 className="h-4 w-4 animate-spin text-sky-300" />
              Loading attendance data...
            </div>
          )}
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-sky-300" />
            <h2 className="text-lg font-semibold text-white">
              Get Attendance by Staff
            </h2>
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              disabled={!hasData || loading}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none disabled:cursor-not-allowed disabled:opacity-40 md:w-72"
            >
              <option value="" className="bg-slate-900 text-white">
                Select Staff
              </option>

              {staffList.map((staff) => (
                <option
                  key={staff}
                  value={staff}
                  className="bg-slate-900 text-white"
                >
                  {staff}
                </option>
              ))}
            </select>

            {selectedStaff && (
              <button
                onClick={generateStaffPdf}
                disabled={generating === "staff"}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                {generating === "staff" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Download Report
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
