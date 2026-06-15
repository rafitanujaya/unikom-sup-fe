"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  MessageSquareText,
  Search,
  X,
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

const ITEMS_PER_PAGE = 5;

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
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
        styles[statusType]
      }`}
    >
      {status}
    </span>
  );
}

function ProgressBadge({ isComplete, hasDraft }) {
  if (isComplete) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
        <CheckCircle2 size={13} />
        Nilai Lengkap
      </span>
    );
  }

  if (hasDraft) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
        <MessageSquareText size={13} />
        Draft Nilai
      </span>
    );
  }

  return null;
}

function calculateTotal(scores) {
  return assessmentCriteria.reduce((total, criterion) => {
    const rawValue = scores?.[criterion.id];
    const value = rawValue === "" ? NaN : Number(rawValue);

    return Number.isFinite(value) ? total + value : total;
  }, 0);
}

function countCompletedCriteria(scores) {
  return assessmentCriteria.filter((criterion) => {
    const rawValue = scores?.[criterion.id];
    const value = rawValue === "" ? NaN : Number(rawValue);

    return (
      Number.isFinite(value) && value >= 0 && value <= criterion.maxScore
    );
  }).length;
}

function hasDraftValue(scores, feedback) {
  const hasAnyScore = assessmentCriteria.some((criterion) => {
    const rawValue = scores?.[criterion.id];
    const value = rawValue === "" ? NaN : Number(rawValue);

    return Number.isFinite(value);
  });

  return hasAnyScore || feedback.trim().length > 0;
}

function isAssessmentComplete(scores, feedback) {
  const allScoresFilled = assessmentCriteria.every((criterion) => {
    const rawValue = scores?.[criterion.id];
    const value = rawValue === "" ? NaN : Number(rawValue);

    return (
      Number.isFinite(value) && value >= 0 && value <= criterion.maxScore
    );
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

function getRowDescription(item, isComplete, hasDraft) {
  if (isComplete) {
    return "Nilai sudah lengkap dan siap dikirim.";
  }

  if (hasDraft) {
    return "Draft nilai sudah tersimpan, lanjutkan sampai lengkap.";
  }

  if (item.statusType === "evaluation") {
    return "Sidang membutuhkan nilai dan feedback final.";
  }

  return "Nilai dan feedback dapat mulai dilengkapi.";
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

function StatusFilter({ value, onChange }) {
  return (
    <label className="relative block w-full sm:w-[220px]">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#0B63CE] focus:bg-white focus:ring-4 focus:ring-blue-100"
      >
        {statusFilters.map((filter) => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={17}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </label>
  );
}

function InfoCard({ label, value, tone = "default" }) {
  const styles = {
    default: "bg-white text-slate-950 ring-blue-100",
    blue: "bg-blue-50 text-[#0B63CE] ring-blue-100",
    amber: "bg-amber-50 text-amber-800 ring-amber-100",
    emerald: "bg-emerald-50 text-emerald-800 ring-emerald-100",
  };

  const labelStyles = {
    default: "text-slate-400",
    blue: "text-[#0B63CE]",
    amber: "text-amber-600",
    emerald: "text-emerald-600",
  };

  return (
    <div className={`min-w-0 rounded-2xl px-4 py-3 ring-1 ${styles[tone]}`}>
      <p className={`text-xs font-medium ${labelStyles[tone]}`}>{label}</p>

      <p className="mt-1 truncate text-sm font-semibold">{value}</p>
    </div>
  );
}

function EvaluationRow({ item }) {
  const total = calculateTotal(item.scores);
  const completedCriteria = countCompletedCriteria(item.scores);
  const complete = isAssessmentComplete(item.scores, item.feedback);
  const draft = hasDraftValue(item.scores, item.feedback);
  const actionLabel = getActionLabel(item, item.scores, item.feedback);
  const hasAnyScore = completedCriteria > 0;

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
              <StatusBadge status={item.status} statusType={item.statusType} />
              <ProgressBadge isComplete={complete} hasDraft={draft} />

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

        <div className="flex w-fit shrink-0 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100 xl:mt-1">
          {item.documentStatus}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard label="Jadwal" value={`${item.day}, ${item.date}`} />
        <InfoCard label="Waktu" value={item.time} />
        <InfoCard
          label="Kriteria Terisi"
          value={`${completedCriteria}/${assessmentCriteria.length}`}
          tone={complete ? "emerald" : draft ? "blue" : "default"}
        />
        <InfoCard
          label="Total Sementara"
          value={hasAnyScore ? total : "—"}
          tone={hasAnyScore ? "blue" : "default"}
        />
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-blue-100 pt-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl text-sm leading-6 text-slate-500">
          {getRowDescription(item, complete, draft)}
        </p>

        <Link
          href={`/reviewer/evaluations/${item.id}`}
          className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold text-white shadow-lg transition ${
            item.statusType === "evaluation"
              ? "bg-red-600 shadow-red-600/20 hover:bg-red-700"
              : "bg-[#0B63CE] shadow-blue-600/20 hover:bg-blue-700"
          }`}
        >
          <MessageSquareText size={16} />
          {actionLabel}
          <ChevronRight size={16} />
        </Link>
      </div>
    </article>
  );
}

function Pagination({
  currentPage,
  totalPages,
  startItem,
  endItem,
  totalItems,
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
        Tidak ada penilaian yang sesuai
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Coba ubah filter status atau kata kunci pencarian untuk melihat sidang
        lainnya.
      </p>
    </div>
  );
}

function WarningNotice({ count }) {
  if (count === 0) return null;

  return (
    <section className="rounded-[1.5rem] border border-amber-100 bg-amber-50 p-5 shadow-sm shadow-amber-100/30">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-600 ring-1 ring-amber-100">
          <AlertCircle size={22} />
        </div>

        <div>
          <h2 className="text-base font-semibold tracking-tight text-amber-900">
            Ada penilaian yang belum lengkap
          </h2>

          <p className="mt-1 max-w-3xl text-sm leading-6 text-amber-700">
            {count} sidang masih membutuhkan nilai atau feedback final dari
            Anda.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ReviewerEvaluationsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return evaluationItems.filter((item) => {
      const matchStatus =
        statusFilter === "all" || item.statusType === statusFilter;

      const searchText =
        `${item.studentName} ${item.nim} ${item.title} ${item.type} ${item.role}`.toLowerCase();

      const matchQuery = searchText.includes(query.toLowerCase());

      return matchStatus && matchQuery;
    });
  }, [query, statusFilter]);

  const incompleteCount = evaluationItems.filter(
    (item) => !isAssessmentComplete(item.scores, item.feedback),
  ).length;

  const totalPages = Math.max(
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
    1,
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const startItem =
    filteredItems.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length);

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
            Pilih sidang yang ingin dinilai, lalu masuk ke halaman fokus
            penilaian untuk mengisi nilai dan feedback final.
          </p>
        </div>

        <div className="w-fit rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B63CE] shadow-sm ring-1 ring-blue-100">
          Semester Genap 2025/2026
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                  Daftar Penilaian
                </h2>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
                  {filteredItems.length} sidang ditemukan
                </span>
              </div>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Cari sidang berdasarkan nama, NIM, judul, atau peran.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchInput value={query} onChange={setQuery} />
              <StatusFilter value={statusFilter} onChange={setStatusFilter} />
            </div>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div>
            {paginatedItems.map((item) => (
              <EvaluationRow key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

        {filteredItems.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startItem={startItem}
            endItem={endItem}
            totalItems={filteredItems.length}
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