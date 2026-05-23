"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileCheck2,
  Filter,
  GraduationCap,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  X,
} from "lucide-react";

const approvalItems = [
  {
    id: "APR-001",
    studentName: "Rizky Ramadhan",
    nim: "101234567",
    studyProgram: "Sastra Inggris",
    type: "SUP",
    title: "Analisis Pragmatik dalam Dialog Film The King's Speech",
    date: "22 Mei 2026",
    averageScore: 82.5,
    academicResult: "Lulus dengan Revisi",
    approvalStatus: "Menunggu Persetujuan",
    academicYear: "2025/2026",
  },
  {
    id: "APR-002",
    studentName: "Nadia Putri",
    nim: "101234568",
    studyProgram: "Sastra Inggris",
    type: "Sidang Skripsi",
    title: "Representasi Identitas Perempuan dalam Novel Little Women",
    date: "21 Mei 2026",
    averageScore: 88,
    academicResult: "Lulus",
    approvalStatus: "Menunggu Persetujuan",
    academicYear: "2025/2026",
  },
  {
    id: "APR-003",
    studentName: "Fajar Maulana",
    nim: "101234569",
    studyProgram: "Sastra Inggris",
    type: "SUP",
    title: "Code Switching pada Percakapan Mahasiswa Sastra Inggris",
    date: "20 Mei 2026",
    averageScore: 74,
    academicResult: "Lulus dengan Revisi",
    approvalStatus: "Ditunda",
    academicYear: "2025/2026",
  },
  {
    id: "APR-004",
    studentName: "Aulia Safitri",
    nim: "101234570",
    studyProgram: "Sastra Inggris",
    type: "Sidang Skripsi",
    title: "Analisis Karakter Utama dalam Novel Pride and Prejudice",
    date: "18 Mei 2026",
    averageScore: 91,
    academicResult: "Lulus",
    approvalStatus: "Disetujui",
    academicYear: "2025/2026",
  },
  {
    id: "APR-005",
    studentName: "Dimas Pratama",
    nim: "101234571",
    studyProgram: "Sastra Inggris",
    type: "SUP",
    title: "Analisis Struktur Naratif dalam Cerpen The Tell-Tale Heart",
    date: "17 Mei 2026",
    averageScore: 58,
    academicResult: "Tidak Lulus",
    approvalStatus: "Menunggu Persetujuan",
    academicYear: "2025/2026",
  },
  {
    id: "APR-006",
    studentName: "Salsa Nabila",
    nim: "101234572",
    studyProgram: "Sastra Inggris",
    type: "Sidang Skripsi",
    title: "Gender Representation in Contemporary English Literature",
    date: "16 Mei 2026",
    averageScore: 86,
    academicResult: "Lulus",
    approvalStatus: "Disetujui",
    academicYear: "2025/2026",
  },
  {
    id: "APR-007",
    studentName: "Arif Hidayat",
    nim: "101234573",
    studyProgram: "Sastra Inggris",
    type: "SUP",
    title: "Analisis Semiotika pada Poster Film Berbahasa Inggris",
    date: "15 Mei 2026",
    averageScore: 79,
    academicResult: "Lulus dengan Revisi",
    approvalStatus: "Menunggu Persetujuan",
    academicYear: "2025/2026",
  },
  {
    id: "APR-008",
    studentName: "Maya Cahyani",
    nim: "101234574",
    studyProgram: "Sastra Inggris",
    type: "Sidang Skripsi",
    title: "The Use of Figurative Language in Selected Poems",
    date: "14 Mei 2026",
    averageScore: 90,
    academicResult: "Lulus",
    approvalStatus: "Disetujui",
    academicYear: "2025/2026",
  },
  {
    id: "APR-009",
    studentName: "Rangga Saputra",
    nim: "101234575",
    studyProgram: "Sastra Inggris",
    type: "SUP",
    title: "Language Style Analysis in Public Speaking Videos",
    date: "13 Mei 2026",
    averageScore: 72,
    academicResult: "Lulus dengan Revisi",
    approvalStatus: "Ditunda",
    academicYear: "2025/2026",
  },
  {
    id: "APR-010",
    studentName: "Intan Permata",
    nim: "101234576",
    studyProgram: "Sastra Inggris",
    type: "Sidang Skripsi",
    title: "Moral Values in Children's Literature",
    date: "12 Mei 2026",
    averageScore: 84,
    academicResult: "Lulus",
    approvalStatus: "Menunggu Persetujuan",
    academicYear: "2025/2026",
  },
  {
    id: "APR-011",
    studentName: "Yusuf Maulana",
    nim: "101234577",
    studyProgram: "Sastra Inggris",
    type: "SUP",
    title: "Translation Shift in Indonesian Subtitle of English Movie",
    date: "11 Mei 2026",
    averageScore: 76,
    academicResult: "Lulus dengan Revisi",
    approvalStatus: "Menunggu Persetujuan",
    academicYear: "2025/2026",
  },
  {
    id: "APR-012",
    studentName: "Citra Lestari",
    nim: "101234578",
    studyProgram: "Sastra Inggris",
    type: "Sidang Skripsi",
    title: "Character Development in Modern English Novels",
    date: "10 Mei 2026",
    averageScore: 89,
    academicResult: "Lulus",
    approvalStatus: "Disetujui",
    academicYear: "2025/2026",
  },
];

const defaultFilters = {
  type: "Semua",
  status: "Semua",
  academicYear: "2025/2026",
};

const typeOptions = ["Semua", "SUP", "Sidang Skripsi"];
const statusOptions = ["Semua", "Menunggu Persetujuan", "Disetujui", "Ditunda"];
const academicYearOptions = ["2025/2026", "2026/2027", "2027/2028"];

export default function StaffApprovalsPage() {
  const itemsPerPage = 10;

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
    appliedFilters.academicYear !== "2025/2026"
      ? {
          key: "academicYear",
          label: "Tahun",
          value: appliedFilters.academicYear,
        }
      : null,
  ].filter(Boolean);

  const isFilterActive = activeFilters.length > 0;

  const filteredApprovals = useMemo(() => {
    return approvalItems.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        item.studentName.toLowerCase().includes(keyword) ||
        item.nim.toLowerCase().includes(keyword) ||
        item.title.toLowerCase().includes(keyword);

      const matchesType =
        appliedFilters.type === "Semua" || item.type === appliedFilters.type;

      const matchesStatus =
        appliedFilters.status === "Semua" ||
        item.approvalStatus === appliedFilters.status;

      const matchesAcademicYear =
        item.academicYear === appliedFilters.academicYear;

      return matchesSearch && matchesType && matchesStatus && matchesAcademicYear;
    });
  }, [search, appliedFilters]);

  const totalPages = Math.ceil(filteredApprovals.length / itemsPerPage);

  const paginatedApprovals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredApprovals.slice(startIndex, endIndex);
  }, [filteredApprovals, currentPage]);

  const startItem =
    filteredApprovals.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(currentPage * itemsPerPage, filteredApprovals.length);

  const summary = useMemo(() => {
    return {
      pending: approvalItems.filter(
        (item) => item.approvalStatus === "Menunggu Persetujuan",
      ).length,
      approved: approvalItems.filter(
        (item) => item.approvalStatus === "Disetujui",
      ).length,
      postponed: approvalItems.filter(
        (item) => item.approvalStatus === "Ditunda",
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
              Persetujuan Akhir
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Tinjau hasil agregasi sebelum diumumkan ke mahasiswa.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-primary ring-1 ring-blue-100">
            <ShieldCheck size={15} />
            Akses Approval
          </div>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Menunggu"
          value={summary.pending}
          description="Perlu ditinjau"
          icon={ShieldCheck}
        />

        <SummaryCard
          title="Disetujui"
          value={summary.approved}
          description="Hasil disetujui"
          icon={CheckCircle2}
        />

        <SummaryCard
          title="Ditunda"
          value={summary.postponed}
          description="Butuh pengecekan"
          icon={FileCheck2}
        />
      </section>

      <section className="mt-5 rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                Daftar Hasil Agregasi
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Pilih pengajuan untuk meninjau detail hasil.
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

        <div className="divide-y divide-slate-200">
          {filteredApprovals.length > 0 ? (
            paginatedApprovals.map((item) => (
              <ApprovalListItem key={item.id} item={item} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {filteredApprovals.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startItem={startItem}
            endItem={endItem}
            totalItems={filteredApprovals.length}
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

function SummaryCard({ title, value, description, icon: Icon }) {
  return (
    <div className="rounded-[28px] border border-blue-100 bg-white px-5 py-4 shadow-sm shadow-blue-100/30">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>

          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary ring-1 ring-blue-100">
          <Icon size={22} />
        </div>
      </div>
    </div>
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

      <div className="grid gap-3 md:grid-cols-3">
        <FilterSelect
          label="Jenis Kegiatan"
          value={filters.type}
          onChange={(value) => onChange("type", value)}
          options={typeOptions}
        />

        <FilterSelect
          label="Status Approval"
          value={filters.status}
          onChange={(value) => onChange("status", value)}
          options={statusOptions}
        />

        <FilterSelect
          label="Tahun Akademik"
          value={filters.academicYear}
          onChange={(value) => onChange("academicYear", value)}
          options={academicYearOptions}
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

function ApprovalListItem({ item }) {
  return (
    <div className="group relative p-5 transition hover:bg-blue-50/40">
      <span className="absolute left-0 top-5 h-[calc(100%-2.5rem)] w-1 rounded-r-full bg-transparent transition group-hover:bg-primary" />

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.95fr_0.5fr] xl:items-center">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 via-blue-50 to-white text-primary ring-1 ring-blue-100">
            <UserRound size={24} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-slate-950">
                {item.studentName}
              </h3>

              <TypeBadge label={item.type} />
            </div>

            <p className="mt-1 text-sm text-slate-500">
              {item.nim} · {item.studyProgram}
            </p>

            <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-slate-700">
              {item.title}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-[0.75fr_0.55fr_1.2fr]">
          <InfoItem icon={CalendarDays} label="Tanggal" value={item.date} />

          <InfoItem
            icon={GraduationCap}
            label="Nilai"
            value={item.averageScore}
          />

          <AcademicResultInfo result={item.academicResult} />
        </div>

        <div className="flex flex-col gap-3 xl:items-end">
          <ApprovalStatusBadge status={item.approvalStatus} />

          <Link
            href={`/staff/final-results/${item.id}`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-primary-dark hover:shadow-xl hover:shadow-blue-900/20 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-fit xl:min-w-[112px]"
          >
            <Eye size={17} />
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
        <Icon size={14} className="shrink-0 text-primary" />
        <span>{label}</span>
      </div>

      <p className="mt-1 truncate text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function AcademicResultInfo({ result }) {
  const styles = {
    Lulus: {
      dot: "bg-emerald-500",
      text: "text-emerald-700",
    },
    "Lulus dengan Revisi": {
      dot: "bg-amber-500",
      text: "text-amber-700",
    },
    "Tidak Lulus": {
      dot: "bg-rose-500",
      text: "text-rose-700",
    },
  };

  const style = styles[result] || styles["Lulus dengan Revisi"];

  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
        <BadgeCheck size={14} className="shrink-0 text-primary" />
        <span>Hasil</span>
      </div>

      <div className="mt-1 flex min-w-0 items-center gap-2">
        <span className={`h-2 w-2 shrink-0 rounded-full ${style.dot}`} />

        <p className={`min-w-0 truncate text-sm font-semibold ${style.text}`}>
          {result}
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
        placeholder="Cari nama, NIM, atau judul..."
        className="h-11 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
    </label>
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

function ApprovalStatusBadge({ status }) {
  const styles = {
    "Menunggu Persetujuan": "bg-amber-50 text-amber-700 ring-amber-100",
    Disetujui: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    Ditunda: "bg-slate-50 text-slate-600 ring-slate-200",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
        styles[status] || styles["Menunggu Persetujuan"]
      }`}
    >
      {status}
    </span>
  );
}

function TypeBadge({ label }) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
      {label}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-primary ring-1 ring-blue-100">
        <ShieldCheck size={24} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950">
        Data tidak ditemukan
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Tidak ada hasil agregasi yang sesuai dengan filter atau kata kunci.
      </p>
    </div>
  );
}