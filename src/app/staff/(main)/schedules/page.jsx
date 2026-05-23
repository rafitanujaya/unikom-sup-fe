"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

const scheduleItems = [
  {
    id: "SCH-001",
    submissionId: "SUB-001",
    nim: "10122001",
    name: "Nadia Putri Azzahra",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    type: "SUP",
    title: "Representasi Identitas dalam Novel Kontemporer",
    supervisor: "Dr. Rina Marlina, S.S., M.Hum.",
    researchField: "Literary Studies",
    status: "Siap Dijadwalkan",
    date: "-",
    time: "-",
    room: "-",
  },
  {
    id: "SCH-002",
    submissionId: "SUB-002",
    nim: "10122018",
    name: "Rafi Maulana",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    type: "Sidang",
    title: "Code Switching dalam Interaksi Mahasiswa Sastra Inggris",
    supervisor: "Dr. Tatan Tawami, S.S., M.Hum.",
    researchField: "Linguistics",
    status: "Draft Jadwal",
    date: "20 Mei 2026",
    time: "08.30 - 10.00",
    room: "Ruang Sidang 1",
  },
  {
    id: "SCH-003",
    submissionId: "SUB-003",
    nim: "10122024",
    name: "Salsa Nuraini",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
    type: "SUP",
    title: "Analisis Karakter Utama dalam Film Adaptasi Novel",
    supervisor: "Dr. Nia Kurniawati, S.S., M.Hum.",
    researchField: "Film Studies",
    status: "Menunggu Konfirmasi",
    date: "21 Mei 2026",
    time: "10.00 - 11.30",
    room: "Ruang Seminar 2",
  },
  {
    id: "SCH-004",
    submissionId: "SUB-004",
    nim: "10121035",
    name: "Fajar Pratama",
    photo:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop",
    type: "Sidang",
    title: "Translation Shift pada Subtitle Film Dokumenter",
    supervisor: "Dr. Retno Purwani Sari, S.S., M.Hum.",
    researchField: "Translation Studies",
    status: "Siap Dijadwalkan",
    date: "-",
    time: "-",
    room: "-",
  },
  {
    id: "SCH-005",
    submissionId: "SUB-005",
    nim: "10122029",
    name: "Aulia Rahman",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    type: "SUP",
    title: "Narrative Structure dalam Short Story Modern",
    supervisor: "Dr. Dian Permatasari, S.S., M.Hum.",
    researchField: "Narratology",
    status: "Draft Jadwal",
    date: "22 Mei 2026",
    time: "13.00 - 14.30",
    room: "Ruang Seminar 1",
  },
  {
    id: "SCH-006",
    submissionId: "SUB-006",
    nim: "10121041",
    name: "Maya Anggraini",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    type: "Sidang",
    title: "Language Anxiety pada Presentasi Akademik Mahasiswa",
    supervisor: "Dr. Mira Handayani, S.S., M.Hum.",
    researchField: "Applied Linguistics",
    status: "Perlu Reschedule",
    date: "23 Mei 2026",
    time: "09.00 - 10.30",
    room: "Ruang Sidang 2",
    confirmationSummary: "2 terkonfirmasi, 1 menolak",
    rejectedBy: "Dr. Retno Purwani Sari, S.S., M.Hum.",
  },
];

const defaultFilters = {
  type: "Semua",
  status: "Semua",
};

const typeOptions = ["Semua", "SUP", "Sidang"];

const statusOptions = [
  "Semua",
  "Siap Dijadwalkan",
  "Draft Jadwal",
  "Menunggu Konfirmasi",
  "Perlu Reschedule",
];

const ITEMS_PER_PAGE = 10;

export default function StaffSchedulingPage() {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const activeFilters = [
    appliedFilters.type !== "Semua"
      ? { key: "type", label: "Jenis", value: appliedFilters.type }
      : null,
    appliedFilters.status !== "Semua"
      ? { key: "status", label: "Status", value: appliedFilters.status }
      : null,
  ].filter(Boolean);

  const isFilterActive = activeFilters.length > 0;

  const filteredItems = useMemo(() => {
    return scheduleItems.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(keyword) ||
        item.nim.toLowerCase().includes(keyword) ||
        item.title.toLowerCase().includes(keyword) ||
        item.supervisor.toLowerCase().includes(keyword);

      const matchesType =
        appliedFilters.type === "Semua" || item.type === appliedFilters.type;

      const matchesStatus =
        appliedFilters.status === "Semua" ||
        item.status === appliedFilters.status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, appliedFilters]);

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

  const summary = useMemo(() => {
    return {
      ready: scheduleItems.filter(
        (item) => item.status === "Siap Dijadwalkan",
      ).length,
      draft: scheduleItems.filter((item) => item.status === "Draft Jadwal")
        .length,
      waiting: scheduleItems.filter(
        (item) => item.status === "Menunggu Konfirmasi",
      ).length,
      reschedule: scheduleItems.filter(
        (item) => item.status === "Perlu Reschedule",
      ).length,
    };
  }, []);

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

  return (
    <div className="mx-auto w-full max-w-6xl pb-10 font-[Poppins]">
      <div className="mb-6 pt-2">
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
          Atur Jadwal SUP dan Sidang
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Kelola jadwal, ruangan, dan konfirmasi dosen.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Siap Dijadwalkan"
          value={summary.ready}
          description="Belum memiliki jadwal."
        />

        <SummaryCard
          title="Draft Jadwal"
          value={summary.draft}
          description="Masih disusun."
        />

        <SummaryCard
          title="Menunggu"
          value={summary.waiting}
          description="Menunggu dosen."
        />

        <SummaryCard
          title="Reschedule"
          value={summary.reschedule}
          description="Perlu diatur ulang."
        />
      </section>

      <section className="mt-5 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                Daftar Penjadwalan
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Pilih pengajuan untuk mengatur atau meninjau jadwal.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchInput value={search} onChange={handleSearchChange} />

              <button
                type="button"
                onClick={openFilterPanel}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold sm:w-fit ${
                  showFilter || isFilterActive
                    ? "bg-primary text-white shadow-lg shadow-blue-600/20 hover:bg-primary-dark"
                    : "border border-blue-100 bg-[#F8FBFF] text-slate-600 hover:bg-blue-50 hover:text-primary"
                }`}
              >
                <Filter size={17} />
                Filter
                {isFilterActive && (
                  <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1 text-xs">
                    {activeFilters.length}
                  </span>
                )}
              </button>
            </div>

            {showFilter && (
              <FilterPanel
                filters={draftFilters}
                onChange={updateDraftFilter}
                onApply={applyFilter}
                onCancel={cancelFilter}
                onReset={resetFilter}
                hasActiveFilter={isFilterActive}
              />
            )}

            {isFilterActive && (
              <ActiveFilterChips
                filters={activeFilters}
                onRemove={removeFilter}
                onReset={resetFilter}
              />
            )}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div>
            {paginatedItems.map((item) => (
              <ScheduleCard key={item.id} item={item} />
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

function SummaryCard({ title, value, description }) {
  return (
    <div className="rounded-[28px] border border-blue-100 bg-white px-5 py-4 shadow-sm shadow-blue-100/30">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

function SearchInput({ value, onChange }) {
  return (
    <label className="relative block w-full">
      <Search
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cari nama, NIM, judul, atau pembimbing..."
        className="h-11 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] pl-11 pr-11 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 hover:bg-blue-50 hover:text-primary"
          aria-label="Hapus pencarian"
        >
          <X size={16} />
        </button>
      )}
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
    <div className="rounded-[24px] border border-blue-100 bg-[#F8FBFF] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Filter Data</p>
          <p className="mt-1 text-xs text-slate-500">
            Pilih filter, lalu terapkan untuk menampilkan data.
          </p>
        </div>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 ring-1 ring-blue-100 hover:text-primary"
          >
            <X size={14} />
            Reset
          </button>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <FilterSelect
          label="Jenis Pengajuan"
          value={filters.type}
          onChange={(value) => onChange("type", value)}
          options={typeOptions}
        />

        <FilterSelect
          label="Status Jadwal"
          value={filters.status}
          onChange={(value) => onChange("status", value)}
          options={statusOptions}
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
          className="inline-flex h-10 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-primary-dark"
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
          className="inline-flex max-w-full items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-primary ring-1 ring-blue-100 hover:bg-blue-100"
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

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-500">
        {label}
      </span>

      <div className="relative">
        <SlidersHorizontal
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full appearance-none rounded-2xl border border-blue-100 bg-white pl-10 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
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

function ScheduleCard({ item }) {
  return (
    <article className="group relative border-b border-slate-200 bg-white px-6 py-5 last:border-b-0 hover:bg-blue-50/60">
      <span className="absolute left-0 top-5 hidden h-[calc(100%-2.5rem)] w-1.5 rounded-r-full bg-primary group-hover:block" />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center">
          <img
            src={item.photo}
            alt={item.name}
            className="h-24 w-24 shrink-0 rounded-[1.5rem] object-cover ring-1 ring-blue-100 sm:h-28 sm:w-28"
          />

          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-xl font-semibold leading-7 tracking-[-0.02em] text-slate-950 group-hover:text-primary">
              <span>{item.name}</span>
              <span className="text-slate-400"> - </span>
              <span className="whitespace-nowrap text-slate-500">
                {item.nim}
              </span>
            </h3>

            <p className="mt-1 line-clamp-2 text-base font-medium leading-6 text-slate-700">
              {item.title}
            </p>
          </div>
        </div>

        <div className="flex w-fit shrink-0 flex-wrap items-start gap-2 lg:justify-end">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100 group-hover:bg-white">
            {item.type}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getStatusClass(
              item.status,
            )}`}
          >
            {item.status}
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 border-t border-blue-100 pt-5 md:grid-cols-2 xl:grid-cols-4">
        <InfoText label="Pembimbing" value={item.supervisor} />
        <InfoText label="Tanggal" value={item.date} icon={CalendarDays} />
        <InfoText label="Waktu" value={item.time} icon={Clock3} />
        <InfoText label="Ruangan" value={item.room} icon={MapPin} />
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl text-sm leading-6 text-slate-500">
          {item.status === "Siap Dijadwalkan"
            ? "Atur tanggal, waktu, ruangan, dan dosen penelaah."
            : item.status === "Perlu Reschedule"
              ? "Periksa jadwal lalu atur ulang jika diperlukan."
              : "Lihat atau lanjutkan detail jadwal pengajuan ini."}
        </p>

        <Link
          href={`/staff/schedules/${item.id}`}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-primary-dark"
        >
          {getActionLabel(item.status)}
        </Link>
      </div>
    </article>
  );
}

function InfoText({ label, value, icon: Icon }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-slate-400">
        {Icon && <Icon size={15} />}

        <p className="text-xs font-medium uppercase tracking-[0.14em]">
          {label}
        </p>
      </div>

      <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-900">
        {value}
      </p>
    </div>
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
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-slate-500 hover:bg-blue-50 hover:text-primary disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300"
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
              className={`flex h-10 min-w-10 items-center justify-center rounded-2xl px-3 text-sm font-semibold ${
                currentPage === page
                  ? "bg-primary text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-500 hover:bg-blue-50 hover:text-primary"
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
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-slate-500 hover:bg-blue-50 hover:text-primary disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300"
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
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-primary ring-1 ring-blue-100">
        <CalendarDays size={24} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950">
        Tidak ada data penjadwalan
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Tidak ada jadwal yang sesuai dengan pencarian atau filter.
      </p>
    </div>
  );
}

function getStatusClass(status) {
  if (status === "Perlu Reschedule") {
    return "bg-red-50 text-red-600 ring-red-100";
  }

  if (status === "Menunggu Konfirmasi") {
    return "bg-violet-50 text-violet-600 ring-violet-100";
  }

  if (status === "Draft Jadwal") {
    return "bg-amber-50 text-amber-600 ring-amber-100";
  }

  return "bg-blue-50 text-primary ring-blue-100";
}

function getActionLabel(status) {
  if (status === "Siap Dijadwalkan") return "Atur Jadwal";
  if (status === "Draft Jadwal") return "Lanjutkan Jadwal";
  if (status === "Perlu Reschedule") return "Atur Ulang Jadwal";

  return "Lihat Detail";
}