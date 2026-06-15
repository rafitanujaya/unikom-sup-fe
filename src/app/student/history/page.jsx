"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  History,
  Search,
  X,
  XCircle,
} from "lucide-react";

const ITEMS_PER_PAGE = 5;

const submissionHistory = [
  {
    id: "SUB-SUP-2026-0008",
    attempt: "Pengajuan SUP Ke-8",
    title: "Language Anxiety in Online English Learning Environment",
    submittedAt: "02 Juni 2026, 10:20",
    verifiedAt: "-",
    seminarDate: "-",
    room: "-",
    reviewers: "-",
    status: "processing",
    result: "Menunggu Verifikasi",
    note: "Pengajuan sedang menunggu verifikasi administrasi oleh staff.",
  },
  {
    id: "SUB-SUP-2026-0007",
    attempt: "Pengajuan SUP Ke-7",
    title: "Analysis of Code-Switching in English Literature Classroom",
    submittedAt: "10 Mei 2026, 09:20",
    verifiedAt: "12 Mei 2026, 14:10",
    seminarDate: "20 Mei 2026",
    room: "R5340",
    reviewers: "3 Dosen",
    status: "verified",
    result: "Menunggu Seminar",
    note: "Pengajuan telah diverifikasi. Jadwal seminar sudah ditentukan oleh program studi.",
  },
  {
    id: "SUB-SUP-2026-0006",
    attempt: "Pengajuan SUP Ke-6",
    title: "The Use of Figurative Language in Modern English Poetry",
    submittedAt: "18 Maret 2026, 13:45",
    verifiedAt: "20 Maret 2026, 10:20",
    seminarDate: "28 Maret 2026",
    room: "R5210",
    reviewers: "3 Dosen",
    status: "failed",
    result: "Tidak Lulus",
    note: "Mahasiswa perlu melakukan pengajuan ulang dengan perbaikan topik dan dokumen proposal.",
  },
  {
    id: "SUB-SUP-2026-0005",
    attempt: "Pengajuan SUP Ke-5",
    title: "Code-Mixing Phenomena in Student Online Discussion",
    submittedAt: "05 Maret 2026, 08:30",
    verifiedAt: "-",
    seminarDate: "-",
    room: "-",
    reviewers: "-",
    status: "rejected",
    result: "Ditolak Administratif",
    note: "Dokumen tidak lengkap dan belum memenuhi ketentuan administrasi pengajuan SUP.",
  },
  {
    id: "SUB-SUP-2026-0004",
    attempt: "Pengajuan SUP Ke-4",
    title: "Students' Perception Toward English Speaking Practice",
    submittedAt: "12 Februari 2026, 15:00",
    verifiedAt: "14 Februari 2026, 09:30",
    seminarDate: "22 Februari 2026",
    room: "R5220",
    reviewers: "3 Dosen",
    status: "passed",
    result: "Lulus",
    note: "Pengajuan telah selesai dan hasil seminar sudah tersedia.",
  },
  {
    id: "SUB-SUP-2026-0003",
    attempt: "Pengajuan SUP Ke-3",
    title: "Translation Accuracy in Indonesian Subtitle of English Movie",
    submittedAt: "24 Januari 2026, 11:10",
    verifiedAt: "-",
    seminarDate: "-",
    room: "-",
    reviewers: "-",
    status: "rejected",
    result: "Ditolak Administratif",
    note: "File proposal yang diunggah tidak sesuai format PDF final.",
  },
  {
    id: "SUB-SUP-2026-0002",
    attempt: "Pengajuan SUP Ke-2",
    title: "Discourse Markers in English Classroom Interaction",
    submittedAt: "15 Januari 2026, 09:45",
    verifiedAt: "18 Januari 2026, 13:00",
    seminarDate: "25 Januari 2026",
    room: "R5310",
    reviewers: "3 Dosen",
    status: "failed",
    result: "Tidak Lulus",
    note: "Topik perlu diperjelas dan metode penelitian perlu diperbaiki.",
  },
  {
    id: "SUB-SUP-2026-0001",
    attempt: "Pengajuan SUP Ke-1",
    title: "Vocabulary Learning Strategies Used by First-Year Students",
    submittedAt: "03 Januari 2026, 08:15",
    verifiedAt: "05 Januari 2026, 10:00",
    seminarDate: "12 Januari 2026",
    room: "R5102",
    reviewers: "3 Dosen",
    status: "passed",
    result: "Lulus",
    note: "Pengajuan telah selesai dan hasil seminar sudah tersedia.",
  },
];

function getResultStyle(result) {
  if (result === "Lulus") {
    return {
      badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
      iconBox: "bg-emerald-50 text-emerald-600 ring-emerald-100",
      icon: CheckCircle2,
    };
  }

  if (result === "Tidak Lulus") {
    return {
      badge: "bg-red-50 text-red-700 ring-red-100",
      iconBox: "bg-red-50 text-red-600 ring-red-100",
      icon: XCircle,
    };
  }

  if (result === "Ditolak Administratif") {
    return {
      badge: "bg-amber-50 text-amber-700 ring-amber-100",
      iconBox: "bg-amber-50 text-amber-600 ring-amber-100",
      icon: AlertTriangle,
    };
  }

  if (result === "Menunggu Seminar") {
    return {
      badge: "bg-blue-50 text-primary ring-blue-100",
      iconBox: "bg-blue-50 text-primary ring-blue-100",
      icon: CheckCircle2,
    };
  }

  return {
    badge: "bg-blue-50 text-primary ring-blue-100",
    iconBox: "bg-blue-50 text-primary ring-blue-100",
    icon: Clock3,
  };
}

export default function StudentHistoryPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSubmissions = useMemo(() => {
    const keyword = search.toLowerCase();

    return submissionHistory.filter((submission) =>
      submission.title.toLowerCase().includes(keyword),
    );
  }, [search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE),
  );

  const paginatedSubmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredSubmissions.slice(startIndex, endIndex);
  }, [currentPage, filteredSubmissions]);

  const startItem =
    filteredSubmissions.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredSubmissions.length,
  );

  function handleSearchChange(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  return (
    <div className="pb-8 font-[Poppins]">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
            Riwayat SUP
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
            Lihat riwayat pengajuan SUP yang pernah kamu ajukan.
          </p>
        </div>
      </div>

      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                  Daftar Riwayat
                </h3>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                  {filteredSubmissions.length} riwayat
                </span>
              </div>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Riwayat pengajuan ditampilkan dari yang terbaru.
              </p>
            </div>

            <SearchInput value={search} onChange={handleSearchChange} />
          </div>
        </div>

        {filteredSubmissions.length > 0 ? (
          <>
            <div className="divide-y divide-blue-100">
              {paginatedSubmissions.map((submission) => (
                <HistoryListItem key={submission.id} submission={submission} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              startItem={startItem}
              endItem={endItem}
              totalItems={filteredSubmissions.length}
              onPrevious={() => goToPage(currentPage - 1)}
              onNext={() => goToPage(currentPage + 1)}
              onPageChange={goToPage}
            />
          </>
        ) : (
          <EmptyHistory />
        )}
      </section>
    </div>
  );
}

function SearchInput({ value, onChange }) {
  return (
    <label className="relative block w-full xl:max-w-md">
      <Search
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cari judul pengajuan..."
        className="h-11 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] pl-11 pr-11 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-blue-50 hover:text-primary"
          aria-label="Hapus pencarian"
        >
          <X size={16} />
        </button>
      )}
    </label>
  );
}

function HistoryListItem({ submission }) {
  const resultStyle = getResultStyle(submission.result);
  const ResultIcon = resultStyle.icon;

  return (
    <article className="group p-5 transition hover:bg-blue-50/40">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 ${resultStyle.iconBox}`}
          >
            <ResultIcon size={20} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                {submission.attempt}
              </p>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${resultStyle.badge}`}
              >
                {submission.result}
              </span>
            </div>

            <h4 className="mt-2 max-w-4xl text-base font-semibold leading-6 text-slate-950">
              {submission.title}
            </h4>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
              <span>
                Diajukan:{" "}
                <span className="font-semibold text-slate-700">
                  {submission.submittedAt}
                </span>
              </span>

              {submission.seminarDate !== "-" && (
                <span>
                  Jadwal:{" "}
                  <span className="font-semibold text-slate-700">
                    {submission.seminarDate}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

        <Link
          href={`/student/history/${submission.id}`}
          className="inline-flex w-fit shrink-0 items-center gap-1 rounded-xl px-2 py-1 text-sm font-semibold text-primary transition hover:bg-blue-50 hover:text-primary-dark"
        >
          Detail
          <ChevronRight size={15} />
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
  return (
    <div className="flex flex-col gap-4 border-t border-blue-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Menampilkan{" "}
        <span className="font-semibold text-slate-800">{startItem}</span>
        {" - "}
        <span className="font-semibold text-slate-800">{endItem}</span>
        {" dari "}
        <span className="font-semibold text-slate-800">{totalItems}</span>
        {" riwayat"}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-slate-500 transition hover:bg-blue-50 hover:text-primary disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300"
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`flex h-10 min-w-10 items-center justify-center rounded-2xl px-3 text-sm font-semibold transition ${
                currentPage === page
                  ? "bg-primary text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-500 hover:bg-blue-50 hover:text-primary"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-slate-500 transition hover:bg-blue-50 hover:text-primary disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300"
          aria-label="Halaman berikutnya"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function EmptyHistory() {
  return (
    <div className="px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-primary ring-1 ring-blue-100">
        <History size={24} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950">
        Riwayat Tidak Ditemukan
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Tidak ada riwayat pengajuan SUP yang sesuai dengan judul yang dicari.
      </p>
    </div>
  );
}