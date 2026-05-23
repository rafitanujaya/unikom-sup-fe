"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenText,
  CheckCircle2,
  ChevronDown,
  FileText,
  Send,
  UserRound,
  XCircle,
} from "lucide-react";

const verification = {
  id: "VER-001",
  submissionId: "SUB-001",
  type: "SUP",
  status: "Menunggu Pemeriksaan",
  submittedAt: "15 Mei 2026",
  student: {
    nim: "10122001",
    name: "Nadia Putri Azzahra",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    email: "nadia.10122001@mahasiswa.unikom.ac.id",
    studyProgram: "Sastra Inggris",
    semester: 8,
  },
  title: "Representasi Identitas dalam Novel Kontemporer",
  researchField: "Literary Studies",
  supervisor: "Dr. Rina Marlina, S.S., M.Hum.",
  proposalSummary:
    "Penelitian ini membahas representasi identitas tokoh utama dalam novel kontemporer dengan pendekatan kajian sastra. Fokus penelitian diarahkan pada bagaimana identitas personal dan sosial dibangun melalui narasi, konflik, serta relasi antar tokoh.",
  requestedExaminers: ["Dr. Tatan Tawami, S.S., M.Hum.", "-", "-"],
  examinerRequestNote:
    "Mahasiswa mengajukan dosen penguji yang memiliki fokus kajian pada sastra kontemporer dan analisis naratif.",
  document: {
    name: "Proposal_SUP_Nadia_Putri_Azzahra.pdf",
    size: "2.4 MB",
    uploadedAt: "15 Mei 2026, 09.12",
  },
};

const checklistItems = [
  "Data mahasiswa sesuai dengan akun Student Portal",
  "Judul proposal/skripsi sudah terisi dengan benar",
  "Dokumen pengajuan dapat dibuka dan dibaca",
  "Format dokumen sesuai ketentuan program studi",
  "Dokumen memenuhi syarat untuk dilanjutkan ke tahap berikutnya",
];

function getStatusClass(status) {
  if (status === "Perlu Revisi") {
    return "bg-amber-50 text-amber-600 ring-amber-100";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}

export default function StaffVerificationDetailPage() {
  const [showChecklist, setShowChecklist] = useState(false);

  return (
    <div className="space-y-6 pb-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            href="/staff/verification"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
          >
            <ArrowLeft size={17} />
            Kembali ke Verifikasi
          </Link>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Detail Verifikasi
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            Review Berkas Pengajuan.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            Periksa dokumen mahasiswa, pastikan kelengkapan berkas, lalu tentukan
            apakah pengajuan dapat dilanjutkan, perlu revisi, atau ditolak.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-blue-100">
            {verification.type}
          </span>
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 ${getStatusClass(
              verification.status
            )}`}
          >
            {verification.status}
          </span>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
            {verification.id}
          </span>
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <img
            src={verification.student.photo}
            alt={verification.student.name}
            className="h-56 w-48 shrink-0 rounded-[2rem] object-cover ring-1 ring-blue-100"
          />

          <div className="min-w-0 flex-1 pt-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Data Mahasiswa
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              {verification.student.name}
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              NIM {verification.student.nim}
            </p>

            <div className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
              <InfoLine label="Email" value={verification.student.email} />
              <InfoLine label="Program Studi" value={verification.student.studyProgram} />
              <InfoLine label="Semester" value={verification.student.semester} />
              <InfoLine label="Tanggal Pengajuan" value={verification.submittedAt} />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
        <div className="flex items-start gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Review Pengajuan
            </h2>
          </div>
        </div>

        <div className="mt-8 space-y-9">
          <section>

            <div className="mt-5 space-y-6">
              <div>
                <p className="text-xl font-semibold leading-9 tracking-[-0.03em] text-slate-900">
                  {verification.title}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <SimpleInfo label="Jenis Pengajuan" value={verification.type} />
                <SimpleInfo label="Bidang Penelitian" value={verification.researchField} />
                <SimpleInfo label="Dosen Pembimbing" value={verification.supervisor} />
                <SimpleInfo label="Tanggal Pengajuan" value={verification.submittedAt} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Ringkasan Proposal
                </p>
                <p className="mt-3 max-w-4xl text-sm leading-8 text-slate-700">
                  {verification.proposalSummary}
                </p>
              </div>
            </div>
          </section>

          <section className="pt-2">
            <SectionTitle title="Request Dosen Penguji" />

            <div className="mt-5 space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                {verification.requestedExaminers.map((examiner, index) => (
                  <div key={`examiner-${index}`}>
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
                  {verification.examinerRequestNote || "-"}
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-blue-100 pt-8">
            <SectionTitle title="Dokumen Pengajuan" />

            <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  File Dokumen
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  {verification.document.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {verification.document.size} · Diunggah {verification.document.uploadedAt}
                </p>
              </div>

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-primary-dark"
              >
                Buka Dokumen
              </button>
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-blue-100 bg-slate-50 p-5">
              <div className="mx-auto max-w-3xl rounded-sm bg-white px-10 py-12 shadow-sm ring-1 ring-slate-200">
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Proposal Seminar Usulan Penelitian
                  </p>
                  <h3 className="mt-6 text-2xl font-bold leading-9 text-slate-950">
                    {verification.title}
                  </h3>
                  <p className="mt-8 text-sm font-semibold text-slate-700">
                    {verification.student.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {verification.student.nim}
                  </p>
                </div>

                <div className="mt-12 space-y-6 text-sm leading-8 text-slate-700">
                  <div>
                    <p className="font-semibold text-slate-950">Abstrak</p>
                    <p className="mt-2">
                      Penelitian ini membahas representasi identitas tokoh utama dalam novel kontemporer. Fokus penelitian diarahkan pada proses pembentukan identitas personal dan sosial melalui narasi, konflik, serta relasi antar tokoh.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-950">Pendahuluan</p>
                    <p className="mt-2">
                      Kajian ini dilatarbelakangi oleh pentingnya analisis identitas dalam karya sastra modern. Novel kontemporer memberikan ruang untuk memahami perubahan sosial, budaya, dan psikologis yang dialami karakter.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-950">Metode</p>
                    <p className="mt-2">
                      Penelitian menggunakan pendekatan kualitatif dengan metode analisis naratif. Data dikumpulkan dari kutipan teks yang relevan dengan isu identitas dan dianalisis berdasarkan teori kajian sastra.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-blue-100 pt-8">
            <SectionTitle title="Catatan Verifikasi" />

            <textarea
              rows={6}
              placeholder="Tulis catatan verifikasi di sini..."
              className="mt-5 w-full resize-none rounded-3xl border border-blue-100 bg-[#F8FBFF] p-4 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </section>

          <section className="pt-1">
            <button
              type="button"
              onClick={() => setShowChecklist((current) => !current)}
              className="flex w-full items-center justify-between border-t border-blue-100 py-5 text-left transition hover:text-primary"
            >
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Checklist Staff
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {showChecklist ? "Sembunyikan checklist" : "Buka checklist pemeriksaan"}
                </p>
              </div>
              <ChevronDown
                size={20}
                className={`shrink-0 text-slate-400 transition ${
                  showChecklist ? "rotate-180" : ""
                }`}
              />
            </button>

            {showChecklist && (
              <div className="space-y-3 pb-2">
                {checklistItems.map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-600"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-blue-200 text-primary focus:ring-primary"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            )}
          </section>

          <section className="border-t border-blue-100 pt-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <SectionTitle title="" />

              <div className="grid w-full gap-3 sm:grid-cols-3 lg:w-auto lg:min-w-[460px]">
                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-red-50 px-6 text-sm font-semibold text-red-600 ring-1 ring-red-100 transition hover:bg-red-100"
                >
                  <XCircle size={18} />
                  Tolak
                </button>
                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-amber-50 px-6 text-sm font-semibold text-amber-600 ring-1 ring-amber-100 transition hover:bg-amber-100"
                >
                  <Send size={18} />
                  Minta Revisi
                </button>
                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-primary-dark"
                >
                  <CheckCircle2 size={18} />
                  Setujui
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
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

function SectionTitle({ title }) {
  return (
    <div>
      <h3 className="text-lg font-semibold tracking-tight text-slate-950">
        {title}
      </h3>
    </div>
  );
}
