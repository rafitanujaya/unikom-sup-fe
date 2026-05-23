import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  FileText,
  GraduationCap,
  History,
  MapPin,
  MessageSquareText,
  UserRound,
  XCircle,
} from "lucide-react";

const submissionDetail = {
  id: "SUB-SUP-2026-0007",
  attempt: "Pengajuan SUP Ke-7",
  title: "Analysis of Code-Switching in English Literature Classroom",
  field: "Linguistics",
  supervisor: "Dr. Nia Kurniasih, M.Hum.",
  submittedAt: "10 Mei 2026, 09:20",
  verifiedAt: "12 Mei 2026, 14:10",
  updatedAt: "14 Mei 2026, 11:30",
  seminarDate: "20 Mei 2026",
  seminarTime: "10:00 WIB",
  room: "R5340",
  reviewers: [
    "Dr. Tatan Tawami, M.Hum.",
    "Dr. Sri Wiyanti, M.Hum.",
    "Rahma Widyana, M.Hum.",
  ],
  requestedExaminers: [
    "Dr. Tatan Tawami, M.Hum.",
    "Dr. Sri Wiyanti, M.Hum.",
  ],
  examinerRequestNote:
    "Mahasiswa mengajukan penguji yang sesuai dengan topik linguistics dan classroom interaction.",
  status: "verified", // processing | verified | failed | rejected
  result: "Menunggu Seminar",
  abstract:
    "Penelitian ini membahas fenomena code-switching dalam kelas sastra Inggris, khususnya bagaimana mahasiswa dan dosen menggunakan peralihan bahasa dalam proses diskusi akademik.",
  document: {
    name: "proposal-code-switching-rizky.pdf",
    size: "2.4 MB",
    uploadedAt: "10 Mei 2026, 09:20",
    url: "#",
  },
  staffNote:
    "Pengajuan telah diverifikasi. Jadwal seminar sudah ditentukan oleh program studi.",
  feedback:
    "Belum ada feedback akhir. Feedback akan tersedia setelah seminar selesai dan hasil diproses oleh reviewer.",
};

const processTimeline = [
  {
    title: "Proposal diajukan",
    desc: "Mahasiswa mengirim data proposal dan dokumen SUP ke sistem.",
    date: "10 Mei 2026, 09:20",
    status: "Selesai",
    type: "success",
  },
  {
    title: "Verifikasi admin",
    desc: "Admin memeriksa kelengkapan dokumen dan data pengajuan.",
    date: "12 Mei 2026, 14:10",
    status: "Terverifikasi",
    type: "success",
  },
  {
    title: "Penjadwalan seminar",
    desc: "Program studi menentukan jadwal, ruangan, dan dosen penguji.",
    date: "14 Mei 2026, 11:30",
    status: "Terjadwal",
    type: "info",
  },
  {
    title: "Seminar SUP",
    desc: "Mahasiswa mengikuti seminar sesuai jadwal yang telah ditentukan.",
    date: "20 Mei 2026, 10:00 WIB",
    status: "Menunggu",
    type: "pending",
  },
];

function getStatusStyle(status) {
  if (status === "verified") {
    return {
      label: "Terverifikasi",
      badge: "bg-green-50 text-green-600",
      iconBox: "bg-green-50 text-green-600",
      icon: CheckCircle2,
    };
  }

  if (status === "failed") {
    return {
      label: "Tidak Lulus",
      badge: "bg-red-50 text-red-600",
      iconBox: "bg-red-50 text-red-600",
      icon: XCircle,
    };
  }

  if (status === "rejected") {
    return {
      label: "Ditolak Administratif",
      badge: "bg-amber-50 text-amber-600",
      iconBox: "bg-amber-50 text-amber-600",
      icon: AlertTriangle,
    };
  }

  return {
    label: "Diproses",
    badge: "bg-blue-50 text-primary",
    iconBox: "bg-blue-50 text-primary",
    icon: Clock3,
  };
}

function getTimelineStyle(type) {
  if (type === "success") {
    return "bg-green-50 text-green-600";
  }

  if (type === "pending") {
    return "bg-slate-100 text-slate-500";
  }

  return "bg-blue-50 text-primary";
}

export default function StudentHistoryDetailPage() {
  const status = getStatusStyle(submissionDetail.status);
  const StatusIcon = status.icon;

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <Link
            href="/student/history"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors duration-300 hover:text-primary-dark"
          >
            <ArrowLeft size={17} />
            Kembali ke Riwayat
          </Link>

          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-900">
            Detail Riwayat SUP
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
            Informasi lengkap terkait pengajuan, dokumen, jadwal, reviewer, dan hasil proses SUP.
          </p>
        </div>

        <span className={`w-fit rounded-2xl px-4 py-3 text-sm font-semibold ${status.badge}`}>
          {status.label}
        </span>
      </div>

      <section className="mb-6 rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex gap-4">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${status.iconBox}`}>
              <StatusIcon size={26} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                {submissionDetail.attempt}
              </p>
              <h3 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-slate-950">
                {submissionDetail.title}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
                {submissionDetail.abstract}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 md:grid-cols-2 xl:grid-cols-4">
          <InfoBlock icon={FileText} label="ID Pengajuan" value={submissionDetail.id} />
          <InfoBlock icon={CalendarDays} label="Tanggal Pengajuan" value={submissionDetail.submittedAt} />
          <InfoBlock icon={BookOpenCheck} label="Bidang Penelitian" value={submissionDetail.field} />
          <InfoBlock icon={GraduationCap} label="Hasil" value={submissionDetail.result} />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Timeline SUP
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Proses Pengajuan
              </h3>
            </div>

            <div className="mt-6 space-y-5">
              {processTimeline.map((item, index) => (
                <div key={item.title} className="relative flex gap-4">
                  {index !== processTimeline.length - 1 && (
                    <div className="absolute left-5 top-12 h-full w-px bg-slate-200" />
                  )}

                  <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${getTimelineStyle(item.type)}`}>
                    {item.type === "success" ? <CheckCircle2 size={18} /> : <Clock3 size={18} />}
                  </div>

                  <div className="flex-1 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-500">{item.desc}</p>
                        <p className="mt-2 text-xs font-medium text-slate-400">{item.date}</p>
                      </div>

                      <span className="w-fit shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Reviewer
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Dosen Penguji
              </h3>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {submissionDetail.reviewers.map((reviewer, index) => (
                <div key={reviewer} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                    <UserRound size={20} />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Penguji {index + 1}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-900">
                    {reviewer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-blue-50 px-4 py-4 text-sm leading-6 text-slate-600 ring-1 ring-blue-100">
              <span className="font-semibold text-primary">Request mahasiswa:</span>{" "}
              {submissionDetail.requestedExaminers.length > 0
                ? submissionDetail.requestedExaminers.join(", ")
                : "Tidak ada request dosen penguji."}
              {submissionDetail.examinerRequestNote && (
                <p className="mt-2">
                  <span className="font-semibold text-primary">Catatan request:</span>{" "}
                  {submissionDetail.examinerRequestNote}
                </p>
              )}
            </div>
          </section>

          <section className="rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Feedback
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Catatan & Hasil
              </h3>
            </div>

            <div className="mt-6 space-y-4">
              <NoteBox
                icon={MessageSquareText}
                title="Catatan Staff"
                desc={submissionDetail.staffNote}
              />
              <NoteBox
                icon={BookOpenCheck}
                title="Feedback Akhir"
                desc={submissionDetail.feedback}
              />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Jadwal Seminar
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
              Informasi Seminar
            </h3>

            <div className="mt-5 space-y-4">
              <SideInfo icon={CalendarDays} label="Tanggal" value={submissionDetail.seminarDate} />
              <SideInfo icon={Clock3} label="Waktu" value={submissionDetail.seminarTime} />
              <SideInfo icon={MapPin} label="Ruangan" value={submissionDetail.room} />
            </div>
          </section>

          <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Dokumen
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
              Proposal
            </h3>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary ring-1 ring-blue-100">
                <FileText size={20} />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                {submissionDetail.document.name}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {submissionDetail.document.size} · {submissionDetail.document.uploadedAt}
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  href={submissionDetail.document.url}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-50 text-sm font-semibold text-primary ring-1 ring-blue-100 transition hover:bg-blue-100"
                >
                  <Eye size={16} />
                  Lihat
                </Link>
                <Link
                  href={submissionDetail.document.url}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  <Download size={16} />
                  Unduh
                </Link>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Ringkasan
            </p>
            <div className="mt-5 space-y-4">
              <SideInfo icon={History} label="Update Terakhir" value={submissionDetail.updatedAt} />
              <SideInfo icon={CheckCircle2} label="Verifikasi" value={submissionDetail.verifiedAt} />
              <SideInfo icon={GraduationCap} label="Pembimbing" value={submissionDetail.supervisor} />
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}

function InfoBlock({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-primary ring-1 ring-blue-100">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function SideInfo({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3">
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

function NoteBox({ icon: Icon, title, desc }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">{desc}</p>
      </div>
    </div>
  );
}
