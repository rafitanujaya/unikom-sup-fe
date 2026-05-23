"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Archive,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

const reportArchives = [
  {
    id: "ARCH-001",
    name: "Laporan SUP - Genap 2025/2026",
    type: "SUP",
    periodType: "Semester",
    period: "Genap 2025/2026",
    totalParticipants: 124,
    averageScore: 82.4,
    createdAt: "18 Mei 2026, 14.30",
    createdAtValue: "2026-05-18T14:30:00",
    createdBy: "Staff Akademik",
    status: "Final",
  },
  {
    id: "ARCH-002",
    name: "Laporan Skripsi - Genap 2025/2026",
    type: "Skripsi",
    periodType: "Semester",
    period: "Genap 2025/2026",
    totalParticipants: 96,
    averageScore: 83.1,
    createdAt: "18 Mei 2026, 15.10",
    createdAtValue: "2026-05-18T15:10:00",
    createdBy: "Staff Akademik",
    status: "Final",
  },
  {
    id: "ARCH-003",
    name: "Laporan SUP - 01 Mei 2026 sampai 15 Mei 2026",
    type: "SUP",
    periodType: "Rentang Tanggal",
    period: "01 Mei 2026 - 15 Mei 2026",
    totalParticipants: 42,
    averageScore: 81.7,
    createdAt: "16 Mei 2026, 09.45",
    createdAtValue: "2026-05-16T09:45:00",
    createdBy: "Koordinator SUP",
    status: "Final",
  },
  {
    id: "ARCH-004",
    name: "Laporan Skripsi - 01 Mei 2026 sampai 15 Mei 2026",
    type: "Skripsi",
    periodType: "Rentang Tanggal",
    period: "01 Mei 2026 - 15 Mei 2026",
    totalParticipants: 31,
    averageScore: 84.6,
    createdAt: "16 Mei 2026, 11.20",
    createdAtValue: "2026-05-16T11:20:00",
    createdBy: "Staff Akademik",
    status: "Final",
  },
  {
    id: "ARCH-005",
    name: "Laporan SUP - Ganjil 2025/2026",
    type: "SUP",
    periodType: "Semester",
    period: "Ganjil 2025/2026",
    totalParticipants: 118,
    averageScore: 80.9,
    createdAt: "22 Januari 2026, 13.05",
    createdAtValue: "2026-01-22T13:05:00",
    createdBy: "Staff Akademik",
    status: "Final",
  },
  {
    id: "ARCH-006",
    name: "Laporan Skripsi - Ganjil 2025/2026",
    type: "Skripsi",
    periodType: "Semester",
    period: "Ganjil 2025/2026",
    totalParticipants: 89,
    averageScore: 82.8,
    createdAt: "22 Januari 2026, 14.15",
    createdAtValue: "2026-01-22T14:15:00",
    createdBy: "Koordinator Skripsi",
    status: "Final",
  },
];

const defaultFilters = {
  type: "Semua",
  periodType: "Semua",
};

const typeOptions = ["Semua", "SUP", "Skripsi"];
const periodOptions = ["Semua", "Semester", "Rentang Tanggal"];

const ITEMS_PER_PAGE = 10;

export default function StaffReportArchivePage() {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAtValue",
    direction: "desc",
  });

  const activeFilters = [
    appliedFilters.type !== "Semua"
      ? { key: "type", label: "Jenis", value: appliedFilters.type }
      : null,
    appliedFilters.periodType !== "Semua"
      ? {
          key: "periodType",
          label: "Periode",
          value: appliedFilters.periodType,
        }
      : null,
  ].filter(Boolean);

  const isFilterActive = activeFilters.length > 0;

  const filteredArchives = useMemo(() => {
    return reportArchives
      .filter((archive) => {
        const keyword = search.toLowerCase();

        const matchesSearch =
          archive.name.toLowerCase().includes(keyword) ||
          archive.period.toLowerCase().includes(keyword) ||
          archive.createdBy.toLowerCase().includes(keyword);

        const matchesType =
          appliedFilters.type === "Semua" ||
          archive.type === appliedFilters.type;

        const matchesPeriod =
          appliedFilters.periodType === "Semua" ||
          archive.periodType === appliedFilters.periodType;

        return matchesSearch && matchesType && matchesPeriod;
      })
      .sort((first, second) => {
        const firstValue = first[sortConfig.key];
        const secondValue = second[sortConfig.key];

        if (typeof firstValue === "number" && typeof secondValue === "number") {
          return sortConfig.direction === "asc"
            ? firstValue - secondValue
            : secondValue - firstValue;
        }

        return sortConfig.direction === "asc"
          ? String(firstValue).localeCompare(String(secondValue))
          : String(secondValue).localeCompare(String(firstValue));
      });
  }, [search, appliedFilters, sortConfig]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArchives.length / ITEMS_PER_PAGE),
  );

  const paginatedArchives = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredArchives.slice(startIndex, endIndex);
  }, [filteredArchives, currentPage]);

  const startItem =
    filteredArchives.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredArchives.length,
  );

  const summary = useMemo(() => {
    const sortedArchives = [...reportArchives].sort((first, second) =>
      String(second.createdAtValue).localeCompare(String(first.createdAtValue)),
    );

    return {
      total: reportArchives.length,
      sup: reportArchives.filter((archive) => archive.type === "SUP").length,
      thesis: reportArchives.filter((archive) => archive.type === "Skripsi")
        .length,
      latest: sortedArchives[0]?.createdAt || "-",
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

  function handleSort(key) {
    setSortConfig((current) => {
      if (current.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }

      return {
        key,
        direction: "asc",
      };
    });

    setCurrentPage(1);
  }

  return (
    <div className="mx-auto w-full max-w-6xl pb-10 font-[Poppins]">
      <div className="mb-6 pt-2">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
          Arsip Laporan
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Lihat laporan SUP dan Skripsi yang sudah direkapitulasi dan
          difinalisasi.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Arsip"
          value={summary.total}
          description="Semua laporan final."
        />

        <SummaryCard
          title="Arsip SUP"
          value={summary.sup}
          description="Laporan SUP."
        />

        <SummaryCard
          title="Arsip Skripsi"
          value={summary.thesis}
          description="Laporan Skripsi."
        />

        <SummaryCard
          title="Rekap Terakhir"
          value={summary.latest}
          description="Terakhir kali laporan direkapitulasi."
          variant="highlight"
          isTextValue
        />
      </section>

      <section className="mt-5 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                  Daftar Arsip
                </h2>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                  {filteredArchives.length} arsip
                </span>
              </div>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Menampilkan {startItem}-{endItem} dari{" "}
                {filteredArchives.length} arsip laporan.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchInput value={search} onChange={handleSearchChange} />

              <button
                type="button"
                onClick={openFilterPanel}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold transition sm:w-fit ${
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

        {filteredArchives.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1220px] text-left text-sm">
              <thead className="bg-[#F8FBFF] text-xs uppercase tracking-[0.14em] text-slate-400">
                <tr>
                  <th className="w-[72px] whitespace-nowrap px-5 py-4 text-center font-semibold">
                    No
                  </th>
                  <th className="min-w-[320px] whitespace-nowrap px-5 py-4 font-semibold">
                    Nama Laporan
                  </th>
                  <th className="min-w-[110px] whitespace-nowrap px-5 py-4 font-semibold">
                    Jenis
                  </th>
                  <th className="min-w-[250px] whitespace-nowrap px-5 py-4 font-semibold">
                    Periode
                  </th>
                  <SortableHeader
                    label="Peserta"
                    sortKey="totalParticipants"
                    activeSort={sortConfig}
                    onSort={handleSort}
                    className="min-w-[120px] text-center"
                  />
                  <SortableHeader
                    label="Rata-rata"
                    sortKey="averageScore"
                    activeSort={sortConfig}
                    onSort={handleSort}
                    className="min-w-[130px] text-center"
                  />
                  <SortableHeader
                    label="Dibuat Pada"
                    sortKey="createdAtValue"
                    activeSort={sortConfig}
                    onSort={handleSort}
                    className="min-w-[190px]"
                  />
                  <th className="min-w-[160px] whitespace-nowrap px-5 py-4 font-semibold">
                    Dibuat Oleh
                  </th>
                  <th className="min-w-[120px] whitespace-nowrap px-5 py-4 text-center font-semibold">
                    Status
                  </th>
                  <th className="min-w-[90px] whitespace-nowrap px-5 py-4 text-center font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {paginatedArchives.map((archive, index) => (
                  <ArchiveTableRow
                    key={archive.id}
                    archive={archive}
                    number={(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState />
        )}

        {filteredArchives.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startItem={startItem}
            endItem={endItem}
            totalItems={filteredArchives.length}
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

function SummaryCard({
  title,
  value,
  description,
  isTextValue = false,
  variant = "default",
}) {
  const isHighlight = variant === "highlight";

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border bg-white px-5 py-4 shadow-sm ${
        isHighlight
          ? "border-blue-200 shadow-blue-100/40"
          : "border-blue-100 shadow-blue-100/30"
      }`}
    >
      {isHighlight && (
        <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
      )}

      <div className={isHighlight ? "pl-2" : ""}>
        <p
          className={`text-sm font-medium ${
            isHighlight ? "text-primary" : "text-slate-500"
          }`}
        >
          {title}
        </p>

        <p
          className={`mt-2 font-semibold tracking-tight text-slate-950 ${
            isTextValue ? "line-clamp-2 text-lg leading-7" : "text-3xl"
          }`}
        >
          {value}
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>
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
        placeholder="Cari nama laporan, periode, atau pembuat..."
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
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 ring-1 ring-blue-100 transition hover:text-primary"
          >
            <X size={14} />
            Reset
          </button>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <FilterSelect
          label="Jenis Laporan"
          value={filters.type}
          onChange={(value) => onChange("type", value)}
          options={typeOptions}
        />

        <FilterSelect
          label="Periode"
          value={filters.periodType}
          onChange={(value) => onChange("periodType", value)}
          options={periodOptions}
        />
      </div>

      <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-slate-700"
        >
          Batal
        </button>

        <button
          type="button"
          onClick={onApply}
          className="inline-flex h-10 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-primary-dark"
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
          className="inline-flex max-w-full items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-primary ring-1 ring-blue-100 transition hover:bg-blue-100"
        >
          <span className="shrink-0">{filter.label}:</span>
          <span className="min-w-0 truncate">{filter.value}</span>
          <X size={14} className="shrink-0" />
        </button>
      ))}

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
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
          className="h-11 w-full appearance-none rounded-2xl border border-blue-100 bg-white pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
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

function SortableHeader({ label, sortKey, activeSort, onSort, className = "" }) {
  const isActive = activeSort.key === sortKey;
  const Icon = isActive && activeSort.direction === "asc" ? ArrowUp : ArrowDown;

  return (
    <th className={`whitespace-nowrap px-5 py-4 font-semibold ${className}`}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 transition ${
          isActive
            ? "bg-blue-50 text-primary"
            : "text-slate-400 hover:bg-blue-50 hover:text-primary"
        }`}
      >
        {label}
        <Icon size={13} />
      </button>
    </th>
  );
}

function ArchiveTableRow({ archive, number }) {
  return (
    <tr className="align-top transition hover:bg-blue-50/40">
      <td className="whitespace-nowrap px-5 py-4 text-center">
        <span className="text-sm font-semibold text-slate-500">{number}</span>
      </td>

      <td className="px-5 py-4">
        <p className="max-w-[340px] truncate font-semibold leading-6 text-slate-950">
          {archive.name}
        </p>
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <StatusBadge
          label={archive.type}
          className={getTypeClass(archive.type)}
        />
      </td>

      <td className="px-5 py-4">
        <p className="max-w-[260px] truncate text-sm font-medium text-slate-600">
          {archive.period}
        </p>
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-center">
        <span className="text-sm font-semibold text-slate-800">
          {archive.totalParticipants}
        </span>
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-center">
        <span className="text-sm font-semibold text-slate-800">
          {formatScore(archive.averageScore)}
        </span>
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <p className="text-sm font-medium text-slate-600">
          {archive.createdAt}
        </p>
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <p className="text-sm font-medium text-slate-600">
          {archive.createdBy}
        </p>
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-center">
        <StatusBadge
          label={archive.status}
          className="bg-emerald-50 text-emerald-700 ring-emerald-100"
        />
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-center">
        <Link
          href={`/staff/archive/${archive.id}`}
          className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-primary transition hover:text-primary-dark"
        >
          Detail
          <ChevronRight size={15} />
        </Link>
      </td>
    </tr>
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
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-slate-500 transition hover:bg-blue-50 hover:text-primary disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300"
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
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-slate-500 transition hover:bg-blue-50 hover:text-primary disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300"
          aria-label="Halaman berikutnya"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ label, className }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ${className}`}
    >
      {label}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-primary ring-1 ring-blue-100">
        <Archive size={24} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950">
        Arsip laporan tidak ditemukan
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Tidak ada arsip yang sesuai dengan pencarian atau filter yang dipilih.
      </p>
    </div>
  );
}

function getTypeClass(type) {
  if (type === "SUP") {
    return "bg-blue-50 text-primary ring-blue-100";
  }

  return "bg-violet-50 text-violet-700 ring-violet-100";
}

function formatScore(score) {
  return score.toLocaleString("id-ID", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}