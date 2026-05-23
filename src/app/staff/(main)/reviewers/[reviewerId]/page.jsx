"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Building2,
  Mail,
  Phone,
  UserRound,
  XCircle,
} from "lucide-react";

const examiner = {
  id: "EXM-001",
  nidn: "0412057801",
  name: "Dr. Tatan Tawami, S.S., M.Hum.",
  email: "tatan.tawami@unikom.ac.id",
  phone: "+62 812-3456-7890",
  faculty: "Fakultas Ilmu Budaya",
  expertise: "Linguistics, Discourse Analysis",
  status: "Aktif",
  lastPasswordReset: "12 Mei 2026",
  lastLogin: "17 Mei 2026, 14.32",
  activeSchedules: 4,
  waitingConfirmations: 2,
  totalAssignments: 18,
  rejectedSchedules: 1,
  availabilityNote:
    "Akun aktif dapat dipilih pada proses penjadwalan SUP maupun Sidang selama tidak bentrok dengan jadwal mengajar dan agenda program studi.",
  activeScheduleList: [
    {
      id: "SCH-001",
      studentName: "Nadia Putri Azzahra",
      nim: "10122001",
      type: "SUP",
      date: "20 Mei 2026",
      time: "08.30 - 10.00",
      room: "Ruang Seminar 1",
      confirmationStatus: "Terkonfirmasi",
    },
    {
      id: "SCH-006",
      studentName: "Maya Anggraini",
      nim: "10121041",
      type: "Sidang",
      date: "23 Mei 2026",
      time: "09.00 - 10.30",
      room: "Ruang Sidang 2",
      confirmationStatus: "Menunggu",
    },
    {
      id: "SCH-009",
      studentName: "Rafi Maulana",
      nim: "10122018",
      type: "Sidang",
      date: "25 Mei 2026",
      time: "13.00 - 14.30",
      room: "Ruang Sidang 1",
      confirmationStatus: "Menunggu",
    },
  ],
  assignmentHistory: [
    {
      id: "HIS-001",
      studentName: "Aulia Rahman",
      nim: "10122029",
      type: "SUP",
      date: "10 Mei 2026",
      status: "Selesai",
    },
    {
      id: "HIS-002",
      studentName: "Salsa Nuraini",
      nim: "10122024",
      type: "SUP",
      date: "05 Mei 2026",
      status: "Selesai",
    },
    {
      id: "HIS-003",
      studentName: "Kevin Aditya",
      nim: "10122055",
      type: "Sidang",
      date: "28 April 2026",
      status: "Reschedule",
    },
  ],
};

function getStatusClass(status) {
  if (status === "Aktif") {
    return "bg-emerald-50 text-emerald-600 ring-emerald-100";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}

function getConfirmationClass(status) {
  if (status === "Terkonfirmasi") {
    return "bg-emerald-50 text-emerald-600 ring-emerald-100";
  }

  if (status === "Menunggu") {
    return "bg-violet-50 text-violet-600 ring-violet-100";
  }

  if (status === "Menolak") {
    return "bg-red-50 text-red-600 ring-red-100";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}

function getHistoryClass(status) {
  if (status === "Selesai") {
    return "bg-emerald-50 text-emerald-600 ring-emerald-100";
  }

  if (status === "Reschedule") {
    return "bg-amber-50 text-amber-600 ring-amber-100";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}

export default function StaffExaminerDetailPage() {
  const isActive = examiner.status === "Aktif";

  return (
    <div className="space-y-6 pb-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            href="/staff/reviewers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
          >
            <ArrowLeft size={17} />
            Kembali ke Data Dosen
          </Link>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Detail Penelaah & Penguji
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            Profil Penugasan Dosen.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            Lihat status penugasan, beban jadwal, konfirmasi yang sedang berjalan,
            dan riwayat penugasan dosen.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[2rem] bg-blue-50 text-primary ring-1 ring-blue-100">
              <UserRound size={44} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                {examiner.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-500">
                NIDN {examiner.nidn}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex h-10 w-fit shrink-0 items-center rounded-2xl px-4 text-sm font-semibold ring-1 ${getStatusClass(
              examiner.status
            )}`}
          >
            {examiner.status}
          </span>
        </div>

        <div className="mt-7 grid gap-x-10 gap-y-5 border-t border-blue-100 pt-6 md:grid-cols-2 xl:grid-cols-3">
          <ProfileInfo icon={Mail} label="Email" value={examiner.email} />
          <ProfileInfo icon={Phone} label="Nomor Telepon" value={examiner.phone} />
          <ProfileInfo icon={Building2} label="Fakultas" value={examiner.faculty} />
          <ProfileInfo
            icon={CheckCircle2}
            label="Bidang Keahlian"
            value={examiner.expertise}
          />
          <ProfileInfo
            icon={Clock3}
            label="Terakhir Login"
            value={examiner.lastLogin}
          />
          <ProfileInfo
            icon={XCircle}
            label="Reset Password Terakhir"
            value={examiner.lastPasswordReset}
          />
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-blue-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="h-11 rounded-2xl bg-blue-50 px-5 text-sm font-semibold text-primary ring-1 ring-blue-100 transition hover:bg-blue-100"
          >
            Reset Password
          </button>
          <button
            type="button"
            className={`h-11 rounded-2xl px-5 text-sm font-semibold transition ${
              isActive
                ? "bg-red-50 text-red-600 ring-1 ring-red-100 hover:bg-red-100"
                : "bg-primary text-white shadow-lg shadow-blue-600/20 hover:bg-primary-dark"
            }`}
          >
            {isActive ? "Nonaktifkan Akun" : "Aktifkan Akun"}
          </button>
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary ring-1 ring-blue-100">
            <CalendarDays size={22} />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Detail Penugasan
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Ringkasan beban tugas dan jadwal yang sedang berjalan.
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-6 md:grid-cols-3">
          <PlainMetric label="Jadwal Aktif" value={examiner.activeSchedules} />
          <PlainMetric label="Menunggu Konfirmasi" value={examiner.waitingConfirmations} />
          <PlainMetric label="Total Penugasan" value={examiner.totalAssignments} />
        </div>

        <section className="mt-8 border-t border-blue-100 pt-8">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            Jadwal Aktif
          </h3>

          <div className="mt-5 overflow-x-auto rounded-3xl border border-blue-100">
            <table className="w-full min-w-[1180px] text-left text-sm">
              <thead className="bg-[#F8FBFF] text-xs uppercase tracking-[0.14em] text-slate-400">
                <tr>
                  <th className="w-[72px] px-5 py-4 text-center font-semibold">No</th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold">Mahasiswa</th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold">NIM</th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold">Jenis</th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold">Tanggal</th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold">Waktu</th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold">Ruangan</th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold">Konfirmasi</th>
                  <th className="w-[140px] whitespace-nowrap px-5 py-4 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {examiner.activeScheduleList.slice(0, 5).map((item, index) => (
                  <tr key={item.id} className="align-top transition hover:bg-blue-50/40">
                    <td className="px-5 py-4 text-center font-semibold text-slate-500">
                      {index + 1}
                    </td>
                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap font-semibold text-slate-950">{item.studentName}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-600">
                      {item.nim}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                        {item.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {item.date}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {item.time}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {item.room}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getConfirmationClass(
                          item.confirmationStatus
                        )}`}
                      >
                        {item.confirmationStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <Link
                        href={`/staff/schedules/${item.id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:text-primary-dark"
                      >
                        Lihat Jadwal
                        <ChevronRight size={15} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 border-t border-blue-100 pt-8">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            Riwayat Penugasan
          </h3>

          <div className="mt-5 overflow-x-auto rounded-3xl border border-blue-100">
            <table className="w-full min-w-[940px] text-left text-sm">
              <thead className="bg-[#F8FBFF] text-xs uppercase tracking-[0.14em] text-slate-400">
                <tr>
                  <th className="w-[72px] px-5 py-4 text-center font-semibold">No</th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold">Mahasiswa</th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold">NIM</th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold">Jenis</th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold">Tanggal</th>
                  <th className="whitespace-nowrap px-5 py-4 font-semibold">Status Akhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {examiner.assignmentHistory.slice(0, 5).map((item, index) => (
                  <tr key={item.id} className="align-top transition hover:bg-blue-50/40">
                    <td className="px-5 py-4 text-center font-semibold text-slate-500">
                      {index + 1}
                    </td>
                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap font-semibold text-slate-950">{item.studentName}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-600">
                      {item.nim}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                        {item.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {item.date}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getHistoryClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  );
}

function InfoLine({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary ring-1 ring-blue-100">
        <Icon size={17} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function ProfileInfo({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold leading-6 text-slate-950">
        {value}
      </p>
    </div>
  );
}

function PlainMetric({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
        {value}
      </p>
    </div>
  );
}

function SimpleInfo({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-semibold leading-6 text-slate-950">
        {value}
      </p>
    </div>
  );
}
