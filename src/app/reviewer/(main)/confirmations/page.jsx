"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Search,
  XCircle,
} from "lucide-react";

const confirmationFilters = [
  { label: "Semua", value: "all" },
  { label: "SUP", value: "SUP" },
  { label: "Sidang Skripsi", value: "Sidang Skripsi" },
];

const pendingConfirmations = [
  {
    id: "SUP-2026-001",
    type: "SUP",
    studentName: "Alya Putri Ramadhani",
    nim: "2204101001",
    studentPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    title: "Representation of Identity in Contemporary British Fiction",
    reviewerRole: "Ketua Penelaah",
    proposedBy: "Koordinator Sidang Sastra Inggris",
    date: "18 Mei 2026",
    day: "Senin",
    time: "09.00 - 10.30",
    location: "Ruang Sidang FIB 2",
    submittedAt: "13 Mei 2026, 08.20",
    status: "Menunggu Konfirmasi",
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
    reviewerRole: "Penelaah 1",
    proposedBy: "Koordinator Sidang Sastra Inggris",
    date: "19 Mei 2026",
    day: "Selasa",
    time: "10.00 - 11.30",
    location: "Google Meet",
    submittedAt: "13 Mei 2026, 09.15",
    status: "Menunggu Konfirmasi",
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
    reviewerRole: "Penelaah 2",
    proposedBy: "Koordinator Sidang Sastra Inggris",
    date: "23 Mei 2026",
    day: "Jumat",
    time: "08.00 - 09.30",
    location: "Ruang Sidang FIB 1",
    submittedAt: "13 Mei 2026, 10.40",
    status: "Menunggu Konfirmasi",
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
];

function TypeBadge({ type }) {
  return (
    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
      {type}
    </span>
  );
}

function PendingBadge() {
  return (
    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
      Menunggu Konfirmasi
    </span>
  );
}

function TitleText({ type, title, large = false }) {
  return (
    <div className={large ? "mt-5" : "mt-3"}>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
        Judul {type === "SUP" ? "Proposal" : "Skripsi"}
      </p>
      <p
        className={`mt-1.5 font-semibold leading-7 text-slate-950 ${
          large ? "text-base md:text-lg" : "line-clamp-2 text-sm"
        }`}
      >
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

function InfoTile({ label, children, tone = "blue" }) {
  const toneClass = {
    blue: "bg-[#F8FBFF] ring-blue-100",
    amber: "bg-amber-50 ring-amber-100",
    white: "bg-white ring-blue-100",
  }[tone];

  return (
    <div className={`rounded-2xl p-4 ring-1 ${toneClass}`}>
      <p className="text-xs text-slate-400">{label}</p>
      <div className="mt-1 text-sm font-semibold text-slate-950">{children}</div>
    </div>
  );
}

function ConfirmationCard({ item, onOpen }) {
  return (
    <article className="rounded-[1.75rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/20 transition-all duration-300 hover:border-blue-200 hover:shadow-md hover:shadow-blue-100/40">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={item.type} />
          <PendingBadge />
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {item.id}
          </span>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
          <Clock3 size={14} />
          <span>Diajukan {item.submittedAt}</span>
        </div>
      </div>

      <div className="mt-5 flex min-w-0 items-start gap-5">
        <img
          src={item.studentPhoto}
          alt={item.studentName}
          className="h-32 w-32 shrink-0 rounded-[2rem] object-cover ring-1 ring-blue-100"
        />

        <div className="min-w-0 flex-1 pt-1">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            {item.studentName}
          </h3>
          <p className="mt-1 text-sm text-slate-500">NIM {item.nim}</p>
          <TitleText type={item.type} title={item.title} />
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <InfoTile label="Peran Anda" tone="amber">
          {item.reviewerRole}
        </InfoTile>
        <InfoTile label="Tanggal">
          {item.day}, {item.date}
        </InfoTile>
        <InfoTile label="Waktu">{item.time}</InfoTile>
        <InfoTile label="Lokasi">{item.location}</InfoTile>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-blue-100 pt-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-slate-500">
          Keputusan Anda menentukan apakah jadwal masuk Daftar Sidang atau perlu dijadwalkan ulang.
        </p>

        <button
          type="button"
          onClick={() => onOpen(item)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#0B63CE] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          Lihat Detail & Putuskan
          <ChevronRight size={16} />
        </button>
      </div>
    </article>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-3 border-t border-blue-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
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
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-950/20 [scrollbar-color:#BFDBFE_transparent] [scrollbar-width:thin]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <TypeBadge type={item.type} />
              <PendingBadge />
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {item.id}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
              Detail Konfirmasi Jadwal
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Periksa informasi mahasiswa, jadwal, dan dosen penelaah sebelum menyetujui atau menolak jadwal.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
            aria-label="Tutup detail konfirmasi"
          >
            ×
          </button>
        </div>

        <div className="mt-6 rounded-[2rem] bg-[#F8FBFF] p-5 ring-1 ring-blue-100">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <img
              src={item.studentPhoto}
              alt={item.studentName}
              className="h-44 w-44 shrink-0 rounded-[2.25rem] object-cover ring-1 ring-blue-100"
            />

            <div className="min-w-0 flex-1 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <TypeBadge type={item.type} />
                <PendingBadge />
              </div>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                {item.studentName}
              </h3>
              <p className="mt-1 text-sm text-slate-500">NIM {item.nim}</p>
              <TitleText type={item.type} title={item.title} large />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-amber-100 bg-amber-50 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-800">Status Pengajuan</p>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-amber-700">
                Jadwal ini masih menunggu keputusan Anda. Jika disetujui, jadwal akan masuk ke Daftar Sidang. Jika ditolak, koordinator perlu melakukan penjadwalan ulang.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[420px]">
              <div className="rounded-2xl bg-white p-4 ring-1 ring-amber-100">
                <p className="text-xs text-amber-600/80">Diajukan oleh</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">{item.proposedBy}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 ring-1 ring-amber-100">
                <p className="text-xs text-amber-600/80">Waktu Pengajuan</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">{item.submittedAt}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <InfoTile label="Peran Anda" tone="white">
            {item.reviewerRole}
          </InfoTile>
          <InfoTile label="Tanggal" tone="white">
            {item.day}, {item.date}
          </InfoTile>
          <InfoTile label="Waktu" tone="white">
            {item.time}
          </InfoTile>
          <InfoTile label="Lokasi" tone="white">
            {item.location}
          </InfoTile>
        </div>

        <div className="mt-4 rounded-3xl border border-blue-100 bg-white p-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-950">Dosen Penelaah Terlibat</p>
              <p className="mt-1 text-sm text-slate-500">Komposisi dosen untuk sidang ini.</p>
            </div>
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
              Peran Anda: {item.reviewerRole}
            </span>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {item.examiners.map((examiner) => (
              <div
                key={`${item.id}-${examiner.role}`}
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
                    <span className="mt-3 rounded-full bg-[#0B63CE] px-3 py-1 text-xs font-semibold text-white">
                      Anda
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showRejectForm && (
          <div className="mt-4 rounded-3xl bg-red-50 p-5 ring-1 ring-red-100">
            <p className="text-sm font-semibold text-red-700">Alasan Penolakan</p>
            <p className="mt-1 text-sm leading-6 text-red-600/80">
              Alasan ini akan dikirim ke koordinator agar jadwal dapat disusun ulang.
            </p>
            <textarea
              value={rejectReason}
              onChange={(event) => setRejectReason(event.target.value)}
              placeholder="Contoh: Saya memiliki jadwal mengajar pada waktu tersebut."
              className="mt-4 min-h-28 w-full rounded-2xl border border-red-100 bg-white p-4 text-sm outline-none transition focus:ring-4 focus:ring-red-100"
            />
          </div>
        )}

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
            onClick={() => setShowRejectForm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            <XCircle size={16} />
            {showRejectForm ? "Submit Penolakan" : "Tolak Jadwal"}
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

function EmptyState() {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center rounded-[2rem] border border-dashed border-blue-200 bg-white p-10 text-center shadow-sm shadow-blue-100/20">
      <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-blue-50 text-[#0B63CE] ring-1 ring-blue-100">
        <CheckCircle2 size={34} />
      </div>
      <p className="mt-6 text-lg font-semibold text-slate-950">
        Tidak ada jadwal yang perlu dikonfirmasi
      </p>
      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
        Tidak ada pengajuan yang sesuai dengan filter atau kata kunci pencarian. Jadwal yang disetujui akan masuk ke Daftar Sidang.
      </p>
    </div>
  );
}

export default function ReviewerConfirmationsPage() {
  const ITEMS_PER_PAGE = 5;
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    return pendingConfirmations.filter((item) => {
      const matchFilter = activeFilter === "all" || item.type === activeFilter;
      const searchText = `${item.studentName} ${item.nim} ${item.title} ${item.type} ${item.reviewerRole}`.toLowerCase();
      const matchQuery = searchText.includes(deferredQuery.toLowerCase());
      return matchFilter && matchQuery;
    });
  }, [activeFilter, deferredQuery]);

  const supCount = pendingConfirmations.filter((item) => item.type === "SUP").length;
  const skripsiCount = pendingConfirmations.filter((item) => item.type === "Sidang Skripsi").length;

  const totalPages = Math.max(Math.ceil(filteredItems.length / ITEMS_PER_PAGE), 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, deferredQuery]);

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
            Konfirmasi Jadwal
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 md:text-base">
            Review pengajuan jadwal sidang sebelum masuk ke Daftar Sidang. Jadwal yang disetujui akan menjadi agenda aktif penelaah.
          </p>
        </div>

        <div className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B63CE] shadow-sm ring-1 ring-blue-100">
          Semester Genap 2025/2026
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          label="Menunggu Konfirmasi"
          value={pendingConfirmations.length}
          helper="Pengajuan jadwal aktif"
        />
        <SummaryCard label="SUP" value={supCount} helper="Seminar Usulan Proposal" />
        <SummaryCard label="Sidang Skripsi" value={skripsiCount} helper="Pengajuan sidang akhir" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0B63CE] ring-1 ring-blue-100">
              <CalendarCheck size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Alur Konfirmasi</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Penelaah memeriksa jadwal, melihat detail mahasiswa dan dosen terkait, lalu menyetujui atau menolak jadwal. Jika ditolak, koordinator perlu melakukan reschedule.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-amber-100 bg-amber-50 p-5 shadow-sm shadow-amber-100/30">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-600 ring-1 ring-amber-100">
              <Clock3 size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800">Belum masuk Daftar Sidang</p>
              <p className="mt-2 text-sm leading-6 text-amber-700">
                Data pada halaman ini masih berupa pengajuan jadwal. Setelah disetujui, jadwal akan berpindah ke Daftar Sidang dan dokumen dapat direview sesuai ketersediaan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                  Pengajuan Jadwal Masuk
                </h2>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
                  {filteredItems.length} perlu ditinjau
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Jadwal yang disetujui akan masuk ke Daftar Sidang.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex w-fit rounded-[1.35rem] border border-blue-100 bg-white p-1.5 shadow-sm shadow-blue-100/30">
                {confirmationFilters.map((filter) => {
                  const isActive = activeFilter === filter.value;
                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() => setActiveFilter(filter.value)}
                      className={`rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-[#0B63CE] text-white shadow-lg shadow-blue-600/20"
                          : "text-slate-500 hover:bg-blue-50 hover:text-[#0B63CE]"
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex min-w-0 items-center gap-3 rounded-[1.35rem] border border-blue-100 bg-[#F8FBFF] px-4 py-3 shadow-sm shadow-blue-100/20 md:w-80">
                <Search size={17} className="shrink-0 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari nama, NIM, atau judul..."
                  className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-[560px] bg-[#F8FBFF] p-4 transition-all duration-300 ease-out">
          {filteredItems.length > 0 ? (
            <div className="space-y-3 transition-opacity duration-300 ease-out">
              {paginatedItems.map((item) => (
                <ConfirmationCard key={item.id} item={item} onOpen={setSelectedItem} />
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

      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
