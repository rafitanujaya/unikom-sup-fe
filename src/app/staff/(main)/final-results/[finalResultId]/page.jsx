"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Clock,
  GraduationCap,
  MapPin,
  MessageSquareText,
  Send,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

const evaluationCriteria = [
  {
    name: "ABSTRAK",
    range: "1-10",
    maxScore: 10,
    description:
      "Memuat latar belakang, tujuan, metode, hasil yang diharapkan, dan kata kunci dengan jelas.",
  },
  {
    name: "PENDAHULUAN",
    range: "1-20",
    maxScore: 20,
    description:
      "Latar belakang jelas, relevan, menunjukkan urgensi penelitian, identifikasi masalah spesifik, tujuan eksplisit, dan menunjukkan novelty atau research gap.",
  },
  {
    name: "KAJIAN PUSTAKA",
    range: "1-20",
    maxScore: 20,
    description:
      "Menggunakan teori relevan dengan sumber data terkini dan kredibel, serta menunjukkan kemampuan sintesis dan kritik.",
  },
  {
    name: "METODE / KERANGKA TEORETIS",
    range: "1-25",
    maxScore: 25,
    description:
      "Kesesuaian metode, prosedur pengumpulan dan analisis data yang jelas, ketepatan penggunaan teori, dan kelayakan penelitian.",
  },
  {
    name: "HIPOTESIS HASIL DAN PEMBAHASAN",
    range: "1-10",
    maxScore: 10,
    description:
      "Kejelasan rencana temuan dan relevansi dengan rumusan masalah serta tujuan penelitian.",
  },
  {
    name: "PENYAJIAN",
    range: "1-15",
    maxScore: 15,
    description:
      "Sistematika penyajian, penggunaan bahasa, cara presentasi, ketepatan waktu, serta tanya jawab.",
  },
];

const approvalDetail = {
  id: "APR-001",
  approvalStatus: "Menunggu Persetujuan",
  type: "SUP",
  date: "22 Mei 2026",
  time: "08.30 - 10.00",
  location: "Ruang Seminar FIB",
  title: "Analisis Pragmatik dalam Dialog Film The King's Speech",
  student: {
    name: "Rizky Ramadhan",
    nim: "101234567",
    studyProgram: "Sastra Inggris",
    faculty: "Fakultas Ilmu Budaya",
    photo: null,
  },
  reviewers: [
    {
      role: "Ketua Penelaah",
      name: "Dr. Tatan Tawami, M.Hum.",
      scores: [9, 18, 17, 22, 8, 14],
      feedback:
        "Rumusan masalah sudah cukup jelas, namun batasan penelitian perlu dipersempit agar analisis lebih fokus.",
      status: "Final",
    },
    {
      role: "Penelaah 1",
      name: "Dr. Lia Maulia Indrayani, M.Hum.",
      scores: [8, 16, 16, 21, 8, 13],
      feedback:
        "Landasan teori sudah sesuai, tetapi beberapa referensi perlu diperbarui dengan sumber yang lebih relevan.",
      status: "Final",
    },
    {
      role: "Penelaah 2",
      name: "Dr. Eva Tuckyta Sari Sujatna, M.Hum.",
      scores: [9, 17, 18, 20, 9, 14],
      feedback:
        "Metode penelitian dapat digunakan, namun bagian teknik pengumpulan data perlu dijelaskan lebih rinci.",
      status: "Final",
    },
  ],
};

export default function ApprovalDetailPage() {
  const [coordinatorNote, setCoordinatorNote] = useState("");
  const [postponeReason, setPostponeReason] = useState("");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showPostponeModal, setShowPostponeModal] = useState(false);

  const reviewerSummaries = useMemo(() => {
    return approvalDetail.reviewers.map((reviewer) => {
      const total = getTotalScore(reviewer.scores);

      return {
        ...reviewer,
        total,
        grade: getGrade(total),
      };
    });
  }, []);

  const averageScore = useMemo(() => {
    const totals = reviewerSummaries.map((reviewer) => reviewer.total);
    const average = totals.reduce((sum, total) => sum + total, 0) / totals.length;

    return Number(average.toFixed(1));
  }, [reviewerSummaries]);

  const finalGrade = getGrade(averageScore);
  const academicResult = getAcademicResult(averageScore);

  function handleApprove() {
    console.log("Approve and publish result", {
      approvalId: approvalDetail.id,
      academicResult,
      averageScore,
      grade: finalGrade,
      note: coordinatorNote,
    });

    setShowApproveModal(false);
  }

  function handlePostpone() {
    if (!postponeReason.trim()) return;

    console.log("Postpone result", {
      approvalId: approvalDetail.id,
      reason: postponeReason,
    });

    setShowPostponeModal(false);
  }

  return (
    <div className="mx-auto w-full max-w-6xl pb-10 font-[Poppins]">
      <div className="mb-6 pt-2">
        <Link
          href="/staff/approvals"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-primary"
        >
          <ArrowLeft size={17} />
          Kembali ke Persetujuan Akhir
        </Link>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
              Detail Persetujuan
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Tinjau nilai, feedback, dan hasil agregasi sebelum diumumkan.
            </p>
          </div>

          <ApprovalStatusBadge status={approvalDetail.approvalStatus} />
        </div>
      </div>

      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <StudentOverview detail={approvalDetail} academicResult={academicResult} />

        <div className="p-6">
          <SectionHeader
            title="Ringkasan Agregasi"
            description="Hasil akhir dihitung dari seluruh nilai penelaah yang sudah final."
          />

          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <MetricItem
              icon={GraduationCap}
              label="Rata-rata Nilai"
              value={averageScore}
            />

            <MetricItem icon={BadgeCheck} label="Mutu" value={finalGrade} />

            <MetricItem
              icon={ShieldCheck}
              label="Hasil Akademik"
              value={academicResult}
              variant={academicResult}
            />

            <MetricItem
              icon={UsersRound}
              label="Penelaah Selesai"
              value={`${approvalDetail.reviewers.length}/${approvalDetail.reviewers.length}`}
            />
          </div>

          <Divider />

          <SectionHeader
            title="Informasi Pelaksanaan"
            description="Informasi jadwal yang digunakan pada pelaksanaan seminar atau sidang."
          />

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <InfoItem
              icon={CalendarDays}
              label="Tanggal"
              value={approvalDetail.date}
            />

            <InfoItem icon={Clock} label="Waktu" value={approvalDetail.time} />

            <InfoItem
              icon={MapPin}
              label="Lokasi"
              value={approvalDetail.location}
            />
          </div>

          <Divider />

          <SectionHeader
            title="Hasil Penilaian & Feedback"
            description="Nilai dan feedback masing-masing penelaah berdasarkan kriteria penilaian."
          />

          <div className="mt-5 divide-y divide-slate-200">
            {reviewerSummaries.map((reviewer) => (
              <ReviewerEvaluationItem
                key={`${reviewer.role}-${reviewer.name}`}
                reviewer={reviewer}
              />
            ))}
          </div>

          <Divider />

          <SectionHeader
            title="Keputusan Akhir"
            description="Setujui hasil untuk diumumkan atau tunda jika masih perlu pengecekan."
          />

          <div className="mt-5 space-y-6">
            <div className="border-y border-slate-200 py-5">
              <div className="grid gap-5 md:grid-cols-3">
                <DecisionHighlight label="Rata-rata Nilai" value={averageScore} />

                <DecisionHighlight label="Mutu" value={finalGrade} />

                <DecisionHighlight
                  label="Hasil Akademik"
                  value={academicResult}
                  variant={academicResult}
                />
              </div>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-600">
                Catatan Koordinator / Kaprodi
              </span>

              <textarea
                value={coordinatorNote}
                onChange={(event) => setCoordinatorNote(event.target.value)}
                placeholder="Tambahkan catatan jika diperlukan..."
                rows={4}
                className="w-full resize-none rounded-3xl border border-blue-100 bg-[#F8FBFF] px-4 py-3 text-sm font-medium leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Publikasi hasil resmi
                </p>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                  Jika disetujui, hasil akan diumumkan ke mahasiswa dan masuk ke
                  data hasil resmi.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setShowPostponeModal(true)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-5 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
                >
                  <Clock size={17} />
                  Tunda Hasil
                </button>

                <button
                  type="button"
                  onClick={() => setShowApproveModal(true)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-primary-dark hover:shadow-xl hover:shadow-blue-900/20 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  <Send size={17} />
                  Setujui & Umumkan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showApproveModal && (
        <ApproveModal
          academicResult={academicResult}
          averageScore={averageScore}
          onClose={() => setShowApproveModal(false)}
          onConfirm={handleApprove}
        />
      )}

      {showPostponeModal && (
        <PostponeModal
          value={postponeReason}
          onChange={setPostponeReason}
          onClose={() => setShowPostponeModal(false)}
          onConfirm={handlePostpone}
        />
      )}
    </div>
  );
}

function StudentOverview({ detail, academicResult }) {
  return (
    <div className="border-b border-blue-100 p-6">
      <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start">
          {detail.student.photo ? (
            <img
              src={detail.student.photo}
              alt={detail.student.name}
              className="h-28 w-28 shrink-0 rounded-[1.75rem] object-cover ring-1 ring-blue-100 sm:h-32 sm:w-32"
            />
          ) : (
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-blue-100 via-blue-50 to-white text-primary ring-1 ring-blue-100 sm:h-32 sm:w-32">
              <UserRound size={46} />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              {detail.student.name}
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              {detail.student.nim} · {detail.student.studyProgram}
            </p>

            <div className="mt-4 border-t border-blue-100 pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Judul Pengajuan
              </p>

              <p className="mt-2 max-w-4xl text-base font-semibold leading-7 tracking-[-0.02em] text-slate-950 sm:text-lg">
                {detail.title}
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-fit shrink-0 flex-wrap items-start gap-2 lg:justify-end">
          <TypeBadge label={detail.type} />
          <AcademicResultBadge result={academicResult} />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, description }) {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight text-slate-950">
        {title}
      </h2>

      <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function MetricItem({ icon: Icon, label, value, variant }) {
  const variantStyle = {
    Lulus: "text-emerald-700",
    "Lulus dengan Revisi": "text-amber-700",
    "Tidak Lulus": "text-rose-700",
  };

  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
        <Icon size={17} className="shrink-0 text-primary" />
        <span>{label}</span>
      </div>

      <p
        className={`mt-2 truncate text-2xl font-semibold tracking-tight ${
          variantStyle[variant] || "text-slate-950"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
        <Icon size={17} className="shrink-0 text-primary" />
        <span>{label}</span>
      </div>

      <p className="mt-2 truncate text-base font-semibold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function ReviewerEvaluationItem({ reviewer }) {
  return (
    <div className="group relative py-6 first:pt-0 last:pb-0">
      <span className="absolute left-0 top-6 h-[calc(100%-3rem)] w-1 rounded-r-full bg-transparent transition group-hover:bg-primary" />

      <div className="pl-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-base font-semibold text-slate-950">
              {reviewer.name}
            </p>
            <p className="mt-1 text-sm text-slate-500">{reviewer.role}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ScoreSummary label="Total" value={reviewer.total} />
            <ScoreSummary label="Mutu" value={reviewer.grade} />
            <ScoreSummary label="Status" value={reviewer.status} />
          </div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-3xl border border-blue-100">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-[#F8FBFF] text-xs uppercase tracking-[0.14em] text-slate-400">
              <tr>
                <th className="px-5 py-4 font-semibold">Kriteria</th>
                <th className="px-5 py-4 font-semibold">Rentang</th>
                <th className="px-5 py-4 text-right font-semibold">Nilai</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {evaluationCriteria.map((criteria, criteriaIndex) => {
                const score = reviewer.scores[criteriaIndex];

                return (
                  <tr
                    key={`${reviewer.name}-${criteria.name}`}
                    className="align-top transition hover:bg-blue-50/40"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {criteria.name}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {criteria.description}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-500">
                      {criteria.range}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-right text-base font-semibold text-slate-950">
                      {score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 border-t border-slate-200 pt-5">
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
              <MessageSquareText size={17} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-950">
                Feedback Penelaah
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {reviewer.feedback}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreSummary({ label, value }) {
  return (
    <div className="min-w-[88px]">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-base font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function DecisionHighlight({ label, value, variant }) {
  const styles = {
    Lulus: "text-emerald-700",
    "Lulus dengan Revisi": "text-amber-700",
    "Tidak Lulus": "text-rose-700",
  };

  return (
    <div>
      <p className="text-sm font-medium text-slate-500">{label}</p>

      <p
        className={`mt-2 text-2xl font-semibold tracking-tight ${
          styles[variant] || "text-slate-950"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ApproveModal({ academicResult, averageScore, onClose, onConfirm }) {
  return (
    <ModalShell onClose={onClose}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-primary ring-1 ring-blue-100">
        <Send size={24} />
      </div>

      <h3 className="mt-5 text-center text-xl font-semibold tracking-tight text-slate-950">
        Umumkan hasil ke mahasiswa?
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-slate-500">
        Hasil akan menjadi resmi dan dapat dilihat oleh mahasiswa.
      </p>

      <div className="mt-5 border-y border-slate-200 py-4 text-center">
        <p className="text-sm text-slate-500">Hasil Akademik</p>
        <p className="mt-1 text-lg font-semibold text-slate-950">
          {academicResult} · {averageScore}
        </p>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
        >
          Batal
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-primary-dark"
        >
          Setujui & Umumkan
        </button>
      </div>
    </ModalShell>
  );
}

function PostponeModal({ value, onChange, onClose, onConfirm }) {
  const isDisabled = value.trim().length === 0;

  return (
    <ModalShell onClose={onClose}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
        <Clock size={24} />
      </div>

      <h3 className="mt-5 text-center text-xl font-semibold tracking-tight text-slate-950">
        Tunda hasil ini?
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-slate-500">
        Berikan alasan agar hasil dapat dicek kembali sebelum diumumkan.
      </p>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-sm font-medium text-slate-600">
          Alasan Penundaan
        </span>

        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          placeholder="Contoh: nilai salah satu penelaah perlu diverifikasi ulang."
          className="w-full resize-none rounded-3xl border border-amber-100 bg-amber-50/40 px-4 py-3 text-sm font-medium leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-300 focus:bg-white focus:ring-4 focus:ring-amber-100"
        />
      </label>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
        >
          Batal
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isDisabled}
          className={`inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition ${
            isDisabled
              ? "cursor-not-allowed bg-slate-200 text-slate-400"
              : "bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600"
          }`}
        >
          Tunda Hasil
        </button>
      </div>
    </ModalShell>
  );
}

function ModalShell({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-950/20">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-2xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Tutup modal"
        >
          <X size={18} />
        </button>

        {children}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="my-8 border-t border-slate-200" />;
}

function getTotalScore(scores) {
  return scores.reduce((total, score) => total + score, 0);
}

function getGrade(total) {
  if (total >= 80) return "A";
  if (total >= 68) return "B";
  if (total >= 56) return "C";
  return "Tidak Lulus";
}

function getAcademicResult(score) {
  if (score >= 80) return "Lulus";
  if (score >= 68) return "Lulus dengan Revisi";
  return "Tidak Lulus";
}

function TypeBadge({ label }) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
      {label}
    </span>
  );
}

function AcademicResultBadge({ result }) {
  const styles = {
    Lulus: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    "Lulus dengan Revisi": "bg-amber-50 text-amber-700 ring-amber-100",
    "Tidak Lulus": "bg-rose-50 text-rose-700 ring-rose-100",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
        styles[result] || styles["Lulus dengan Revisi"]
      }`}
    >
      {result}
    </span>
  );
}

function ApprovalStatusBadge({ status }) {
  const styles = {
    "Menunggu Persetujuan": "bg-amber-50 text-amber-700 ring-amber-100",
    Disetujui: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    Ditunda: "bg-slate-50 text-slate-600 ring-slate-200",
  };

  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${
        styles[status] || styles["Menunggu Persetujuan"]
      }`}
    >
      {status}
    </span>
  );
}