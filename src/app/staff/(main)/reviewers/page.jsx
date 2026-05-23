"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  SlidersHorizontal,
  UsersRound,
  X,
} from "lucide-react";

const examiners = [
  {
    id: "EXM-001",
    nidn: "0412057801",
    name: "Dr. Tatan Tawami, S.S., M.Hum.",
    email: "tatan.tawami@unikom.ac.id",
    expertise: "Linguistics, Discourse Analysis",
    activeSchedules: 4,
    waitingConfirmations: 2,
    status: "Aktif",
  },
  {
    id: "EXM-002",
    nidn: "0421087902",
    name: "Dr. Retno Purwani Sari, S.S., M.Hum.",
    email: "retno.purwani@unikom.ac.id",
    expertise: "Translation Studies",
    activeSchedules: 7,
    waitingConfirmations: 1,
    status: "Aktif",
  },
  {
    id: "EXM-003",
    nidn: "0409038003",
    name: "Dr. Rina Marlina, S.S., M.Hum.",
    email: "rina.marlina@unikom.ac.id",
    expertise: "Literary Studies",
    activeSchedules: 3,
    waitingConfirmations: 0,
    status: "Aktif",
  },
  {
    id: "EXM-004",
    nidn: "0415078104",
    name: "Dr. Nia Kurniawati, S.S., M.Hum.",
    email: "nia.kurniawati@unikom.ac.id",
    expertise: "Film Studies, Literature",
    activeSchedules: 5,
    waitingConfirmations: 1,
    status: "Aktif",
  },
  {
    id: "EXM-005",
    nidn: "0406118205",
    name: "Dr. Mira Handayani, S.S., M.Hum.",
    email: "mira.handayani@unikom.ac.id",
    expertise: "Applied Linguistics",
    activeSchedules: 6,
    waitingConfirmations: 3,
    status: "Aktif",
  },
  {
    id: "EXM-006",
    nidn: "0422048306",
    name: "Dr. Dian Permatasari, S.S., M.Hum.",
    email: "dian.permatasari@unikom.ac.id",
    expertise: "Narratology, Modern Fiction",
    activeSchedules: 2,
    waitingConfirmations: 0,
    status: "Aktif",
  },
  {
    id: "EXM-007",
    nidn: "0419098407",
    name: "Dr. Ahmad Fadilah, S.S., M.Hum.",
    email: "ahmad.fadilah@unikom.ac.id",
    expertise: "Sociolinguistics",
    activeSchedules: 1,
    waitingConfirmations: 0,
    status: "Aktif",
  },
  {
    id: "EXM-008",
    nidn: "0407028508",
    name: "Dr. Siska Amelia, S.S., M.Hum.",
    email: "siska.amelia@unikom.ac.id",
    expertise: "Pragmatics",
    activeSchedules: 0,
    waitingConfirmations: 0,
    status: "Nonaktif",
  },
  {
    id: "EXM-009",
    nidn: "0428018609",
    name: "Dr. Wulan Safitri, S.S., M.Hum.",
    email: "wulan.safitri@unikom.ac.id",
    expertise: "Cultural Studies",
    activeSchedules: 3,
    waitingConfirmations: 1,
    status: "Aktif",
  },
  {
    id: "EXM-010",
    nidn: "0413128710",
    name: "Dr. Bagas Prasetyo, S.S., M.Hum.",
    email: "bagas.prasetyo@unikom.ac.id",
    expertise: "English Education",
    activeSchedules: 5,
    waitingConfirmations: 2,
    status: "Aktif",
  },
  {
    id: "EXM-011",
    nidn: "0408058811",
    name: "Dr. Laila Nurhasanah, S.S., M.Hum.",
    email: "laila.nurhasanah@unikom.ac.id",
    expertise: "Syntax, Grammar Studies",
    activeSchedules: 4,
    waitingConfirmations: 0,
    status: "Aktif",
  },
  {
    id: "EXM-012",
    nidn: "0425098912",
    name: "Dr. Fikri Ramadhan, S.S., M.Hum.",
    email: "fikri.ramadhan@unikom.ac.id",
    expertise: "Semantics",
    activeSchedules: 0,
    waitingConfirmations: 0,
    status: "Nonaktif",
  },
];

const defaultFilters = {
  status: "Semua",
};

const statusOptions = ["Semua", "Aktif", "Nonaktif"];

const ITEMS_PER_PAGE = 10;

export default function StaffExaminerPage() {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const activeFilters = [
    appliedFilters.status !== "Semua"
      ? { key: "status", label: "Status", value: appliedFilters.status }
      : null,
  ].filter(Boolean);

  const isFilterActive = activeFilters.length > 0;

  const filteredExaminers = useMemo(() => {
    return examiners.filter((examiner) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        examiner.name.toLowerCase().includes(keyword) ||
        examiner.nidn.toLowerCase().includes(keyword) ||
        examiner.email.toLowerCase().includes(keyword) ||
        examiner.expertise.toLowerCase().includes(keyword);

      const matchesStatus =
        appliedFilters.status === "Semua" ||
        examiner.status === appliedFilters.status;

      return matchesSearch && matchesStatus;
    });
  }, [search, appliedFilters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredExaminers.length / ITEMS_PER_PAGE),
  );

  const paginatedExaminers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredExaminers.slice(startIndex, endIndex);
  }, [filteredExaminers, currentPage]);

  const startItem =
    filteredExaminers.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredExaminers.length,
  );

  const summary = useMemo(() => {
    return {
      active: examiners.filter((examiner) => examiner.status === "Aktif")
        .length,
      inactive: examiners.filter((examiner) => examiner.status === "Nonaktif")
        .length,
      waiting: examiners.reduce(
        (total, examiner) => total + examiner.waitingConfirmations,
        0,
      ),
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
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
          Data Dosen Penugasan
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Pantau data dosen penelaah dan penguji untuk penugasan SUP dan Sidang.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Dosen Aktif"
          value={summary.active}
          description="Siap ditugaskan."
        />

        <SummaryCard
          title="Dosen Nonaktif"
          value={summary.inactive}
          description="Belum tersedia."
        />

        <SummaryCard
          title="Menunggu"
          value={summary.waiting}
          description="Belum dikonfirmasi."
        />
      </section>

      <section className="mt-5 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                  Daftar Dosen
                </h2>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                  {filteredExaminers.length} dosen
                </span>
              </div>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Menampilkan {startItem}-{endItem} dari{" "}
                {filteredExaminers.length} dosen penugasan.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchInput value={search} onChange={handleSearchChange} />

              <button
                type="button"
                onClick={openFilterPanel}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold transition-all duration-300 sm:w-fit ${
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

        {filteredExaminers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] text-left text-sm">
              <thead className="bg-[#F8FBFF] text-xs uppercase tracking-[0.14em] text-slate-400">
                <tr>
                  <th className="w-[72px] whitespace-nowrap px-5 py-4 text-center font-semibold">
                    No
                  </th>
                  <th className="min-w-[240px] whitespace-nowrap px-5 py-4 font-semibold">
                    Nama Dosen
                  </th>
                  <th className="min-w-[140px] whitespace-nowrap px-5 py-4 font-semibold">
                    NIDN
                  </th>
                  <th className="min-w-[260px] whitespace-nowrap px-5 py-4 font-semibold">
                    Email
                  </th>
                  <th className="min-w-[240px] whitespace-nowrap px-5 py-4 font-semibold">
                    Keahlian
                  </th>
                  <th className="min-w-[130px] whitespace-nowrap px-5 py-4 text-center font-semibold">
                    Jadwal Aktif
                  </th>
                  <th className="min-w-[120px] whitespace-nowrap px-5 py-4 text-center font-semibold">
                    Menunggu
                  </th>
                  <th className="min-w-[130px] whitespace-nowrap px-5 py-4 font-semibold">
                    Status
                  </th>
                  <th className="min-w-[90px] whitespace-nowrap px-5 py-4 text-center font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {paginatedExaminers.map((examiner, index) => (
                  <ExaminerTableRow
                    key={examiner.id}
                    examiner={examiner}
                    number={(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState />
        )}

        {filteredExaminers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startItem={startItem}
            endItem={endItem}
            totalItems={filteredExaminers.length}
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
        placeholder="Cari nama, NIDN, email, atau keahlian..."
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

      <div className="grid gap-3 md:grid-cols-1">
        <FilterSelect
          label="Status Dosen"
          value={filters.status}
          onChange={(value) => onChange("status", value)}
          options={statusOptions}
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

function ExaminerTableRow({ examiner, number }) {
  return (
    <tr className="align-top transition hover:bg-blue-50/40">
      <td className="whitespace-nowrap px-5 py-4 text-center">
        <span className="text-sm font-semibold text-slate-500">{number}</span>
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <p className="font-semibold text-slate-950">{examiner.name}</p>
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <p className="text-sm font-semibold text-slate-800">{examiner.nidn}</p>
      </td>

      <td className="px-5 py-4">
        <p className="max-w-[280px] truncate text-sm font-medium text-slate-600">
          {examiner.email}
        </p>
      </td>

      <td className="px-5 py-4">
        <p className="max-w-[280px] truncate text-sm font-medium text-slate-600">
          {examiner.expertise}
        </p>
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-center">
        <span className="text-sm font-semibold text-slate-800">
          {examiner.activeSchedules}
        </span>
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-center">
        <span
          className={
            examiner.waitingConfirmations > 0
              ? "text-sm font-semibold text-amber-600"
              : "text-sm font-semibold text-slate-400"
          }
        >
          {examiner.waitingConfirmations}
        </span>
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <StatusBadge
          label={examiner.status}
          className={getStatusClass(examiner.status)}
        />
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-center">
        <Link
          href={`/staff/reviewers/${examiner.id}`}
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
        <UsersRound size={24} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950">
        Dosen tidak ditemukan
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Tidak ada dosen yang sesuai dengan pencarian atau filter yang dipilih.
      </p>
    </div>
  );
}

function getStatusClass(status) {
  if (status === "Aktif") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}