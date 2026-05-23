"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  FileText,
  Filter,
  MessageSquareText,
  Search,
  Video,
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
  },
];

const assessmentCriteria = [
  { label: "ABSTRAK", maxScore: 10 },
  { label: "PENDAHULUAN", maxScore: 20 },
  { label: "KAJIAN PUSTAKA", maxScore: 20 },
  { label: "METODE / KERANGKA TEORETIS", maxScore: 25 },
  { label: "HIPOTESIS HASIL DAN PEMBAHASAN", maxScore: 10 },
  { label: "PENYAJIAN", maxScore: 15 },
];

function getGrade(score) {
  if (typeof score !== "number") return "—";
  if (score >= 85) return "A";
  if (score >= 75) return "B";
  if (score >= 65) return "C";
  return "D";
}

function getCriteriaScores(totalScore) {
  if (typeof totalScore !== "number") return null;

  const ratio = totalScore / 100;
  return assessmentCriteria.map((criterion) => ({
    ...criterion,
    score: Math.round(criterion.maxScore * ratio),
  }));
}

const sessionReviewers = {
  "SUP-2026-002": [
    {
      name: "Dr. Tatan Tawami, M.Hum.",
      role: "Penelaah 1",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: true,
      score: null,
      feedback: "",
    },
    {
      name: "Dr. Nia Kurniawati, M.Hum.",
      role: "Ketua Penelaah",
      photo:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: 82,
      feedback: "Rumusan masalah sudah cukup jelas, tetapi landasan teori perlu dirapikan.",
    },
    {
      name: "Rahmat Gunawan, M.Hum.",
      role: "Penelaah 2",
      photo:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
  ],
  "SKR-2026-006": [
    {
      name: "Dr. Tatan Tawami, M.Hum.",
      role: "Ketua Penelaah",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: true,
      score: 88,
      feedback: "Argumentasi sudah kuat dan penyajian data cukup konsisten.",
    },
    {
      name: "Dr. Lilis Suryani, M.Hum.",
      role: "Penelaah 1",
      photo:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: 85,
      feedback: "Pembahasan perlu sedikit diperjelas pada bagian analisis strategi kesantunan.",
    },
    {
      name: "Agus Setiawan, M.Hum.",
      role: "Penelaah 2",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
  ],
  "SUP-2026-010": [
    {
      name: "Dr. Tatan Tawami, M.Hum.",
      role: "Penelaah 2",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: true,
      score: null,
      feedback: "",
    },
    {
      name: "Rina Marlina, M.Hum.",
      role: "Ketua Penelaah",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
    {
      name: "Budi Firmansyah, M.Hum.",
      role: "Penelaah 1",
      photo:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
  ],
  "SKR-2026-012": [
    {
      name: "Dr. Tatan Tawami, M.Hum.",
      role: "Penelaah 1",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: true,
      score: 80,
      feedback: "Catatan awal sudah diisi saat sidang berlangsung, final belum dikirim.",
    },
    {
      name: "Prof. Dr. Herry Supriyadi, M.Hum.",
      role: "Ketua Penelaah",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
    {
      name: "Dewi Saraswati, M.Hum.",
      role: "Penelaah 2",
      photo:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
  ],
  "SKR-2026-003": [
    {
      name: "Dr. Tatan Tawami, M.Hum.",
      role: "Penelaah 2",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: true,
      score: null,
      feedback: "",
    },
    {
      name: "Dr. Nia Kurniawati, M.Hum.",
      role: "Ketua Penelaah",
      photo:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: 84,
      feedback: "Analisis sudah baik, tetapi simpulan perlu mengikat kembali rumusan masalah.",
    },
    {
      name: "Rahmat Gunawan, M.Hum.",
      role: "Penelaah 1",
      photo:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
  ],
  "SUP-2026-020": [
    {
      name: "Dr. Tatan Tawami, M.Hum.",
      role: "Ketua Penelaah",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: true,
      score: 90,
      feedback: "Proposal sudah memenuhi standar dan layak dilanjutkan.",
    },
    {
      name: "Rina Marlina, M.Hum.",
      role: "Penelaah 1",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: 87,
      feedback: "Topik jelas dan metodologi dapat diterima.",
    },
    {
      name: "Budi Firmansyah, M.Hum.",
      role: "Penelaah 2",
      photo:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: 86,
      feedback: "Perlu revisi minor pada batasan penelitian.",
    },
  ],
};

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
  { label: "Perlu Nilai & Feedback", value: "evaluation" },
  { label: "Selesai", value: "done" },
];

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
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${styles[phaseType]}`}>
      {phase}
    </span>
  );
}

function DocumentReadBadge({ status }) {
  const isUnread = status.toLowerCase().includes("belum");

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ring-1 ${
        isUnread
          ? "bg-amber-50 text-amber-700 ring-amber-100"
          : "bg-emerald-50 text-emerald-700 ring-emerald-100"
      }`}
    >
      {status}
    </span>
  );
}

function TitleText({ type, title }) {
  return (
    <div className="mt-3">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
        Judul {type === "SUP" ? "Proposal" : "Skripsi"}
      </p>
      <p className="mt-1.5 line-clamp-2 text-sm font-semibold leading-6 text-slate-950">
        {title}
      </p>
    </div>
  );
}

function SummaryCard({ label, value, helper }) {
  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{helper}</p>
    </div>
  );
}

function FilterControl({ label, value, onChange, options }) {
  return (
    <label className="block w-full sm:w-[190px]">
      <span className="mb-1.5 block text-xs font-medium text-slate-400">{label}</span>
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
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
          ▾
        </span>
      </div>
    </label>
  );
}

function SessionRow({ item, onOpen }) {
  const canOpenEvaluation = item.phaseType === "ongoing" || item.phaseType === "evaluation";
  const canOpenDocument =
    item.phaseType === "upcoming" ||
    item.phaseType === "ongoing" ||
    item.phaseType === "evaluation";
  const shouldShowDetail =
    item.phaseType !== "ongoing" && item.phaseType !== "evaluation";
  const isOnline = item.location.toLowerCase().includes("meet");

  return (
    <article className="rounded-[1.75rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/20 transition hover:border-blue-200 hover:shadow-md hover:shadow-blue-100/40">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={item.type} />
          <PhaseBadge phase={item.phase} phaseType={item.phaseType} />
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {item.id}
          </span>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
          <CalendarDays size={14} />
          <span>{item.agendaGroup}</span>
        </div>
      </div>

      <div className="mt-5 flex min-w-0 items-start gap-5">
        <img
          src={item.studentPhoto}
          alt={item.studentName}
          className="h-32 w-32 shrink-0 rounded-[2rem] object-cover ring-1 ring-blue-100"
        />

        <div className="min-w-0 flex-1 pt-1">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            {item.studentName}
          </h3>
          <p className="mt-1 text-sm text-slate-500">NIM {item.nim}</p>
          <TitleText type={item.type} title={item.title} />
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100/70">
          <p className="text-xs text-slate-400">Peran Anda</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">{item.role}</p>
        </div>
        <div className="rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100/70">
          <p className="text-xs text-slate-400">Tanggal</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">
            {item.day}, {item.date}
          </p>
        </div>
        <div className="rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100/70">
          <p className="text-xs text-slate-400">Waktu</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">{item.time}</p>
        </div>
        <div className="rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100/70">
          <p className="text-xs text-slate-400">Lokasi</p>
          <p className="mt-1 flex items-center gap-1 truncate text-sm font-semibold text-slate-950">
            {isOnline && <Video size={14} className="text-[#0B63CE]" />}
            {item.location}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-blue-100 pt-5">
        <div className="flex flex-wrap gap-2 text-sm text-slate-500">
          <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
            {item.documentStatus}
          </span>
          <DocumentReadBadge status={item.documentReadStatus} />
          <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
            Jadwal diterima
          </span>
          {item.phaseType === "ongoing" && (
            <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-[#0B63CE] ring-1 ring-blue-100">
              Nilai & feedback sudah dapat diisi
            </span>
          )}
          {item.phaseType === "evaluation" && (
            <span className="rounded-full bg-red-50 px-3 py-1 font-semibold text-red-600 ring-1 ring-red-100">
              Feedback final wajib diisi
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-slate-500">
            {item.phaseType === "evaluation"
              ? "Sidang sudah selesai. Nilai dan feedback final perlu segera dikirim."
              : item.phaseType === "ongoing"
                ? "Sidang sedang berlangsung. Fokus pada dokumen dan pengisian nilai."
                : "Aksi tersedia mengikuti fase sidang saat ini."}
          </p>

          <div className="flex flex-wrap justify-end gap-3">
            {canOpenDocument && (
              <Link
                href={`/reviewer/documents/${item.id}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B63CE] transition hover:bg-blue-50"
              >
                <FileText size={16} />
                Buka Dokumen
              </Link>
            )}

            {shouldShowDetail && (
              <button
                type="button"
                onClick={() => onOpen(item)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                Lihat Detail
                <ChevronRight size={16} />
              </button>
            )}

            {canOpenEvaluation && (
              <Link
                href={`/reviewer/evaluations/${item.id}`}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold shadow-lg transition ${
                  item.phaseType === "evaluation"
                    ? "bg-red-600 text-white shadow-red-600/20 hover:bg-red-700"
                    : "bg-[#0B63CE] text-white shadow-blue-600/20 hover:bg-blue-700"
                }`}
              >
                <MessageSquareText size={16} />
                {item.phaseType === "evaluation"
                  ? "Kirim Nilai & Feedback Final"
                  : "Isi Nilai & Feedback"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-3 border-t border-blue-100 bg-white px-5 py-4 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-slate-500">
        Halaman <span className="font-semibold text-slate-950">{currentPage}</span> dari{" "}
        <span className="font-semibold text-slate-950">{totalPages}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-2xl border border-blue-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Sebelumnya
        </button>

        {pages.map((page) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-semibold transition ${
                isActive
                  ? "bg-[#0B63CE] text-white shadow-lg shadow-blue-600/20"
                  : "bg-blue-50 text-[#0B63CE] ring-1 ring-blue-100 hover:bg-blue-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="rounded-2xl border border-blue-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}

function DetailModal({ item, onClose }) {
  if (!item) return null;

  const reviewers = sessionReviewers[item.id] || [];
  const currentReviewer = reviewers.find((reviewer) => reviewer.isCurrentUser);
  const hasScore = currentReviewer && typeof currentReviewer.score === "number";
  const hasFeedback =
    currentReviewer?.feedback && currentReviewer.feedback.trim().length > 0;
  const criteriaScores = getCriteriaScores(currentReviewer?.score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-950/20 [scrollbar-color:#BFDBFE_transparent] [scrollbar-width:thin]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <TypeBadge type={item.type} />
              <PhaseBadge phase={item.phase} phaseType={item.phaseType} />
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
              Detail Sidang
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Informasi sidang, daftar penelaah yang terlibat, dan penilaian Anda sebagai penelaah.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
            aria-label="Tutup detail sidang"
          >
            ×
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-5 rounded-3xl bg-[#F8FBFF] p-5 ring-1 ring-blue-100 sm:flex-row sm:items-start">
          <img
            src={item.studentPhoto}
            alt={item.studentName}
            className="h-36 w-36 shrink-0 rounded-[2rem] object-cover ring-1 ring-blue-100"
          />

          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-semibold text-slate-950">{item.studentName}</h3>
            <p className="mt-1 text-sm text-slate-500">NIM {item.nim}</p>
            <TitleText type={item.type} title={item.title} />
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-blue-100 bg-white p-4">
            <p className="text-xs text-slate-400">Peran Anda</p>
            <p className="mt-1 text-sm font-semibold text-slate-950">{item.role}</p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-4">
            <p className="text-xs text-slate-400">Tanggal</p>
            <p className="mt-1 text-sm font-semibold text-slate-950">{item.date}</p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-4">
            <p className="text-xs text-slate-400">Waktu</p>
            <p className="mt-1 text-sm font-semibold text-slate-950">{item.time}</p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-4">
            <p className="text-xs text-slate-400">Lokasi</p>
            <p className="mt-1 text-sm font-semibold text-slate-950">{item.location}</p>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-blue-100 bg-white p-5">
          <div>
            <p className="text-sm font-semibold text-slate-950">Penelaah Terlibat</p>
            <p className="mt-1 text-sm text-slate-500">
              Daftar dosen yang bertugas pada sidang ini. Nilai dan feedback penelaah lain tidak ditampilkan.
            </p>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {reviewers.map((reviewer) => (
              <div
                key={`${item.id}-${reviewer.role}`}
                className={`rounded-3xl p-4 ring-1 ${
                  reviewer.isCurrentUser
                    ? "bg-blue-50 ring-blue-200"
                    : "bg-[#F8FBFF] ring-blue-100"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {reviewer.role}
                  </p>
                  <img
                    src={reviewer.photo}
                    alt={reviewer.name}
                    className="mt-4 h-20 w-20 rounded-3xl object-cover ring-1 ring-blue-100"
                  />
                  <p className="mt-4 text-sm font-semibold leading-5 text-slate-950">
                    {reviewer.name}
                  </p>
                  {reviewer.isCurrentUser && (
                    <span className="mt-3 rounded-full bg-[#0B63CE] px-3 py-1 text-xs font-semibold text-white">
                      Anda
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-blue-100 bg-white p-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-950">Penilaian & Feedback Anda</p>
              <p className="mt-1 text-sm text-slate-500">
                Bagian ini hanya menampilkan nilai dan feedback milik Anda sebagai penelaah.
              </p>
            </div>
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
              {currentReviewer?.role || item.role}
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100">
              <p className="text-xs text-slate-400">Total Nilai</p>
              {hasScore ? (
                <p className="mt-1 text-3xl font-semibold text-slate-950">
                  {currentReviewer.score}
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-3xl font-semibold text-slate-300">—</p>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
                    Belum terisi
                  </span>
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100">
              <p className="text-xs text-slate-400">Huruf Mutu</p>
              <p className={`mt-1 text-3xl font-semibold ${hasScore ? "text-slate-950" : "text-slate-300"}`}>
                {hasScore ? getGrade(currentReviewer.score) : "—"}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100">
              <p className="text-xs text-slate-400">Status Feedback</p>
              {hasFeedback ? (
                <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  Sudah terisi
                </span>
              ) : (
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-3xl font-semibold text-slate-300">—</p>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
                    Belum terisi
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-950">Rincian Kriteria</p>
              <span className="text-xs text-slate-400">Sesuai format penilaian SUP</span>
            </div>

            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {(criteriaScores || assessmentCriteria).map((criterion) => (
                <div
                  key={criterion.label}
                  className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 ring-1 ring-blue-100"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-700">
                      {criterion.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Maks. {criterion.maxScore}
                    </p>
                  </div>

                  {hasScore ? (
                    <p className="shrink-0 text-sm font-semibold text-slate-950">
                      {criterion.score}/{criterion.maxScore}
                    </p>
                  ) : (
                    <p className="shrink-0 text-sm font-semibold text-slate-300">—</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100">
            <p className="text-xs text-slate-400">Catatan Feedback Anda</p>
            {hasFeedback ? (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {currentReviewer.feedback}
              </p>
            ) : (
              <div className="mt-2 flex items-center gap-2">
                <p className="text-lg font-semibold text-slate-300">—</p>
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
                  Belum terisi
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center rounded-[2rem] border border-dashed border-blue-200 bg-white p-10 text-center shadow-sm shadow-blue-100/20">
      <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-blue-50 text-[#0B63CE] ring-1 ring-blue-100">
        <Filter size={34} />
      </div>
      <p className="mt-6 text-lg font-semibold text-slate-950">
        Tidak ada sidang yang sesuai filter
      </p>
      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
        Coba ubah filter atau kata kunci pencarian untuk melihat jadwal sidang lainnya.
      </p>
    </div>
  );
}

export default function ReviewerSessionsPage() {
  const ITEMS_PER_PAGE = 5;
  const [typeFilter, setTypeFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredSessions = useMemo(() => {
    return sessions.filter((item) => {
      const matchType = typeFilter === "all" || item.type === typeFilter;
      const matchPeriod =
        periodFilter === "all" ||
        (periodFilter === "today" && item.agendaGroup === "Hari Ini") ||
        (periodFilter === "week" && item.agendaGroup === "Minggu Ini") ||
        (periodFilter === "history" && item.agendaGroup === "Riwayat");
      const matchPhase = phaseFilter === "all" || item.phaseType === phaseFilter;
      const searchText = `${item.studentName} ${item.nim} ${item.title} ${item.type} ${item.role}`.toLowerCase();
      const matchQuery = searchText.includes(query.toLowerCase());
      return matchType && matchPeriod && matchPhase && matchQuery;
    });
  }, [typeFilter, periodFilter, phaseFilter, query]);

  const totalPages = Math.max(Math.ceil(filteredSessions.length / ITEMS_PER_PAGE), 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSessions = filteredSessions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, periodFilter, phaseFilter, query]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const todayCount = sessions.filter((item) => item.agendaGroup === "Hari Ini").length;
  const weekCount = sessions.filter((item) => item.agendaGroup === "Minggu Ini").length;
  const ongoingCount = sessions.filter((item) => item.phaseType === "ongoing").length;
  const evaluationCount = sessions.filter((item) => item.phaseType === "evaluation").length;
  const totalActive = sessions.filter((item) => item.phaseType !== "done").length;

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

        <div className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B63CE] shadow-sm ring-1 ring-blue-100">
          Semester Genap 2025/2026
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <SummaryCard label="Sidang Aktif" value={totalActive} helper="Belum selesai" />
        <SummaryCard label="Hari Ini" value={todayCount} helper="Agenda hari ini" />
        <SummaryCard label="Berlangsung" value={ongoingCount} helper="Nilai bisa diisi" />
        <SummaryCard label="Perlu Nilai" value={evaluationCount} helper="Wajib feedback" />
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                  Agenda Sidang Aktif
                </h2>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
                  {filteredSessions.length} sidang ditemukan
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Semua data di halaman ini sudah diterima. Status utama menunjukkan fase sidang.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-blue-100 bg-[#F8FBFF] p-4">
              <div className="grid gap-4 xl:grid-cols-[1fr_320px] xl:items-end">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <FilterControl
                    label="Tipe Sidang"
                    value={typeFilter}
                    onChange={setTypeFilter}
                    options={typeFilters}
                  />
                  <FilterControl
                    label="Periode"
                    value={periodFilter}
                    onChange={setPeriodFilter}
                    options={periodFilters}
                  />
                  <FilterControl
                    label="Fase Sidang"
                    value={phaseFilter}
                    onChange={setPhaseFilter}
                    options={phaseFilters}
                  />
                </div>

                <label className="block w-full">
                  <span className="mb-1.5 block text-xs font-medium text-slate-400">Pencarian</span>
                  <div className="flex h-11 min-w-0 items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 shadow-sm shadow-blue-100/20">
                    <Search size={17} className="shrink-0 text-slate-400" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Cari nama, NIM, atau judul..."
                      className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-[560px] bg-[#F8FBFF] p-4">
          {filteredSessions.length > 0 ? (
            <div className="space-y-3">
              {paginatedSessions.map((item) => (
                <SessionRow key={item.id} item={item} onOpen={setSelectedItem} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[520px] items-center justify-center">
              <EmptyState />
            </div>
          )}
        </div>

        <div className="min-h-[76px]">
          {filteredSessions.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>

      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
