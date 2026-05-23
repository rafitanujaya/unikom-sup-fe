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
  UserRound,
  X,
} from "lucide-react";

const students = [
  {
    id: "STD-001",
    nim: "10122001",
    name: "Nadia Putri Azzahra",
    email: "nadia.10122001@mahasiswa.unikom.ac.id",
    faculty: "Fakultas Ilmu Budaya",
    studyProgram: "Sastra Inggris",
    semester: 8,
    entryYear: 2022,
    accountStatus: "Aktif",
    supStatus: "Baru Masuk",
    thesisStatus: "Belum Ada",
  },
  {
    id: "STD-002",
    nim: "10122018",
    name: "Rafi Maulana",
    email: "rafi.10122018@mahasiswa.unikom.ac.id",
    faculty: "Fakultas Ilmu Budaya",
    studyProgram: "Sastra Inggris",
    semester: 8,
    entryYear: 2022,
    accountStatus: "Aktif",
    supStatus: "Selesai",
    thesisStatus: "Dalam Proses",
  },
  {
    id: "STD-003",
    nim: "10122024",
    name: "Salsa Nuraini",
    email: "salsa.10122024@mahasiswa.unikom.ac.id",
    faculty: "Fakultas Ilmu Budaya",
    studyProgram: "Sastra Inggris",
    semester: 8,
    entryYear: 2022,
    accountStatus: "Aktif",
    supStatus: "Dalam Proses",
    thesisStatus: "Belum Ada",
  },
  {
    id: "STD-004",
    nim: "10121035",
    name: "Fajar Pratama",
    email: "fajar.10121035@mahasiswa.unikom.ac.id",
    faculty: "Fakultas Ilmu Budaya",
    studyProgram: "Sastra Inggris",
    semester: 10,
    entryYear: 2021,
    accountStatus: "Aktif",
    supStatus: "Selesai",
    thesisStatus: "Sedang Dijadwalkan",
  },
  {
    id: "STD-005",
    nim: "10122029",
    name: "Aulia Rahman",
    email: "aulia.10122029@mahasiswa.unikom.ac.id",
    faculty: "Fakultas Ilmu Budaya",
    studyProgram: "Sastra Inggris",
    semester: 8,
    entryYear: 2022,
    accountStatus: "Aktif",
    supStatus: "Dijadwalkan",
    thesisStatus: "Belum Ada",
  },
  {
    id: "STD-006",
    nim: "10121041",
    name: "Maya Anggraini",
    email: "maya.10121041@mahasiswa.unikom.ac.id",
    faculty: "Fakultas Ilmu Budaya",
    studyProgram: "Sastra Inggris",
    semester: 10,
    entryYear: 2021,
    accountStatus: "Aktif",
    supStatus: "Belum Ada",
    thesisStatus: "Belum Ada",
  },
  {
    id: "STD-007",
    nim: "10122033",
    name: "Ilham Ramadhan",
    email: "ilham.10122033@mahasiswa.unikom.ac.id",
    faculty: "Fakultas Ilmu Budaya",
    studyProgram: "Sastra Inggris",
    semester: 8,
    entryYear: 2022,
    accountStatus: "Aktif",
    supStatus: "Dijadwalkan",
    thesisStatus: "Belum Ada",
  },
  {
    id: "STD-008",
    nim: "10121052",
    name: "Dinda Salsabila",
    email: "dinda.10121052@mahasiswa.unikom.ac.id",
    faculty: "Fakultas Ilmu Budaya",
    studyProgram: "Sastra Inggris",
    semester: 10,
    entryYear: 2021,
    accountStatus: "Nonaktif",
    supStatus: "Selesai",
    thesisStatus: "Selesai",
  },
  {
    id: "STD-009",
    nim: "10122047",
    name: "Farhan Alfarizi",
    email: "farhan.10122047@mahasiswa.unikom.ac.id",
    faculty: "Fakultas Ilmu Budaya",
    studyProgram: "Sastra Inggris",
    semester: 8,
    entryYear: 2022,
    accountStatus: "Aktif",
    supStatus: "Dalam Proses",
    thesisStatus: "Belum Ada",
  },
  {
    id: "STD-010",
    nim: "10121066",
    name: "Rania Khairunnisa",
    email: "rania.10121066@mahasiswa.unikom.ac.id",
    faculty: "Fakultas Ilmu Budaya",
    studyProgram: "Sastra Inggris",
    semester: 10,
    entryYear: 2021,
    accountStatus: "Aktif",
    supStatus: "Selesai",
    thesisStatus: "Sedang Dijadwalkan",
  },
  {
    id: "STD-011",
    nim: "10122055",
    name: "Kevin Aditya",
    email: "kevin.10122055@mahasiswa.unikom.ac.id",
    faculty: "Fakultas Ilmu Budaya",
    studyProgram: "Sastra Inggris",
    semester: 8,
    entryYear: 2022,
    accountStatus: "Aktif",
    supStatus: "Baru Masuk",
    thesisStatus: "Belum Ada",
  },
  {
    id: "STD-012",
    nim: "10121072",
    name: "Putri Maharani",
    email: "putri.10121072@mahasiswa.unikom.ac.id",
    faculty: "Fakultas Ilmu Budaya",
    studyProgram: "Sastra Inggris",
    semester: 10,
    entryYear: 2021,
    accountStatus: "Aktif",
    supStatus: "Selesai",
    thesisStatus: "Selesai",
  },
];

const defaultFilters = {
  accountStatus: "Semua",
  semester: "Semua",
  supStatus: "Semua",
  thesisStatus: "Semua",
};

const accountOptions = ["Semua", "Aktif", "Nonaktif"];
const semesterOptions = ["Semua", "8", "10"];
const submissionOptions = [
  "Semua",
  "Belum Ada",
  "Baru Masuk",
  "Dalam Proses",
  "Sedang Dijadwalkan",
  "Dijadwalkan",
  "Selesai",
];

const ITEMS_PER_PAGE = 10;

export default function StaffStudentPage() {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const activeFilters = [
    appliedFilters.accountStatus !== "Semua"
      ? {
          key: "accountStatus",
          label: "Status",
          value: appliedFilters.accountStatus,
        }
      : null,
    appliedFilters.semester !== "Semua"
      ? {
          key: "semester",
          label: "Semester",
          value: appliedFilters.semester,
        }
      : null,
    appliedFilters.supStatus !== "Semua"
      ? {
          key: "supStatus",
          label: "SUP",
          value: appliedFilters.supStatus,
        }
      : null,
    appliedFilters.thesisStatus !== "Semua"
      ? {
          key: "thesisStatus",
          label: "Skripsi",
          value: appliedFilters.thesisStatus,
        }
      : null,
  ].filter(Boolean);

  const isFilterActive = activeFilters.length > 0;

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(keyword) ||
        student.nim.toLowerCase().includes(keyword) ||
        student.email.toLowerCase().includes(keyword);

      const matchesAccount =
        appliedFilters.accountStatus === "Semua" ||
        student.accountStatus === appliedFilters.accountStatus;

      const matchesSemester =
        appliedFilters.semester === "Semua" ||
        String(student.semester) === appliedFilters.semester;

      const matchesSup =
        appliedFilters.supStatus === "Semua" ||
        student.supStatus === appliedFilters.supStatus;

      const matchesThesis =
        appliedFilters.thesisStatus === "Semua" ||
        student.thesisStatus === appliedFilters.thesisStatus;

      return (
        matchesSearch &&
        matchesAccount &&
        matchesSemester &&
        matchesSup &&
        matchesThesis
      );
    });
  }, [search, appliedFilters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / ITEMS_PER_PAGE),
  );

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, currentPage]);

  const startItem =
    filteredStudents.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredStudents.length);

  const summary = useMemo(() => {
    return {
      active: students.filter((student) => student.accountStatus === "Aktif")
        .length,
      inactive: students.filter((student) => student.accountStatus === "Nonaktif")
        .length,
      supSubmitted: students.filter((student) => student.supStatus !== "Belum Ada")
        .length,
      thesisSubmitted: students.filter(
        (student) => student.thesisStatus !== "Belum Ada",
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
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
          Data Mahasiswa
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Pantau akun mahasiswa dan progres pengajuan akademik.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Akun Aktif"
          value={summary.active}
          description="Dapat mengakses portal."
        />

        <SummaryCard
          title="Akun Nonaktif"
          value={summary.inactive}
          description="Akses sedang nonaktif."
        />

        <SummaryCard
          title="Pengajuan SUP"
          value={summary.supSubmitted}
          description="Sudah memiliki data SUP."
        />

        <SummaryCard
          title="Pengajuan Skripsi"
          value={summary.thesisSubmitted}
          description="Sudah memiliki data Skripsi."
        />
      </section>

      <section className="mt-5 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                  Daftar Mahasiswa
                </h2>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                  {filteredStudents.length} akun
                </span>
              </div>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Menampilkan {startItem}-{endItem} dari{" "}
                {filteredStudents.length} akun mahasiswa.
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

        {filteredStudents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] text-left text-sm">
              <thead className="bg-[#F8FBFF] text-xs uppercase tracking-[0.14em] text-slate-400">
                <tr>
                  <th className="w-[72px] whitespace-nowrap px-5 py-4 text-center font-semibold">
                    No
                  </th>
                  <th className="min-w-[220px] whitespace-nowrap px-5 py-4 font-semibold">
                    Nama Mahasiswa
                  </th>
                  <th className="min-w-[120px] whitespace-nowrap px-5 py-4 font-semibold">
                    NIM
                  </th>
                  <th className="min-w-[260px] whitespace-nowrap px-5 py-4 font-semibold">
                    Email
                  </th>
                  <th className="min-w-[110px] whitespace-nowrap px-5 py-4 font-semibold">
                    Semester
                  </th>
                  <th className="min-w-[110px] whitespace-nowrap px-5 py-4 font-semibold">
                    Angkatan
                  </th>
                  <th className="min-w-[130px] whitespace-nowrap px-5 py-4 font-semibold">
                    Status Akun
                  </th>
                  <th className="min-w-[150px] whitespace-nowrap px-5 py-4 font-semibold">
                    SUP
                  </th>
                  <th className="min-w-[150px] whitespace-nowrap px-5 py-4 font-semibold">
                    Skripsi
                  </th>
                  <th className="min-w-[90px] whitespace-nowrap px-5 py-4 text-center font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {paginatedStudents.map((student, index) => (
                  <StudentTableRow
                    key={student.id}
                    student={student}
                    number={(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState />
        )}

        {filteredStudents.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startItem={startItem}
            endItem={endItem}
            totalItems={filteredStudents.length}
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
        placeholder="Cari nama, NIM, atau email mahasiswa..."
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

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <FilterSelect
          label="Status Akun"
          value={filters.accountStatus}
          onChange={(value) => onChange("accountStatus", value)}
          options={accountOptions}
        />

        <FilterSelect
          label="Semester"
          value={filters.semester}
          onChange={(value) => onChange("semester", value)}
          options={semesterOptions}
        />

        <FilterSelect
          label="Status SUP"
          value={filters.supStatus}
          onChange={(value) => onChange("supStatus", value)}
          options={submissionOptions}
        />

        <FilterSelect
          label="Status Skripsi"
          value={filters.thesisStatus}
          onChange={(value) => onChange("thesisStatus", value)}
          options={submissionOptions}
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
          <span className="min-w-0 truncate">
            {filter.key === "semester"
              ? `Semester ${filter.value}`
              : filter.value}
          </span>
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
              {option === "Semua"
                ? option
                : label === "Semester"
                  ? `Semester ${option}`
                  : option}
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

function StudentTableRow({ student, number }) {
  return (
    <tr className="align-top transition hover:bg-blue-50/40">
      <td className="whitespace-nowrap px-5 py-4 text-center">
        <span className="text-sm font-semibold text-slate-500">{number}</span>
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <p className="font-semibold text-slate-950">{student.name}</p>
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <p className="text-sm font-semibold text-slate-800">{student.nim}</p>
      </td>

      <td className="px-5 py-4">
        <p className="max-w-[280px] truncate text-sm font-medium text-slate-600">
          {student.email}
        </p>
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <p className="text-sm font-semibold text-slate-800">
          {student.semester}
        </p>
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <p className="text-sm font-semibold text-slate-800">
          {student.entryYear}
        </p>
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <StatusBadge
          label={student.accountStatus}
          className={getAccountStatusClass(student.accountStatus)}
        />
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <StatusBadge
          label={student.supStatus}
          className={getSubmissionStatusClass(student.supStatus)}
        />
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <StatusBadge
          label={student.thesisStatus}
          className={getSubmissionStatusClass(student.thesisStatus)}
        />
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-center">
        <Link
          href={`/staff/students/${student.id}`}
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
        <UserRound size={24} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950">
        Mahasiswa tidak ditemukan
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Tidak ada akun mahasiswa yang sesuai dengan pencarian atau filter yang
        dipilih.
      </p>
    </div>
  );
}

function getAccountStatusClass(status) {
  if (status === "Aktif") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}

function getSubmissionStatusClass(status) {
  if (status === "Selesai") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  }

  if (status === "Dijadwalkan") {
    return "bg-blue-50 text-primary ring-blue-100";
  }

  if (status === "Sedang Dijadwalkan") {
    return "bg-violet-50 text-violet-700 ring-violet-100";
  }

  if (status === "Dalam Proses") {
    return "bg-amber-50 text-amber-700 ring-amber-100";
  }

  if (status === "Baru Masuk") {
    return "bg-slate-100 text-slate-600 ring-slate-200";
  }

  return "bg-slate-100 text-slate-500 ring-slate-200";
}