"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  ArrowDown,
  ArrowUp,
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Printer,
  Search,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const reports = {
  SUP: [
    {
      id: "RPT-SUP-001",
      nim: "10122001",
      name: "Nadia Putri Azzahra",
      title: "Representasi Identitas dalam Novel Kontemporer",
      date: "2026-05-20",
      displayDate: "20 Mei 2026",
      status: "Lulus",
      averageScore: 84.5,
      semester: "Genap 2025/2026",
    },
    {
      id: "RPT-SUP-002",
      nim: "10122018",
      name: "Rafi Maulana",
      title: "Code Switching dalam Interaksi Mahasiswa Sastra Inggris",
      date: "2026-05-21",
      displayDate: "21 Mei 2026",
      status: "Lulus",
      averageScore: 81.2,
      semester: "Genap 2025/2026",
    },
    {
      id: "RPT-SUP-003",
      nim: "10122024",
      name: "Salsa Nuraini",
      title: "Analisis Karakter Utama dalam Film Adaptasi Novel",
      date: "2026-05-22",
      displayDate: "22 Mei 2026",
      status: "Tidak Lulus",
      averageScore: 61.8,
      semester: "Genap 2025/2026",
    },
    {
      id: "RPT-SUP-004",
      nim: "10122029",
      name: "Aulia Rahman",
      title: "Narrative Structure dalam Short Story Modern",
      date: "2026-05-24",
      displayDate: "24 Mei 2026",
      status: "Lulus",
      averageScore: 86.1,
      semester: "Genap 2025/2026",
    },
    {
      id: "RPT-SUP-005",
      nim: "10122035",
      name: "Dinda Maharani",
      title: "Analisis Pragmatik pada Dialog Film Remaja",
      date: "2026-05-25",
      displayDate: "25 Mei 2026",
      status: "Lulus",
      averageScore: 79.4,
      semester: "Genap 2025/2026",
    },
    {
      id: "RPT-SUP-006",
      nim: "10122041",
      name: "Arkan Saputra",
      title: "Representasi Budaya Pop dalam Novel Digital",
      date: "2026-05-26",
      displayDate: "26 Mei 2026",
      status: "Tidak Lulus",
      averageScore: 58.9,
      semester: "Genap 2025/2026",
    },
    {
      id: "RPT-SUP-007",
      nim: "10122044",
      name: "Maya Salsabila",
      title: "Politeness Strategy dalam Percakapan Akademik",
      date: "2026-05-27",
      displayDate: "27 Mei 2026",
      status: "Lulus",
      averageScore: 88.3,
      semester: "Genap 2025/2026",
    },
  ],
  Skripsi: [
    {
      id: "RPT-SKR-001",
      nim: "10121041",
      name: "Maya Anggraini",
      title: "Language Anxiety pada Presentasi Akademik Mahasiswa",
      date: "2026-05-23",
      displayDate: "23 Mei 2026",
      status: "Lulus",
      averageScore: 82.7,
      semester: "Genap 2025/2026",
    },
    {
      id: "RPT-SKR-002",
      nim: "10121035",
      name: "Fajar Pratama",
      title: "Translation Shift pada Subtitle Film Dokumenter",
      date: "2026-05-24",
      displayDate: "24 Mei 2026",
      status: "Lulus",
      averageScore: 85.8,
      semester: "Genap 2025/2026",
    },
    {
      id: "RPT-SKR-003",
      nim: "10121052",
      name: "Kevin Aditya",
      title: "Sociolinguistic Variation dalam Komunitas Urban",
      date: "2026-05-26",
      displayDate: "26 Mei 2026",
      status: "Tidak Lulus",
      averageScore: 59.5,
      semester: "Genap 2025/2026",
    },
    {
      id: "RPT-SKR-004",
      nim: "10121064",
      name: "Putri Amalia",
      title: "Gender Representation dalam Novel Young Adult",
      date: "2026-05-28",
      displayDate: "28 Mei 2026",
      status: "Lulus",
      averageScore: 87.2,
      semester: "Genap 2025/2026",
    },
    {
      id: "RPT-SKR-005",
      nim: "10121078",
      name: "Yusuf Ramadhan",
      title: "Error Analysis pada Academic Writing Mahasiswa",
      date: "2026-05-30",
      displayDate: "30 Mei 2026",
      status: "Lulus",
      averageScore: 80.6,
      semester: "Genap 2025/2026",
    },
  ],
};

const reportOptions = ["SUP", "Skripsi"];
const periodOptions = ["Semester", "Rentang Tanggal"];
const semesterOptions = ["Genap 2025/2026", "Ganjil 2025/2026"];
const exportOptions = ["Export CSV", "Export XLSX", "Export PDF", "Cetak Ringkasan"];
const ITEMS_PER_PAGE = 10;

const chartColors = {
  Lulus: "#2563EB",
  "Tidak Lulus": "#EF4444",
};

const inputBaseClass =
  "h-12 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100";

function getInputValueClass(value) {
  return value ? "font-semibold text-slate-800" : "font-medium text-slate-400";
}

function getStatusClass(status) {
  if (status === "Lulus") {
    return "bg-emerald-50 text-emerald-600 ring-emerald-100";
  }

  return "bg-red-50 text-red-600 ring-red-100";
}

function getReportLabels(type) {
  if (type === "Skripsi") {
    return {
      heading: "Laporan Skripsi",
      titleColumn: "Judul Skripsi",
      dateColumn: "Tanggal Sidang",
    };
  }

  return {
    heading: "Laporan SUP",
    titleColumn: "Judul Proposal",
    dateColumn: "Tanggal SUP",
  };
}

function getActivePeriodText(periodMode, semester, startDate, endDate) {
  if (periodMode === "Semester") {
    return `Semester ${semester}`;
  }

  return `${startDate} sampai ${endDate}`;
}

function formatScore(score) {
  return score.toLocaleString("id-ID", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export default function StaffReportPage() {
  const [filterReport, setFilterReport] = useState("");
  const [filterPeriodMode, setFilterPeriodMode] = useState("");
  const [filterSemester, setFilterSemester] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const [activeReport, setActiveReport] = useState("");
  const [periodMode, setPeriodMode] = useState("");
  const [semester, setSemester] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [archiveSuccess, setArchiveSuccess] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

  const labels = getReportLabels(activeReport || "SUP");

  const canGenerate =
    Boolean(filterReport) &&
    Boolean(filterPeriodMode) &&
    (filterPeriodMode === "Semester"
      ? Boolean(filterSemester)
      : Boolean(filterStartDate) && Boolean(filterEndDate));

  const filteredReports = useMemo(() => {
    if (!hasGenerated || !activeReport) return [];

    const data = reports[activeReport] || [];

    return data
      .filter((item) => {
        const searchValue = search.toLowerCase();
        const matchesSearch =
          item.nim.toLowerCase().includes(searchValue) ||
          item.name.toLowerCase().includes(searchValue) ||
          item.title.toLowerCase().includes(searchValue);

        const matchesPeriod =
          periodMode === "Semester"
            ? item.semester === semester
            : (!startDate || item.date >= startDate) &&
              (!endDate || item.date <= endDate);

        return matchesSearch && matchesPeriod;
      })
      .sort((first, second) => {
        const firstValue = first[sortConfig.key];
        const secondValue = second[sortConfig.key];

        if (typeof firstValue === "number" && typeof secondValue === "number") {
          return sortConfig.direction === "asc"
            ? firstValue - secondValue
            : secondValue - firstValue;
        }

        return sortConfig.direction === "asc"
          ? String(firstValue).localeCompare(String(secondValue))
          : String(secondValue).localeCompare(String(firstValue));
      });
  }, [
    hasGenerated,
    activeReport,
    periodMode,
    semester,
    startDate,
    endDate,
    search,
    sortConfig,
  ]);

  const totalParticipants = filteredReports.length;
  const passedCount = filteredReports.filter((item) => item.status === "Lulus").length;
  const failedCount = filteredReports.filter((item) => item.status === "Tidak Lulus").length;
  const averageScore = totalParticipants
    ? filteredReports.reduce((total, item) => total + item.averageScore, 0) /
      totalParticipants
    : 0;

  const chartData = [
    { name: "Lulus", value: passedCount },
    { name: "Tidak Lulus", value: failedCount },
  ];

  const barData = chartData.map((item) => ({
    status: item.name,
    jumlah: item.value,
  }));

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / ITEMS_PER_PAGE));
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const startItem =
    filteredReports.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredReports.length);

  const applyFilters = () => {
    if (!canGenerate || isGenerating) return;

    setIsGenerating(true);
    setHasGenerated(false);
    setArchiveSuccess(false);
    setShowExportMenu(false);
    setSearch("");
    setCurrentPage(1);
    setSortConfig({ key: "date", direction: "desc" });

    window.setTimeout(() => {
      setActiveReport(filterReport);
      setPeriodMode(filterPeriodMode);
      setSemester(filterSemester);
      setStartDate(filterStartDate);
      setEndDate(filterEndDate);
      setIsGenerating(false);
      setHasGenerated(true);
    }, 700);
  };

  const resetFilters = () => {
    setFilterReport("");
    setFilterPeriodMode("");
    setFilterSemester("");
    setFilterStartDate("");
    setFilterEndDate("");

    setActiveReport("");
    setPeriodMode("");
    setSemester("");
    setStartDate("");
    setEndDate("");

    setSearch("");
    setCurrentPage(1);
    setShowExportMenu(false);
    setIsGenerating(false);
    setHasGenerated(false);
    setIsArchiving(false);
    setArchiveSuccess(false);
    setSortConfig({ key: "date", direction: "desc" });
  };

  const handlePeriodModeChange = (value) => {
    setFilterPeriodMode(value);
    setFilterSemester("");
    setFilterStartDate("");
    setFilterEndDate("");
  };

  const handleArchiveReport = () => {
    if (!hasGenerated || filteredReports.length === 0 || isArchiving) return;

    setIsArchiving(true);
    setArchiveSuccess(false);

    window.setTimeout(() => {
      setIsArchiving(false);
      setArchiveSuccess(true);
    }, 700);
  };

  const handleSort = (key) => {
    setSortConfig((current) => {
      if (current.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }

      return { key, direction: "asc" };
    });
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 pb-6">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Laporan
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
          Rekap Hasil Akademik.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          Rekapitulasi hasil SUP dan Sidang Skripsi berdasarkan semester atau
          rentang tanggal tertentu untuk kebutuhan validasi, cetak, dan export.
        </p>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Filter Laporan
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Pilih jenis laporan dan periode terlebih dahulu. Data akan tampil setelah
            laporan digenerate.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <div
            className={`grid gap-5 ${
              filterPeriodMode === "Rentang Tanggal"
                ? "xl:grid-cols-4 md:grid-cols-2"
                : "xl:grid-cols-3 md:grid-cols-2"
            }`}
          >
            <FormField label="Jenis Laporan">
              <select
                value={filterReport}
                onChange={(event) => setFilterReport(event.target.value)}
                className={`${inputBaseClass} ${getInputValueClass(filterReport)}`}
              >
                <option value="">Pilih jenis laporan</option>
                {reportOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Filter Periode">
              <select
                value={filterPeriodMode}
                onChange={(event) => handlePeriodModeChange(event.target.value)}
                className={`${inputBaseClass} ${getInputValueClass(filterPeriodMode)}`}
              >
                <option value="">Pilih filter periode</option>
                {periodOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </FormField>

            {filterPeriodMode === "Semester" && (
              <FormField label="Semester">
                <select
                  value={filterSemester}
                  onChange={(event) => setFilterSemester(event.target.value)}
                  className={`${inputBaseClass} ${getInputValueClass(filterSemester)}`}
                >
                  <option value="">Pilih semester</option>
                  {semesterOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </FormField>
            )}

            {filterPeriodMode === "Rentang Tanggal" && (
              <>
                <FormField label="Tanggal Mulai">
                  <input
                    type="date"
                    value={filterStartDate}
                    onChange={(event) => setFilterStartDate(event.target.value)}
                    className={`${inputBaseClass} ${getInputValueClass(filterStartDate)}`}
                  />
                </FormField>

                <FormField label="Tanggal Akhir">
                  <input
                    type="date"
                    value={filterEndDate}
                    onChange={(event) => setFilterEndDate(event.target.value)}
                    className={`${inputBaseClass} ${getInputValueClass(filterEndDate)}`}
                  />
                </FormField>
              </>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-blue-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="h-11 rounded-2xl bg-slate-100 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
            >
              Reset Filter
            </button>
            <button
              type="button"
              onClick={applyFilters}
              disabled={!canGenerate || isGenerating}
              className="h-11 rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating ? "Generating..." : "Generate Laporan"}
            </button>
          </div>
        </div>
      </section>

      {!hasGenerated && !isGenerating && <ReportInitialState />}
      {isGenerating && <ReportLoadingState />}

      {hasGenerated && !isGenerating && (
        <>
          <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Ringkasan Filter Aktif
            </p>
            <div className="mt-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-950">
                  Menampilkan {labels.heading} untuk{" "}
                  {getActivePeriodText(periodMode, semester, startDate, endDate)}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Data di bawah ini dibuat berdasarkan filter terakhir yang digenerate
                  dan dapat diurutkan langsung melalui header tabel.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-4">
            <SummaryCard title="Total Peserta" value={totalParticipants} />
            <SummaryCard title="Lulus" value={passedCount} />
            <SummaryCard title="Tidak Lulus" value={failedCount} />
            <div className="rounded-[1.75rem] bg-primary p-5 text-white shadow-lg shadow-blue-600/20">
              <p className="text-sm font-medium text-blue-50/80">Rata-rata Nilai</p>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                {formatScore(averageScore)}
              </p>
              <p className="mt-4 text-xs leading-5 text-blue-50/80">
                Berdasarkan data {labels.heading.toLowerCase()} yang sedang difilter.
              </p>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
              <div className="flex items-start gap-3">
                <BarChart3 size={22} className="mt-0.5 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                    Perbandingan Status
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Proporsi status akhir {labels.heading.toLowerCase()}.
                  </p>
                </div>
              </div>

              <div className="mt-6 h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={62}
                      outerRadius={92}
                      paddingAngle={4}
                    >
                      {chartData.map((entry) => (
                        <Cell key={entry.name} fill={chartColors[entry.name]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <ChartLegend chartData={chartData} />
            </div>

            <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                Jumlah Peserta per Status
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Grafik sederhana untuk membandingkan jumlah peserta lulus dan tidak lulus.
              </p>

              <div className="mt-6 h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="status" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="jumlah" radius={[12, 12, 0, 0]}>
                      {barData.map((entry) => (
                        <Cell key={entry.status} fill={chartColors[entry.status]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
            {archiveSuccess && (
              <div className="border-b border-emerald-100 bg-emerald-50 px-5 py-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-emerald-700">
                      Laporan berhasil disimpan ke arsip
                    </p>
                    <p className="mt-1 text-sm text-emerald-600">
                      Snapshot laporan ini sudah siap ditampilkan di list Arsip Laporan.
                    </p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-600">
                    Final
                  </span>
                </div>
              </div>
            )}

            <div className="border-b border-blue-100 bg-white p-5">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                      Detail {labels.heading}
                    </h2>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                      {filteredReports.length} data
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    Menampilkan {startItem}-{endItem} dari {filteredReports.length} data laporan.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleArchiveReport}
                    disabled={filteredReports.length === 0 || isArchiving}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-blue-50 px-4 text-sm font-semibold text-primary ring-1 ring-blue-100 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Archive size={16} />
                    {isArchiving ? "Menyimpan..." : "Simpan ke Arsip"}
                  </button>

                  <div className="relative w-fit">
                    <button
                      type="button"
                      onClick={() => setShowExportMenu((current) => !current)}
                      className="inline-flex h-10 items-center gap-2 rounded-2xl bg-[#F8FBFF] px-4 text-sm font-semibold text-slate-700 ring-1 ring-blue-100 transition hover:bg-blue-50 hover:text-primary"
                    >
                      <Download size={16} />
                      Export Laporan
                      <ChevronDown
                        size={16}
                        className={`transition ${showExportMenu ? "rotate-180" : ""}`}
                      />
                    </button>

                    {showExportMenu && (
                      <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-blue-100 bg-white py-2 shadow-xl shadow-blue-100/40">
                        {exportOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-primary"
                          >
                            {option}
                            {option === "Cetak Ringkasan" ? (
                              <Printer size={15} />
                            ) : (
                              <Download size={15} />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex h-14 items-center gap-3 rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 shadow-sm shadow-blue-100/20 transition focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                <Search size={18} className="shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Cari NIM, nama mahasiswa, atau judul..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setCurrentPage(1);
                    }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Hapus pencarian"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="min-h-[480px] bg-white">
              {paginatedReports.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1160px] border-separate border-spacing-0 text-left text-sm">
                    <thead className="bg-[#F8FBFF] text-xs uppercase tracking-[0.14em] text-slate-400">
                      <tr>
                        <th className="w-[72px] px-5 py-4 text-center font-semibold">No</th>
                        <th className="w-[130px] whitespace-nowrap px-5 py-4 font-semibold">NIM</th>
                        <th className="w-[220px] whitespace-nowrap px-5 py-4 font-semibold">Nama</th>
                        <th className="min-w-[320px] whitespace-nowrap px-5 py-4 font-semibold">
                          {labels.titleColumn}
                        </th>
                        <SortableHeader
                          label={labels.dateColumn}
                          sortKey="date"
                          activeSort={sortConfig}
                          onSort={handleSort}
                          className="w-[160px]"
                        />
                        <th className="w-[150px] whitespace-nowrap px-5 py-4 text-center font-semibold">Status Akhir</th>
                        <SortableHeader
                          label="Rata-rata Nilai"
                          sortKey="averageScore"
                          activeSort={sortConfig}
                          onSort={handleSort}
                          className="w-[170px] text-center"
                        />
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedReports.map((item, index) => (
                        <ReportTableRow
                          key={item.id}
                          item={item}
                          number={(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyState activeReport={activeReport} />
              )}
            </div>

            <div className="min-h-[76px] border-t border-blue-100 bg-white px-5 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Halaman {currentPage} dari {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={currentPage === 1}
                    className="flex h-10 items-center gap-2 rounded-2xl bg-[#F8FBFF] px-4 text-sm font-semibold text-slate-600 ring-1 ring-blue-100 transition hover:bg-blue-50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft size={17} />
                    Sebelumnya
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`h-10 w-10 rounded-2xl text-sm font-semibold transition ${
                          currentPage === page
                            ? "bg-primary text-white shadow-lg shadow-blue-600/20"
                            : "bg-[#F8FBFF] text-slate-600 ring-1 ring-blue-100 hover:bg-blue-50 hover:text-primary"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) => Math.min(totalPages, page + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="flex h-10 items-center gap-2 rounded-2xl bg-[#F8FBFF] px-4 text-sm font-semibold text-slate-600 ring-1 ring-blue-100 transition hover:bg-blue-50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Berikutnya
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function ReportInitialState() {
  return (
    <section className="rounded-[2rem] border border-dashed border-blue-200 bg-white px-8 py-14 text-center shadow-sm shadow-blue-100/30">
      <div className="mx-auto flex min-h-[340px] max-w-xl flex-col items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-blue-50 text-primary ring-1 ring-blue-100">
          <BarChart3 size={30} />
        </div>

        <p className="mt-6 text-lg font-semibold text-slate-950">
          Belum ada laporan ditampilkan
        </p>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          Pilih jenis laporan dan periode terlebih dahulu, lalu klik Generate Laporan.
          Statistik, grafik, dan tabel detail akan tampil setelah proses generate selesai.
        </p>
      </div>
    </section>
  );
}

function ReportLoadingState() {
  return (
    <section className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-sm shadow-blue-100/30">
      <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-primary" />
        <p className="mt-5 text-lg font-semibold text-slate-950">
          Menggenerate laporan...
        </p>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          Sistem sedang menerapkan filter dan menyiapkan statistik, grafik, serta tabel detail laporan.
        </p>
      </div>
    </section>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-blue-100">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
        {value}
      </p>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ChartLegend({ chartData }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-5">
      {chartData.map((item) => (
        <div key={item.name} className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: chartColors[item.name] }}
          />
          <p className="text-sm font-medium text-slate-600">
            {item.name}: <span className="font-semibold text-slate-950">{item.value}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

function SortableHeader({ label, sortKey, activeSort, onSort, className = "" }) {
  const isActive = activeSort.key === sortKey;
  const Icon = isActive && activeSort.direction === "asc" ? ArrowUp : ArrowDown;

  return (
    <th className={`whitespace-nowrap px-5 py-4 font-semibold ${className}`}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 transition ${
          isActive
            ? "bg-blue-50 text-primary"
            : "text-slate-400 hover:bg-blue-50 hover:text-primary"
        }`}
      >
        {label}
        <Icon size={13} />
      </button>
    </th>
  );
}

function ReportTableRow({ item, number }) {
  return (
    <tr className="align-middle transition hover:bg-blue-50/40">
      <td className="border-t border-blue-100 px-5 py-5 text-center font-semibold text-slate-500">
        {number}
      </td>
      <td className="whitespace-nowrap border-t border-blue-100 px-5 py-5 font-semibold text-slate-700">
        {item.nim}
      </td>
      <td className="whitespace-nowrap border-t border-blue-100 px-5 py-5 font-semibold text-slate-950">
        {item.name}
      </td>
      <td className="border-t border-blue-100 px-5 py-5">
        <p className="max-w-[420px] truncate font-semibold leading-6 text-slate-900">
          {item.title}
        </p>
      </td>
      <td className="whitespace-nowrap border-t border-blue-100 px-5 py-5 text-slate-600">
        {item.displayDate}
      </td>
      <td className="whitespace-nowrap border-t border-blue-100 px-5 py-5 text-center">
        <span
          className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getStatusClass(
            item.status
          )}`}
        >
          {item.status}
        </span>
      </td>
      <td className="whitespace-nowrap border-t border-blue-100 px-5 py-5 text-center font-semibold text-slate-950">
        {formatScore(item.averageScore)}
      </td>
    </tr>
  );
}

function EmptyState({ activeReport }) {
  return (
    <div className="flex min-h-[440px] items-center justify-center border-t border-dashed border-blue-200 bg-white p-10 text-center">
      <div>
        <p className="text-lg font-semibold text-slate-950">
          Data laporan tidak ditemukan
        </p>
        <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
          Tidak ada data laporan {activeReport} yang sesuai dengan filter atau pencarian yang dipilih.
        </p>
      </div>
    </div>
  );
}
