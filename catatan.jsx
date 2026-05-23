"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

const verificationItems = [
  {
    id: "VER-001",
    submissionId: "SUB-001",
    nim: "10122001",
    name: "Nadia Putri Azzahra",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    type: "SUP",
    title: "Representasi Identitas dalam Novel Kontemporer",
    submittedAt: "15 Mei 2026",
    status: "Menunggu Pemeriksaan",
  },
  {
    id: "VER-002",
    submissionId: "SUB-006",
    nim: "10121041",
    name: "Maya Anggraini",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    type: "Sidang",
    title: "Language Anxiety pada Presentasi Akademik Mahasiswa",
    submittedAt: "12 Mei 2026",
    status: "Menunggu Pemeriksaan",
  },
  {
    id: "VER-003",
    submissionId: "SUB-011",
    nim: "10122055",
    name: "Kevin Aditya",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    type: "SUP",
    title: "Moral Value dalam Novel Young Adult Fiction",
    submittedAt: "09 Mei 2026",
    status: "Menunggu Pemeriksaan",
  },
  {
    id: "VER-004",
    submissionId: "SUB-013",
    nim: "10121088",
    name: "Anisa Rahmadani",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    type: "Sidang",
    title: "Discourse Analysis pada Interview Podcast Berbahasa Inggris",
    submittedAt: "08 Mei 2026",
    status: "Perlu Revisi",
  },
  {
    id: "VER-005",
    submissionId: "SUB-014",
    nim: "10122060",
    name: "Yusuf Firmansyah",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    type: "SUP",
    title: "Language Style pada Dialog Film Komedi Romantis",
    submittedAt: "07 Mei 2026",
    status: "Perlu Revisi",
  },
];

const typeTabs = ["Semua", "SUP", "Sidang"];
const statusTabs = ["Semua", "Menunggu Pemeriksaan", "Perlu Revisi"];
const ITEMS_PER_PAGE = 10;

function getVerificationStatusClass(status) {
  if (status === "Disetujui") {
    return "bg-emerald-50 text-emerald-600 ring-emerald-100";
  }

  if (status === "Perlu Revisi") {
    return "bg-amber-50 text-amber-600 ring-amber-100";
  }

  if (status === "Ditolak") {
    return "bg-red-50 text-red-600 ring-red-100";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}

export default function StaffVerificationPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Semua");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return verificationItems.filter((item) => {
      const searchValue = search.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(searchValue) ||
        item.nim.toLowerCase().includes(searchValue) ||
        item.title.toLowerCase().includes(searchValue);

      const matchesType = selectedType === "Semua" || item.type === selectedType;
      const matchesStatus =
        selectedStatus === "Semua" || item.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, selectedType, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const startItem = filteredItems.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length);

  const waitingCount = verificationItems.filter(
    (item) => item.status === "Menunggu Pemeriksaan"
  ).length;
  const revisionCount = verificationItems.filter(
    (item) => item.status === "Perlu Revisi"
  ).length;
  const totalQueue = verificationItems.length;

  const hasActiveFilter =
    search !== "" || selectedType !== "Semua" || selectedStatus !== "Semua";

  const resetFilters = () => {
    setSearch("");
    setSelectedType("Semua");
    setSelectedStatus("Semua");
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 pb-6">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Verifikasi
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
          Pemeriksaan Berkas Pengajuan.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          Periksa kelengkapan dan kesesuaian dokumen mahasiswa sebelum pengajuan
          SUP atau Sidang dilanjutkan ke tahap penjadwalan.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <SummaryCard
          title="Menunggu Pemeriksaan"
          value={waitingCount}
          description="Pengajuan baru yang perlu dicek oleh staff."
        />
        <SummaryCard
          title="Perlu Revisi"
          value={revisionCount}
          description="Pengajuan yang masih menunggu perbaikan mahasiswa."
        />
        <div className="rounded-[1.75rem] bg-primary p-5 text-white shadow-lg shadow-blue-600/20">
          <p className="text-sm font-medium text-blue-50/80">Total Antrean</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
            {totalQueue}
          </p>
          <p className="mt-4 text-xs leading-5 text-blue-50/80">
            Hanya menampilkan pengajuan yang masih perlu diproses.
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 bg-white p-5">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                  Daftar Verifikasi
                </h2>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                  {filteredItems.length} data
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Menampilkan {startItem}-{endItem} dari {filteredItems.length} data verifikasi.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 xl:max-w-2xl">
              <div className="flex h-14 items-center gap-3 rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 shadow-sm shadow-blue-100/20 transition focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                <Search size={18} className="shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Cari nama, NIM, atau judul pengajuan..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange({ target: { value: "" } })}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Hapus pencarian"
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowFilters((current) => !current)}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                    showFilters || selectedType !== "Semua" || selectedStatus !== "Semua"
                      ? "bg-primary text-white"
                      : "text-slate-500 hover:bg-blue-50 hover:text-primary"
                  }`}
                  aria-label="Tampilkan filter"
                >
                  <SlidersHorizontal size={17} />
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="mt-5 rounded-3xl border border-blue-100 bg-[#F8FBFF] p-4">
              <div className="grid gap-4 xl:grid-cols-[0.55fr_1.45fr] xl:items-start">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Jenis Pengajuan
                  </p>
                  <div className="flex w-fit rounded-2xl bg-white p-1 ring-1 ring-blue-100">
                    {typeTabs.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleTypeChange(item)}
                        className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                          selectedType === item
                            ? "bg-primary text-white shadow-lg shadow-blue-600/20"
                            : "text-slate-500 hover:bg-blue-50 hover:text-primary"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Status Verifikasi
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {statusTabs.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleStatusChange(item)}
                        className={`h-10 shrink-0 rounded-2xl px-4 text-sm font-semibold transition ${
                          selectedStatus === item
                            ? "bg-primary text-white shadow-lg shadow-blue-600/20"
                            : "bg-white text-slate-500 ring-1 ring-blue-100 hover:bg-blue-50 hover:text-primary"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {hasActiveFilter && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-blue-100 pt-4">
              <p className="text-xs font-medium text-slate-400">Filter aktif:</p>
              {search && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                  Pencarian: {search}
                </span>
              )}
              {selectedType !== "Semua" && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                  Jenis: {selectedType}
                </span>
              )}
              {selectedStatus !== "Semua" && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                  Status: {selectedStatus}
                </span>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="min-h-[560px] bg-[#F8FBFF] p-4">
          {paginatedItems.length > 0 ? (
            <div className="space-y-3">
              {paginatedItems.map((item) => (
                <VerificationCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>

        <div className="min-h-[76px] border-t border-blue-100 bg-white px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Halaman {currentPage} dari {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="flex h-10 items-center gap-2 rounded-2xl bg-[#F8FBFF] px-4 text-sm font-semibold text-slate-600 ring-1 ring-blue-100 transition hover:bg-blue-50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft size={17} />
                Sebelumnya
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 rounded-2xl text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-primary text-white shadow-lg shadow-blue-600/20"
                        : "bg-[#F8FBFF] text-slate-600 ring-1 ring-blue-100 hover:bg-blue-50 hover:text-primary"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={currentPage === totalPages}
                className="flex h-10 items-center gap-2 rounded-2xl bg-[#F8FBFF] px-4 text-sm font-semibold text-slate-600 ring-1 ring-blue-100 transition hover:bg-blue-50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                Berikutnya
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ title, value, description }) {
  return (
    <div className="rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-blue-100">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
        {value}
      </p>
      <p className="mt-4 text-xs leading-5 text-slate-500">{description}</p>
    </div>
  );
}

function VerificationCard({ item }) {
  const isActionable = item.status === "Menunggu Pemeriksaan";

  return (
    <article className="rounded-[1.75rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/20 transition-all duration-300 hover:border-blue-200 hover:shadow-md hover:shadow-blue-100/40">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
            {item.type}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getVerificationStatusClass(
              item.status
            )}`}
          >
            {item.status}
          </span>
<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {item.id}
          </span>
        </div>

        <p className="text-sm text-slate-500">Diajukan {item.submittedAt}</p>
      </div>

      <div className="mt-5 flex min-w-0 items-start gap-5">
        <img
          src={item.photo}
          alt={item.name}
          className="h-32 w-32 shrink-0 rounded-[2rem] object-cover ring-1 ring-blue-100"
        />

        <div className="min-w-0 flex-1 pt-1">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            {item.name}
          </h3>
          <p className="mt-1 text-sm text-slate-500">NIM {item.nim}</p>

          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Judul {item.type === "SUP" ? "Proposal" : "Skripsi"}
            </p>
            <p className="mt-1.5 line-clamp-2 text-sm font-semibold leading-7 text-slate-950">
              {item.title}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-blue-100 pt-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3 text-sm text-slate-500">
          <span>Jika disetujui, pengajuan lanjut ke penjadwalan.</span>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 text-sm font-semibold text-primary transition hover:bg-blue-50"
          >
            <FileText size={17} />
            Dokumen
          </button>

          {isActionable ? (
            <Link
              href={`/staff/verification/${item.id}`}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-primary-dark"
            >
              Review Berkas
            </Link>
          ) : (
            <Link
              href={`/staff/verification/${item.id}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:text-primary-dark"
            >
              Lihat Detail
              <ChevronRight size={15} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[520px] items-center justify-center rounded-[2rem] border border-dashed border-blue-200 bg-white p-10 text-center shadow-sm shadow-blue-100/20">
      <div>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-blue-50 text-primary ring-1 ring-blue-100">
          <CheckCircle2 size={30} />
        </div>
        <p className="mt-5 text-lg font-semibold text-slate-950">
          Tidak ada data verifikasi
        </p>
        <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
          Tidak ada pengajuan yang sedang menunggu pemeriksaan atau revisi.
          Pengajuan yang sudah disetujui atau ditolak tidak tampil di halaman ini.
        </p>
      </div>
    </div>
  );
}
