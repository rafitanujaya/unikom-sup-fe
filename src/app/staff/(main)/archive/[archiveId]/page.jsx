"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Printer,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
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

const archiveDetail = {
  id: "ARCH-001",
  name: "Laporan SUP - Genap 2025/2026",
  type: "SUP",
  periodType: "Semester",
  period: "Genap 2025/2026",
  createdAt: "18 Mei 2026, 14.30",
  createdBy: "Staff Akademik",
  status: "Final",
  totalParticipants: 124,
  passedCount: 110,
  failedCount: 14,
  averageScore: 82.4,
  finalizedNote:
    "Laporan ini merupakan snapshot final dari hasil SUP semester Genap 2025/2026 dan tidak dapat diubah setelah diarsipkan.",
};

const archiveRows = [
  {
    id: "DTL-001",
    nim: "10122001",
    name: "Nadia Putri Azzahra",
    title: "Representasi Identitas dalam Novel Kontemporer",
    date: "20 Mei 2026",
    dateValue: "2026-05-20",
    status: "Lulus",
    averageScore: 84.5,
  },
  {
    id: "DTL-002",
    nim: "10122018",
    name: "Rafi Maulana",
    title: "Code Switching dalam Interaksi Mahasiswa Sastra Inggris",
    date: "21 Mei 2026",
    dateValue: "2026-05-21",
    status: "Lulus",
    averageScore: 81.2,
  },
  {
    id: "DTL-003",
    nim: "10122024",
    name: "Salsa Nuraini",
    title: "Analisis Karakter Utama dalam Film Adaptasi Novel",
    date: "22 Mei 2026",
    dateValue: "2026-05-22",
    status: "Tidak Lulus",
    averageScore: 61.8,
  },
  {
    id: "DTL-004",
    nim: "10122029",
    name: "Aulia Rahman",
    title: "Narrative Structure dalam Short Story Modern",
    date: "24 Mei 2026",
    dateValue: "2026-05-24",
    status: "Lulus",
    averageScore: 86.1,
  },
  {
    id: "DTL-005",
    nim: "10122035",
    name: "Dinda Maharani",
    title: "Analisis Pragmatik pada Dialog Film Remaja",
    date: "25 Mei 2026",
    dateValue: "2026-05-25",
    status: "Lulus",
    averageScore: 79.4,
  },
  {
    id: "DTL-006",
    nim: "10122041",
    name: "Arkan Saputra",
    title: "Representasi Budaya Pop dalam Novel Digital",
    date: "26 Mei 2026",
    dateValue: "2026-05-26",
    status: "Tidak Lulus",
    averageScore: 58.9,
  },
  {
    id: "DTL-007",
    nim: "10122044",
    name: "Maya Salsabila",
    title: "Politeness Strategy dalam Percakapan Akademik",
    date: "27 Mei 2026",
    dateValue: "2026-05-27",
    status: "Lulus",
    averageScore: 88.3,
  },
];

const exportOptions = [
  "Export CSV",
  "Export XLSX",
  "Export PDF",
  "Cetak Ringkasan",
];

const ITEMS_PER_PAGE = 10;

const chartColors = {
  Lulus: "#2563EB",
  "Tidak Lulus": "#EF4444",
};

function getStatusClass(status) {
  if (status === "Lulus") {
    return "bg-emerald-50 text-emerald-600 ring-emerald-100";
  }

  return "bg-red-50 text-red-600 ring-red-100";
}

function getTypeClass(type) {
  if (type === "SUP") {
    return "bg-blue-50 text-primary ring-blue-100";
  }

  return "bg-violet-50 text-violet-600 ring-violet-100";
}

function formatScore(score) {
  return score.toLocaleString("id-ID", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function getDateColumnLabel(type) {
  return type === "SUP" ? "Tanggal SUP" : "Tanggal Sidang";
}

function getTitleColumnLabel(type) {
  return type === "SUP" ? "Judul Proposal" : "Judul Skripsi";
}

export default function StaffReportArchiveDetailPage() {
  const [search, setSearch] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "dateValue",
    direction: "asc",
  });

  const chartData = [
    { name: "Lulus", value: archiveDetail.passedCount },
    { name: "Tidak Lulus", value: archiveDetail.failedCount },
  ];

  const barData = chartData.map((item) => ({
    status: item.name,
    jumlah: item.value,
  }));

  const filteredRows = useMemo(() => {
    const searchValue = search.toLowerCase();

    return archiveRows
      .filter((item) => {
        return (
          item.nim.toLowerCase().includes(searchValue) ||
          item.name.toLowerCase().includes(searchValue) ||
          item.title.toLowerCase().includes(searchValue) ||
          item.status.toLowerCase().includes(searchValue)
        );
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
          ? String(firstValue).localeCompare(String(secondValue), "id-ID", {
              numeric: true,
            })
          : String(secondValue).localeCompare(String(firstValue), "id-ID", {
              numeric: true,
            });
      });
  }, [search, sortConfig]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRows.length / ITEMS_PER_PAGE),
  );

  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startItem =
    filteredRows.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredRows.length);

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setCurrentPage(1);
  }

  function handleSort(key) {
    setSortConfig((current) => {
      if (current.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }

      return {
        key,
        direction: "asc",
      };
    });

    setCurrentPage(1);
  }

  return (
    <div className="space-y-6 pb-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link
            href="/staff/report-archives"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
          >
            <ArrowLeft size={17} />
            Kembali ke Arsip Laporan
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Detail Arsip Laporan
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {archiveDetail.name}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            Detail snapshot laporan final yang sudah disimpan di arsip digital
            sistem. Data pada halaman ini bersifat read-only.
          </p>
        </div>

        <div className="relative w-fit">
          <button
            type="button"
            onClick={() => setShowExportMenu((current) => !current)}
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-primary px-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-primary-dark"
          >
            <Download size={16} />
            Export Arsip
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
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="p-6">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getTypeClass(
                    archiveDetail.type,
                  )}`}
                >
                  {archiveDetail.type}
                </span>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-100">
                  {archiveDetail.status}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Ringkasan Arsip
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">
                {archiveDetail.finalizedNote}
              </p>
            </div>

            <div className="grid gap-x-10 gap-y-5 border-t border-blue-100 pt-5 sm:grid-cols-2 xl:w-[520px] xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
              <SimpleInfo label="Periode" value={archiveDetail.period} />
              <SimpleInfo label="Tipe Periode" value={archiveDetail.periodType} />
              <SimpleInfo label="Dibuat Pada" value={archiveDetail.createdAt} />
              <SimpleInfo label="Dibuat Oleh" value={archiveDetail.createdBy} />
            </div>
          </div>
        </div>

        <div className="border-t border-blue-100 px-6 py-5">
          <div className="grid gap-x-10 gap-y-6 md:grid-cols-2 xl:grid-cols-4">
            <PlainMetric
              title="Total Peserta"
              value={archiveDetail.totalParticipants}
            />
            <PlainMetric title="Lulus" value={archiveDetail.passedCount} />
            <PlainMetric title="Tidak Lulus" value={archiveDetail.failedCount} />
            <PlainMetric
              title="Rata-rata Nilai"
              value={formatScore(archiveDetail.averageScore)}
              highlight
            />
          </div>
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
                Proporsi status akhir dari snapshot arsip laporan ini.
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
            Grafik jumlah peserta berdasarkan status akhir pada arsip final.
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
        <div className="border-b border-blue-100 bg-white p-5">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                  Detail Mahasiswa
                </h2>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                  {filteredRows.length} data
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Data mahasiswa pada snapshot arsip laporan final.
              </p>
            </div>

            <div className="flex h-12 w-full items-center gap-3 rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 transition focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100 xl:max-w-xl">
              <Search size={18} className="shrink-0 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Cari NIM, nama mahasiswa, judul, atau status..."
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => handleSearchChange({ target: { value: "" } })}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Hapus pencarian"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="min-h-[460px] bg-white">
          {paginatedRows.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1120px] text-left text-sm">
                <thead className="bg-[#F8FBFF] text-xs uppercase tracking-[0.14em] text-slate-400">
                  <tr>
                    <th className="w-[72px] px-5 py-4 text-center font-semibold">
                      No
                    </th>

                    <SortableHeader
                      label="NIM"
                      sortKey="nim"
                      activeSort={sortConfig}
                      onSort={handleSort}
                      className="w-[130px]"
                    />

                    <SortableHeader
                      label="Nama"
                      sortKey="name"
                      activeSort={sortConfig}
                      onSort={handleSort}
                      className="w-[220px]"
                    />

                    <th className="min-w-[340px] whitespace-nowrap px-5 py-4 font-semibold">
                      {getTitleColumnLabel(archiveDetail.type)}
                    </th>

                    <SortableHeader
                      label={getDateColumnLabel(archiveDetail.type)}
                      sortKey="dateValue"
                      activeSort={sortConfig}
                      onSort={handleSort}
                      className="w-[160px]"
                    />

                    <th className="w-[150px] whitespace-nowrap px-5 py-4 text-center font-semibold">
                      Status Akhir
                    </th>

                    <SortableHeader
                      label="Rata-rata Nilai"
                      sortKey="averageScore"
                      activeSort={sortConfig}
                      onSort={handleSort}
                      className="w-[160px] text-center"
                    />
                  </tr>
                </thead>

                <tbody className="divide-y divide-blue-100">
                  {paginatedRows.map((item, index) => (
                    <ArchiveDetailTableRow
                      key={item.id}
                      item={item}
                      number={(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>

        <div className="min-h-[76px] border-t border-blue-100 bg-white px-5 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-slate-500">
              Menampilkan{" "}
              <span className="font-semibold text-slate-800">{startItem}</span>
              {" - "}
              <span className="font-semibold text-slate-800">{endItem}</span>
              {" dari "}
              <span className="font-semibold text-slate-800">
                {filteredRows.length}
              </span>
              {" data"}
            </p>

            <div className="flex flex-wrap items-center gap-2">
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

function SimpleInfo({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
        {value}
      </p>
    </div>
  );
}

function PlainMetric({ title, value, highlight = false }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {title}
      </p>
      <p
        className={`mt-2 text-3xl font-semibold tracking-[-0.04em] ${
          highlight ? "text-primary" : "text-slate-950"
        }`}
      >
        {value}
      </p>
    </div>
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
            {item.name}:{" "}
            <span className="font-semibold text-slate-950">{item.value}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

function ArchiveDetailTableRow({ item, number }) {
  return (
    <tr className="align-middle transition hover:bg-blue-50/40">
      <td className="px-5 py-5 text-center font-semibold text-slate-500">
        {number}
      </td>

      <td className="whitespace-nowrap px-5 py-5 font-semibold text-slate-700">
        {item.nim}
      </td>

      <td className="whitespace-nowrap px-5 py-5 font-semibold text-slate-950">
        {item.name}
      </td>

      <td className="px-5 py-5">
        <p className="max-w-[420px] truncate font-semibold leading-6 text-slate-900">
          {item.title}
        </p>
      </td>

      <td className="whitespace-nowrap px-5 py-5 text-slate-600">
        {item.date}
      </td>

      <td className="whitespace-nowrap px-5 py-5 text-center">
        <span
          className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getStatusClass(
            item.status,
          )}`}
        >
          {item.status}
        </span>
      </td>

      <td className="whitespace-nowrap px-5 py-5 text-center font-semibold text-slate-950">
        {formatScore(item.averageScore)}
      </td>
    </tr>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[420px] items-center justify-center border-t border-dashed border-blue-200 bg-white p-10 text-center">
      <div>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-blue-50 text-primary ring-1 ring-blue-100">
          <FileText size={30} />
        </div>

        <p className="mt-5 text-lg font-semibold text-slate-950">
          Data snapshot tidak ditemukan
        </p>

        <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
          Tidak ada data mahasiswa yang sesuai dengan pencarian pada arsip
          laporan ini.
        </p>
      </div>
    </div>
  );
}