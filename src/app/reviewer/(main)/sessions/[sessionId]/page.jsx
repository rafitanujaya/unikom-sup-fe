"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  MapPin,
  MessageSquareText,
  Video,
} from "lucide-react";

const sessions = [
  {
    id: "SUP-2026-002",
    type: "SUP",
    studentName: "Raka Wiratama",
    nim: "2204101017",
    studentPhoto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    title: "Code Switching in Indonesian English Classroom Interaction",
    role: "Penelaah 1",
    day: "Senin",
    date: "20 Mei 2026",
    time: "13.00 - 14.30",
    location: "Google Meet",
    phase: "Belum Dimulai",
    phaseType: "upcoming",
    documentStatus: "Draft Proposal tersedia",
    documentReadStatus: "Belum dibaca",
    agendaGroup: "Minggu Ini",
  },
  {
    id: "SKR-2026-006",
    type: "Sidang Skripsi",
    studentName: "Maya Anindya",
    nim: "2204101028",
    studentPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    title: "Politeness Strategies in English Debate Performance",
    role: "Ketua Penelaah",
    day: "Selasa",
    date: "21 Mei 2026",
    time: "08.00 - 09.30",
    location: "Ruang Sidang FIB 1",
    phase: "Belum Dimulai",
    phaseType: "upcoming",
    documentStatus: "Draft Skripsi tersedia",
    documentReadStatus: "Sudah dibaca",
    agendaGroup: "Minggu Ini",
  },
  {
    id: "SUP-2026-010",
    type: "SUP",
    studentName: "Fauzan Hakim",
    nim: "2204101047",
    studentPhoto:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    title: "The Use of Metaphor in Selected English Political Speeches",
    role: "Penelaah 2",
    day: "Kamis",
    date: "24 Mei 2026",
    time: "10.00 - 11.30",
    location: "Ruang Sidang FIB 2",
    phase: "Belum Dimulai",
    phaseType: "upcoming",
    documentStatus: "Draft Proposal tersedia",
    documentReadStatus: "Belum dibaca",
    agendaGroup: "Minggu Ini",
  },
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
    phase: "Sedang Berlangsung",
    phaseType: "ongoing",
    documentStatus: "Draft Skripsi sudah dibuka",
    documentReadStatus: "Sudah dibaca",
    agendaGroup: "Hari Ini",
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
    phase: "Perlu Nilai & Feedback",
    phaseType: "evaluation",
    documentStatus: "Draft Skripsi sudah dibuka",
    documentReadStatus: "Sudah dibaca",
    agendaGroup: "Hari Ini",
  },
  {
    id: "SUP-2026-020",
    type: "SUP",
    studentName: "Gita Maharani",
    nim: "2204101062",
    studentPhoto:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    title: "Language Attitude Toward English Varieties Among University Students",
    role: "Ketua Penelaah",
    day: "Sabtu",
    date: "10 Mei 2026",
    time: "09.00 - 10.30",
    location: "Ruang Sidang FIB 2",
    phase: "Selesai",
    phaseType: "done",
    documentStatus: "Draft Proposal sudah dibuka",
    documentReadStatus: "Sudah dibaca",
    agendaGroup: "Riwayat",
  },
];

const assessmentCriteria = [
  { label: "ABSTRAK", maxScore: 10 },
  { label: "PENDAHULUAN", maxScore: 20 },
  { label: "KAJIAN PUSTAKA", maxScore: 20 },
  { label: "METODE / KERANGKA TEORETIS", maxScore: 25 },
  { label: "HIPOTESIS HASIL DAN PEMBAHASAN", maxScore: 10 },
  { label: "PENYAJIAN", maxScore: 15 },
];

const sessionReviewers = {
  "SUP-2026-002": [
    {
      name: "Dr. Tatan Tawami, M.Hum.",
      role: "Penelaah 1",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: true,
      score: null,
      feedback: "",
    },
    {
      name: "Dr. Nia Kurniawati, M.Hum.",
      role: "Ketua Penelaah",
      photo:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: 82,
      feedback:
        "Rumusan masalah sudah cukup jelas, tetapi landasan teori perlu dirapikan.",
    },
    {
      name: "Rahmat Gunawan, M.Hum.",
      role: "Penelaah 2",
      photo:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
  ],
  "SKR-2026-006": [
    {
      name: "Dr. Tatan Tawami, M.Hum.",
      role: "Ketua Penelaah",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: true,
      score: 88,
      feedback: "Argumentasi sudah kuat dan penyajian data cukup konsisten.",
    },
    {
      name: "Dr. Lilis Suryani, M.Hum.",
      role: "Penelaah 1",
      photo:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: 85,
      feedback:
        "Pembahasan perlu sedikit diperjelas pada bagian analisis strategi kesantunan.",
    },
    {
      name: "Agus Setiawan, M.Hum.",
      role: "Penelaah 2",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
  ],
  "SUP-2026-010": [
    {
      name: "Dr. Tatan Tawami, M.Hum.",
      role: "Penelaah 2",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: true,
      score: null,
      feedback: "",
    },
    {
      name: "Rina Marlina, M.Hum.",
      role: "Ketua Penelaah",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
    {
      name: "Budi Firmansyah, M.Hum.",
      role: "Penelaah 1",
      photo:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
  ],
  "SKR-2026-012": [
    {
      name: "Dr. Tatan Tawami, M.Hum.",
      role: "Penelaah 1",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: true,
      score: 80,
      feedback:
        "Catatan awal sudah diisi saat sidang berlangsung, final belum dikirim.",
    },
    {
      name: "Prof. Dr. Herry Supriyadi, M.Hum.",
      role: "Ketua Penelaah",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
    {
      name: "Dewi Saraswati, M.Hum.",
      role: "Penelaah 2",
      photo:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
  ],
  "SKR-2026-003": [
    {
      name: "Dr. Tatan Tawami, M.Hum.",
      role: "Penelaah 2",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: true,
      score: null,
      feedback: "",
    },
    {
      name: "Dr. Nia Kurniawati, M.Hum.",
      role: "Ketua Penelaah",
      photo:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: 84,
      feedback:
        "Analisis sudah baik, tetapi simpulan perlu mengikat kembali rumusan masalah.",
    },
    {
      name: "Rahmat Gunawan, M.Hum.",
      role: "Penelaah 1",
      photo:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: null,
      feedback: "",
    },
  ],
  "SUP-2026-020": [
    {
      name: "Dr. Tatan Tawami, M.Hum.",
      role: "Ketua Penelaah",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: true,
      score: 90,
      feedback: "Proposal sudah memenuhi standar dan layak dilanjutkan.",
    },
    {
      name: "Rina Marlina, M.Hum.",
      role: "Penelaah 1",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: 87,
      feedback: "Topik jelas dan metodologi dapat diterima.",
    },
    {
      name: "Budi Firmansyah, M.Hum.",
      role: "Penelaah 2",
      photo:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
      isCurrentUser: false,
      score: 86,
      feedback: "Perlu revisi minor pada batasan penelitian.",
    },
  ],
};

function getGrade(score) {
  if (typeof score !== "number") return "—";
  if (score >= 85) return "A";
  if (score >= 75) return "B";
  if (score >= 65) return "C";
  return "D";
}

function getCriteriaScores(totalScore) {
  if (typeof totalScore !== "number") return null;

  const ratio = totalScore / 100;

  return assessmentCriteria.map((criterion) => ({
    ...criterion,
    score: Math.round(criterion.maxScore * ratio),
  }));
}

function TypeBadge({ type }) {
  return (
    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
      {type}
    </span>
  );
}

function PhaseBadge({ phase, phaseType }) {
  const styles = {
    upcoming: "bg-slate-100 text-slate-700 ring-slate-200",
    ongoing: "bg-blue-50 text-[#0B63CE] ring-blue-100",
    evaluation: "bg-red-50 text-red-600 ring-red-100",
    done: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
        styles[phaseType]
      }`}
    >
      {phase}
    </span>
  );
}

function InfoCard({ label, value, icon: Icon, isOnline = false }) {
  return (
    <div className="min-w-0 rounded-2xl bg-white px-4 py-3 ring-1 ring-blue-100">
      <p className="text-xs font-medium text-slate-400">{label}</p>

      <p className="mt-1 flex min-w-0 items-center gap-1.5 truncate text-sm font-semibold text-slate-950">
        {Icon && !isOnline && <Icon size={14} className="shrink-0 text-[#0B63CE]" />}
        {isOnline && <Video size={14} className="shrink-0 text-[#0B63CE]" />}
        <span className="truncate">{value}</span>
      </p>
    </div>
  );
}

function DocumentStatusCard({ readStatus, documentStatus }) {
  const isUnread = readStatus.toLowerCase().includes("belum");

  return (
    <div
      className={`min-w-0 rounded-2xl px-4 py-3 ring-1 ${
        isUnread
          ? "bg-amber-50 ring-amber-100"
          : "bg-emerald-50 ring-emerald-100"
      }`}
    >
      <p
        className={`text-xs font-medium ${
          isUnread ? "text-amber-600" : "text-emerald-600"
        }`}
      >
        Dokumen
      </p>

      <div className="mt-1 flex min-w-0 items-center gap-2">
        {isUnread ? (
          <FileText size={14} className="shrink-0 text-amber-600" />
        ) : (
          <CheckCircle2 size={14} className="shrink-0 text-emerald-600" />
        )}

        <p
          className={`truncate text-sm font-semibold ${
            isUnread ? "text-amber-800" : "text-emerald-800"
          }`}
        >
          {readStatus}
        </p>
      </div>

      <p
        className={`mt-1 truncate text-xs ${
          isUnread ? "text-amber-700/80" : "text-emerald-700/80"
        }`}
      >
        {documentStatus}
      </p>
    </div>
  );
}

function ReviewerCard({ reviewer }) {
  return (
    <div
      className={`rounded-[1.25rem] px-4 py-5 text-center ring-1 ${
        reviewer.isCurrentUser
          ? "bg-blue-50 ring-blue-200"
          : "bg-[#F8FBFF] ring-blue-100"
      }`}
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        {reviewer.role}
      </p>

      <img
        src={reviewer.photo}
        alt={reviewer.name}
        className="mx-auto mt-5 h-20 w-20 rounded-3xl object-cover ring-1 ring-blue-100"
      />

      <p className="mx-auto mt-5 line-clamp-2 max-w-[220px] text-base font-semibold leading-6 tracking-[-0.02em] text-slate-950">
        {reviewer.name}
      </p>

      {reviewer.isCurrentUser && (
        <span className="mt-4 inline-flex rounded-full bg-[#0B63CE] px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20">
          Anda
        </span>
      )}
    </div>
  );
}

function MetricCard({ label, value, helper, tone = "blue" }) {
  const toneClass = {
    blue: "bg-blue-50 text-[#0B63CE] ring-blue-100",
    slate: "bg-[#F8FBFF] text-slate-950 ring-blue-100",
    amber: "bg-amber-50 text-amber-800 ring-amber-100",
  }[tone];

  return (
    <div className={`rounded-2xl px-4 py-4 ring-1 ${toneClass}`}>
      <p className="text-xs font-medium opacity-80">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs leading-5 opacity-80">{helper}</p>
    </div>
  );
}

function CriteriaRow({ criterion, hasScore }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-blue-100">
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-slate-700">
          {criterion.label}
        </p>

        <p className="mt-0.5 text-[11px] text-slate-400">
          Maks. {criterion.maxScore}
        </p>
      </div>

      {hasScore ? (
        <p className="shrink-0 text-sm font-semibold text-slate-950">
          {criterion.score}/{criterion.maxScore}
        </p>
      ) : (
        <p className="shrink-0 text-sm font-semibold text-slate-300">—</p>
      )}
    </div>
  );
}

export default function ReviewerSessionDetailPage() {
  const router = useRouter();
  const params = useParams();

  const requestId = useMemo(() => {
    if (!params?.id) return "";
    return decodeURIComponent(String(params.id));
  }, [params?.id]);

  const detail = useMemo(() => {
    const foundSession = sessions.find((item) => item.id === requestId);

    return foundSession || sessions[0];
  }, [requestId]);

  const reviewers = sessionReviewers[detail.id] || [];
  const currentReviewer = reviewers.find((reviewer) => reviewer.isCurrentUser);

  const hasScore = typeof currentReviewer?.score === "number";
  const hasFeedback =
    currentReviewer?.feedback && currentReviewer.feedback.trim().length > 0;

  const criteriaScores = getCriteriaScores(currentReviewer?.score);
  const isOnline = detail.location.toLowerCase().includes("meet");

  return (
    <div className="space-y-5 pb-10 font-[Poppins]">
      <div>
        <button
          type="button"
          onClick={() => router.push("/reviewer/sessions")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#0B63CE]"
        >
          <ArrowLeft size={17} />
          Kembali
        </button>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
          Detail Sidang
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 md:text-base">
          Informasi sidang, daftar penelaah yang terlibat, dan penilaian Anda
          sebagai penelaah.
        </p>
      </div>

      <section className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex w-fit flex-wrap items-center gap-2">
            <TypeBadge type={detail.type} />
            <PhaseBadge phase={detail.phase} phaseType={detail.phaseType} />

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {detail.role}
            </span>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
            <CalendarDays size={14} />
            <span>{detail.agendaGroup}</span>
          </div>
        </div>

        <div className="mt-6 border-t border-blue-100 pt-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <img
              src={detail.studentPhoto}
              alt={detail.studentName}
              className="h-36 w-36 shrink-0 rounded-[1.5rem] object-cover ring-1 ring-blue-100"
            />

            <div className="flex min-h-36 min-w-0 flex-1 flex-col justify-center">
              <h2 className="line-clamp-1 text-2xl font-semibold tracking-tight text-slate-950">
                {detail.studentName}
                <span className="mx-2 text-slate-300">-</span>
                <span className="text-xl font-semibold text-slate-500">
                  {detail.nim}
                </span>
              </h2>

              <p className="mt-3 max-w-4xl text-lg font-semibold leading-8 text-slate-800">
                {detail.title}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-blue-100 pt-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Informasi Jadwal
            </h2>

            <p className="text-sm leading-6 text-slate-500">
              Jadwal sidang yang sudah diterima dan menjadi agenda aktif Anda.
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <InfoCard
              label="Tanggal"
              value={`${detail.day}, ${detail.date}`}
              icon={CalendarDays}
            />

            <InfoCard label="Waktu" value={detail.time} icon={Clock3} />

            <InfoCard
              label="Lokasi"
              value={detail.location}
              icon={MapPin}
              isOnline={isOnline}
            />

            <DocumentStatusCard
              readStatus={detail.documentReadStatus}
              documentStatus={detail.documentStatus}
            />
          </div>
        </div>

        <div className="mt-6 border-t border-blue-100 pt-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Penelaah Terlibat
            </h2>

            <p className="text-sm leading-6 text-slate-500">
              Daftar dosen yang bertugas pada sidang ini. Nilai dan feedback
              penelaah lain tidak ditampilkan.
            </p>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {reviewers.map((reviewer) => (
              <ReviewerCard
                key={`${detail.id}-${reviewer.role}`}
                reviewer={reviewer}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-blue-100 pt-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                Penilaian & Feedback Anda
              </h2>

              <p className="text-sm leading-6 text-slate-500">
                Bagian ini hanya menampilkan nilai dan feedback milik Anda
                sebagai penelaah.
              </p>
            </div>

            <span className="mt-2 w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100 sm:mt-0">
              {currentReviewer?.role || detail.role}
            </span>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <MetricCard
              label="Total Nilai"
              value={hasScore ? currentReviewer.score : "—"}
              helper={hasScore ? "Nilai yang sudah tersimpan" : "Belum terisi"}
              tone={hasScore ? "blue" : "amber"}
            />

            <MetricCard
              label="Huruf Mutu"
              value={hasScore ? getGrade(currentReviewer.score) : "—"}
              helper={hasScore ? "Berdasarkan total nilai" : "Belum tersedia"}
              tone={hasScore ? "slate" : "amber"}
            />

            <MetricCard
              label="Status Feedback"
              value={hasFeedback ? "Terisi" : "—"}
              helper={hasFeedback ? "Feedback sudah tersimpan" : "Belum terisi"}
              tone={hasFeedback ? "blue" : "amber"}
            />
          </div>

          <div className="mt-4 rounded-[1.5rem] bg-[#F8FBFF] p-4 ring-1 ring-blue-100">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-slate-950">
                Rincian Kriteria
              </p>

              <span className="text-xs text-slate-400">
                Sesuai format penilaian SUP
              </span>
            </div>

            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {(criteriaScores || assessmentCriteria).map((criterion) => (
                <CriteriaRow
                  key={criterion.label}
                  criterion={criterion}
                  hasScore={hasScore}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[1.5rem] bg-[#F8FBFF] p-4 ring-1 ring-blue-100">
            <p className="text-xs font-medium text-slate-400">
              Catatan Feedback Anda
            </p>

            {hasFeedback ? (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {currentReviewer.feedback}
              </p>
            ) : (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p className="text-lg font-semibold text-slate-300">—</p>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
                  Belum terisi
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 border-t border-blue-100 pt-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-6 text-slate-500">
              Kelola dokumen atau lanjutkan pengisian nilai sesuai fase sidang.
            </p>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 text-sm font-semibold text-[#0B63CE] transition hover:bg-blue-50"
              >
                <FileText size={16} />
                Buka Dokumen
              </button>

              {detail.phaseType !== "upcoming" && detail.phaseType !== "done" && (
                <button
                  type="button"
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold text-white shadow-lg transition ${
                    detail.phaseType === "evaluation"
                      ? "bg-red-600 shadow-red-600/20 hover:bg-red-700"
                      : "bg-[#0B63CE] shadow-blue-600/20 hover:bg-blue-700"
                  }`}
                >
                  <MessageSquareText size={16} />
                  {detail.phaseType === "evaluation"
                    ? "Kirim Nilai & Feedback"
                    : "Isi Nilai & Feedback"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}