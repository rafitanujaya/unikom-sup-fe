"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  FileText,
  ListChecks,
  UserRoundCheck,
} from "lucide-react";

const summaryCards = [
  {
    title: "SUP Masuk",
    value: "16",
    description: "Pengajuan SUP bulan ini",
    icon: FileText,
    href: "/staff/submissions?type=sup",
  },
  {
    title: "Sidang Masuk",
    value: "12",
    description: "Pengajuan sidang bulan ini",
    icon: UserRoundCheck,
    href: "/staff/submissions?type=sidang",
  },
  {
    title: "Perlu Verifikasi",
    value: "12",
    description: "Berkas perlu diperiksa staff",
    icon: Clock3,
    href: "/staff/verification",
    highlight: true,
  },
  {
    title: "Jadwal Belum Final",
    value: "5",
    description: "Masih menunggu konfirmasi",
    icon: CalendarDays,
    href: "/staff/schedules?status=pending",
  },
];

const latestSubmissions = [
  {
    name: "Nadia Putri Azzahra",
    nim: "10122001",
    type: "SUP",
    title: "Representasi Identitas dalam Novel Kontemporer",
    status: "Baru Masuk",
    date: "15 Mei 2026",
  },
  {
    name: "Rafi Maulana",
    nim: "10122018",
    type: "Sidang",
    title: "Code Switching dalam Interaksi Mahasiswa Sastra Inggris",
    status: "Dalam Proses",
    date: "14 Mei 2026",
  },
  {
    name: "Salsa Nuraini",
    nim: "10122024",
    type: "SUP",
    title: "Analisis Karakter Utama dalam Film Adaptasi Novel",
    status: "Dalam Proses",
    date: "14 Mei 2026",
  },
  {
    name: "Fajar Pratama",
    nim: "10121035",
    type: "Sidang",
    title: "Translation Shift pada Subtitle Film Dokumenter",
    status: "Sedang Dijadwalkan",
    date: "13 Mei 2026",
  },
  {
    name: "Aulia Rahman",
    nim: "10122029",
    type: "SUP",
    title: "Narrative Structure dalam Short Story Modern",
    status: "Dijadwalkan",
    date: "13 Mei 2026",
  },
  {
    name: "Maya Anggraini",
    nim: "10121041",
    type: "Sidang",
    title: "Language Anxiety pada Presentasi Akademik Mahasiswa",
    status: "Baru Masuk",
    date: "12 Mei 2026",
  },
  {
    name: "Ilham Ramadhan",
    nim: "10122033",
    type: "SUP",
    title: "Figurative Language pada Lirik Lagu Pop Inggris",
    status: "Dijadwalkan",
    date: "12 Mei 2026",
  },
  {
    name: "Dinda Salsabila",
    nim: "10121052",
    type: "Sidang",
    title: "Translation Accuracy pada Subtitle Film Animasi",
    status: "Selesai",
    date: "11 Mei 2026",
  },
  {
    name: "Farhan Alfarizi",
    nim: "10122047",
    type: "SUP",
    title: "Politeness Strategy dalam Percakapan Film Drama",
    status: "Dalam Proses",
    date: "11 Mei 2026",
  },
  {
    name: "Rania Khairunnisa",
    nim: "10121066",
    type: "Sidang",
    title: "Subtitling Strategy pada Film Biografi",
    status: "Sedang Dijadwalkan",
    date: "10 Mei 2026",
  },
];

const upcomingSchedules = [
  {
    nim: "10122029",
    student: "Aulia Rahman",
    type: "SUP",
    date: "Senin, 18 Mei 2026",
    time: "09.00 - 10.00",
    room: "Ruang Prodi",
    status: "Belum Dimulai",
  },
  {
    nim: "10121041",
    student: "Maya Anggraini",
    type: "Sidang",
    date: "Senin, 18 Mei 2026",
    time: "10.30 - 12.00",
    room: "Lab Bahasa",
    status: "Sedang Dimulai",
  },
  {
    nim: "10122033",
    student: "Ilham Ramadhan",
    type: "SUP",
    date: "Selasa, 19 Mei 2026",
    time: "13.00 - 14.00",
    room: "Ruang Sidang 2",
    status: "Belum Dimulai",
  },
  {
    nim: "10121052",
    student: "Dinda Salsabila",
    type: "Sidang",
    date: "Rabu, 20 Mei 2026",
    time: "08.30 - 10.00",
    room: "Ruang Sidang 1",
    status: "Belum Dimulai",
  },
];

function getSubmissionStatusClass(status) {
  if (status === "Selesai") {
    return "bg-emerald-50 text-emerald-600 ring-emerald-100";
  }

  if (status === "Dijadwalkan") {
    return "bg-blue-50 text-primary ring-blue-100";
  }

  if (status === "Sedang Dijadwalkan") {
    return "bg-violet-50 text-violet-600 ring-violet-100";
  }

  if (status === "Dalam Proses") {
    return "bg-amber-50 text-amber-600 ring-amber-100";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}

function getScheduleStatusClass(status) {
  if (status === "Sedang Dimulai") {
    return "bg-emerald-50 text-emerald-600 ring-emerald-100";
  }

  return "bg-blue-50 text-primary ring-blue-100";
}

export default function StaffDashboardPage() {
  const latestSubmissionRows = latestSubmissions.slice(0, 10);

  return (
    <div className="space-y-6 pb-6">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Dashboard Staff
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
          Pantau proses SUP dan Sidang Skripsi.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          Lihat progres pengajuan, berkas yang perlu diverifikasi, jadwal
          pelaksanaan terdekat, dan status kegiatan akademik Program Studi
          Sastra Inggris.
        </p>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] bg-primary p-6 text-white shadow-lg shadow-blue-600/20 lg:p-7">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute bottom-0 right-28 h-32 w-32 rounded-full bg-cyan-300/20 blur-2xl" />

        <div className="relative z-10 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-semibold text-blue-50 ring-1 ring-white/20">
              <ListChecks size={16} />
              Prioritas Hari Ini
            </div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Ada 12 pengajuan perlu diverifikasi.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-blue-50/80">
              Cek kelengkapan berkas mahasiswa agar pengajuan SUP dan Sidang
              bisa lanjut ke tahap penjadwalan.
            </p>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2 xl:w-auto xl:min-w-[360px]">
            <Link
              href="/staff/verification"
              className="group flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-primary shadow-sm transition hover:bg-blue-50"
            >
              Buka Verifikasi
              <ArrowRight
                size={17}
                className="transition group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/staff/agenda"
              className="flex h-14 items-center justify-center rounded-2xl bg-white/12 px-5 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/18"
            >
              Lihat Agenda
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`group rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-100/70 ${
                item.highlight ? "ring-primary/25" : "ring-blue-100"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                    {item.value}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                    item.highlight
                      ? "bg-primary text-white"
                      : "bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white"
                  }`}
                >
                  <Icon size={22} />
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                {item.description}
              </p>
            </Link>
          );
        })}
      </section>

      <section className="grid items-stretch gap-6 xl:grid-cols-[1.15fr_0.95fr] 2xl:grid-cols-[1.2fr_0.9fr]">
        <div className="flex min-h-[620px] flex-col rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-blue-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
                Pengajuan Terbaru
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Maksimal 10 submission terbaru yang masuk ke sistem.
              </p>
            </div>

            <Link
              href="/staff/submissions"
              className="hidden rounded-2xl bg-blue-50 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white sm:inline-flex"
            >
              Lihat semua
            </Link>
          </div>

          <div className="mt-5 flex min-h-0 flex-1 overflow-hidden rounded-3xl border border-blue-100">
            {latestSubmissionRows.length > 0 ? (
              <div className="w-full overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-[#F8FBFF] text-xs uppercase tracking-[0.16em] text-slate-400">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Mahasiswa</th>
                      <th className="px-5 py-4 font-semibold">Jenis</th>
                      <th className="px-5 py-4 font-semibold">Judul</th>
                      <th className="px-5 py-4 font-semibold">Progress</th>
                      <th className="px-5 py-4 font-semibold">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100">
                    {latestSubmissionRows.map((item) => (
                      <tr
                        key={`${item.nim}-${item.type}`}
                        className="h-[78px] align-top"
                      >
                        <td className="whitespace-nowrap px-5 py-4">
                          <p className="font-semibold text-slate-900">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            NIM {item.nim}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                            {item.type}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <p className="line-clamp-2 max-w-[320px] text-xs leading-5 text-slate-500">
                            {item.title}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getSubmissionStatusClass(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-slate-500">
                          {item.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center p-8 text-center">
                <div>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                    <FileText size={24} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-950">
                    Belum ada pengajuan terbaru
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Submission mahasiswa yang baru masuk akan muncul di area ini.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex min-h-[620px] w-full min-w-0 flex-col rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-blue-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
                Jadwal Terdekat
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                3 agenda SUP dan Sidang terdekat yang akan dilaksanakan.
              </p>
            </div>
            <CalendarDays className="text-primary" size={22} />
          </div>

          <div className="mt-5 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
            {upcomingSchedules.length > 0 ? (
              upcomingSchedules.slice(0, 3).map((item) => (
                <div
                  key={`${item.nim}-${item.time}`}
                  className="w-full rounded-3xl bg-[#F8FBFF] p-4 ring-1 ring-blue-100 transition hover:bg-blue-50/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                          {item.type}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${getScheduleStatusClass(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <h3 className="mt-4 truncate text-sm font-semibold text-slate-950">
                        {item.student}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        NIM {item.nim}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-sm ring-1 ring-blue-100">
                      <CalendarDays size={20} />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 rounded-2xl bg-white px-3 py-3 text-xs text-slate-500 ring-1 ring-blue-100">
                    <div className="flex items-center justify-between gap-3">
                      <span>Tanggal</span>
                      <span className="text-right font-semibold text-slate-700">
                        {item.date}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Waktu</span>
                      <span className="text-right font-semibold text-slate-700">
                        {item.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Ruangan</span>
                      <span className="max-w-[160px] truncate text-right font-semibold text-slate-700">
                        {item.room}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-full items-center justify-center rounded-3xl bg-[#F8FBFF] p-8 text-center ring-1 ring-blue-100">
                <div>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                    <CalendarDays size={24} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-950">
                    Belum ada jadwal terdekat
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Jadwal SUP atau Sidang yang akan dilaksanakan minggu ini akan
                    tampil di sini.
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/staff/submissions"
            className="mt-5 flex h-12 items-center justify-center rounded-2xl bg-blue-50 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            Lihat Pengajuan Terkait
          </Link>
        </div>
      </section>
    </div>
  );
}
