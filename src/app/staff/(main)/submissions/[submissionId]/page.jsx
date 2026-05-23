"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  MapPin,
  UserRound,
} from "lucide-react";

const evaluationCriteria = [
  {
    name: "ABSTRAK",
    range: "1-10",
    description:
      "Memuat latar belakang, tujuan, metode, hasil yang diharapkan, dan kata kunci dengan jelas.",
  },
  {
    name: "PENDAHULUAN",
    range: "1-20",
    description:
      "Latar belakang jelas, relevan, menunjukkan urgensi penelitian, identifikasi masalah spesifik, tujuan eksplisit, dan menunjukkan novelty atau research gap.",
  },
  {
    name: "KAJIAN PUSTAKA",
    range: "1-20",
    description:
      "Menggunakan teori relevan dengan sumber data terkini dan kredibel, serta menunjukkan kemampuan sintesis dan kritik.",
  },
  {
    name: "METODE / KERANGKA TEORETIS",
    range: "1-25",
    description:
      "Kesesuaian metode, prosedur pengumpulan dan analisis data yang jelas, ketepatan penggunaan teori, dan kelayakan penelitian.",
  },
  {
    name: "HIPOTESIS HASIL DAN PEMBAHASAN",
    range: "1-10",
    description:
      "Kejelasan rencana temuan dan relevansi dengan rumusan masalah serta tujuan penelitian.",
  },
  {
    name: "PENYAJIAN",
    range: "1-15",
    description:
      "Sistematika penyajian, penggunaan bahasa, cara presentasi, ketepatan waktu, serta tanya jawab.",
  },
];

const submission = {
  id: "SUB-008",
  nim: "10121052",
  name: "Dinda Salsabila",
  photo:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
  type: "Sidang",
  progress: "Selesai",
  title: "Translation Accuracy pada Subtitle Film Animasi",
  documentCount: 5,
  scheduleDate: "Rabu, 20 Mei 2026",
  scheduleTime: "08.30 - 10.00",
  location: "Ruang Sidang 1",
  reviewers: [
    {
      name: "Dr. Retno Purwani Sari, S.S., M.Hum.",
      role: "Ketua Penelaah",
      photo:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      scores: [9, 18, 17, 22, 8, 14],
      feedback:
        "Struktur penelitian sudah jelas dan argumentasi cukup kuat. Mahasiswa perlu menjaga konsistensi istilah teori pada bagian pembahasan akhir.",
    },
    {
      name: "Dr. Tatan Tawami, S.S., M.Hum.",
      role: "Penelaah 1",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      scores: [8, 16, 16, 21, 8, 13],
      feedback:
        "Kajian pustaka sudah relevan, namun pembahasan metode perlu dibuat lebih terarah agar hubungan data, teori, dan analisis terlihat lebih kuat.",
    },
    {
      name: "Dr. Nia Kurniawati, S.S., M.Hum.",
      role: "Penelaah 2",
      photo:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
      scores: [9, 17, 18, 20, 9, 14],
      feedback:
        "Penyajian sudah baik dan hasil analisis relevan dengan rumusan masalah. Perbaiki beberapa bagian transisi antarparagraf agar alur tulisan lebih halus.",
    },
  ],
};

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

  return "bg-slate-100 text-slate-600 ring-slate-200";
}

function getTotalScore(scores) {
  const numericScores = scores.filter((score) => typeof score === "number");

  if (numericScores.length === 0) {
    return "-";
  }

  return numericScores.reduce((total, score) => total + score, 0);
}

function getGrade(total) {
  if (total === "-") return "-";
  if (total >= 80) return "A";
  if (total >= 68) return "B";
  if (total >= 56) return "C";
  return "Tidak Lulus";
}

function getAverageScore(reviewers) {
  const totals = reviewers
    .map((reviewer) => getTotalScore(reviewer.scores))
    .filter((score) => typeof score === "number");

  if (totals.length === 0) return "-";

  return Math.round(totals.reduce((total, score) => total + score, 0) / totals.length);
}

export default function StaffSubmissionDetailPage() {
  const averageScore = getAverageScore(submission.reviewers);
  const finalGrade = getGrade(averageScore);

  return (
    <div className="space-y-6 pb-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            href="/staff/submissions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
          >
            <ArrowLeft size={17} />
            Kembali ke Pengajuan
          </Link>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Detail Pengajuan
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            Detail SUP dan Sidang Mahasiswa.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            Informasi lengkap mahasiswa, jadwal sidang, penelaah, hasil penilaian,
            dan feedback yang diberikan oleh masing-masing penelaah.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-blue-100">
            {submission.type}
          </span>
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 ${getProgressClass(
              submission.progress
            )}`}
          >
            {submission.progress}
          </span>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
            {submission.id}
          </span>
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
        <div className="grid gap-8 xl:grid-cols-[1fr_260px] xl:items-start">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <img
              src={submission.photo}
              alt={submission.name}
              className="h-60 w-52 shrink-0 rounded-[2rem] object-cover ring-1 ring-blue-100"
            />

            <div className="min-w-0 flex-1 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
                  {submission.type}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getProgressClass(
                    submission.progress
                  )}`}
                >
                  {submission.progress}
                </span>
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Data Mahasiswa
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                {submission.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-500">
                NIM {submission.nim}
              </p>

              <div className="mt-7 max-w-4xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Judul {submission.type === "SUP" ? "Proposal" : "Skripsi"}
                </p>
                <p className="mt-3 text-xl font-semibold leading-9 tracking-[-0.03em] text-slate-900">
                  {submission.title}
                </p>
              </div>
            </div>
          </div>

          <div className="xl:border-l xl:border-blue-100 xl:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Hasil
            </p>

            <div className="mt-6">
              <p className="text-sm text-slate-500">Rata-rata</p>
              <p className="mt-2 text-6xl font-semibold tracking-[-0.07em] text-slate-950">
                {averageScore}
              </p>
            </div>

            <div className="mt-7 border-t border-blue-100 pt-6">
              <p className="text-sm text-slate-500">Mutu</p>
              <p className="mt-2 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
                {finalGrade}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary ring-1 ring-blue-100">
            <CalendarDays size={22} />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Informasi Sidang
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Jika jadwal belum tersedia, sistem menampilkan tanda strip.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <InfoTile icon={CalendarDays} label="Tanggal Sidang" value={submission.scheduleDate} />
          <InfoTile icon={Clock3} label="Waktu Sidang" value={submission.scheduleTime} />
          <InfoTile icon={MapPin} label="Lokasi Sidang" value={submission.location} />
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary ring-1 ring-blue-100">
            <UserRound size={22} />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Penelaah / Penguji
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Tiga penelaah yang terhubung dengan pengajuan ini.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {submission.reviewers.map((reviewer) => (
            <div
              key={`${reviewer.role}-${reviewer.name}`}
              className="rounded-[1.75rem] bg-[#F8FBFF] p-5 text-center ring-1 ring-blue-100"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {reviewer.role}
              </p>
              <img
                src={reviewer.photo}
                alt={reviewer.name}
                className="mx-auto mt-4 h-28 w-28 rounded-3xl object-cover ring-1 ring-blue-100"
              />
              <p className="mt-4 text-sm font-semibold leading-6 text-slate-950">
                {reviewer.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/30">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary ring-1 ring-blue-100">
            <FileText size={22} />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Hasil Penilaian & Feedback
            </h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
              Komponen nilai mengikuti format penilaian SUP: Abstrak,
              Pendahuluan, Kajian Pustaka, Metode/Kerangka Teoretis, Hipotesis
              Hasil dan Pembahasan, serta Penyajian.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {submission.reviewers.map((reviewer) => {
            const total = getTotalScore(reviewer.scores);
            const grade = getGrade(total);

            return (
              <article
                key={`review-${reviewer.role}-${reviewer.name}`}
                className="rounded-[1.75rem] bg-[#F8FBFF] p-5 ring-1 ring-blue-100"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <p className="text-base font-semibold text-slate-950">
                      {reviewer.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{reviewer.role}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px]">
                    <ScoreBox label="Total" value={total} />
                    <ScoreBox label="Mutu" value={grade} />
                    <ScoreBox label="Status" value={total === "-" ? "-" : "Dinilai"} />
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-3xl bg-white ring-1 ring-blue-100">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#F8FBFF] text-xs uppercase tracking-[0.14em] text-slate-400">
                      <tr>
                        <th className="px-5 py-4 font-semibold">Kriteria</th>
                        <th className="px-5 py-4 font-semibold">Rentang</th>
                        <th className="px-5 py-4 font-semibold">Nilai</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100">
                      {evaluationCriteria.map((criteria, index) => (
                        <tr key={`${reviewer.role}-${criteria.name}`} className="align-top">
                          <td className="px-5 py-4">
                            <p className="font-semibold text-slate-800">{criteria.name}</p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {criteria.description}
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-slate-500">
                            {criteria.range}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-950">
                            {reviewer.scores[index]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 rounded-3xl bg-white p-5 ring-1 ring-blue-100">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Review / Feedback
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {reviewer.feedback}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function SummaryMiniCard({ label, value }) {
  return (
    <div className="rounded-3xl bg-[#F8FBFF] p-5 ring-1 ring-blue-100">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
        {value}
      </p>
    </div>
  );
}

function InfoTile({ icon: Icon, label, value }) {
  return (
    <div className="rounded-3xl bg-[#F8FBFF] p-5 ring-1 ring-blue-100">
      <div className="flex items-center gap-3 text-slate-400">
        <Icon size={18} />
        <p className="text-xs font-medium">{label}</p>
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function ScoreBox({ label, value }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 text-center ring-1 ring-blue-100">
      <p className="text-[11px] font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-base font-semibold text-slate-950">{value}</p>
    </div>
  );
}
