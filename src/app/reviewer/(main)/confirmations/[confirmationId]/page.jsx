"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MessageSquareText,
  X,
  XCircle,
} from "lucide-react";

const confirmationDetails = [
  {
    id: "SUP-2026-001",
    type: "SUP",
    studentName: "Alya Putri Ramadhani",
    nim: "2204101001",
    studentPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    title: "Representation of Identity in Contemporary British Fiction",
    researchField: "Literary Studies",
    supervisor: "Dr. Rina Marlina, S.S., M.Hum.",
    reviewerRole: "Ketua Penelaah",
    proposedBy: "Koordinator Sidang Sastra Inggris",
    date: "18 Mei 2026",
    day: "Senin",
    time: "09.00 - 10.30",
    location: "Ruang Sidang FIB 2",
    submittedAt: "13 Mei 2026, 08.20",
    status: "Menunggu Konfirmasi",
    examiners: [
      {
        name: "Dr. Tatan Tawami, M.Hum.",
        role: "Ketua Penelaah",
        photo:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: true,
      },
      {
        name: "Dr. Nia Kurniawati, M.Hum.",
        role: "Penelaah 1",
        photo:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
      {
        name: "Rahmat Gunawan, M.Hum.",
        role: "Penelaah 2",
        photo:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
    ],
  },
  {
    id: "SKR-2026-008",
    type: "Sidang Skripsi",
    studentName: "Dimas Pradipta",
    nim: "2204101034",
    studentPhoto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    title: "Translation Strategies in Indonesian Subtitled Films",
    researchField: "Translation Studies",
    supervisor: "Dr. Tatan Tawami, S.S., M.Hum.",
    reviewerRole: "Penelaah 1",
    proposedBy: "Koordinator Sidang Sastra Inggris",
    date: "19 Mei 2026",
    day: "Selasa",
    time: "10.00 - 11.30",
    location: "Google Meet",
    submittedAt: "13 Mei 2026, 09.15",
    status: "Menunggu Konfirmasi",
    examiners: [
      {
        name: "Prof. Dr. Herry Supriyadi, M.Hum.",
        role: "Ketua Penelaah",
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
      {
        name: "Dr. Tatan Tawami, M.Hum.",
        role: "Penelaah 1",
        photo:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: true,
      },
      {
        name: "Dewi Saraswati, M.Hum.",
        role: "Penelaah 2",
        photo:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
    ],
  },
  {
    id: "SUP-2026-011",
    type: "SUP",
    studentName: "Salsa Nabila",
    nim: "2204101041",
    studentPhoto:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    title: "Reader Response Analysis in Young Adult Literature",
    researchField: "Literary Studies",
    supervisor: "Dr. Dian Permatasari, S.S., M.Hum.",
    reviewerRole: "Penelaah 2",
    proposedBy: "Koordinator Sidang Sastra Inggris",
    date: "23 Mei 2026",
    day: "Jumat",
    time: "08.00 - 09.30",
    location: "Ruang Sidang FIB 1",
    submittedAt: "13 Mei 2026, 10.40",
    status: "Menunggu Konfirmasi",
    examiners: [
      {
        name: "Dr. Lilis Suryani, M.Hum.",
        role: "Ketua Penelaah",
        photo:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
      {
        name: "Agus Setiawan, M.Hum.",
        role: "Penelaah 1",
        photo:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: false,
      },
      {
        name: "Dr. Tatan Tawami, M.Hum.",
        role: "Penelaah 2",
        photo:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
        isCurrentUser: true,
      },
    ],
  },
];

function TypeBadge({ type }) {
  return (
    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
      {type}
    </span>
  );
}

function PendingBadge() {
  return (
    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
      Menunggu Konfirmasi
    </span>
  );
}

function InfoItem({ label, value, highlight = false }) {
  return (
    <div
      className={`min-w-0 rounded-2xl px-4 py-3 ring-1 ${
        highlight ? "bg-amber-50 ring-amber-100" : "bg-[#F8FBFF] ring-blue-100"
      }`}
    >
      <p
        className={`text-xs font-medium ${
          highlight ? "text-amber-600" : "text-slate-400"
        }`}
      >
        {label}
      </p>

      <p
        className={`mt-1 line-clamp-2 text-sm font-semibold leading-6 ${
          highlight ? "text-amber-800" : "text-slate-950"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ExaminerCard({ examiner }) {
  return (
    <div
      className={`min-w-0 rounded-[1.25rem] px-4 py-5 text-center ring-1 ${
        examiner.isCurrentUser
          ? "bg-blue-50 ring-blue-200"
          : "bg-[#F8FBFF] ring-blue-100"
      }`}
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        {examiner.role}
      </p>

      <img
        src={examiner.photo}
        alt={examiner.name}
        className="mx-auto mt-5 h-20 w-20 rounded-3xl object-cover ring-1 ring-blue-100"
      />

      <p className="mx-auto mt-5 line-clamp-2 max-w-[220px] text-base font-semibold leading-6 tracking-[-0.02em] text-slate-950">
        {examiner.name}
      </p>

      {examiner.isCurrentUser && (
        <span className="mt-4 inline-flex rounded-full bg-[#0B63CE] px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20">
          Anda
        </span>
      )}
    </div>
  );
}

export default function ReviewerConfirmationDetailPage() {
  const router = useRouter();
  const params = useParams();

  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const requestId = useMemo(() => {
    if (!params?.id) return "";
    return decodeURIComponent(String(params.id));
  }, [params?.id]);

  const detail = useMemo(() => {
    const foundDetail = confirmationDetails.find(
      (item) => item.id === requestId,
    );

    return foundDetail || confirmationDetails[0];
  }, [requestId]);

  function handleApprove() {
    console.log("approved", {
      requestedId: requestId,
      displayedId: detail.id,
    });

    // Integrasi API nanti:
    // await approveScheduleConfirmation(requestId || detail.id);
    // router.push("/reviewer/confirmations");
  }

  function handleReject() {
    if (!showRejectForm) {
      setShowRejectForm(true);
      return;
    }

    console.log("rejected", {
      requestedId: requestId,
      displayedId: detail.id,
      reason: rejectReason,
    });

    // Integrasi API nanti:
    // await rejectScheduleConfirmation(requestId || detail.id, rejectReason);
    // router.push("/reviewer/confirmations");
  }

  return (
    <div className="space-y-5 pb-10 font-[Poppins]">
      <div>
        <button
          type="button"
          onClick={() => router.push("/reviewer/confirmations")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#0B63CE]"
        >
          <ArrowLeft size={17} />
          Kembali
        </button>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
          Detail Konfirmasi Jadwal
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 md:text-base">
          Periksa informasi mahasiswa, jadwal, dan komposisi penelaah sebelum
          menyetujui atau menolak jadwal.
        </p>
      </div>

      <section className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-sm shadow-blue-100/30">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex w-fit flex-wrap items-center gap-2">
            <TypeBadge type={detail.type} />
            <PendingBadge />
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
            <Clock3 size={14} />
            <span>Diajukan {detail.submittedAt}</span>
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
              Informasi Akademik
            </h2>

            <p className="text-sm leading-6 text-slate-500">
              Informasi dasar yang berkaitan dengan pengajuan mahasiswa.
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <InfoItem label="Pembimbing" value={detail.supervisor} />
            <InfoItem label="Bidang Kajian" value={detail.researchField} />
          </div>
        </div>

        <div className="mt-6 border-t border-blue-100 pt-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Informasi Jadwal
            </h2>

            <p className="text-sm leading-6 text-slate-500">
              Jadwal ini masih berupa pengajuan dan belum masuk Daftar Sidang.
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <InfoItem label="Tanggal" value={`${detail.day}, ${detail.date}`} />
            <InfoItem label="Waktu" value={detail.time} />
            <InfoItem label="Lokasi" value={detail.location} />
            <InfoItem
              label="Peran Anda"
              value={detail.reviewerRole}
              highlight
            />
          </div>

          <div className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 ring-1 ring-amber-100">
            <p className="text-xs font-medium text-amber-600">
              Catatan Pengajuan
            </p>

            <p className="mt-1 text-sm font-semibold leading-6 text-amber-800">
              Diajukan oleh {detail.proposedBy} pada {detail.submittedAt}. Jika
              salah satu penelaah menolak, koordinator perlu melakukan
              penjadwalan ulang.
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-blue-100 pt-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Dosen Penelaah
            </h2>

            <p className="text-sm leading-6 text-slate-500">
              Semua penelaah perlu menyetujui pengajuan agar jadwal dapat
              dilanjutkan.
            </p>
          </div>

          <div className="mt-4 grid gap-5 lg:grid-cols-3">
            {detail.examiners.map((examiner) => (
              <ExaminerCard
                key={`${detail.id}-${examiner.role}`}
                examiner={examiner}
              />
            ))}
          </div>
        </div>

        {showRejectForm && (
          <div className="mt-6 border-t border-red-100 pt-6">
            <div className="rounded-[1.5rem] border border-red-100 bg-red-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-red-600 ring-1 ring-red-100">
                    <MessageSquareText size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-red-700">
                      Alasan Penolakan
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-red-600/80">
                      Berikan alasan singkat agar koordinator dapat menyusun
                      jadwal ulang.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowRejectForm(false);
                    setRejectReason("");
                  }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-red-500 ring-1 ring-red-100 transition hover:bg-red-100"
                  aria-label="Tutup alasan penolakan"
                >
                  <X size={16} />
                </button>
              </div>

              <textarea
                value={rejectReason}
                onChange={(event) => setRejectReason(event.target.value)}
                placeholder="Contoh: Saya memiliki jadwal mengajar pada waktu tersebut."
                className="mt-5 min-h-32 w-full resize-none rounded-2xl border border-red-100 bg-white p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>
        )}

        <div className="mt-6 border-t border-blue-100 pt-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-6 text-slate-500">
              Pilih keputusan jadwal.
            </p>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleReject}
                disabled={showRejectForm && rejectReason.trim().length === 0}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-red-50 px-5 text-sm font-semibold text-red-600 ring-1 ring-red-100 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <XCircle size={17} />
                {showRejectForm ? "Kirim Penolakan" : "Tolak Jadwal"}
              </button>

              <button
                type="button"
                onClick={handleApprove}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#0B63CE] px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <CheckCircle2 size={17} />
                Setujui Jadwal
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}