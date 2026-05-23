"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

const submissions = [
  {
    id: "SUB-001",
    nim: "10122001",
    name: "Nadia Putri Azzahra",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    type: "SUP",
    title: "Representasi Identitas dalam Novel Kontemporer",
    progress: "Baru Masuk",
  },
  {
    id: "SUB-002",
    nim: "10122018",
    name: "Rafi Maulana",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    type: "Sidang",
    title: "Code Switching dalam Interaksi Mahasiswa Sastra Inggris",
    progress: "Dalam Proses",
  },
  {
    id: "SUB-003",
    nim: "10122024",
    name: "Salsa Nuraini",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
    type: "SUP",
    title: "Analisis Karakter Utama dalam Film Adaptasi Novel",
    progress: "Dalam Proses",
  },
  {
    id: "SUB-004",
    nim: "10121035",
    name: "Fajar Pratama",
    photo:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop",
    type: "Sidang",
    title: "Translation Shift pada Subtitle Film Dokumenter",
    progress: "Sedang Dijadwalkan",
  },
  {
    id: "SUB-005",
    nim: "10122029",
    name: "Aulia Rahman",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    type: "SUP",
    title: "Narrative Structure dalam Short Story Modern",
    progress: "Dijadwalkan",
  },
  {
    id: "SUB-006",
    nim: "10121041",
    name: "Maya Anggraini",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    type: "Sidang",
    title: "Language Anxiety pada Presentasi Akademik Mahasiswa",
    progress: "Baru Masuk",
  },
  {
    id: "SUB-007",
    nim: "10122033",
    name: "Ilham Ramadhan",
    photo:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop",
    type: "SUP",
    title: "Figurative Language pada Lirik Lagu Pop Inggris",
    progress: "Dijadwalkan",
  },
  {
    id: "SUB-008",
    nim: "10121052",
    name: "Dinda Salsabila",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=300&auto=format&fit=crop",
    type: "Sidang",
    title: "Translation Accuracy pada Subtitle Film Animasi",
    progress: "Selesai",
  },
  {
    id: "SUB-009",
    nim: "10122047",
    name: "Farhan Alfarizi",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
    type: "SUP",
    title: "Politeness Strategy dalam Percakapan Film Drama",
    progress: "Dalam Proses",
  },
  {
    id: "SUB-010",
    nim: "10121066",
    name: "Rania Khairunnisa",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    type: "Sidang",
    title: "Subtitling Strategy pada Film Biografi",
    progress: "Sedang Dijadwalkan",
  },
  {
    id: "SUB-011",
    nim: "10122055",
    name: "Kevin Aditya",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    type: "SUP",
    title: "Moral Value dalam Novel Young Adult Fiction",
    progress: "Baru Masuk",
  },
  {
    id: "SUB-012",
    nim: "10121072",
    name: "Putri Maharani",
    photo:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=300&auto=format&fit=crop",
    type: "Sidang",
    title: "Translation Method pada Novel Terjemahan Indonesia",
    progress: "Selesai",
  },
];

const defaultFilters = {
  type: "Semua",
  progress: "Semua",
};

const typeOptions = ["Semua", "SUP", "Sidang"];

const progressOptions = [
  "Semua",
  "Baru Masuk",
  "Dalam Proses",
  "Sedang Dijadwalkan",
  "Dijadwalkan",
  "Selesai",
];

const ITEMS_PER_PAGE = 10;

export default function StaffSubmissionPage() {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const activeFilters = [
    appliedFilters.type !== "Semua"
      ? { key: "type", label: "Jenis", value: appliedFilters.type }
      : null,
    appliedFilters.progress !== "Semua"
      ? { key: "progress", label: "Progress", value: appliedFilters.progress }
      : null,
  ].filter(Boolean);

  const isFilterActive = activeFilters.length > 0;

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(keyword) ||
        item.nim.toLowerCase().includes(keyword) ||
        item.title.toLowerCase().includes(keyword);

      const matchesType =
        appliedFilters.type === "Semua" || item.type === appliedFilters.type;

      const matchesProgress =
        appliedFilters.progress === "Semua" ||
        item.progress === appliedFilters.progress;

      return matchesSearch && matchesType && matchesProgress;
    });
  }, [search, appliedFilters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE),
  );

  const paginatedSubmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredSubmissions.slice(startIndex, endIndex);
  }, [filteredSubmissions, currentPage]);

  const startItem =
    filteredSubmissions.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredSubmissions.length,
  );

  const summary = useMemo(() => {
    return {
      sup: submissions.filter((item) => item.type === "SUP").length,
      sidang: submissions.filter((item) => item.type === "Sidang").length,
      active: submissions.filter((item) => item.progress !== "Selesai").length,
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
          Data Pengajuan SUP dan Sidang
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Pantau pengajuan mahasiswa berdasarkan jenis dan progress.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Total SUP"
          value={summary.sup}
          description="Data SUP."
        />

        <SummaryCard
          title="Total Sidang"
          value={summary.sidang}
          description="Data Sidang."
        />

        <SummaryCard
          title="Pengajuan Aktif"
          value={summary.active}
          description="Belum selesai."
        />
      </section>

      <section className="mt-5 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                Daftar Pengajuan
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Pilih pengajuan untuk melihat detail dokumen dan prosesnya.
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

        {filteredSubmissions.length > 0 ? (
          <div>
            {paginatedSubmissions.map((item) => (
              <SubmissionListCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

        {filteredSubmissions.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startItem={startItem}
            endItem={endItem}
            totalItems={filteredSubmissions.length}
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
        placeholder="Cari nama, NIM, atau judul pengajuan..."
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
          label="Progress"
          value={filters.progress}
          onChange={(value) => onChange("progress", value)}
          options={progressOptions}
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

function SubmissionListCard({ item }) {
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
            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getProgressClass(
              item.progress,
            )}`}
          >
            {item.progress}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl text-sm leading-6 text-slate-500">
          Buka detail untuk melihat dokumen, jadwal, penelaah, dan progress
          pengajuan mahasiswa.
        </p>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 text-sm font-semibold text-primary hover:bg-blue-50"
          >
            <FileText size={17} />
            Dokumen
          </button>

          <Link
            href={`/staff/submissions/${item.id}`}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-primary-dark"
          >
            Detail
          </Link>
        </div>
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
        <FileText size={24} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950">
        Pengajuan tidak ditemukan
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Tidak ada pengajuan yang sesuai dengan pencarian atau filter.
      </p>
    </div>
  );
}

function getProgressClass(progress) {
  if (progress === "Selesai") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  }

  if (progress === "Dijadwalkan") {
    return "bg-blue-50 text-primary ring-blue-100";
  }

  if (progress === "Sedang Dijadwalkan") {
    return "bg-violet-50 text-violet-700 ring-violet-100";
  }

  if (progress === "Dalam Proses") {
    return "bg-amber-50 text-amber-700 ring-amber-100";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}