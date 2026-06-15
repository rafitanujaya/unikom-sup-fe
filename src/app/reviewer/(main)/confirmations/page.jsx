"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Search,
  X,
} from "lucide-react";

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
  },
];

const ITEMS_PER_PAGE = 5;

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

function SearchInput({ value, onChange }) {
  return (
    <label className="relative block w-full sm:w-[360px] lg:w-[420px]">
      <Search
        size={17}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cari nama, NIM, judul..."
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

function InfoCard({ label, value, highlight = false }) {
  return (
    <div
      className={`min-w-0 rounded-2xl px-4 py-3 ring-1 ${
        highlight
          ? "bg-amber-50 ring-amber-100"
          : "bg-white ring-blue-100"
      }`}
    >
      <p
        className={`text-xs font-medium ${
          highlight ? "text-amber-600" : "text-slate-400"
        }`}
      >
        {label}
      </p>

      <p
        className={`mt-1 line-clamp-1 text-sm font-semibold ${
          highlight ? "text-amber-800" : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ConfirmationRow({ item, onOpen }) {
  return (
    <article className="group relative border-b-2 border-slate-100 bg-white px-5 py-5 transition last:border-b-0 hover:bg-blue-50/50">
      <span className="absolute left-0 top-5 hidden h-[calc(100%-2.5rem)] w-1.5 rounded-r-full bg-[#0B63CE] group-hover:block" />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center">
          <img
            src={item.studentPhoto}
            alt={item.studentName}
            className="h-24 w-24 shrink-0 rounded-[1.5rem] object-cover ring-1 ring-blue-100 sm:h-28 sm:w-28"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <TypeBadge type={item.type} />
              <PendingBadge />
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

        <div className="flex w-fit shrink-0 items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-100 lg:mt-1">
          <Clock3 size={14} />
          <span>Diajukan {item.submittedAt}</span>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard label="Peran Anda" value={item.reviewerRole} highlight />
        <InfoCard label="Tanggal" value={`${item.day}, ${item.date}`} />
        <InfoCard label="Waktu" value={item.time} />
        <InfoCard label="Lokasi" value={item.location} />
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-blue-100 pt-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-slate-500">
          Keputusan Anda menentukan apakah jadwal masuk Daftar Sidang atau perlu
          dijadwalkan ulang.
        </p>

        <button
          type="button"
          onClick={() => onOpen(item)}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#0B63CE] px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          Lihat Detail
          <ChevronRight size={16} />
        </button>
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
        <CheckCircle2 size={24} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950">
        Tidak ada jadwal yang perlu dikonfirmasi
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Tidak ada pengajuan yang sesuai dengan pencarian.
      </p>
    </div>
  );
}

export default function ReviewerConfirmationsPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return pendingConfirmations.filter((item) => {
      const keyword = deferredSearch.toLowerCase();

      return (
        item.studentName.toLowerCase().includes(keyword) ||
        item.nim.toLowerCase().includes(keyword) ||
        item.title.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword) ||
        item.reviewerRole.toLowerCase().includes(keyword) ||
        item.location.toLowerCase().includes(keyword)
      );
    });
  }, [deferredSearch]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
  );

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage]);

  const startItem =
    filteredItems.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [deferredSearch]);

  function handleSearchChange(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleOpenDetail(item) {
    router.push(`/reviewer/confirmations/${item.id}`);
  }

  return (
    <div className="space-y-6 font-[Poppins]">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            Konfirmasi Jadwal
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 md:text-base">
            Review pengajuan jadwal sidang sebelum masuk ke Daftar Sidang.
            Jadwal yang disetujui akan menjadi agenda aktif penelaah.
          </p>
        </div>

        <div className="w-fit rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B63CE] shadow-sm ring-1 ring-blue-100">
          Semester Genap 2025/2026
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0B63CE] ring-1 ring-blue-100">
            <CalendarCheck size={22} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-950">
              Informasi Konfirmasi
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Jadwal pada halaman ini belum masuk Daftar Sidang sampai semua
              penelaah menyetujui pengajuan. Jika ada penelaah yang menolak,
              koordinator perlu melakukan penjadwalan ulang.
            </p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                  Pengajuan Jadwal Masuk
                </h2>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
                  {filteredItems.length} perlu ditinjau
                </span>
              </div>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Cari pengajuan berdasarkan nama, NIM, judul, lokasi, atau peran.
              </p>
            </div>

            <SearchInput value={search} onChange={handleSearchChange} />
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div>
            {paginatedItems.map((item) => (
              <ConfirmationRow
                key={item.id}
                item={item}
                onOpen={handleOpenDetail}
              />
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