"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  FileText,
  GraduationCap,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const student = {
  id: "STD-001",
  nim: "10122001",
  name: "Nadia Putri Azzahra",
  photo:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  email: "nadia.10122001@mahasiswa.unikom.ac.id",
  phone: "+62 812-3456-7890",
  faculty: "Fakultas Ilmu Budaya",
  studyProgram: "Sastra Inggris",
  semester: 8,
  entryYear: 2022,
  accountStatus: "Aktif",
  profileEditStatus: "Sudah Edit Profile",
  editAccess: "Terkunci",
  lastLogin: "15 Mei 2026, 08.45",
  createdAt: "02 Januari 2026",
  submissions: [
    {
      id: "SUB-001",
      type: "SUP",
      title: "Representasi Identitas dalam Novel Kontemporer",
      progress: "Baru Masuk",
      submittedAt: "15 Mei 2026",
    },
    {
      id: "SUB-OLD-001",
      type: "SUP",
      title: "Identity Construction in Modern Short Stories",
      progress: "Perlu Revisi",
      submittedAt: "20 April 2026",
    },
  ],
};

function getAccountStatusClass(status) {
  if (status === "Aktif") {
    return "bg-emerald-50 text-emerald-600 ring-emerald-100";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}

function getProgressClass(progress) {
  if (progress === "Selesai") {
    return "bg-emerald-50 text-emerald-600 ring-emerald-100";
  }

  if (progress === "Dijadwalkan") {
    return "bg-blue-50 text-primary ring-blue-100";
  }

  if (progress === "Sedang Dijadwalkan") {
    return "bg-violet-50 text-violet-600 ring-violet-100";
  }

  if (progress === "Dalam Proses") {
    return "bg-amber-50 text-amber-600 ring-amber-100";
  }

  if (progress === "Perlu Revisi") {
    return "bg-red-50 text-red-600 ring-red-100";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}

export default function StaffStudentDetailPage() {
  const latestSubmission = student.submissions[0];

  return (
    <div className="space-y-6 pb-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            href="/staff/students"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
          >
            <ArrowLeft size={17} />
            Kembali ke Data Mahasiswa
          </Link>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Detail Mahasiswa
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            Profil Akun Mahasiswa.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            Informasi akun mahasiswa yang terhubung dengan Student Portal,
            termasuk data kontak, akademik, akses akun, dan riwayat pengajuan.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <img
            src={student.photo}
            alt={student.name}
            className="h-64 w-56 shrink-0 rounded-[2rem] object-cover ring-1 ring-blue-100"
          />

          <div className="min-w-0 flex-1 pt-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Data Mahasiswa
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              {student.name}
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              NIM {student.nim}
            </p>

            <div className="mt-7 grid gap-x-10 gap-y-5 md:grid-cols-2">
              <InfoLine icon={Mail} label="Email Institusi" value={student.email} />
              <InfoLine icon={Phone} label="Nomor Telepon" value={student.phone} />
              <InfoLine icon={GraduationCap} label="Program Studi" value={student.studyProgram} />
              <InfoLine icon={CalendarDays} label="Tahun Masuk" value={student.entryYear} />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary ring-1 ring-blue-100">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Ringkasan Akun
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Status akses mahasiswa pada Student Portal.
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <PlainMetric label="Status Akun" value={student.accountStatus} />
          <PlainMetric label="Edit Profil" value={student.profileEditStatus} />
          <PlainMetric label="Akses Edit" value={student.editAccess} />
          <PlainMetric label="Terakhir Login" value={student.lastLogin} />
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-blue-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="flex h-11 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-primary-dark"
          >
            Izinkan Edit Profil
          </button>
          <button
            type="button"
            className="flex h-11 items-center justify-center rounded-2xl bg-red-50 px-5 text-sm font-semibold text-red-600 ring-1 ring-red-100 transition hover:bg-red-100"
          >
            Nonaktifkan Akun
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary ring-1 ring-blue-100">
              <GraduationCap size={22} />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                Informasi Akademik
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Data akademik utama yang terhubung dengan akun mahasiswa.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <AcademicInfo label="Fakultas" value={student.faculty} />
            <AcademicInfo label="Program Studi" value={student.studyProgram} />
            <AcademicInfo label="Semester" value={student.semester} />
            <AcademicInfo label="Angkatan" value={student.entryYear} />
            <AcademicInfo label="Tahun Masuk" value={student.entryYear} />
            <AcademicInfo label="Tanggal Akun Dibuat" value={student.createdAt} />
          </div>
        </div>

        <div className="min-w-0 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary ring-1 ring-blue-100">
                <FileText size={22} />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                  Riwayat Pengajuan
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Pengajuan SUP atau Sidang yang pernah dibuat mahasiswa.
                </p>
              </div>
            </div>

            {latestSubmission && (
              <Link
                href={`/staff/submissions/${latestSubmission.id}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:text-primary-dark"
              >
                Lihat terbaru
                <ChevronRight size={15} />
              </Link>
            )}
          </div>

          <div className="mt-6 w-full overflow-hidden rounded-3xl border border-blue-100">
            <table className="w-full table-fixed text-left text-sm">
              <thead className="bg-[#F8FBFF] text-xs uppercase tracking-[0.14em] text-slate-400">
                <tr>
                  <th className="w-[110px] px-5 py-4 font-semibold">Jenis</th>
                  <th className="px-5 py-4 font-semibold">Judul</th>
                  <th className="w-[150px] px-5 py-4 font-semibold">Progress</th>
                  <th className="w-[135px] px-5 py-4 font-semibold">Tanggal</th>
                  <th className="w-[90px] px-5 py-4 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {student.submissions.map((item) => (
                  <tr key={item.id} className="align-top transition hover:bg-blue-50/40">
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="line-clamp-2 max-w-md font-medium leading-6 text-slate-800">
                        {item.title}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getProgressClass(
                          item.progress
                        )}`}
                      >
                        {item.progress}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {item.submittedAt}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/staff/submissions/${item.id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:text-primary-dark"
                      >
                        Detail
                        <ChevronRight size={15} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

function PlainMetric({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-950">
        {value}
      </p>
    </div>
  );
}

function AcademicInfo({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
