"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  MessageSquareText,
  Save,
  Send,
} from "lucide-react";

const assessmentCriteria = [
  {
    id: "abstrak",
    label: "ABSTRAK",
    maxScore: 10,
    helper: "Kejelasan ringkasan, fokus penelitian, dan ketepatan informasi utama.",
  },
  {
    id: "pendahuluan",
    label: "PENDAHULUAN",
    maxScore: 20,
    helper: "Latar belakang, rumusan masalah, tujuan, dan urgensi penelitian.",
  },
  {
    id: "kajian_pustaka",
    label: "KAJIAN PUSTAKA",
    maxScore: 20,
    helper: "Relevansi teori, penelitian terdahulu, dan keterhubungan dengan topik.",
  },
  {
    id: "metode",
    label: "METODE / KERANGKA TEORETIS",
    maxScore: 25,
    helper: "Kesesuaian metode, kerangka analisis, dan rancangan penelitian.",
  },
  {
    id: "hipotesis",
    label: "HIPOTESIS HASIL DAN PEMBAHASAN",
    maxScore: 10,
    helper: "Kejelasan arah hasil, asumsi, dan rencana pembahasan.",
  },
  {
    id: "penyajian",
    label: "PENYAJIAN",
    maxScore: 15,
    helper: "Kerapihan penulisan, sistematika, bahasa, dan presentasi akademik.",
  },
];

const evaluationItems = [
  {
    id: "SKR-2026-012",
    type: "Sidang Skripsi",
    studentName: "Citra Wulandari",
    nim: "2204101055",
    studentPhoto:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    title: "Conversational Implicature in English Talk Show Interviews",
    role: "Penelaah 1",
    day: "Rabu",
    date: "13 Mei 2026",
    time: "09.00 - 10.30",
    location: "Ruang Sidang FIB 2",
    status: "Sedang Berlangsung",
    statusType: "ongoing",
    documentReadStatus: "Sudah dibaca",
    scores: {
      abstrak: 8,
      pendahuluan: 16,
      kajian_pustaka: "",
      metode: "",
      hipotesis: "",
      penyajian: "",
    },
    feedback:
      "Catatan awal: mahasiswa perlu memperjelas contoh data percakapan yang digunakan.",
  },
  {
    id: "SKR-2026-003",
    type: "Sidang Skripsi",
    studentName: "Nadia Larasati",
    nim: "2204101022",
    studentPhoto:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    title: "Feminist Reading of Selected Short Stories",
    role: "Penelaah 2",
    day: "Rabu",
    date: "13 Mei 2026",
    time: "10.00 - 11.30",
    location: "Ruang Sidang FIB 1",
    status: "Perlu Nilai & Feedback",
    statusType: "evaluation",
    documentReadStatus: "Belum dibaca",
    scores: {
      abstrak: "",
      pendahuluan: "",
      kajian_pustaka: "",
      metode: "",
      hipotesis: "",
      penyajian: "",
    },
    feedback: "",
  },
];

function getGrade(score) {
  if (typeof score !== "number") return "—";
  if (score >= 85) return "A";
  if (score >= 75) return "B";
  if (score >= 65) return "C";
  return "D";
}

function calculateTotal(scores) {
  return assessmentCriteria.reduce((total, criterion) => {
    const value = Number(scores?.[criterion.id]);
    return Number.isFinite(value) ? total + value : total;
  }, 0);
}

function countCompletedCriteria(scores) {
  return assessmentCriteria.filter((criterion) => {
    const value = Number(scores?.[criterion.id]);
    return Number.isFinite(value) && value >= 0;
  }).length;
}

function isAssessmentComplete(scores, feedback) {
  const allScoresFilled = assessmentCriteria.every((criterion) => {
    const value = Number(scores?.[criterion.id]);
    return Number.isFinite(value) && value >= 0 && value <= criterion.maxScore;
  });

  return allScoresFilled && feedback.trim().length > 0;
}

function TypeBadge({ type }) {
  return (
    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
      {type}
    </span>
  );
}

function StatusBadge({ status, statusType }) {
  const styles = {
    ongoing: "bg-blue-50 text-[#0B63CE] ring-blue-100",
    evaluation: "bg-red-50 text-red-600 ring-red-100",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${styles[statusType]}`}>
      {status}
    </span>
  );
}

function DocumentReadBadge({ status }) {
  const isUnread = status.toLowerCase().includes("belum");

  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
        isUnread
          ? "bg-amber-50 text-amber-700 ring-amber-100"
          : "bg-emerald-50 text-emerald-700 ring-emerald-100"
      }`}
    >
      {status}
    </span>
  );
}

function InfoTile({ label, value, helper, children, tone = "default" }) {
  const toneClass = {
    default: "bg-[#F8FBFF] ring-blue-100",
    warning: "bg-amber-50 ring-amber-100",
    success: "bg-emerald-50 ring-emerald-100",
  }[tone];

  return (
    <div className={`flex min-h-[124px] flex-col justify-between rounded-3xl p-4 ring-1 ${toneClass}`}>
      <div>
        <p className="text-xs font-medium text-slate-400">{label}</p>
        {value && <div className="mt-2">{value}</div>}
      </div>

      {helper && <div className="mt-3 text-xs leading-5 text-slate-500">{helper}</div>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

function ScoreInput({ criterion, value, disabled, onChange }) {
  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/20">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-950">{criterion.label}</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">{criterion.helper}</p>
        </div>

        <div className="shrink-0 lg:w-36">
          <label className="text-xs font-medium text-slate-400">
            Nilai / {criterion.maxScore}
          </label>
          <input
            type="number"
            min="0"
            max={criterion.maxScore}
            disabled={disabled}
            value={value}
            onChange={(event) => onChange(criterion.id, event.target.value)}
            className="mt-1 h-12 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 text-lg font-semibold text-slate-950 outline-none transition focus:border-[#0B63CE] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            placeholder="—"
          />
        </div>
      </div>
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="flex min-h-[520px] items-center justify-center rounded-[2rem] border border-dashed border-blue-200 bg-white p-10 text-center shadow-sm shadow-blue-100/20">
      <div>
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-blue-50 text-[#0B63CE] ring-1 ring-blue-100">
          <AlertCircle size={34} />
        </div>
        <p className="mt-6 text-lg font-semibold text-slate-950">
          Data penilaian tidak ditemukan
        </p>
        <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
          Sidang yang diminta tidak tersedia atau sudah tidak membutuhkan penilaian.
        </p>
        <Link
          href="/reviewer/evaluations"
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#0B63CE] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <ArrowLeft size={16} />
          Kembali ke Daftar Penilaian
        </Link>
      </div>
    </div>
  );
}

export default function ReviewerEvaluationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = Array.isArray(params?.sessionId)
    ? params.sessionId[0]
    : params?.sessionId;

  const item = useMemo(
    () => evaluationItems.find((evaluation) => evaluation.id === sessionId),
    [sessionId]
  );

  const [scores, setScores] = useState(item?.scores || {});
  const [feedback, setFeedback] = useState(item?.feedback || "");

  if (!item) {
    return <NotFoundState />;
  }

  const total = calculateTotal(scores);
  const completedCriteria = countCompletedCriteria(scores);
  const isComplete = isAssessmentComplete(scores, feedback);
  const isLocked = item.statusType === "done";
  const isDocumentRead = item.documentReadStatus.toLowerCase().includes("sudah");
  const canSubmit = isComplete && isDocumentRead && !isLocked;

  function handleScoreChange(criterionId, rawValue) {
    const criterion = assessmentCriteria.find((entry) => entry.id === criterionId);
    const numericValue = rawValue === "" ? "" : Number(rawValue);

    const safeValue =
      numericValue === ""
        ? ""
        : Math.max(
            0,
            Math.min(Number.isFinite(numericValue) ? numericValue : 0, criterion.maxScore)
          );

    setScores((current) => ({
      ...current,
      [criterionId]: safeValue,
    }));
  }

  return (
    <div className="space-y-6 font-[Poppins]">
      <section>
        <button
          type="button"
          onClick={() => router.push("/reviewer/evaluations")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B63CE] transition hover:text-blue-700"
        >
          <ArrowLeft size={16} />
          Kembali ke Daftar Penilaian
        </button>

        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
              Isi Nilai & Feedback
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 md:text-base">
              Halaman fokus untuk mengisi nilai berdasarkan kriteria penilaian dan feedback final mahasiswa.
            </p>
          </div>

          <div className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B63CE] shadow-sm ring-1 ring-blue-100">
            {item.id}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">
              <img
                src={item.studentPhoto}
                alt={item.studentName}
                className="h-40 w-40 shrink-0 rounded-[2rem] object-cover ring-1 ring-blue-100"
              />

              <div className="min-w-0 flex-1 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <TypeBadge type={item.type} />
                  <StatusBadge status={item.status} statusType={item.statusType} />
                </div>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                  {item.studentName}
                </h2>
                <p className="mt-1 text-sm text-slate-500">NIM {item.nim}</p>

                <div className="mt-4 max-w-3xl">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                    Judul {item.type === "SUP" ? "Proposal" : "Skripsi"}
                  </p>
                  <p className="mt-1.5 text-base font-semibold leading-7 text-slate-950">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href={`/reviewer/documents/${item.id}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-[#0B63CE] transition hover:bg-blue-100"
            >
              <FileText size={16} />
              Buka Dokumen
            </Link>
          </div>
        </div>

        <div className="border-b border-blue-100 p-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <InfoTile
              label="Peran Anda"
              value={<p className="text-base font-semibold text-slate-950">{item.role}</p>}
              helper="Peran penelaah pada sidang ini."
            />

            <InfoTile
              label="Jadwal Sidang"
              value={
                <div>
                  <p className="text-base font-semibold text-slate-950">
                    {item.day}, {item.date}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{item.time}</p>
                </div>
              }
              helper={item.location}
            />

            <InfoTile
              label="Status Dokumen"
              tone={isDocumentRead ? "success" : "warning"}
              value={<DocumentReadBadge status={item.documentReadStatus} />}
              helper={isDocumentRead ? "Dokumen sudah dibuka." : "Baca dokumen sebelum mengirim."}
            />

            <InfoTile
              label="Kriteria Terisi"
              value={
                <div className="flex items-end gap-1">
                  <p className="text-3xl font-semibold tracking-tight text-slate-950">
                    {completedCriteria}
                  </p>
                  <p className="pb-1 text-sm font-medium text-slate-400">
                    / {assessmentCriteria.length}
                  </p>
                </div>
              }
              helper="Jumlah komponen nilai yang sudah diisi."
            />

            <InfoTile
              label="Total Nilai"
              value={
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-slate-950">
                    {completedCriteria > 0 ? total : "—"}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Huruf Mutu: {completedCriteria === assessmentCriteria.length ? getGrade(total) : "—"}
                  </p>
                </div>
              }
              helper="Total dihitung otomatis."
            />
          </div>
        </div>

        {!isDocumentRead && (
          <div className="mx-5 mt-5 rounded-3xl bg-amber-50 p-4 ring-1 ring-amber-100">
            <div className="flex items-start gap-3">
              <FileText size={19} className="mt-0.5 shrink-0 text-amber-700" />
              <p className="text-sm leading-6 text-amber-700">
                Dokumen belum dibaca. Penelaah tetap bisa mengisi nilai dan feedback, tetapi belum bisa mengirim sampai dokumen dibuka/dibaca.
              </p>
            </div>
          </div>
        )}

        {item.statusType === "ongoing" && (
          <div className="mx-5 mt-5 rounded-3xl bg-blue-50 p-4 ring-1 ring-blue-100">
            <div className="flex items-start gap-3">
              <MessageSquareText size={19} className="mt-0.5 shrink-0 text-[#0B63CE]" />
              <p className="text-sm leading-6 text-[#0B63CE]">
                Sidang sedang berlangsung. Nilai dan feedback sudah dapat diisi sebagai catatan awal, lalu dapat dikirim saat lengkap.
              </p>
            </div>
          </div>
        )}

        {item.statusType === "evaluation" && (
          <div className="mx-5 mt-5 rounded-3xl bg-red-50 p-4 ring-1 ring-red-100">
            <div className="flex items-start gap-3">
              <AlertCircle size={19} className="mt-0.5 shrink-0 text-red-600" />
              <p className="text-sm leading-6 text-red-600">
                Sidang sudah selesai. Nilai dan feedback final wajib diisi sebelum proses penilaian dapat diselesaikan.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3 p-5">
          <div>
            <p className="text-sm font-semibold text-slate-950">Form Nilai</p>
            <p className="mt-1 text-sm text-slate-500">
              Isi nilai sesuai rentang maksimal setiap kriteria penilaian.
            </p>
          </div>

          {assessmentCriteria.map((criterion) => (
            <ScoreInput
              key={criterion.id}
              criterion={criterion}
              value={scores[criterion.id]}
              disabled={isLocked}
              onChange={handleScoreChange}
            />
          ))}
        </div>

        <div className="border-t border-blue-100 p-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-950">
              Feedback / Catatan Revisi Final
            </span>
            <textarea
              value={feedback}
              disabled={isLocked}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder="Tuliskan feedback, catatan revisi, atau arahan perbaikan untuk mahasiswa..."
              className="mt-3 min-h-40 w-full rounded-3xl border border-blue-100 bg-[#F8FBFF] p-4 text-sm leading-6 text-slate-700 outline-none transition focus:border-[#0B63CE] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 border-t border-blue-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-slate-500">
            Tombol kirim aktif jika dokumen sudah dibaca, semua nilai terisi, dan feedback final sudah diisi.
          </p>

          <div className="flex flex-wrap justify-end gap-3">
            {!isLocked && (
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B63CE] transition hover:bg-blue-50"
              >
                <Save size={16} />
                Simpan
              </button>
            )}

            {isLocked ? (
              <span className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100">
                <CheckCircle2 size={16} />
                Sudah Dikirim
              </span>
            ) : (
              <button
                type="button"
                disabled={!canSubmit}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold shadow-lg transition ${
                  canSubmit
                    ? "bg-[#0B63CE] text-white shadow-blue-600/20 hover:bg-blue-700"
                    : "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none"
                }`}
              >
                <Send size={16} />
                Kirim Nilai & Feedback
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
