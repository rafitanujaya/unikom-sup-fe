"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Send,
} from "lucide-react";

const schedule = {
  id: "SCH-006",
  submissionId: "SUB-006",
  type: "Sidang",
  status: "Perlu Reschedule",
  student: {
    nim: "10121041",
    name: "Maya Anggraini",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
    email: "maya.10121041@mahasiswa.unikom.ac.id",
    studyProgram: "Sastra Inggris",
    semester: 10,
  },
  title: "Language Anxiety pada Presentasi Akademik Mahasiswa",
  researchField: "Applied Linguistics",
  supervisor: "Dr. Mira Handayani, S.S., M.Hum.",
  requestedExaminers: [
    "Dr. Retno Purwani Sari, S.S., M.Hum.",
    "-",
    "-",
  ],
  examinerRequestNote:
    "Mahasiswa mengajukan dosen penguji yang memiliki fokus pada kajian applied linguistics dan presentasi akademik.",
  scheduleDate: "2026-05-23",
  startTime: "09:00",
  endTime: "10:30",
  room: "Ruang Sidang 2",
  mode: "Offline",
  meetingLink: "",
  assignedExaminers: [
    {
      role: "Ketua Penguji",
      name: "Dr. Retno Purwani Sari, S.S., M.Hum.",
      status: "Menolak",
      note:
        "Bentrok dengan jadwal mengajar pada jam yang sama. Dosen juga memiliki agenda rapat program studi setelah jadwal mengajar, sehingga tidak memungkinkan mengikuti sidang pada rentang waktu tersebut.",
    },
    {
      role: "Penguji 1",
      name: "Dr. Tatan Tawami, S.S., M.Hum.",
      status: "Terkonfirmasi",
      note: "-",
    },
    {
      role: "Penguji 2",
      name: "Dr. Nia Kurniawati, S.S., M.Hum.",
      status: "Terkonfirmasi",
      note: "-",
    },
  ],
};

const stateOptions = [
  "Siap Dijadwalkan",
  "Draft Jadwal",
  "Menunggu Konfirmasi",
  "Perlu Reschedule",
];

const lecturerOptions = [
  "Dr. Retno Purwani Sari, S.S., M.Hum.",
  "Dr. Tatan Tawami, S.S., M.Hum.",
  "Dr. Nia Kurniawati, S.S., M.Hum.",
  "Dr. Rina Marlina, S.S., M.Hum.",
  "Dr. Mira Handayani, S.S., M.Hum.",
];

const roomOptions = [
  "Ruang Sidang 1",
  "Ruang Sidang 2",
  "Ruang Seminar 1",
  "Ruang Seminar 2",
];

function getScheduleStatusClass(status) {
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

function getConfirmationClass(status) {
  if (status === "Terkonfirmasi") {
    return "bg-emerald-50 text-emerald-600 ring-emerald-100";
  }

  if (status === "Menolak") {
    return "bg-red-50 text-red-600 ring-red-100";
  }

  if (status === "Menunggu") {
    return "bg-violet-50 text-violet-600 ring-violet-100";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}

function getConfirmationData(activeStatus) {
  if (activeStatus === "Siap Dijadwalkan" || activeStatus === "Draft Jadwal") {
    return schedule.assignedExaminers.map((examiner) => ({
      ...examiner,
      status: "Belum Dikirim",
      note: "-",
    }));
  }

  if (activeStatus === "Menunggu Konfirmasi") {
    return schedule.assignedExaminers.map((examiner) => ({
      ...examiner,
      status: "Menunggu",
      note: "-",
    }));
  }

  return schedule.assignedExaminers;
}

export default function StaffSchedulingDetailPage() {
  const [activeStatus, setActiveStatus] = useState(schedule.status);

  const isReady = activeStatus === "Siap Dijadwalkan";
  const isDraft = activeStatus === "Draft Jadwal";
  const isWaitingConfirmation = activeStatus === "Menunggu Konfirmasi";
  const isReschedule = activeStatus === "Perlu Reschedule";
  const confirmationData = getConfirmationData(activeStatus);
  const shouldShowConfirmation = isWaitingConfirmation || isReschedule;
  const isScheduleFormLocked = isWaitingConfirmation;

  const hasRejectedLecturer = confirmationData.some(
    (examiner) => examiner.status === "Menolak"
  );


  return (
    <div className="space-y-6 pb-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            href="/staff/schedules"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
          >
            <ArrowLeft size={17} />
            Kembali ke Penjadwalan
          </Link>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Detail Penjadwalan
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            Atur Jadwal SUP dan Sidang.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            Atur tanggal, waktu, ruangan, dan dosen penguji sebelum jadwal dikirim
            atau difinalisasi.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-blue-100">
            {schedule.type}
          </span>
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 ${getScheduleStatusClass(
              activeStatus
            )}`}
          >
            {activeStatus}
          </span>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
            {schedule.id}
          </span>
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-950">Preview State Jadwal</p>
            <p className="mt-1 text-sm text-slate-500">
              Gunakan tombol ini untuk melihat tampilan setiap kondisi penjadwalan.
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            {stateOptions.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setActiveStatus(status)}
                className={`h-10 shrink-0 rounded-2xl px-4 text-sm font-semibold transition ${
                  activeStatus === status
                    ? "bg-primary text-white shadow-lg shadow-blue-600/20"
                    : "bg-[#F8FBFF] text-slate-500 ring-1 ring-blue-100 hover:bg-blue-50 hover:text-primary"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <img
            src={schedule.student.photo}
            alt={schedule.student.name}
            className="h-56 w-48 shrink-0 rounded-[2rem] object-cover ring-1 ring-blue-100"
          />

          <div className="min-w-0 flex-1 pt-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Data Mahasiswa
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              {schedule.student.name}
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              NIM {schedule.student.nim}
            </p>

            <div className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
              <InfoLine label="Email" value={schedule.student.email} />
              <InfoLine label="Program Studi" value={schedule.student.studyProgram} />
              <InfoLine label="Semester" value={schedule.student.semester} />
              <InfoLine label="ID Pengajuan" value={schedule.submissionId} />
            </div>
          </div>
        </div>
      </section>

      <ScheduleNotice
        isReady={isReady}
        isDraft={isDraft}
        isWaitingConfirmation={isWaitingConfirmation}
        isReschedule={isReschedule}
        hasRejectedLecturer={hasRejectedLecturer}
      />

      <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary ring-1 ring-blue-100">
            <CalendarDays size={22} />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Detail Jadwal
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Lengkapi informasi jadwal dan penugasan dosen dalam satu alur.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-9">
          <section>
            <SectionTitle title="Informasi Pengajuan" />
            <div className="mt-5 space-y-6">
              <p className="text-xl font-semibold leading-9 tracking-[-0.03em] text-slate-900">
                {schedule.title}
              </p>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <SimpleInfo label="Jenis Kegiatan" value={schedule.type} />
                <SimpleInfo label="Bidang Penelitian" value={schedule.researchField} />
                <SimpleInfo label="Dosen Pembimbing" value={schedule.supervisor} />
                <SimpleInfo label="Status Jadwal" value={activeStatus} />
              </div>
            </div>
          </section>

          <section className="pt-2">
            <SectionTitle title="Request Dosen Penguji" />
            <div className="mt-5 space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                {schedule.requestedExaminers.map((examiner, index) => (
                  <div key={`request-${index}`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Dosen {index + 1}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
                      {examiner === "-" ? "Tidak ada request" : examiner}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Catatan Mahasiswa
                </p>
                <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600">
                  {schedule.examinerRequestNote || "-"}
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-blue-100 pt-8">
            <SectionTitle title="Form Jadwal" />
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <FormField label="Tanggal">
                <input
                  type="date"
                  defaultValue={schedule.scheduleDate}
                  disabled={isScheduleFormLocked}
                  className="h-12 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </FormField>

              <FormField label="Jam Mulai">
                <input
                  type="time"
                  defaultValue={schedule.startTime}
                  disabled={isScheduleFormLocked}
                  className="h-12 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </FormField>

              <FormField label="Jam Selesai">
                <input
                  type="time"
                  defaultValue={schedule.endTime}
                  disabled={isScheduleFormLocked}
                  className="h-12 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </FormField>

              <FormField label="Ruangan">
                <select
                  defaultValue={schedule.room}
                  disabled={isScheduleFormLocked}
                  className="h-12 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  {roomOptions.map((room) => (
                    <option key={room}>{room}</option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <FormField label="Mode Kegiatan">
                <select
                  defaultValue={schedule.mode}
                  disabled={isScheduleFormLocked}
                  className="h-12 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option>Offline</option>
                  <option>Online</option>
                  <option>Hybrid</option>
                </select>
              </FormField>

              <FormField label="Link Meeting">
                <input
                  type="text"
                  defaultValue={schedule.meetingLink}
                  disabled={isScheduleFormLocked}
                  placeholder="Isi jika online atau hybrid"
                  className="h-12 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </FormField>
            </div>
          </section>

          <section className="border-t border-blue-100 pt-8">
            <SectionTitle title="Penugasan Dosen" />
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {confirmationData.map((examiner) => {
                const isLecturerLocked =
                  isWaitingConfirmation ||
                  (isReschedule && examiner.status === "Terkonfirmasi");

                return (
                <FormField key={examiner.role} label={examiner.role}>
                  <select
                    defaultValue={examiner.name}
                    disabled={isLecturerLocked}
                    className="h-12 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    {lecturerOptions.map((lecturer) => (
                      <option key={lecturer}>{lecturer}</option>
                    ))}
                  </select>
                  {isLecturerLocked && (
                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      {isWaitingConfirmation
                        ? "Tidak dapat diubah saat menunggu konfirmasi."
                        : "Dosen sudah konfirmasi, tidak dapat diganti."}
                    </p>
                  )}
                </FormField>
                );
              })}
            </div>
          </section>

          {shouldShowConfirmation && (
            <section className="border-t border-blue-100 pt-8">
              <SectionTitle title="Konfirmasi Dosen" />
              <div className="mt-5 space-y-4">
                {confirmationData.map((examiner) => (
                  <div
                    key={`confirmation-${examiner.role}`}
                    className="rounded-3xl border border-blue-100 p-5"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                          {examiner.role}
                        </p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
                          {examiner.name}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getConfirmationClass(
                          examiner.status
                        )}`}
                      >
                        {examiner.status}
                      </span>
                    </div>

                    <div className="mt-5 border-t border-blue-100 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Catatan Dosen
                      </p>
                      <p className="mt-2 min-h-[76px] text-sm leading-7 text-slate-600">
                        {examiner.note === "-" ? "Tidak ada catatan." : examiner.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="border-t border-blue-100 pt-8">
            <SectionTitle title="Catatan Jadwal" />
            <textarea
              rows={5}
              placeholder="Tulis catatan jadwal jika diperlukan..."
              className="mt-5 w-full resize-none rounded-3xl border border-blue-100 bg-[#F8FBFF] p-4 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </section>

          <section className="border-t border-blue-100 pt-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <SectionTitle title="Submit Jadwal" />
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end lg:w-auto">
                {(isReady || isDraft || isReschedule) && (
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center rounded-2xl bg-[#F8FBFF] px-6 text-sm font-semibold text-slate-600 ring-1 ring-blue-100 transition hover:bg-blue-50 hover:text-primary"
                  >
                    Simpan Draft
                  </button>
                )}

                {(isDraft || isReschedule) && (
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-50 px-6 text-sm font-semibold text-primary ring-1 ring-blue-100 transition hover:bg-blue-100"
                  >
                    <Send size={18} />
                    {isReschedule ? "Kirim Ulang Konfirmasi" : "Kirim Konfirmasi"}
                  </button>
                )}

                {isWaitingConfirmation && (
                  <p className="flex h-12 items-center justify-center rounded-2xl bg-violet-50 px-6 text-sm font-semibold text-violet-600 ring-1 ring-violet-100">
                    Menunggu konfirmasi dosen
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function ScheduleNotice({
  isReady,
  isDraft,
  isWaitingConfirmation,
  isReschedule,
  hasRejectedLecturer,
}) {
  if (isReady) {
    return (
      <section className="rounded-[2rem] border border-blue-100 bg-blue-50 p-5">
        <p className="text-sm font-semibold text-primary">Siap dijadwalkan</p>
        <p className="mt-1 text-sm leading-6 text-primary/80">
          Pengajuan ini sudah lolos verifikasi dan belum memiliki jadwal. Isi form
          jadwal dan penugasan dosen untuk mulai membuat draft.
        </p>
      </section>
    );
  }

  if (isDraft) {
    return (
      <section className="rounded-[2rem] border border-amber-100 bg-amber-50 p-5">
        <p className="text-sm font-semibold text-amber-600">Draft jadwal</p>
        <p className="mt-1 text-sm leading-6 text-amber-600/80">
          Jadwal sudah mulai disusun, tetapi belum dikirim ke dosen. Periksa
          kembali tanggal, waktu, ruangan, dan penugasan sebelum mengirim
          konfirmasi.
        </p>
      </section>
    );
  }

  if (isWaitingConfirmation) {
    return (
      <section className="rounded-[2rem] border border-violet-100 bg-violet-50 p-5">
        <p className="text-sm font-semibold text-violet-600">
          Menunggu konfirmasi dosen
        </p>
        <p className="mt-1 text-sm leading-6 text-violet-600/80">
          Jadwal sudah dikirim ke dosen. Finalisasi dapat dilakukan setelah
          seluruh dosen memberikan konfirmasi.
        </p>
      </section>
    );
  }

  if (isReschedule || hasRejectedLecturer) {
    return (
      <section className="rounded-[2rem] border border-red-100 bg-red-50 p-5">
        <p className="text-sm font-semibold text-red-600">
          Jadwal perlu diatur ulang
        </p>
        <p className="mt-1 text-sm leading-6 text-red-500">
          Salah satu dosen menolak jadwal sebelumnya. Perbarui tanggal, waktu,
          ruangan, atau penugasan dosen sebelum mengirim konfirmasi ulang.
        </p>
      </section>
    );
  }

  return null;
}

function InfoLine({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-900">
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
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
        {value}
      </p>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function SectionTitle({ title }) {
  return (
    <h3 className="text-lg font-semibold tracking-tight text-slate-950">
      {title}
    </h3>
  );
}
