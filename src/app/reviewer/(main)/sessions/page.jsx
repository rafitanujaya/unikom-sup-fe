"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter,
  MessageSquareText,
  Search,
  Video,
  X,
} from "lucide-react";

const sessions = [
  {
    id: "SUP-2026-002",
    type: "SUP",
    studentName: "Raka Wiratama",
    nim: "2204101017",
    studentPhoto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    title: "Code Switching in Indonesian English Classroom Interaction",
    role: "Penelaah 1",
    day: "Senin",
    date: "20 Mei 2026",
    time: "13.00 - 14.30",
    location: "Google Meet",
    phase: "Belum Dimulai",
    phaseType: "upcoming",
    documentStatus: "Draft Proposal tersedia",
    documentReadStatus: "Belum dibaca",
    agendaGroup: "Minggu Ini",
    evaluationStatus: "Belum tersedia",
  },
  {
    id: "SKR-2026-006",
    type: "Sidang Skripsi",
    studentName: "Maya Anindya",
    nim: "2204101028",
    studentPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    title: "Politeness Strategies in English Debate Performance",
    role: "Ketua Penelaah",
    day: "Selasa",
    date: "21 Mei 2026",
    time: "08.00 - 09.30",
    location: "Ruang Sidang FIB 1",
    phase: "Belum Dimulai",
    phaseType: "upcoming",
    documentStatus: "Draft Skripsi tersedia",
    documentReadStatus: "Sudah dibaca",
    agendaGroup: "Minggu Ini",
    evaluationStatus: "Belum tersedia",
  },
  {
    id: "SUP-2026-010",
    type: "SUP",
    studentName: "Fauzan Hakim",
    nim: "2204101047",
    studentPhoto:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    title: "The Use of Metaphor in Selected English Political Speeches",
    role: "Penelaah 2",
    day: "Kamis",
    date: "24 Mei 2026",
    time: "10.00 - 11.30",
    location: "Ruang Sidang FIB 2",
    phase: "Belum Dimulai",
    phaseType: "upcoming",
    documentStatus: "Draft Proposal tersedia",
    documentReadStatus: "Belum dibaca",
    agendaGroup: "Minggu Ini",
    evaluationStatus: "Belum tersedia",
  },
  {
    id: "SKR-2026-012",
    type: "Sidang Skripsi",
    studentName: "Citra Wulandari",
    nim: "2204101055",
    studentPhoto:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    title: "Conversational Implicature in English Talk Show Interviews",
    role: "Penelaah 1",
    day: "Rabu",
    date: "13 Mei 2026",
    time: "09.00 - 10.30",
    location: "Ruang Sidang FIB 2",
    phase: "Sedang Berlangsung",
    phaseType: "ongoing",
    documentStatus: "Draft Skripsi sudah dibuka",
    documentReadStatus: "Sudah dibaca",
    agendaGroup: "Hari Ini",
    evaluationStatus: "Belum final",
  },
  {
    id: "SKR-2026-003",
    type: "Sidang Skripsi",
    studentName: "Nadia Larasati",
    nim: "2204101022",
    studentPhoto:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    title: "Feminist Reading of Selected Short Stories",
    role: "Penelaah 2",
    day: "Rabu",
    date: "13 Mei 2026",
    time: "10.00 - 11.30",
    location: "Ruang Sidang FIB 1",
    phase: "Perlu Nilai & Feedback",
    phaseType: "evaluation",
    documentStatus: "Draft Skripsi sudah dibuka",
    documentReadStatus: "Sudah dibaca",
    agendaGroup: "Hari Ini",
    evaluationStatus: "Belum diisi",
  },
  {
    id: "SUP-2026-020",
    type: "SUP",
    studentName: "Gita Maharani",
    nim: "2204101062",
    studentPhoto:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    title: "Language Attitude Toward English Varieties Among University Students",
    role: "Ketua Penelaah",
    day: "Sabtu",
    date: "10 Mei 2026",
    time: "09.00 - 10.30",
    location: "Ruang Sidang FIB 2",
    phase: "Selesai",
    phaseType: "done",
    documentStatus: "Draft Proposal sudah dibuka",
    documentReadStatus: "Sudah dibaca",
    agendaGroup: "Riwayat",
    evaluationStatus: "Sudah diisi",
  },
];

const typeFilters = [
  { label: "Semua Tipe", value: "all" },
  { label: "SUP", value: "SUP" },
  { label: "Sidang Skripsi", value: "Sidang Skripsi" },
];

const periodFilters = [
  { label: "Semua Periode", value: "all" },
  { label: "Hari Ini", value: "today" },
  { label: "Minggu Ini", value: "week" },
  { label: "Riwayat", value: "history" },
];

const phaseFilters = [
  { label: "Semua Fase", value: "all" },
  { label: "Belum Dimulai", value: "upcoming" },
  { label: "Sedang Berlangsung", value: "ongoing" },
  { label: "Perlu Nilai", value: "evaluation" },
  { label: "Selesai", value: "done" },
];

const defaultFilters = {
  type: "all",
  period: "all",
  phase: "all",
};

const ITEMS_PER_PAGE = 5;

function TypeBadge({ type }) {
  return (
    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
      {type}
    </span>
  );
}

function PhaseBadge({ phase, phaseType }) {
  const styles = {
    upcoming: "bg-slate-100 text-slate-700 ring-slate-200",
    ongoing: "bg-blue-50 text-[#0B63CE] ring-blue-100",
    evaluation: "bg-red-50 text-red-600 ring-red-100",
    done: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
        styles[phaseType]
      }`}
    >
      {phase}
    </span>
  );
}

function SearchInput({ value, onChange }) {
  return (
    <label className="relative block w-full lg:w-[420px]">
      <Search
        size={17}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cari nama, NIM, atau judul..."
        className="h-11 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] pl-11 pr-11 text-sm font-medium text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400 focus:border-[#0B63CE] focus:bg-white focus:ring-4 focus:ring-blue-100"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-blue-50 hover:text-[#0B63CE]"
          aria-label="Hapus pencarian"
        >
          <X size={16} />
        </button>
      )}
    </label>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-500">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full appearance-none rounded-2xl border border-blue-100 bg-white px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#0B63CE] focus:ring-4 focus:ring-blue-100"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </label>
  );
}

function FilterPanel({
  filters,
  onChange,
  onApply,
  onCancel,
  onReset,
  hasActiveFilter,
}) {
  return (
    <div className="rounded-[1.5rem] border border-blue-100 bg-[#F8FBFF] p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-950">Filter Sidang</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Pilih tipe, periode, atau fase untuk mempersempit daftar sidang.
          </p>
        </div>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 ring-1 ring-blue-100 hover:text-[#0B63CE]"
          >
            <X size={14} />
            Reset
          </button>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <FilterSelect
          label="Tipe Sidang"
          value={filters.type}
          onChange={(value) => onChange("type", value)}
          options={typeFilters}
        />

        <FilterSelect
          label="Periode"
          value={filters.period}
          onChange={(value) => onChange("period", value)}
          options={periodFilters}
        />

        <FilterSelect
          label="Fase Sidang"
          value={filters.phase}
          onChange={(value) => onChange("phase", value)}
          options={phaseFilters}
        />
      </div>

      <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-semibold text-slate-500 hover:bg-white hover:text-slate-700"
        >
          Batal
        </button>

        <button
          type="button"
          onClick={onApply}
          className="inline-flex h-10 items-center justify-center rounded-2xl bg-[#0B63CE] px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
        >
          Terapkan Filter
        </button>
      </div>
    </div>
  );
}

function ActiveFilterChips({ filters, onRemove, onReset }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-blue-100 pt-4">
      <span className="text-sm font-semibold text-slate-400">
        Filter aktif:
      </span>

      {filters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          onClick={() => onRemove(filter.key)}
          className="inline-flex max-w-full items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-[#0B63CE] ring-1 ring-blue-100 hover:bg-blue-100"
        >
          <span className="shrink-0">{filter.label}:</span>
          <span className="min-w-0 truncate">{filter.value}</span>
          <X size={14} className="shrink-0" />
        </button>
      ))}

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
      >
        Reset
      </button>
    </div>
  );
}

function WarningCard({ count, onShowNeedEvaluation }) {
  if (count === 0) return null;

  return (
    <section className="rounded-[1.5rem] border border-amber-100 bg-amber-50 p-5 shadow-sm shadow-amber-100/30">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-600 ring-1 ring-amber-100">
            <AlertCircle size={22} />
          </div>

          <div>
            <h2 className="text-base font-semibold tracking-tight text-amber-900">
              Ada penilaian yang perlu diisi
            </h2>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-amber-700">
              {count} sidang sedang berlangsung atau sudah selesai dan masih
              membutuhkan nilai serta feedback dari Anda.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onShowNeedEvaluation}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-5 text-sm font-semibold text-amber-700 ring-1 ring-amber-100 transition hover:bg-amber-100"
        >
          Lihat yang perlu diisi
        </button>
      </div>
    </section>
  );
}

function InfoCard({ label, value, isOnline = false }) {
  return (
    <div className="min-w-0 rounded-2xl bg-white px-4 py-3 ring-1 ring-blue-100">
      <p className="text-xs font-medium text-slate-400">{label}</p>

      <p className="mt-1 flex min-w-0 items-center gap-1.5 truncate text-sm font-semibold text-slate-950">
        {isOnline && <Video size={14} className="shrink-0 text-[#0B63CE]" />}
        <span className="truncate">{value}</span>
      </p>
    </div>
  );
}

function DocumentInfoCard({ readStatus, documentStatus }) {
  const isUnread = readStatus.toLowerCase().includes("belum");

  return (
    <div
      className={`min-w-0 rounded-2xl px-4 py-3 ring-1 ${
        isUnread
          ? "bg-amber-50 ring-amber-100"
          : "bg-emerald-50 ring-emerald-100"
      }`}
    >
      <p
        className={`text-xs font-medium ${
          isUnread ? "text-amber-600" : "text-emerald-600"
        }`}
      >
        Dokumen
      </p>

      <div className="mt-1 flex min-w-0 items-center gap-2">
        {isUnread ? (
          <AlertCircle size={14} className="shrink-0 text-amber-600" />
        ) : (
          <CheckCircle2 size={14} className="shrink-0 text-emerald-600" />
        )}

        <p
          className={`truncate text-sm font-semibold ${
            isUnread ? "text-amber-800" : "text-emerald-800"
          }`}
        >
          {readStatus}
        </p>
      </div>

      <p
        className={`mt-1 truncate text-xs ${
          isUnread ? "text-amber-700/80" : "text-emerald-700/80"
        }`}
      >
        {documentStatus}
      </p>
    </div>
  );
}

function getRowDescription(item) {
  if (item.phaseType === "evaluation") {
    return "Feedback final perlu segera dikirim.";
  }

  if (item.phaseType === "ongoing") {
    return "Sidang sedang berlangsung. Nilai dan feedback sudah dapat diisi.";
  }

  if (item.phaseType === "done") {
    return "Sidang sudah selesai.";
  }

  return "Persiapkan dokumen sebelum jadwal sidang.";
}

function SessionRow({ item }) {
  const canOpenDocument =
    item.phaseType === "upcoming" ||
    item.phaseType === "ongoing" ||
    item.phaseType === "evaluation";

  const canOpenEvaluation =
    item.phaseType === "ongoing" || item.phaseType === "evaluation";

  const shouldShowDetail = !canOpenEvaluation;
  const isOnline = item.location.toLowerCase().includes("meet");

  return (
    <article className="group relative border-b-2 border-slate-100 bg-white px-5 py-5 transition last:border-b-0 hover:bg-blue-50/50">
      <span className="absolute left-0 top-5 hidden h-[calc(100%-2.5rem)] w-1.5 rounded-r-full bg-[#0B63CE] group-hover:block" />

      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center">
          <img
            src={item.studentPhoto}
            alt={item.studentName}
            className="h-24 w-24 shrink-0 rounded-[1.5rem] object-cover ring-1 ring-blue-100 sm:h-28 sm:w-28"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <TypeBadge type={item.type} />
              <PhaseBadge phase={item.phase} phaseType={item.phaseType} />

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {item.role}
              </span>
            </div>

            <h3 className="mt-3 line-clamp-1 text-xl font-semibold leading-7 tracking-[-0.02em] text-slate-950 group-hover:text-[#0B63CE]">
              <span>{item.studentName}</span>
              <span className="text-slate-400"> - </span>
              <span className="whitespace-nowrap text-slate-500">
                {item.nim}
              </span>
            </h3>

            <p className="mt-1 line-clamp-2 max-w-3xl text-base font-medium leading-6 text-slate-700">
              {item.title}
            </p>
          </div>
        </div>

        <div className="flex w-fit shrink-0 items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100 xl:mt-1">
          <CalendarDays size={14} />
          <span>{item.agendaGroup}</span>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard label="Tanggal" value={`${item.day}, ${item.date}`} />
        <InfoCard label="Waktu" value={item.time} />
        <InfoCard label="Lokasi" value={item.location} isOnline={isOnline} />
        <DocumentInfoCard
          readStatus={item.documentReadStatus}
          documentStatus={item.documentStatus}
        />
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-blue-100 pt-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl text-sm leading-6 text-slate-500">
          {getRowDescription(item)}
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          {canOpenDocument && (
            <Link
              href={`/reviewer/documents/${item.id}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 text-sm font-semibold text-[#0B63CE] transition hover:bg-blue-50"
            >
              <FileText size={16} />
              Buka Dokumen
            </Link>
          )}

          {shouldShowDetail && (
            <Link
              href={`/reviewer/sessions/${item.id}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              Lihat Detail
              <ChevronRight size={16} />
            </Link>
          )}

          {canOpenEvaluation && (
            <Link
              href={`/reviewer/evaluations/${item.id}`}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold text-white shadow-lg transition ${
                item.phaseType === "evaluation"
                  ? "bg-red-600 shadow-red-600/20 hover:bg-red-700"
                  : "bg-[#0B63CE] shadow-blue-600/20 hover:bg-blue-700"
              }`}
            >
              <MessageSquareText size={16} />
              {item.phaseType === "evaluation"
                ? "Kirim Nilai & Feedback"
                : "Isi Nilai & Feedback"}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  startItem,
  endItem,
  onPrevious,
  onNext,
  onPageChange,
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Menampilkan{" "}
        <span className="font-semibold text-slate-800">{startItem}</span>
        {" - "}
        <span className="font-semibold text-slate-800">{endItem}</span>
        {" dari "}
        <span className="font-semibold text-slate-800">{totalItems}</span>
        {" data"}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-slate-500 transition hover:bg-blue-50 hover:text-[#0B63CE] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300"
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`flex h-10 min-w-10 items-center justify-center rounded-2xl px-3 text-sm font-semibold transition ${
                currentPage === page
                  ? "bg-[#0B63CE] text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-500 hover:bg-blue-50 hover:text-[#0B63CE]"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-slate-500 transition hover:bg-blue-50 hover:text-[#0B63CE] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300"
          aria-label="Halaman berikutnya"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-[#0B63CE] ring-1 ring-blue-100">
        <Filter size={24} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950">
        Tidak ada sidang yang sesuai
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Coba ubah filter atau kata kunci pencarian untuk melihat agenda sidang
        lainnya.
      </p>
    </div>
  );
}

export default function ReviewerSessionsPage() {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const activeFilters = [
    appliedFilters.type !== "all"
      ? {
          key: "type",
          label: "Tipe",
          value:
            typeFilters.find((filter) => filter.value === appliedFilters.type)
              ?.label || appliedFilters.type,
        }
      : null,
    appliedFilters.period !== "all"
      ? {
          key: "period",
          label: "Periode",
          value:
            periodFilters.find(
              (filter) => filter.value === appliedFilters.period,
            )?.label || appliedFilters.period,
        }
      : null,
    appliedFilters.phase !== "all"
      ? {
          key: "phase",
          label: "Fase",
          value:
            phaseFilters.find((filter) => filter.value === appliedFilters.phase)
              ?.label || appliedFilters.phase,
        }
      : null,
  ].filter(Boolean);

  const hasActiveFilter = activeFilters.length > 0;

  const filteredSessions = useMemo(() => {
    return sessions.filter((item) => {
      const matchType =
        appliedFilters.type === "all" || item.type === appliedFilters.type;

      const matchPeriod =
        appliedFilters.period === "all" ||
        (appliedFilters.period === "today" && item.agendaGroup === "Hari Ini") ||
        (appliedFilters.period === "week" &&
          item.agendaGroup === "Minggu Ini") ||
        (appliedFilters.period === "history" && item.agendaGroup === "Riwayat");

      const matchPhase =
        appliedFilters.phase === "all" ||
        item.phaseType === appliedFilters.phase;

      const searchText =
        `${item.studentName} ${item.nim} ${item.title} ${item.type} ${item.role}`.toLowerCase();

      const matchSearch = searchText.includes(search.toLowerCase());

      return matchType && matchPeriod && matchPhase && matchSearch;
    });
  }, [appliedFilters, search]);

  const needEvaluationCount = sessions.filter(
    (item) =>
      item.phaseType === "ongoing" ||
      (item.phaseType === "evaluation" &&
        item.evaluationStatus.toLowerCase().includes("belum")),
  ).length;

  const totalPages = Math.max(
    Math.ceil(filteredSessions.length / ITEMS_PER_PAGE),
    1,
  );

  const paginatedSessions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredSessions.slice(startIndex, endIndex);
  }, [filteredSessions, currentPage]);

  const startItem =
    filteredSessions.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredSessions.length,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters, search]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  function handleSearchChange(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function openFilterPanel() {
    setDraftFilters(appliedFilters);
    setShowFilter((current) => !current);
  }

  function updateDraftFilter(key, value) {
    setDraftFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function applyFilter() {
    setAppliedFilters(draftFilters);
    setCurrentPage(1);
    setShowFilter(false);
  }

  function cancelFilter() {
    setDraftFilters(appliedFilters);
    setShowFilter(false);
  }

  function resetFilter() {
    setDraftFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setCurrentPage(1);
  }

  function removeFilter(key) {
    const nextFilters = {
      ...appliedFilters,
      [key]: defaultFilters[key],
    };

    setAppliedFilters(nextFilters);
    setDraftFilters(nextFilters);
    setCurrentPage(1);
  }

  function showNeedEvaluationOnly() {
    const nextFilters = {
      ...defaultFilters,
      phase: "evaluation",
    };

    setDraftFilters(nextFilters);
    setAppliedFilters(nextFilters);
    setCurrentPage(1);
    setShowFilter(false);
  }

  return (
    <div className="space-y-6 font-[Poppins]">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            Daftar Sidang
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 md:text-base">
            Daftar sidang yang sudah diterima dan menjadi agenda aktif penelaah.
          </p>
        </div>

        <div className="w-fit rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B63CE] shadow-sm ring-1 ring-blue-100">
          Semester Genap 2025/2026
        </div>
      </section>

      <WarningCard
        count={needEvaluationCount}
        onShowNeedEvaluation={showNeedEvaluationOnly}
      />

      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                    Agenda Sidang Aktif
                  </h2>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
                    {filteredSessions.length} sidang ditemukan
                  </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Cari dan kelola agenda berdasarkan fase sidang saat ini.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <SearchInput value={search} onChange={handleSearchChange} />

                <button
                  type="button"
                  onClick={openFilterPanel}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold transition ${
                    showFilter || hasActiveFilter
                      ? "bg-[#0B63CE] text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                      : "border border-blue-100 bg-[#F8FBFF] text-slate-600 hover:bg-blue-50 hover:text-[#0B63CE]"
                  }`}
                >
                  <Filter size={17} />
                  Filter

                  {hasActiveFilter && (
                    <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1 text-xs">
                      {activeFilters.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {showFilter && (
              <FilterPanel
                filters={draftFilters}
                onChange={updateDraftFilter}
                onApply={applyFilter}
                onCancel={cancelFilter}
                onReset={resetFilter}
                hasActiveFilter={hasActiveFilter}
              />
            )}

            {hasActiveFilter && (
              <ActiveFilterChips
                filters={activeFilters}
                onRemove={removeFilter}
                onReset={resetFilter}
              />
            )}
          </div>
        </div>

        {filteredSessions.length > 0 ? (
          <div>
            {paginatedSessions.map((item) => (
              <SessionRow key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

        {filteredSessions.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredSessions.length}
            startItem={startItem}
            endItem={endItem}
            onPrevious={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            onNext={() =>
              setCurrentPage((page) => Math.min(page + 1, totalPages))
            }
            onPageChange={setCurrentPage}
          />
        )}
      </section>
    </div>
  );
}