"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  Filter,
  MessageSquareText,
  Search,
} from "lucide-react";

const assessmentCriteria = [
  { id: "abstrak", label: "ABSTRAK", maxScore: 10 },
  { id: "pendahuluan", label: "PENDAHULUAN", maxScore: 20 },
  { id: "kajian_pustaka", label: "KAJIAN PUSTAKA", maxScore: 20 },
  { id: "metode", label: "METODE / KERANGKA TEORETIS", maxScore: 25 },
  { id: "hipotesis", label: "HIPOTESIS HASIL DAN PEMBAHASAN", maxScore: 10 },
  { id: "penyajian", label: "PENYAJIAN", maxScore: 15 },
];

const evaluationItems = [
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
    status: "Sedang Berlangsung",
    statusType: "ongoing",
    documentStatus: "Draft Skripsi sudah dibuka",
    scores: {
      abstrak: 8,
      pendahuluan: 16,
      kajian_pustaka: "",
      metode: "",
      hipotesis: "",
      penyajian: "",
    },
    feedback:
      "Catatan awal: mahasiswa perlu memperjelas contoh data percakapan yang digunakan.",
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
    status: "Perlu Nilai & Feedback",
    statusType: "evaluation",
    documentStatus: "Draft Skripsi sudah dibuka",
    scores: {
      abstrak: "",
      pendahuluan: "",
      kajian_pustaka: "",
      metode: "",
      hipotesis: "",
      penyajian: "",
    },
    feedback: "",
  },

];

const statusFilters = [
  { label: "Semua Status", value: "all" },
  { label: "Sedang Berlangsung", value: "ongoing" },
  { label: "Perlu Final", value: "evaluation" },
];

function TypeBadge({ type }) {
  return (
    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
      {type}
    </span>
  );
}

function StatusBadge({ status, statusType }) {
  const styles = {
    ongoing: "bg-blue-50 text-[#0B63CE] ring-blue-100",
    evaluation: "bg-red-50 text-red-600 ring-red-100",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${styles[statusType]}`}>
      {status}
    </span>
  );
}

function calculateTotal(scores) {
  return assessmentCriteria.reduce((total, criterion) => {
    const value = Number(scores?.[criterion.id]);
    return Number.isFinite(value) ? total + value : total;
  }, 0);
}

function countCompletedCriteria(scores) {
  return assessmentCriteria.filter((criterion) => {
    const value = Number(scores?.[criterion.id]);
    return Number.isFinite(value) && value >= 0;
  }).length;
}

function isAssessmentComplete(scores, feedback) {
  const allScoresFilled = assessmentCriteria.every((criterion) => {
    const value = Number(scores?.[criterion.id]);
    return Number.isFinite(value) && value >= 0 && value <= criterion.maxScore;
  });

  return allScoresFilled && feedback.trim().length > 0;
}

function getActionLabel(item, scores, feedback) {
  const complete = isAssessmentComplete(scores, feedback);

  if (item.statusType === "evaluation") {
    return complete ? "Kirim Nilai & Feedback" : "Isi Nilai & Feedback";
  }

  return complete ? "Kirim Nilai & Feedback" : "Isi Nilai & Feedback";
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

function EvaluationCard({ item }) {
  const total = calculateTotal(item.scores);
  const completedCriteria = countCompletedCriteria(item.scores);
  const complete = isAssessmentComplete(item.scores, item.feedback);
  const actionLabel = getActionLabel(item, item.scores, item.feedback);

  return (
    <article className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/20 transition hover:border-blue-200 hover:shadow-md hover:shadow-blue-100/40">
      <div className="flex min-w-0 gap-5">
        <img
          src={item.studentPhoto}
          alt={item.studentName}
          className="h-28 w-28 shrink-0 rounded-[1.75rem] object-cover ring-1 ring-blue-100"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={item.type} />
            <StatusBadge status={item.status} statusType={item.statusType} />{complete && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
                  Nilai lengkap
                </span>
              )}
          </div>

          <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-950">
            {item.studentName}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            NIM {item.nim} • {item.role}
          </p>

          <div className="mt-3">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Judul {item.type === "SUP" ? "Proposal" : "Skripsi"}
            </p>
            <p className="mt-1.5 line-clamp-2 text-sm font-semibold leading-6 text-slate-950">
              {item.title}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100/70">
          <p className="text-xs text-slate-400">Jadwal</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">
            {item.day}, {item.date}
          </p>
        </div>
        <div className="rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100/70">
          <p className="text-xs text-slate-400">Waktu</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">{item.time}</p>
        </div>
        <div className="rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100/70">
          <p className="text-xs text-slate-400">Kriteria Terisi</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">
            {completedCriteria}/{assessmentCriteria.length}
          </p>
        </div>
        <div className="rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100/70">
          <p className="text-xs text-slate-400">Total Sementara</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">
            {completedCriteria > 0 ? total : "—"}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-blue-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
            {item.documentStatus}
          </span>
          <span
            className={`rounded-full px-3 py-1 ring-1 ${
              item.feedback.trim()
                ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                : "bg-amber-50 text-amber-700 ring-amber-100"
            }`}
          >
            Feedback {item.feedback.trim() ? "sudah terisi" : "belum terisi"}
          </span>
        </div>

        <Link
          href={`/reviewer/evaluations/${item.id}`}
          className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg transition ${
            item.statusType === "evaluation"
              ? "bg-red-600 text-white shadow-red-600/20 hover:bg-red-700"
              : "bg-[#0B63CE] text-white shadow-blue-600/20 hover:bg-blue-700"
          }`}
        >
          {actionLabel}
          <ChevronRight size={16} />
        </Link>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center rounded-[2rem] border border-dashed border-blue-200 bg-white p-10 text-center shadow-sm shadow-blue-100/20">
      <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-blue-50 text-[#0B63CE] ring-1 ring-blue-100">
        <Filter size={34} />
      </div>
      <p className="mt-6 text-lg font-semibold text-slate-950">
        Tidak ada penilaian yang sesuai filter
      </p>
      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
        Coba ubah filter status atau kata kunci pencarian untuk melihat sidang lainnya.
      </p>
    </div>
  );
}

export default function ReviewerEvaluationsPage() {
  const ITEMS_PER_PAGE = 5;
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return evaluationItems.filter((item) => {
      const matchStatus = statusFilter === "all" || item.statusType === statusFilter;
      const searchText = `${item.studentName} ${item.nim} ${item.title} ${item.type} ${item.role}`.toLowerCase();
      const matchQuery = searchText.includes(query.toLowerCase());
      return matchStatus && matchQuery;
    });
  }, [query, statusFilter]);

  const totalPages = Math.max(Math.ceil(filteredItems.length / ITEMS_PER_PAGE), 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="space-y-6 font-[Poppins]">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            Penilaian & Feedback
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 md:text-base">
            Pilih sidang yang ingin dinilai, lalu masuk ke halaman fokus penilaian untuk mengisi nilai dan feedback final.
          </p>
        </div>

        <div className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B63CE] shadow-sm ring-1 ring-blue-100">
          Semester Genap 2025/2026
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-medium text-[#0B63CE]">Daftar Penilaian</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
              Pilih sidang yang ingin dinilai
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Halaman ini hanya menampilkan sidang yang masih perlu dinilai. Sidang yang selesai dapat dilihat di Daftar Sidang.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <label className="block md:w-56">
              <span className="mb-1.5 block text-xs font-medium text-slate-400">Status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-11 w-full rounded-2xl border border-blue-100 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#0B63CE] focus:ring-4 focus:ring-blue-100"
              >
                {statusFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block md:w-80">
              <span className="mb-1.5 block text-xs font-medium text-slate-400">Pencarian</span>
              <div className="flex h-11 items-center gap-3 rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4">
                <Search size={17} className="text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari nama, NIM, atau judul..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </label>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="min-h-[560px] bg-[#F8FBFF] p-4">
          {filteredItems.length > 0 ? (
            <div className="space-y-3">
              {paginatedItems.map((item) => (
                <EvaluationCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[520px] items-center justify-center">
              <EmptyState />
            </div>
          )}
        </div>

        <div className="min-h-[76px]">
          {filteredItems.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>
    </div>
  );
}
