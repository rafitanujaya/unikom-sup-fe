"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Clock3,
  Download,
  Eye,
  FileText,
  GraduationCap,
  MessageSquareText,
  UploadCloud,
} from "lucide-react";

const scoringCriteria = [
  { name: "Abstrak", range: "1-10" },
  { name: "Pendahuluan", range: "1-20" },
  { name: "Kajian Pustaka", range: "1-20" },
  { name: "Metode / Kerangka Teoretis", range: "1-25" },
  { name: "Hipotesis Hasil dan Pembahasan", range: "1-10" },
  { name: "Penyajian", range: "1-15" },
];

const resultVariants = {
  revision_required: {
    submissionId: "SUB-SUP-2026-0007",
    title: "Analysis of Code-Switching in English Literature Classroom",
    seminarDate: "20 Mei 2026",
    seminarTime: "10:00 WIB",
    room: "R5340",
    status: "revision_required",
    decision: "Lulus dengan Revisi",
    revisionDeadline: "25 Mei 2026, 23:59",
    revisionStatus: "Belum Upload Revisi",
    finalScore: "78.5",
    grade: "B+",
    supervisor: "Dr. Nia Kurniasih, M.Hum.",
    coordinatorNote:
      "Hasil seminar telah disetujui oleh Koordinator UP. Mahasiswa wajib mengunggah revisi sesuai catatan penelaah sebelum deadline yang ditentukan.",
    examiners: [
      {
        name: "Dr. Tatan Tawami, M.Hum.",
        role: "Ketua Penelaah",
        totalScore: 80,
        grade: "A",
        feedback:
          "Perjelas batasan masalah dan tambahkan landasan teori yang lebih relevan dengan code-switching dalam konteks kelas sastra.",
        scores: [9, 17, 15, 18, 8, 13],
      },
      {
        name: "Dr. Sri Wiyanti, M.Hum.",
        role: "Penelaah 1",
        totalScore: 79,
        grade: "B+",
        feedback:
          "Metode penelitian sudah sesuai, tetapi instrumen pengumpulan data perlu dijelaskan lebih rinci.",
        scores: [8, 16, 16, 19, 8, 12],
      },
      {
        name: "Rahma Widyana, M.Hum.",
        role: "Penelaah 2",
        totalScore: 76,
        grade: "B",
        feedback:
          "Tambahkan contoh data awal agar hubungan antara rumusan masalah dan data penelitian terlihat lebih kuat.",
        scores: [8, 15, 15, 18, 7, 13],
      },
    ],
    documents: [
      {
        name: "berita-acara-sup-rizky.pdf",
        type: "Berita Acara",
        size: "1.2 MB",
        uploadedAt: "20 Mei 2026, 15:30",
        url: "#",
      },
      {
        name: "hasil-feedback-sup-rizky.pdf",
        type: "Hasil & Feedback",
        size: "900 KB",
        uploadedAt: "20 Mei 2026, 15:35",
        url: "#",
      },
    ],
  },
  passed: {
    submissionId: "SUB-SUP-2026-0008",
    title: "Students' Perception Toward English Speaking Practice",
    seminarDate: "12 Juni 2026",
    seminarTime: "13:00 WIB",
    room: "R5210",
    status: "passed",
    decision: "Lulus",
    revisionDeadline: "-",
    revisionStatus: "Tidak Ada Revisi Wajib",
    finalScore: "84.2",
    grade: "A-",
    supervisor: "Dr. Nia Kurniasih, M.Hum.",
    coordinatorNote:
      "Hasil seminar telah disetujui oleh Koordinator UP. Mahasiswa dinyatakan lulus dan dapat melanjutkan ke tahap penelitian sesuai arahan dosen pembimbing.",
    examiners: [
      {
        name: "Dr. Tatan Tawami, M.Hum.",
        role: "Ketua Penelaah",
        totalScore: 85,
        grade: "A",
        feedback:
          "Topik penelitian sudah jelas dan dapat dilanjutkan ke tahap penelitian berikutnya.",
        scores: [9, 18, 17, 21, 8, 12],
      },
      {
        name: "Dr. Sri Wiyanti, M.Hum.",
        role: "Penelaah 1",
        totalScore: 83,
        grade: "A-",
        feedback:
          "Metode penelitian sudah sesuai. Mahasiswa cukup melakukan penyempurnaan kecil pada bagian latar belakang.",
        scores: [9, 17, 16, 20, 8, 13],
      },
      {
        name: "Rahma Widyana, M.Hum.",
        role: "Penelaah 2",
        totalScore: 84,
        grade: "A-",
        feedback:
          "Rumusan masalah dan instrumen penelitian sudah dapat digunakan untuk tahap penelitian.",
        scores: [8, 17, 17, 21, 8, 13],
      },
    ],
    documents: [
      {
        name: "berita-acara-sup-lulus.pdf",
        type: "Berita Acara",
        size: "1.1 MB",
        uploadedAt: "12 Juni 2026, 16:00",
        url: "#",
      },
      {
        name: "hasil-sup-lulus.pdf",
        type: "Hasil SUP",
        size: "850 KB",
        uploadedAt: "12 Juni 2026, 16:05",
        url: "#",
      },
    ],
  },
  failed: {
    submissionId: "SUB-SUP-2026-0006",
    title: "The Use of Figurative Language in Modern English Poetry",
    seminarDate: "28 Maret 2026",
    seminarTime: "09:00 WIB",
    room: "R5210",
    status: "failed",
    decision: "Tidak Lulus",
    revisionDeadline: "-",
    revisionStatus: "Pengajuan Ulang Diperlukan",
    finalScore: "58.3",
    grade: "C",
    supervisor: "Dr. Nia Kurniasih, M.Hum.",
    coordinatorNote:
      "Hasil seminar telah disetujui oleh Koordinator UP. Proposal belum dinyatakan lulus. Mahasiswa dapat menggunakan feedback penelaah sebagai acuan untuk memperbaiki konsep proposal sebelum melakukan pengajuan ulang.",
    examiners: [
      {
        name: "Dr. Tatan Tawami, M.Hum.",
        role: "Ketua Penelaah",
        totalScore: 60,
        grade: "C",
        feedback:
          "Topik penelitian masih terlalu luas dan belum menunjukkan fokus kajian yang jelas.",
        scores: [6, 12, 12, 15, 6, 9],
      },
      {
        name: "Dr. Sri Wiyanti, M.Hum.",
        role: "Penelaah 1",
        totalScore: 58,
        grade: "C",
        feedback:
          "Rumusan masalah dan metode penelitian perlu disusun ulang agar sesuai dengan tujuan penelitian.",
        scores: [6, 11, 12, 14, 6, 9],
      },
      {
        name: "Rahma Widyana, M.Hum.",
        role: "Penelaah 2",
        totalScore: 57,
        grade: "C",
        feedback:
          "Landasan teori belum cukup kuat untuk mendukung analisis yang diajukan.",
        scores: [6, 11, 11, 14, 6, 9],
      },
    ],
    documents: [
      {
        name: "berita-acara-sup-tidak-lulus.pdf",
        type: "Berita Acara",
        size: "1.3 MB",
        uploadedAt: "28 Maret 2026, 14:20",
        url: "#",
      },
      {
        name: "feedback-sup-tidak-lulus.pdf",
        type: "Feedback Penguji",
        size: "780 KB",
        uploadedAt: "28 Maret 2026, 14:25",
        url: "#",
      },
    ],
  },
};

function getResultStyle(status) {
  if (status === "passed") {
    return {
      label: "Lulus",
      headline: "Proposal dinyatakan lulus",
      surface:
        "bg-[radial-gradient(circle_at_92%_12%,rgba(34,197,94,0.46),transparent_30%),radial-gradient(circle_at_8%_95%,rgba(16,185,129,0.26),transparent_36%),linear-gradient(135deg,#DCFCE7_0%,#F0FDF4_38%,#FFFFFF_74%,#ECFDF5_100%)] ring-green-200",
      glow: "bg-green-400/35",
      accent: "bg-green-600",
      text: "text-green-700",
      title: "text-green-950",
      chip: "bg-green-600 text-white shadow-green-900/15",
      cta: "bg-green-600 hover:bg-green-700",
      nextSurface: "bg-green-50 ring-green-100",
      nextText: "text-green-700",
    };
  }

  if (status === "failed") {
    return {
      label: "Tidak Lulus",
      headline: "Proposal belum dinyatakan lulus",
      surface:
        "bg-[radial-gradient(circle_at_92%_12%,rgba(239,68,68,0.42),transparent_30%),radial-gradient(circle_at_8%_95%,rgba(248,113,113,0.24),transparent_36%),linear-gradient(135deg,#FEE2E2_0%,#FEF2F2_38%,#FFFFFF_74%,#FFF1F2_100%)] ring-red-200",
      glow: "bg-red-400/35",
      accent: "bg-red-600",
      text: "text-red-700",
      title: "text-red-950",
      chip: "bg-red-600 text-white shadow-red-900/15",
      cta: "bg-red-600 hover:bg-red-700",
      nextSurface: "bg-red-50 ring-red-100",
      nextText: "text-red-700",
    };
  }

  return {
    label: "Lulus dengan Revisi",
    headline: "Proposal perlu revisi sebelum dilanjutkan",
    surface:
      "bg-[radial-gradient(circle_at_92%_12%,rgba(245,158,11,0.48),transparent_30%),radial-gradient(circle_at_8%_95%,rgba(251,191,36,0.30),transparent_36%),linear-gradient(135deg,#FEF3C7_0%,#FFFBEB_38%,#FFFFFF_74%,#FFF7ED_100%)] ring-amber-200",
    glow: "bg-amber-400/40",
    accent: "bg-amber-500",
    text: "text-amber-700",
    title: "text-amber-950",
    chip: "bg-amber-500 text-white shadow-amber-900/15",
    cta: "bg-amber-600 hover:bg-amber-700",
    nextSurface: "bg-amber-50 ring-amber-100",
    nextText: "text-amber-700",
  };
}

export default function StudentResultFeedbackPage() {
  const [activeState, setActiveState] = useState("revision_required");
  const resultData = resultVariants[activeState];
  const result = getResultStyle(resultData.status);
  const needsRevision = resultData.status === "revision_required";
  const isFailed = resultData.status === "failed";

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-900">
            Hasil & Feedback
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
            Hasil seminar SUP terbaru, detail nilai, feedback penelaah, dan catatan resmi koordinator.
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 rounded-[24px] bg-white p-2 shadow-sm ring-1 ring-slate-200">
        <StateButton
          active={activeState === "revision_required"}
          onClick={() => setActiveState("revision_required")}
          label="View Revisi"
        />
        <StateButton
          active={activeState === "passed"}
          onClick={() => setActiveState("passed")}
          label="View Lulus"
        />
        <StateButton
          active={activeState === "failed"}
          onClick={() => setActiveState("failed")}
          label="View Tidak Lulus"
        />
      </div>

      <section className={`relative mb-6 overflow-hidden rounded-[34px] p-6 shadow-sm ring-1 ${result.surface}`}>
        <div className={`absolute left-0 top-0 h-full w-2 ${result.accent}`} />
        <div className={`absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl ${result.glow}`} />
        <div className="absolute bottom-8 right-10 h-24 w-24 rotate-12 rounded-[2rem] border border-white/70" />
        <div className="absolute right-36 top-10 h-3 w-3 rounded-full bg-white/90" />
        <div className="absolute right-48 bottom-14 h-2 w-2 rounded-full bg-white" />

        <div className="relative z-10 flex gap-7 flex-row items-start justify-between">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold shadow-lg ${result.chip}`}>
                Status Akhir
              </span>
              <p className={`text-sm font-semibold ${result.text}`}>{resultData.decision}</p>
            </div>

            <h3 className={`mt-4 text-3xl font-semibold tracking-[-0.04em] ${result.title}`}>
              {result.headline}
            </h3>

            <p className="mt-4 max-w-4xl text-lg font-semibold leading-8 tracking-tight text-slate-950">
              <span className="font-medium text-slate-700">Judul:</span> {resultData.title}
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
              {resultData.coordinatorNote}
            </p>
          </div>

          <div className="shrink-0 w-82.5 flex flex-col items-end">
              <MiniResult
                icon={GraduationCap}
                label="Nilai Akhir"
                value={`${resultData.finalScore} (${resultData.grade})`}
                style={result}
              />
              <MiniResult
                icon={CalendarDays}
                label="Tanggal Seminar"
                value={resultData.seminarDate}
                style={result}
              />
          </div>
        </div>
      </section>

      {isFailed && <ResubmissionCta style={result} />}

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {needsRevision && <RevisionRequiredSection resultData={resultData} />}

          <section className="rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Detail Penilaian
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Nilai & Feedback Penelaah
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Nilai dan feedback berikut menjadi dasar keputusan akhir SUP mahasiswa.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {resultData.examiners.map((examiner) => (
                <ScoringCard key={examiner.name} examiner={examiner} />
              ))}
            </div>
          </section>

          <section className="rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Catatan Koordinator
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Ringkasan Resmi
              </h3>
            </div>

            <div className="mt-6 flex gap-4 rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-100">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-primary">
                <MessageSquareText size={20} />
              </div>
              <p className="text-sm leading-7 text-slate-600">
                {resultData.coordinatorNote}
              </p>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Informasi Seminar
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
              Detail Pelaksanaan
            </h3>

            <div className="mt-5 space-y-4">
              <SideInfo icon={FileText} label="ID Pengajuan" value={resultData.submissionId} />
              <SideInfo icon={CalendarDays} label="Tanggal" value={resultData.seminarDate} />
              <SideInfo icon={Clock3} label="Waktu" value={resultData.seminarTime} />
              <SideInfo icon={BookOpenCheck} label="Ruangan" value={resultData.room} />
              <SideInfo icon={GraduationCap} label="Pembimbing" value={resultData.supervisor} />
            </div>
          </section>

          <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Dokumen Hasil
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
              Berkas Tersedia
            </h3>

            <div className="mt-5 space-y-4">
              {resultData.documents.map((document) => (
                <div
                  key={document.name}
                  className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary ring-1 ring-blue-100">
                    <FileText size={20} />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-900">
                    {document.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {document.type} · {document.size}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {document.uploadedAt}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <Link
                      href={document.url}
                      className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-50 text-sm font-semibold text-primary ring-1 ring-blue-100 transition hover:bg-blue-100"
                    >
                      <Eye size={16} />
                      Lihat
                    </Link>
                    <Link
                      href={document.url}
                      className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-white transition hover:bg-primary-dark"
                    >
                      <Download size={16} />
                      Unduh
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}

function ResubmissionCta({ style }) {
  return (
    <section className={`mb-6 rounded-[30px] p-6 shadow-sm ring-1 ${style.nextSurface}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${style.nextText}`}>
            Langkah Selanjutnya
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Perbaiki proposal dan ajukan ulang SUP
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Gunakan nilai dan feedback penelaah sebagai acuan sebelum membuat pengajuan baru.
          </p>
        </div>

        <Link
          href="/student/submission"
          className={`inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold text-white shadow-lg shadow-red-900/10 transition lg:w-fit ${style.cta}`}
        >
          Ajukan Ulang SUP
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}

function ScoringCard({ examiner }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">{examiner.name}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {examiner.role}
          </p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-2 text-right ring-1 ring-slate-200">
          <p className="text-xs text-slate-400">Total Nilai</p>
          <p className="text-lg font-semibold text-slate-900">
            {examiner.totalScore} <span className="text-sm text-slate-500">({examiner.grade})</span>
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {scoringCriteria.map((criteria, index) => (
          <div key={criteria.name} className="rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-100">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-800">{criteria.name}</p>
                <p className="mt-0.5 text-xs text-slate-400">Rentang nilai {criteria.range}</p>
              </div>
              <p className="text-sm font-semibold text-primary">{examiner.scores[index]}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-white px-4 py-4 ring-1 ring-slate-100">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Feedback Penelaah
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{examiner.feedback}</p>
      </div>
    </div>
  );
}

function RevisionRequiredSection({ resultData }) {
  return (
    <section className="rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-amber-100">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
          <UploadCloud size={22} />
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">
            Revisi Wajib
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Upload revisi sebelum deadline
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            Mahasiswa wajib mengunggah revisi proposal sesuai catatan penelaah sebelum batas waktu yang ditentukan.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-amber-50 px-4 py-4 ring-1 ring-amber-100">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
                Deadline Revisi
              </p>
              <p className="mt-1 text-sm font-semibold text-amber-900">
                {resultData.revisionDeadline}
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 px-4 py-4 ring-1 ring-amber-100">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
                Status Revisi
              </p>
              <p className="mt-1 text-sm font-semibold text-amber-900">
                {resultData.revisionStatus}
              </p>
            </div>
          </div>

          <Link
            href="/student/result/revision"
            className="mt-5 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-2xl bg-amber-600 px-5 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            <UploadCloud size={17} />
            Upload Revisi
          </Link>
        </div>
      </div>
    </section>
  );
}

function StateButton({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 cursor-pointer rounded-2xl px-4 text-sm font-semibold transition-all duration-300 ${
        active
          ? "bg-primary text-white shadow-lg shadow-blue-600/20"
          : "bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}

function MiniResult({ icon: Icon, label, value, style }) {
  return (
    <div className="flex w-50 gap-3 px-1 py-2">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm ${style.accent}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-semibold leading-6 text-slate-950">{value}</p>
      </div>
    </div>
  );
}

function SideInfo({ icon: Icon, label, value }) {
  return (
    <div className="flex w-50 gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 text-sm font-semibold leading-6 text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}
