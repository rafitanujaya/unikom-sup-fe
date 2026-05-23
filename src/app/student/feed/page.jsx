import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  Info,
  MapPin,
  UserRoundCheck,
} from "lucide-react";

const currentSUP = {
  title: "Analysis of Code-Switching in English Literature Classroom",
  status: "Menunggu Verifikasi",
  schedule: "20 Mei 2026",
  room: "R5340",
  result: "Belum Tersedia",
  progress: 65,
};

const dashboardNotes = [
  {
    title: "Estimasi Verifikasi",
    desc: "Proses verifikasi admin membutuhkan waktu 2-3 hari kerja setelah dokumen dikirim.",
  },
  {
    title: "Kendala Dokumen",
    desc: "Hubungi admin fakultas jika terdapat kendala dalam pengunggahan dokumen proposal.",
  },
  {
    title: "Update Status",
    desc: "Perubahan status pengajuan, jadwal seminar, revisi, dan hasil akhir akan muncul pada menu Notifikasi.",
  },
];

const progressTimeline = [
  {
    title: "Pendaftaran Proposal",
    desc: "Data proposal dan dokumen pengajuan SUP telah berhasil dikirim.",
    date: "10 Mei 2026, 09:20",
    status: "Selesai",
    type: "success",
  },
  {
    title: "Verifikasi Administrasi",
    desc: "Admin sedang memeriksa kelengkapan dokumen dan data pengajuan.",
    date: "Sedang diproses",
    status: "Berjalan",
    type: "active",
  },
  {
    title: "Penjadwalan Seminar",
    desc: "Jadwal, ruangan, dan dosen penelaah akan ditentukan setelah verifikasi selesai.",
    date: "Menunggu verifikasi",
    status: "Menunggu",
    type: "pending",
  },
  {
    title: "Hasil Akhir",
    desc: "Hasil dan feedback akan tersedia setelah seminar SUP selesai diproses.",
    date: "Belum tersedia",
    status: "Menunggu",
    type: "pending",
  },
];

const reviewers = [
  {
    name: "Dr. Tatan Tawami, M.Hum.",
    role: "Ketua Penelaah",
    expertise: "Linguistics",
    photo: "/images/reviewers/tatan-tawami.jpg",
  },
  {
    name: "Dr. Sri Wiyanti, M.Hum.",
    role: "Penelaah 1",
    expertise: "English Literature",
    photo: "/images/reviewers/sri-wiyanti.jpg",
  },
  {
    name: "Rahma Widyana, M.Hum.",
    role: "Penelaah 2",
    expertise: "Classroom Discourse",
    photo: "/images/reviewers/rahma-widyana.jpg",
  },
];

const reviewerInfo = [
  {
    label: "Status Penelaah",
    value: "Sudah Ditetapkan",
  },
  {
    label: "Fokus Evaluasi",
    value: "Kelayakan topik, metode, dan kesiapan proposal",
  },
];

function getTimelineStyle(type) {
  if (type === "success") {
    return {
      iconBox: "bg-primary text-white",
      line: "bg-primary",
      badge: "bg-green-50 text-green-600",
      icon: CheckCircle2,
    };
  }

  if (type === "active") {
    return {
      iconBox: "bg-amber-50 text-amber-600 ring-1 ring-amber-100",
      line: "bg-slate-200",
      badge: "bg-amber-50 text-amber-600",
      icon: Clock3,
    };
  }

  return {
    iconBox: "bg-white text-slate-400 ring-1 ring-slate-200",
    line: "bg-slate-200",
    badge: "bg-slate-100 text-slate-500",
    icon: Clock3,
  };
}

export default function StudentDashboardPage() {
  return (
    <>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.03em] text-slate-900">
            Selamat datang kembali
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            Dashboard ini menampilkan pengajuan SUP yang sedang aktif. Jika
            pengajuan sebelumnya gagal, riwayatnya tetap bisa kamu lihat melalui
            menu Riwayat SUP.
          </p>
        </div>
      </div>

      <section className="mb-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Judul Proposal
            </p>
            <h3 className="mt-2 max-w-3xl text-2xl font-semibold tracking-tight text-slate-950">
              {currentSUP.title}
            </h3>
          </div>

          <span className="w-fit rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-600">
            {currentSUP.status}
          </span>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={CalendarDays} label="Jadwal Seminar" value={currentSUP.schedule} />
        <SummaryCard icon={MapPin} label="Ruangan Seminar" value={currentSUP.room} />
        <SummaryCard icon={BookOpenCheck} label="Penelaah" value="3 Dosen" />
        <SummaryCard icon={GraduationCap} label="Hasil Akhir" value={currentSUP.result} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Progress SUP
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Timeline Pengajuan
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Pantau perkembangan pengajuan SUP dari dokumen dikirim sampai hasil akhir tersedia.
              </p>
            </div>

            <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
              {currentSUP.progress}% Selesai
            </span>
          </div>

          <div className="mt-7 space-y-5">
            {progressTimeline.map((item, index) => {
              const style = getTimelineStyle(item.type);
              const Icon = style.icon;
              const isLast = index === progressTimeline.length - 1;

              return (
                <div key={item.title} className="relative flex gap-4">
                  {!isLast && (
                    <div className={`absolute left-5 top-11 h-[calc(100%+8px)] w-px ${style.line}`} />
                  )}

                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${style.iconBox}`}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0 flex-1 rounded-2xl bg-slate-50 px-4 py-3.5 ring-1 ring-slate-100">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-slate-900">
                          {item.title}
                        </h4>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                          {item.desc}
                        </p>
                        <p className="mt-2 text-xs font-medium text-slate-400">
                          {item.date}
                        </p>
                      </div>

                      <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Dosen Penelaah
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              Tim Reviewer SUP
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Dosen yang akan mengevaluasi proposal SUP mahasiswa.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {reviewers.map((reviewer) => (
              <ReviewerCard key={reviewer.name} reviewer={reviewer} />
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-100">
  <div className="flex items-start gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-primary">
      <UserRoundCheck size={18} />
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-900">
        Informasi Penelaah
      </p>
      <p className="mt-1 text-sm leading-6 text-slate-500">
        Tim penelaah telah ditetapkan oleh program studi dan akan mengevaluasi
        proposal SUP sesuai jadwal seminar.
      </p>
    </div>
  </div>

  <div className="mt-4 grid gap-3">
    {reviewerInfo.map((item) => (
      <div
        key={item.label}
        className="rounded-2xl bg-white/75 px-4 py-3 ring-1 ring-white"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {item.label}
        </p>
        <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
          {item.value}
        </p>
      </div>
    ))}
  </div>
</div>
        </section>
      </div>

      <section className="mt-6 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Catatan SUP
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              Informasi Penting
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Beberapa hal yang perlu diperhatikan selama proses pengajuan SUP berjalan.
            </p>
          </div>

        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {dashboardNotes.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                <Info size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary">
        <Icon size={22} />
      </div>
      <p className="mt-5 text-sm text-slate-500">{label}</p>
      <h3 className="mt-1 text-xl font-semibold text-slate-950">{value}</h3>
    </div>
  );
}

function ReviewerCard({ reviewer }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-2xl bg-blue-50 ring-1 ring-blue-100">
        <Image
          src={reviewer.photo}
          alt={reviewer.name}
          fill
          className="object-cover"
          sizes="52px"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">
          {reviewer.name}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary ring-1 ring-blue-100">
            {reviewer.role}
          </span>
          <span className="text-xs font-medium text-slate-400">
            {reviewer.expertise}
          </span>
        </div>
      </div>
    </div>
  );
}
