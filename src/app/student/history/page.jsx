"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  GraduationCap,
  History,
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
    status: "verified",
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
    status: "verified",
    result: "Lulus",
    note: "Pengajuan telah selesai dan hasil seminar sudah tersedia.",
  },
];

const historyStats = [
  {
    label: "Total Pengajuan",
    value: submissionHistory.length,
    icon: History,
  },
  {
    label: "Pengajuan Aktif",
    value: submissionHistory.filter((item) => item.status === "processing").length,
    icon: Clock3,
  },
  {
    label: "Terverifikasi",
    value: submissionHistory.filter((item) => item.status === "verified").length,
    icon: CheckCircle2,
  },
  {
    label: "Tidak Lulus / Ditolak",
    value: submissionHistory.filter((item) => ["failed", "rejected"].includes(item.status)).length,
    icon: XCircle,
  },
];

function getStatusStyle(status) {
  if (status === "verified") {
    return {
      label: "Terverifikasi",
      badge: "bg-green-50 text-green-600",
      icon: CheckCircle2,
      iconBox: "bg-green-50 text-green-600",
    };
  }

  if (status === "failed") {
    return {
      label: "Tidak Lulus",
      badge: "bg-red-50 text-red-600",
      icon: XCircle,
      iconBox: "bg-red-50 text-red-600",
    };
  }

  if (status === "rejected") {
    return {
      label: "Ditolak",
      badge: "bg-amber-50 text-amber-600",
      icon: AlertTriangle,
      iconBox: "bg-amber-50 text-amber-600",
    };
  }

  return {
    label: "Diproses",
    badge: "bg-blue-50 text-primary",
    icon: Clock3,
    iconBox: "bg-blue-50 text-primary",
  };
}

export default function StudentHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(submissionHistory.length / ITEMS_PER_PAGE);

  const paginatedSubmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return submissionHistory.slice(startIndex, endIndex);
  }, [currentPage]);

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, submissionHistory.length);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-900">
            Riwayat SUP
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
            Lihat seluruh riwayat pengajuan SUP, termasuk pengajuan aktif, pengajuan yang ditolak, dan hasil pengajuan sebelumnya.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {historyStats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                <Icon size={22} />
              </div>
              <p className="mt-5 text-sm text-slate-500">{item.label}</p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Menampilkan <span className="font-semibold text-slate-800">{startItem}-{endItem}</span> dari{" "}
          <span className="font-semibold text-slate-800">{submissionHistory.length}</span> riwayat pengajuan
        </p>

        <p className="text-sm text-slate-400">
          {ITEMS_PER_PAGE} data per halaman
        </p>
      </div>

      <div className="mt-4 space-y-4">
        {paginatedSubmissions.map((submission) => {
          const status = getStatusStyle(submission.status);
          const StatusIcon = status.icon;

          return (
            <article
              key={submission.id}
              className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:ring-blue-100"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex min-w-0 gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${status.iconBox}`}
                  >
                    <StatusIcon size={22} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                        {submission.attempt}
                      </p>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.badge}`}>
                        {status.label}
                      </span>
                    </div>

                    <h3 className="mt-2 max-w-4xl text-xl font-semibold tracking-tight text-slate-950">
                      {submission.title}
                    </h3>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                      {submission.note}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/student/history/${submission.id}`}
                  className="inline-flex h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-2xl bg-blue-50 px-4 text-sm font-semibold text-primary ring-1 ring-blue-100 transition-all duration-300 hover:bg-blue-100 hover:text-primary-dark"
                >
                  <Eye size={17} />
                  Detail
                </Link>
              </div>

              <div className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 md:grid-cols-2 xl:grid-cols-4">
                <HistoryInfo icon={FileText} label="ID Pengajuan" value={submission.id} />
                <HistoryInfo icon={CalendarDays} label="Tanggal Pengajuan" value={submission.submittedAt} />
                <HistoryInfo icon={CalendarDays} label="Jadwal Seminar" value={submission.seminarDate} />
                <HistoryInfo icon={BookOpenCheck} label="Hasil" value={submission.result} />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <SmallInfo icon={CheckCircle2} label="Terverifikasi Pada" value={submission.verifiedAt} />
                <SmallInfo icon={GraduationCap} label="Reviewer" value={submission.reviewers} />
                <SmallInfo icon={CalendarDays} label="Ruangan" value={submission.room} />
              </div>
            </article>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex flex-col gap-4 rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Halaman <span className="font-semibold text-slate-900">{currentPage}</span> dari{" "}
            <span className="font-semibold text-slate-900">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-slate-50 text-slate-600 ring-1 ring-slate-200 transition-all duration-300 hover:bg-blue-50 hover:text-primary disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={`h-10 min-w-10 cursor-pointer rounded-2xl px-3 text-sm font-semibold transition-all duration-300 ${
                  currentPage === page
                    ? "bg-primary text-white shadow-lg shadow-blue-600/20"
                    : "bg-slate-50 text-slate-600 ring-1 ring-slate-200 hover:bg-blue-50 hover:text-primary"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-slate-50 text-slate-600 ring-1 ring-slate-200 transition-all duration-300 hover:bg-blue-50 hover:text-primary disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function HistoryInfo({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-primary ring-1 ring-blue-100">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function SmallInfo({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500">
        <Icon size={17} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}
