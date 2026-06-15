"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  MessageSquareText,
  RefreshCcw,
  XCircle,
} from "lucide-react";

const baseSubmissionDetail = {
  id: "SUB-SUP-2026-0007",
  attempt: "Pengajuan SUP Ke-7",
  type: "Seminar Usulan Penelitian",
  title: "Analysis of Code-Switching in English Literature Classroom",
  field: "Linguistics",
  supervisor: "Dr. Nia Kurniasih, M.Hum.",
  submittedAt: "10 Mei 2026, 09:20",
  verifiedAt: "12 Mei 2026, 14:10",
  scheduledAt: "14 Mei 2026, 11:30",
  announcedAt: "21 Mei 2026, 13:40",
  updatedAt: "21 Mei 2026, 13:40",
  seminarDate: "20 Mei 2026",
  seminarTime: "10:00 WIB",
  room: "R5340",
  status: "passed",
  result: "Lulus",
  finalScore: 82.4,
  grade: "A",
  abstract:
    "Penelitian ini membahas fenomena code-switching dalam kelas sastra Inggris, khususnya bagaimana mahasiswa dan dosen menggunakan peralihan bahasa dalam proses diskusi akademik.",
  document: {
    name: "proposal-code-switching-rizky.pdf",
    size: "2.4 MB",
    uploadedAt: "10 Mei 2026, 09:20",
    url: "#",
  },
  staffNote:
    "Pengajuan telah selesai diproses. Hasil penilaian dan feedback penelaah sudah tersedia.",
};

const viewOptions = [
  {
    key: "pending",
    label: "Belum Diverifikasi",
    result: null,
    finalScore: null,
    grade: null,
  },
  {
    key: "verified",
    label: "Terverifikasi",
    result: null,
    finalScore: null,
    grade: null,
  },
  {
    key: "scheduled",
    label: "Dijadwalkan",
    result: null,
    finalScore: null,
    grade: null,
  },
  {
    key: "evaluating",
    label: "Sedang Dinilai",
    result: null,
    finalScore: null,
    grade: null,
  },
  {
    key: "passed",
    label: "Lulus",
    result: "Lulus",
    finalScore: 82.4,
    grade: "A",
  },
  {
    key: "failed",
    label: "Tidak Lulus",
    result: "Tidak Lulus",
    finalScore: 54.8,
    grade: "D",
  },
  {
    key: "rejected",
    label: "Ditolak",
    result: "Ditolak",
    finalScore: null,
    grade: null,
  },
];

const evaluationCriteria = [
  {
    key: "abstract",
    label: "ABSTRAK",
    range: "1-10",
    description:
      "Memuat latar belakang, tujuan, metode, hasil yang diharapkan, dan kata kunci dengan jelas.",
  },
  {
    key: "introduction",
    label: "PENDAHULUAN",
    range: "1-20",
    description:
      "Latar belakang jelas, relevan, menunjukkan urgensi penelitian, identifikasi masalah spesifik, tujuan eksplisit, dan menunjukkan novelty atau research gap.",
  },
  {
    key: "literatureReview",
    label: "KAJIAN PUSTAKA",
    range: "1-20",
    description:
      "Menggunakan teori relevan dengan sumber data terkini dan kredibel, serta menunjukkan kemampuan sintesis dan kritik.",
  },
  {
    key: "methodology",
    label: "METODE / KERANGKA TEORETIS",
    range: "1-25",
    description:
      "Kesesuaian metode, prosedur pengumpulan dan analisis data yang jelas, ketepatan penggunaan teori, dan kelayakan penelitian.",
  },
  {
    key: "hypothesisDiscussion",
    label: "HIPOTESIS HASIL DAN PEMBAHASAN",
    range: "1-10",
    description:
      "Kejelasan rencana temuan dan relevansi dengan rumusan masalah serta tujuan penelitian.",
  },
  {
    key: "presentation",
    label: "PENYAJIAN",
    range: "1-15",
    description:
      "Sistematika penyajian, penggunaan bahasa, cara presentasi, ketepatan waktu, serta tanya jawab.",
  },
];

const reviewerEvaluations = [
  {
    id: "REV-001",
    role: "Ketua Penelaah",
    name: "Dr. Tatan Tawami, M.Hum.",
    status: "Final",
    scores: {
      abstract: 9,
      introduction: 18,
      literatureReview: 17,
      methodology: 22,
      hypothesisDiscussion: 8,
      presentation: 14,
    },
    feedback:
      "Topik penelitian sudah relevan dengan bidang linguistik. Rumusan masalah perlu dibuat lebih spesifik agar fokus penelitian lebih kuat.",
  },
  {
    id: "REV-002",
    role: "Penelaah 1",
    name: "Dr. Sri Wiyanti, M.Hum.",
    status: "Final",
    scores: {
      abstract: 8,
      introduction: 16,
      literatureReview: 17,
      methodology: 21,
      hypothesisDiscussion: 8,
      presentation: 14,
    },
    feedback:
      "Kajian pustaka sudah cukup baik, namun perlu ditambahkan referensi terbaru yang lebih relevan dengan konteks classroom interaction.",
  },
  {
    id: "REV-003",
    role: "Penelaah 2",
    name: "Rahma Widyana, M.Hum.",
    status: "Final",
    scores: {
      abstract: 9,
      introduction: 16,
      literatureReview: 16,
      methodology: 20,
      hypothesisDiscussion: 8,
      presentation: 13,
    },
    feedback:
      "Metode penelitian sudah dapat digunakan. Mahasiswa perlu memperjelas teknik pengumpulan data dan batasan objek penelitian.",
  },
];

function getStatusMeta(status, result) {
  const statusMap = {
    pending: {
      label: "Belum Diverifikasi",
      badge: "bg-slate-50 text-slate-600 ring-slate-200",
      showRetry: false,
    },
    verified: {
      label: "Terverifikasi",
      badge: "bg-blue-50 text-primary ring-blue-100",
      showRetry: false,
    },
    scheduled: {
      label: "Dijadwalkan",
      badge: "bg-blue-50 text-primary ring-blue-100",
      showRetry: false,
    },
    evaluating: {
      label: "Sedang Dinilai",
      badge: "bg-violet-50 text-violet-700 ring-violet-100",
      showRetry: false,
    },
    passed: {
      label: result || "Lulus",
      badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
      showRetry: false,
    },
    failed: {
      label: result || "Tidak Lulus",
      badge: "bg-rose-50 text-rose-700 ring-rose-100",
      showRetry: true,
      retryLabel: "Ajukan Ulang",
      retryDescription:
        "Gunakan feedback penelaah sebagai acuan sebelum membuat pengajuan baru.",
    },
    rejected: {
      label: result || "Ditolak",
      badge: "bg-rose-50 text-rose-700 ring-rose-100",
      showRetry: true,
      retryLabel: "Perbaiki dan Ajukan Ulang",
      retryDescription:
        "Periksa catatan staff, lengkapi dokumen, lalu lakukan pengajuan ulang.",
    },
  };

  return statusMap[status] || statusMap.pending;
}

function getProcessSteps(detail) {
  if (detail.status === "rejected") {
    return [
      {
        label: "Diajukan",
        date: detail.submittedAt,
        state: "completed",
      },
      {
        label: "Ditolak",
        date: detail.updatedAt || detail.verifiedAt,
        state: "rejected",
      },
      {
        label: "Dijadwalkan",
        date: null,
        state: "waiting",
      },
      {
        label: "Diumumkan",
        date: null,
        state: "waiting",
      },
    ];
  }

  const statusOrder = {
    pending: 0,
    verified: 1,
    scheduled: 2,
    evaluating: 3,
    passed: 4,
    failed: 4,
  };

  const currentStep = statusOrder[detail.status] ?? 0;

  const steps = [
    { label: "Diajukan", date: detail.submittedAt },
    { label: "Diverifikasi", date: detail.verifiedAt },
    { label: "Dijadwalkan", date: detail.scheduledAt },
    { label: "Diumumkan", date: detail.announcedAt },
  ];

  return steps.map((step, index) => {
    let state = "waiting";

    if (index < currentStep) state = "completed";
    if (index === currentStep && currentStep < steps.length) state = "current";
    if (currentStep >= steps.length) state = "completed";

    return {
      ...step,
      state,
      date: index < currentStep || currentStep >= steps.length ? step.date : null,
    };
  });
}

function getStepClass(state) {
  if (state === "completed") return "bg-primary text-white";
  if (state === "current") return "bg-blue-50 text-primary ring-1 ring-blue-100";
  if (state === "rejected") return "bg-rose-50 text-rose-600 ring-1 ring-rose-100";
  return "bg-slate-100 text-slate-400";
}

function getStepTextClass(state) {
  if (state === "rejected") return "text-rose-700";
  return "text-slate-950";
}

function getEvaluationTotal(scores) {
  return evaluationCriteria.reduce((total, criterion) => {
    return total + (scores[criterion.key] || 0);
  }, 0);
}

function getGrade(score) {
  if (score >= 80) return "A";
  if (score >= 68) return "B";
  if (score >= 56) return "C";
  return "D";
}

function formatScore(score) {
  if (score === null || score === undefined) return "-";

  return score.toLocaleString("id-ID", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export default function StudentHistoryDetailPage() {
  const [activeView, setActiveView] = useState("passed");

  const submissionDetail = useMemo(() => {
    const selectedView =
      viewOptions.find((option) => option.key === activeView) || viewOptions[0];

    return {
      ...baseSubmissionDetail,
      status: selectedView.key,
      result: selectedView.result,
      finalScore: selectedView.finalScore,
      grade: selectedView.grade,
      updatedAt:
        selectedView.key === "rejected"
          ? "12 Mei 2026, 15:30"
          : baseSubmissionDetail.updatedAt,
      staffNote:
        selectedView.key === "rejected"
          ? "Pengajuan ditolak karena dokumen proposal belum memenuhi ketentuan administrasi. Silakan perbaiki dokumen dan ajukan ulang."
          : baseSubmissionDetail.staffNote,
    };
  }, [activeView]);

  const status = getStatusMeta(submissionDetail.status, submissionDetail.result);
  const hasEvaluation = ["passed", "failed"].includes(submissionDetail.status);

  const reviewerScores = hasEvaluation
    ? reviewerEvaluations.map((reviewer) => ({
        ...reviewer,
        totalScore: getEvaluationTotal(reviewer.scores),
      }))
    : [];

  const totalReviewerScore = reviewerScores.reduce(
    (total, reviewer) => total + reviewer.totalScore,
    0,
  );

  const averageReviewerScore =
    reviewerScores.length > 0 ? totalReviewerScore / reviewerScores.length : null;

  const finalScore =
    submissionDetail.finalScore ?? (hasEvaluation ? averageReviewerScore : null);

  const grade =
    submissionDetail.grade ?? (finalScore !== null ? getGrade(finalScore) : "-");

  const processSteps = getProcessSteps(submissionDetail);

  const hasSchedule = ["scheduled", "evaluating", "passed", "failed"].includes(
    submissionDetail.status,
  );

  return (
    <div className="pb-8 font-[Poppins]">
      <div className="mb-6">
        <Link
          href="/student/history"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-primary"
        >
          <ArrowLeft size={17} />
          Kembali ke Riwayat
        </Link>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.025em] text-slate-950 md:text-3xl">
              Detail Riwayat Pengajuan
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Informasi pengajuan, jadwal seminar, dokumen, hasil akhir, dan
              feedback penelaah.
            </p>
          </div>

          <ViewSwitcher activeView={activeView} onChange={setActiveView} />
        </div>
      </div>

      <section className="rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/40">
        <div className="space-y-8 p-5 lg:p-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                {submissionDetail.attempt}
              </span>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1 ${status.badge}`}
              >
                {status.label}
              </span>
            </div>

            <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <h3 className="max-w-4xl text-xl font-semibold leading-snug tracking-[-0.02em] text-slate-950 md:text-2xl">
                {submissionDetail.title}
              </h3>

              {hasEvaluation && (
                <FinalResultPanel finalScore={finalScore} grade={grade} />
              )}
            </div>

            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">
              {submissionDetail.abstract}
            </p>
          </div>

          {status.showRetry && <RetryAction status={status} />}

          <div className="grid gap-x-8 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
            <InfoItem label="Tanggal Pengajuan" value={submissionDetail.submittedAt} />
            <InfoItem label="Jenis Pengajuan" value={submissionDetail.type} />
            <InfoItem label="Bidang Kajian" value={submissionDetail.field} />
            <InfoItem label="Pembimbing" value={submissionDetail.supervisor} />
          </div>

          <SectionBlock>
            <SectionHeader
              title="Alur Pengajuan"
              description="Tahapan utama yang sudah dilalui pada pengajuan ini."
            />
            <Timeline steps={processSteps} />
          </SectionBlock>

          <SectionBlock>
            <SectionHeader
              title="Seminar dan Dokumen"
              description="Informasi jadwal serta dokumen proposal yang digunakan pada pengajuan ini."
            />

            <div className="mt-5 space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <InfoItem
                  label="Tanggal Seminar"
                  value={hasSchedule ? submissionDetail.seminarDate : "Belum tersedia"}
                />
                <InfoItem
                  label="Waktu"
                  value={hasSchedule ? submissionDetail.seminarTime : "Belum tersedia"}
                />
                <InfoItem
                  label="Ruangan"
                  value={hasSchedule ? submissionDetail.room : "Belum tersedia"}
                />
              </div>

              <div className="rounded-[1.75rem] border border-blue-100 bg-[#F8FBFF] px-5 py-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-primary ring-1 ring-blue-100">
                      <FileText size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                        Dokumen Proposal
                      </p>

                      <p className="mt-1 truncate text-sm font-medium text-slate-950">
                        {submissionDetail.document.name}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        File {submissionDetail.document.size} · Diunggah{" "}
                        {submissionDetail.document.uploadedAt}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={submissionDetail.document.url}
                    className="inline-flex h-10 w-fit shrink-0 items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition hover:bg-primary-dark"
                  >
                    <Download size={16} />
                    Unduh
                  </Link>
                </div>
              </div>
            </div>
          </SectionBlock>

          {hasEvaluation ? (
            <SectionBlock>
              <SectionHeader
                title="Penilaian Penelaah"
                description="Rekap nilai dan feedback dari setiap penelaah."
              />

              <div className="mt-5 space-y-7">
                {reviewerScores.map((reviewer) => (
                  <ReviewerEvaluationItem key={reviewer.id} reviewer={reviewer} />
                ))}
              </div>
            </SectionBlock>
          ) : (
            <SectionBlock>
              <EmptyEvaluationState status={submissionDetail.status} />
            </SectionBlock>
          )}

          <SectionBlock>
            <SectionHeader
              title="Catatan Staff"
              description="Catatan administrasi terkait pengajuan ini."
            />

            <p className="mt-4 max-w-3xl border-l-4 border-blue-100 pl-4 text-sm leading-7 text-slate-600">
              {submissionDetail.staffNote}
            </p>
          </SectionBlock>
        </div>
      </section>
    </div>
  );
}

function ViewSwitcher({ activeView, onChange }) {
  return (
    <div className="flex w-full gap-2 overflow-x-auto rounded-2xl border border-blue-100 bg-white p-1 lg:w-fit">
      {viewOptions.map((option) => {
        const isActive = activeView === option.key;

        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className={`h-9 shrink-0 rounded-xl px-3 text-xs font-medium transition ${
              isActive
                ? "bg-primary text-white shadow-sm shadow-blue-600/20"
                : "text-slate-500 hover:bg-blue-50 hover:text-primary"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function RetryAction({ status }) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-rose-100 bg-rose-50/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-rose-700">{status.retryLabel}</p>
        <p className="mt-1 max-w-2xl text-xs leading-5 text-rose-600/80">
          {status.retryDescription}
        </p>
      </div>

      <Link
        href="/student/submissions/create"
        className="inline-flex h-9 w-fit shrink-0 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-3 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
      >
        <RefreshCcw size={14} />
        Mulai
      </Link>
    </div>
  );
}

function FinalResultPanel({ finalScore, grade }) {
  return (
    <div className="flex w-fit shrink-0 flex-col items-center rounded-2xl border border-blue-100 px-4 py-3 text-center lg:mr-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">
        Nilai Akhir
      </p>

      <p className="mt-1 whitespace-nowrap text-lg font-semibold tracking-[-0.015em] text-green-600">
        {formatScore(finalScore)} ({grade})
      </p>
    </div>
  );
}

function SectionBlock({ children }) {
  return <div>{children}</div>;
}

function Timeline({ steps }) {
  return (
    <div className="mt-5">
      <div className="hidden md:grid md:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.label} className="relative pr-6">
            {index !== steps.length - 1 && (
              <div className="absolute left-8 right-0 top-4 h-px bg-blue-100" />
            )}

            <div className="relative z-10">
              <TimelineIcon state={step.state} />

              <p
                className={`mt-3 text-sm font-medium ${getStepTextClass(
                  step.state,
                )}`}
              >
                {step.label}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {step.date || "Menunggu"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 md:hidden">
        {steps.map((step) => (
          <div key={step.label} className="flex gap-3">
            <TimelineIcon state={step.state} />

            <div>
              <p className={`text-sm font-medium ${getStepTextClass(step.state)}`}>
                {step.label}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {step.date || "Menunggu"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineIcon({ state }) {
  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${getStepClass(
        state,
      )}`}
    >
      {state === "completed" ? (
        <CheckCircle2 size={15} />
      ) : state === "rejected" ? (
        <XCircle size={15} />
      ) : (
        <Clock3 size={15} />
      )}
    </div>
  );
}

function ReviewerEvaluationItem({ reviewer }) {
  const grade = getGrade(reviewer.totalScore);

  return (
    <article>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-base font-medium leading-tight tracking-[-0.01em] text-slate-950">
            {reviewer.name}
          </h4>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {reviewer.role}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 lg:min-w-[280px] lg:text-right">
          <SmallStat label="Total" value={reviewer.totalScore} />
          <SmallStat label="Mutu" value={grade} />
          <SmallStat label="Status" value={reviewer.status} />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-blue-100">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-[#F8FBFF] text-xs uppercase tracking-[0.18em] text-slate-400">
            <tr>
              <th className="px-5 py-4 font-medium">Kriteria</th>
              <th className="w-[150px] px-5 py-4 text-right font-medium">
                Rentang
              </th>
              <th className="w-[120px] px-5 py-4 text-right font-medium">
                Nilai
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-100">
            {evaluationCriteria.map((criterion) => {
              const score = reviewer.scores[criterion.key] || 0;

              return (
                <tr key={`${reviewer.id}-${criterion.key}`}>
                  <td className="px-5 py-5">
                    <p className="text-sm font-medium uppercase tracking-[-0.005em] text-slate-900">
                      {criterion.label}
                    </p>

                    <p className="mt-2 max-w-4xl text-sm font-normal leading-6 text-slate-500">
                      {criterion.description}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-5 text-right text-sm font-normal text-slate-500">
                    {criterion.range}
                  </td>

                  <td className="whitespace-nowrap px-5 py-5 text-right text-sm font-medium text-slate-950">
                    {score}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary">
          <MessageSquareText size={18} />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-950">
            Feedback Penelaah
          </p>

          <p className="mt-2 max-w-5xl text-sm font-normal leading-7 text-slate-600">
            {reviewer.feedback}
          </p>
        </div>
      </div>
    </article>
  );
}

function EmptyEvaluationState({ status }) {
  const isRejected = status === "rejected";
  const isPending = status === "pending";

  const title = isRejected
    ? "Penilaian tidak tersedia"
    : isPending
      ? "Pengajuan belum diverifikasi"
      : "Penilaian belum tersedia";

  const description = isRejected
    ? "Pengajuan ditolak pada tahap administrasi, sehingga belum masuk ke proses seminar dan penilaian."
    : isPending
      ? "Pengajuan masih menunggu verifikasi staff. Jadwal dan hasil penilaian akan tampil setelah proses berlanjut."
      : "Nilai dan feedback akan tampil setelah seminar selesai dan seluruh penelaah mengirimkan penilaian.";

  return (
    <div>
      <h3 className="text-base font-medium tracking-tight text-slate-950">
        {title}
      </h3>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function SectionHeader({ title, description }) {
  return (
    <div>
      <h3 className="text-lg font-medium tracking-tight text-slate-950">
        {title}
      </h3>

      {description && (
        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

function SmallStat({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-950">{value}</p>
    </div>
  );
}