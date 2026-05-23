"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileText,
  MessageSquareText,
  XCircle,
} from "lucide-react";

const reviewer = {
  name: "Dr. Tatan Tawami, M.Hum.",
  role: "Ketua Penelaah",
  nidn: "0412087601",
};

const summaryCards = [
  {
    title: "Total Penugasan Aktif",
    value: "12",
    description: "SUP dan Sidang Skripsi",
  },
  {
    title: "Menunggu Konfirmasi",
    value: "4",
    description: "Jadwal perlu direspons",
  },
  {
    title: "Jadwal Terkonfirmasi",
    value: "7",
    description: "Siap direview dokumennya",
  },
  {
    title: "Sidang Hari Ini",
    value: "2",
    description: "Agenda yang perlu dihadiri",
  },
];

const confirmationTasks = [
  {
    id: "SUP-2026-001",
    type: "SUP",
    studentName: "Alya Putri Ramadhani",
    nim: "2204101001",
    studentPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    title: "Representation of Identity in Contemporary British Fiction",
    role: "Ketua Penelaah",
    date: "18 Mei 2026",
    time: "09.00 - 10.30",
    location: "Ruang Sidang FIB 2",
    examiners: [
      {
        name: "Dr. Tatan Tawami, M.Hum.",
        role: "Ketua Penelaah",
        photo:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: true,
      },
      {
        name: "Dr. Nia Kurniawati, M.Hum.",
        role: "Penelaah 1",
        photo:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
      {
        name: "Rahmat Gunawan, M.Hum.",
        role: "Penelaah 2",
        photo:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
    ],
  },
  {
    id: "SKR-2026-008",
    type: "Sidang Skripsi",
    studentName: "Dimas Pradipta",
    nim: "2204101034",
    studentPhoto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    title: "Translation Strategies in Indonesian Subtitled Films",
    role: "Penelaah 1",
    date: "19 Mei 2026",
    time: "10.00 - 11.30",
    location: "Google Meet",
    examiners: [
      {
        name: "Prof. Dr. Herry Supriyadi, M.Hum.",
        role: "Ketua Penelaah",
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
      {
        name: "Dr. Tatan Tawami, M.Hum.",
        role: "Penelaah 1",
        photo:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: true,
      },
      {
        name: "Dewi Saraswati, M.Hum.",
        role: "Penelaah 2",
        photo:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
    ],
  },
  {
    id: "SUP-2026-011",
    type: "SUP",
    studentName: "Salsa Nabila",
    nim: "2204101041",
    studentPhoto:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    title: "Reader Response Analysis in Young Adult Literature",
    role: "Penelaah 2",
    date: "23 Mei 2026",
    time: "08.00 - 09.30",
    location: "Ruang Sidang FIB 1",
    examiners: [
      {
        name: "Dr. Lilis Suryani, M.Hum.",
        role: "Ketua Penelaah",
        photo:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
      {
        name: "Agus Setiawan, M.Hum.",
        role: "Penelaah 1",
        photo:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
      {
        name: "Dr. Tatan Tawami, M.Hum.",
        role: "Penelaah 2",
        photo:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: true,
      },
    ],
  },
  {
    id: "SKR-2026-014",
    type: "Sidang Skripsi",
    studentName: "Reno Mahendra",
    nim: "2204101050",
    studentPhoto:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    title: "Speech Act Analysis in Academic Presentation",
    role: "Ketua Penelaah",
    date: "25 Mei 2026",
    time: "13.00 - 14.30",
    location: "Ruang Sidang FIB 2",
    examiners: [
      {
        name: "Dr. Tatan Tawami, M.Hum.",
        role: "Ketua Penelaah",
        photo:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: true,
      },
      {
        name: "Rina Marlina, M.Hum.",
        role: "Penelaah 1",
        photo:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
      {
        name: "Budi Firmansyah, M.Hum.",
        role: "Penelaah 2",
        photo:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
    ],
  },
];

const documentReviews = [
  {
    id: "SUP-2026-002",
    type: "SUP",
    studentName: "Raka Wiratama",
    nim: "2204101017",
    studentPhoto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    title: "Code Switching in Indonesian English Classroom Interaction",
    document: "Draft Proposal",
    date: "20 Mei 2026",
    time: "13.00 - 14.30",
    location: "Google Meet",
    role: "Penelaah 1",
    status: "Belum dibuka",
    href: "/reviewer/documents/SUP-2026-002",
  },
  {
    id: "SKR-2026-006",
    type: "Sidang Skripsi",
    studentName: "Maya Anindya",
    nim: "2204101028",
    studentPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    title: "Politeness Strategies in English Debate Performance",
    document: "Draft Skripsi",
    date: "21 Mei 2026",
    time: "08.00 - 09.30",
    location: "Ruang Sidang FIB 1",
    role: "Ketua Penelaah",
    status: "Sudah dibuka",
    href: "/reviewer/documents/SKR-2026-006",
  },
];

const feedbackTasks = [
  {
    id: "SKR-2026-003",
    type: "Sidang Skripsi",
    studentName: "Nadia Larasati",
    nim: "2204101022",
    studentPhoto:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    title: "Feminist Reading of Selected Short Stories",
    role: "Penelaah 2",
    startedAt: "13 Mei 2026, 10.00",
    status: "Sidang sedang berlangsung",
    note: "Nilai dan feedback dapat diisi setelah sidang dimulai, lalu wajib dikirim final sebelum proses penelaah selesai.",
    href: "/reviewer/assessment/SKR-2026-003",
  },
];

const upcomingSessions = [
  {
    id: "SUP-2026-002",
    type: "SUP",
    studentName: "Raka Wiratama",
    role: "Penelaah 1",
    day: "Senin",
    date: "20 Mei 2026",
    time: "13.00 - 14.30",
    location: "Google Meet",
    status: "Terkonfirmasi",
  },
  {
    id: "SKR-2026-006",
    type: "Sidang Skripsi",
    studentName: "Maya Anindya",
    role: "Ketua Penelaah",
    day: "Selasa",
    date: "21 Mei 2026",
    time: "08.00 - 09.30",
    location: "Ruang Sidang FIB 1",
    status: "Terkonfirmasi",
  },
  {
    id: "SUP-2026-010",
    type: "SUP",
    studentName: "Fauzan Hakim",
    role: "Penelaah 2",
    day: "Kamis",
    date: "24 Mei 2026",
    time: "10.00 - 11.30",
    location: "Ruang Sidang FIB 2",
    status: "Terkonfirmasi",
  },
  {
    id: "SKR-2026-015",
    type: "Sidang Skripsi",
    studentName: "Citra Wulandari",
    role: "Penelaah 1",
    day: "Sabtu",
    date: "26 Mei 2026",
    time: "09.00 - 10.30",
    location: "Ruang Sidang FIB 1",
    status: "Terkonfirmasi",
  },
];

function SummaryCard({ item }) {
  return (
    <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-100/50">
      <div className="flex min-h-[150px] flex-col justify-between">
        <div>
          <p className="text-base font-medium text-slate-500">{item.title}</p>
          <h3 className="mt-4 text-5xl font-semibold leading-none tracking-tight text-slate-950">
            {item.value}
          </h3>
        </div>
        <p className="mt-5 text-sm leading-5 text-slate-500">{item.description}</p>
      </div>
    </div>
  );
}

function TypeBadge({ type }) {
  return (
    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
      {type}
    </span>
  );
}

function DocumentStatusBadge({ status }) {
  const isUnread = status.toLowerCase().includes("belum");

  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
        isUnread
          ? "bg-amber-50 text-amber-700 ring-amber-100"
          : "bg-emerald-50 text-emerald-700 ring-emerald-100"
      }`}
    >
      {status}
    </span>
  );
}

function TitleBlock({ type, title, variant = "blue" }) {
  const labelColor = variant === "red" ? "text-red-500" : "text-slate-400";

  return (
    <div className="mt-3">
      <p className={`text-xs font-medium uppercase tracking-[0.14em] ${labelColor}`}>
        Judul {type === "SUP" ? "Proposal" : "Skripsi"}
      </p>
      <p className="mt-1.5 line-clamp-2 text-sm font-semibold leading-6 text-slate-950">
        {title}
      </p>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-3xl border border-dashed border-blue-200 bg-white/70 p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0B63CE] ring-1 ring-blue-100">
        <Icon size={22} />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-950">{title}</p>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function GoogleCalendarFrame() {
  const publicCalendarId = "your_public_calendar_id@group.calendar.google.com";
  const embedUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
    publicCalendarId
  )}&ctz=Asia%2FJakarta&hl=id&mode=MONTH&showTitle=0&showNav=1&showDate=1&showTabs=0&showCalendars=0&showTz=0`;

  return (
    <div className="flex h-[640px] flex-col rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
      <div className="mb-4 flex shrink-0 items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#0B63CE]">Google Calendar</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
            Kalender Bulanan
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Overview jadwal sidang satu bulan penuh dalam zona waktu Indonesia.
          </p>
        </div>

        <a
          href={embedUrl}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-2xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-[#0B63CE] ring-1 ring-blue-100 transition hover:bg-blue-100"
        >
          Buka
        </a>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden rounded-3xl border border-blue-100 bg-[#F8FBFF]">
        <iframe
          title="Kalender Sidang Sastra Inggris"
          src={embedUrl}
          className="h-full w-full bg-white"
        />
      </div>
    </div>
  );
}

function ConfirmationTaskCard({ task, onViewDetail }) {
  return (
    <article className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
      <div className="flex flex-wrap items-center gap-2">
        <TypeBadge type={task.type} />
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
          Menunggu Konfirmasi
        </span>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <img
          src={task.studentPhoto}
          alt={task.studentName}
          className="h-12 w-12 shrink-0 rounded-2xl object-cover ring-1 ring-blue-100"
        />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            {task.studentName}
          </h3>
          <p className="mt-1 text-sm text-slate-500">NIM {task.nim}</p>
        </div>
      </div>

      <TitleBlock type={task.type} title={task.title} />

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#F8FBFF] p-3 ring-1 ring-blue-100/70">
          <p className="text-xs text-slate-400">Tanggal</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{task.date}</p>
        </div>
        <div className="rounded-2xl bg-[#F8FBFF] p-3 ring-1 ring-blue-100/70">
          <p className="text-xs text-slate-400">Waktu</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{task.time}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onViewDetail(task)}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B63CE] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
      >
        Lihat Detail Jadwal
        <ChevronRight size={16} />
      </button>
    </article>
  );
}

function ScheduleDetailModal({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-950/20 [scrollbar-color:#BFDBFE_transparent] [scrollbar-width:thin]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <TypeBadge type={task.type} />
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
                Menunggu Konfirmasi
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
              Detail Jadwal Sidang
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Periksa data mahasiswa, judul, jadwal, dan daftar dosen penelaah sebelum memberi keputusan.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
            aria-label="Tutup detail jadwal"
          >
            ×
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-5 rounded-3xl bg-[#F8FBFF] p-5 ring-1 ring-blue-100 sm:flex-row sm:items-start">
          <img
            src={task.studentPhoto}
            alt={task.studentName}
            className="h-32 w-32 shrink-0 rounded-[2rem] object-cover ring-1 ring-blue-100"
          />

          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-semibold text-slate-950">{task.studentName}</h3>
            <p className="mt-1 text-sm text-slate-500">NIM {task.nim}</p>
            <TitleBlock type={task.type} title={task.title} />
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-white p-4">
            <p className="text-xs text-slate-400">Tanggal</p>
            <p className="mt-1 text-sm font-semibold text-slate-950">{task.date}</p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-4">
            <p className="text-xs text-slate-400">Waktu</p>
            <p className="mt-1 text-sm font-semibold text-slate-950">{task.time}</p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-4">
            <p className="text-xs text-slate-400">Lokasi</p>
            <p className="mt-1 text-sm font-semibold text-slate-950">{task.location}</p>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-blue-100 bg-white p-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-950">Dosen Penelaah Terlibat</p>
              <p className="mt-1 text-sm text-slate-500">Tiga dosen yang ditugaskan pada sidang ini.</p>
            </div>
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
              Peran Anda: {task.role}
            </span>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {task.examiners.map((examiner) => (
              <div
                key={`${task.id}-${examiner.role}`}
                className={`rounded-2xl p-4 ring-1 ${
                  examiner.isCurrentUser
                    ? "bg-blue-50 ring-blue-200"
                    : "bg-[#F8FBFF] ring-blue-100"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {examiner.role}
                  </p>

                  <img
                    src={examiner.photo}
                    alt={examiner.name}
                    className="mt-4 h-20 w-20 rounded-3xl object-cover ring-1 ring-blue-100"
                  />

                  <p className="mt-4 text-sm font-semibold leading-5 text-slate-950">
                    {examiner.name}
                  </p>

                  {examiner.isCurrentUser && (
                    <span className="mt-3 inline-flex rounded-full bg-[#0B63CE] px-3 py-1 text-xs font-semibold text-white">
                      Anda
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100">
          <p className="text-sm font-semibold text-amber-800">Catatan</p>
          <p className="mt-1 text-sm leading-6 text-amber-700">
            Jika jadwal ditolak, koordinator perlu melakukan penjadwalan ulang dan mengirim permintaan konfirmasi baru kepada penelaah.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Tutup
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            <XCircle size={16} />
            Tolak Jadwal
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0B63CE] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <CheckCircle2 size={16} />
            Setujui Jadwal
          </button>
        </div>
      </div>
    </div>
  );
}

function DocumentReviewCard({ item }) {
  return (
    <article className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
      <div className="flex items-start justify-between gap-4">
        <TypeBadge type={item.type} />
        <DocumentStatusBadge status={item.status} />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <img
          src={item.studentPhoto}
          alt={item.studentName}
          className="h-24 w-24 shrink-0 rounded-[1.5rem] object-cover ring-1 ring-blue-100"
        />

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            {item.studentName}
          </h3>
          <p className="mt-1 text-sm text-slate-500">NIM {item.nim}</p>
        </div>
      </div>

      <div className="mt-4">
        <TitleBlock type={item.type} title={item.title} />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-[#F8FBFF] p-3 ring-1 ring-blue-100/70">
          <p className="text-xs text-slate-400">Dokumen</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{item.document}</p>
        </div>
        <div className="rounded-2xl bg-[#F8FBFF] p-3 ring-1 ring-blue-100/70">
          <p className="text-xs text-slate-400">Jadwal Sidang</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{item.date}</p>
        </div>
        <div className="rounded-2xl bg-[#F8FBFF] p-3 ring-1 ring-blue-100/70">
          <p className="text-xs text-slate-400">Waktu</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{item.time}</p>
        </div>
      </div>

      <div className="mt-5 flex justify-end border-t border-blue-100 pt-5">
        <Link
          href={item.href}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0B63CE] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          Buka Dokumen
          <ChevronRight size={16} />
        </Link>
      </div>
    </article>
  );
}

function FeedbackTaskCard({ item }) {
  return (
    <article className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm shadow-red-100/30">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={item.type} />
            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 ring-1 ring-red-100">
              Setelah Sidang Dimulai
            </span>
          </div>

          <div className="mt-4 flex items-start gap-5">
            <img
              src={item.studentPhoto}
              alt={item.studentName}
              className="h-32 w-32 shrink-0 rounded-[2rem] object-cover ring-1 ring-red-100"
            />

            <div className="min-w-0 flex-1 pt-1">
              <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                {item.studentName}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                NIM {item.nim} • Peran Anda: {item.role}
              </p>
              <TitleBlock type={item.type} title={item.title} />
            </div>
          </div>
        </div>

        <Link
          href={item.href}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
        >
          Isi Nilai & Feedback
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-2xl bg-red-50 p-4 ring-1 ring-red-100">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-red-500">
            Status Sidang
          </p>
          <p className="mt-2 text-sm font-semibold text-red-700">{item.status}</p>
          <p className="mt-1 text-sm text-red-600/80">Mulai: {item.startedAt}</p>
        </div>

        <div className="rounded-2xl bg-red-50 p-4 ring-1 ring-red-100">
          <p className="text-sm font-semibold text-red-700">Catatan Pengisian</p>
          <p className="mt-1 text-sm leading-6 text-red-600/80">{item.note}</p>
        </div>
      </div>
    </article>
  );
}

function UpcomingSessionItem({ item }) {
  return (
    <div className="grid gap-3 rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/30 md:grid-cols-[0.45fr_1fr_0.7fr_0.7fr] md:items-center">
      <div>
        <p className="text-sm font-semibold text-slate-950">{item.day}</p>
        <p className="mt-1 text-xs text-slate-500">{item.date}</p>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={item.type} />
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
            {item.status}
          </span>
        </div>
        <h3 className="mt-2 truncate text-sm font-semibold text-slate-950">{item.studentName}</h3>
        <p className="mt-1 text-xs text-slate-500">Peran Anda: {item.role}</p>
      </div>

      <div className="rounded-2xl bg-[#F8FBFF] p-3 ring-1 ring-blue-100/70">
        <p className="text-xs text-slate-400">Waktu</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">{item.time}</p>
      </div>

      <div className="rounded-2xl bg-[#F8FBFF] p-3 ring-1 ring-blue-100/70">
        <p className="text-xs text-slate-400">Lokasi</p>
        <p className="mt-1 truncate text-sm font-semibold text-slate-900">{item.location}</p>
      </div>
    </div>
  );
}

export default function ReviewerDashboardPage() {
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const visibleConfirmationTasks = confirmationTasks.slice(0, 2);
  const hiddenConfirmationCount = Math.max(
    confirmationTasks.length - visibleConfirmationTasks.length,
    0
  );

  const hasConfirmationTasks = confirmationTasks.length > 0;
  const hasDocumentReviews = documentReviews.length > 0;
  const hasFeedbackTasks = feedbackTasks.length > 0;
  const hasUpcomingSessions = upcomingSessions.length > 0;

  return (
    <div className="space-y-8 font-[Poppins]">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            Selamat datang, {reviewer.name}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 md:text-base">
            Berikut ringkasan penugasan Anda sebagai penelaah untuk Seminar Usulan Proposal dan Sidang Skripsi.
          </p>
        </div>

        <div className="flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-white px-5 text-center text-sm font-semibold text-[#0B63CE] shadow-sm ring-1 ring-blue-100">
          Semester Genap 2025/2026
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
          <SummaryCard key={item.title} item={item} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr] xl:items-start">
        <div className="flex h-[640px] flex-col rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
          <div className="mb-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#0B63CE]">Perlu Tindakan</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
                Konfirmasi Jadwal Sidang
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Menampilkan prioritas terdekat agar dashboard tetap ringkas.
              </p>
            </div>
            <span className="w-fit shrink-0 whitespace-nowrap rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
              {confirmationTasks.length} menunggu
            </span>
          </div>

          <div className="relative min-h-0 flex-1">
            <div className="pointer-events-none absolute bottom-0 left-0 right-3 z-10 h-10 bg-gradient-to-t from-white to-transparent" />

            <div className="h-full overflow-y-scroll pr-2 [scrollbar-color:#BFDBFE_transparent] [scrollbar-gutter:stable] [scrollbar-width:thin]">
              <div className="space-y-4 pb-8">
                {hasConfirmationTasks ? (
                  visibleConfirmationTasks.map((task) => (
                    <ConfirmationTaskCard
                      key={task.id}
                      task={task}
                      onViewDetail={setSelectedSchedule}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={CheckCircle2}
                    title="Tidak ada jadwal yang perlu dikonfirmasi"
                    description="Semua jadwal sidang yang ditugaskan sudah direspons. Jadwal baru akan muncul di sini jika koordinator mengirim permintaan konfirmasi."
                  />
                )}
              </div>
            </div>
          </div>

          {hasConfirmationTasks && hiddenConfirmationCount > 0 && (
            <div className="mt-4 shrink-0 border-t border-blue-100 pt-4">
              <Link
                href="/reviewer/sessions?status=pending-confirmation"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-[#0B63CE] ring-1 ring-blue-100 transition hover:bg-blue-100"
              >
                Lihat {hiddenConfirmationCount} jadwal lainnya
                <ChevronRight size={16} />
              </Link>
            </div>
          )}
        </div>

        <GoogleCalendarFrame />
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#0B63CE]">Sebelum Sidang</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
              Review Dokumen
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Jadwal sidang terdekat yang sudah dikonfirmasi dan dokumennya siap ditelaah sebelum pelaksanaan.
            </p>
          </div>

          <Link
            href="/reviewer/documents"
            className="inline-flex w-fit items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-[#0B63CE] transition hover:bg-blue-100"
          >
            Lihat Semua Dokumen
            <ChevronRight size={16} />
          </Link>
        </div>

        {hasDocumentReviews ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {documentReviews.map((item) => (
              <DocumentReviewCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FileText}
            title="Belum ada dokumen untuk direview"
            description="Dokumen akan muncul setelah jadwal sidang dikonfirmasi dan koordinator mendistribusikan dokumen kepada penelaah."
          />
        )}
      </section>

      <section className="rounded-[2rem] border border-red-100 bg-white p-5 shadow-sm shadow-red-100/20">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-red-600">Setelah Sidang</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
              Nilai & Feedback Cepat
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Muncul saat sidang sudah dimulai atau selesai, lalu penelaah perlu mengisi nilai dan feedback final.
            </p>
          </div>

          <span className="w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 ring-1 ring-red-100">
            {feedbackTasks.length} perlu diselesaikan
          </span>
        </div>

        {hasFeedbackTasks ? (
          <div className="grid gap-4">
            {feedbackTasks.map((item) => (
              <FeedbackTaskCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={MessageSquareText}
            title="Tidak ada feedback yang tertunda"
            description="Semua nilai dan feedback untuk sidang yang sudah selesai telah dikirim final."
          />
        )}
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#0B63CE]">Agenda</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
              Sidang Mendatang
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Ringkasan jumlah sidang yang akan Anda review minggu ini, Senin sampai Sabtu.
            </p>
          </div>

          <Link
            href="/reviewer/sessions"
            className="inline-flex w-fit items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-[#0B63CE] transition hover:bg-blue-100"
          >
            Lihat Semua Sidang
            <ChevronRight size={16} />
          </Link>
        </div>

        {hasUpcomingSessions ? (
          <>
            <div className="mb-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-100">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#0B63CE]">
                  Total Minggu Ini
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">
                  {upcomingSessions.length}
                </p>
              </div>
              <div className="rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  Periode
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-950">Senin - Sabtu</p>
              </div>
              <div className="rounded-2xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  Status
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  Jadwal terkonfirmasi
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {upcomingSessions.map((item) => (
                <UpcomingSessionItem key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={CalendarDays}
            title="Belum ada sidang mendatang"
            description="Sidang yang sudah dikonfirmasi akan muncul sebagai agenda mendatang di bagian ini."
          />
        )}
      </section>

      <ScheduleDetailModal
        task={selectedSchedule}
        onClose={() => setSelectedSchedule(null)}
      />
    </div>
  );
}
