import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  UploadCloud,
} from "lucide-react";

const notifications = [
  {
    title: "Proposal berhasil diajukan",
    desc: "Dokumen proposal kamu sudah berhasil dikirim ke sistem dan masuk ke tahap verifikasi admin.",
    time: "10 Mei 2026, 09:20",
    status: "Selesai",
    type: "success",
    icon: FileText,
    unread: false,
  },
  {
    title: "Pengajuan sedang diverifikasi",
    desc: "Admin sedang memeriksa kelengkapan dokumen SUP kamu. Proses verifikasi membutuhkan waktu 2-3 hari kerja.",
    time: "12 Mei 2026, 14:10",
    status: "Diproses",
    type: "info",
    icon: Clock3,
    unread: true,
  },
  {
    title: "Jadwal seminar sudah ditentukan",
    desc: "Seminar proposal kamu dijadwalkan pada 20 Mei 2026 pukul 10:00 di Ruang Seminar 5340.",
    time: "14 Mei 2026, 11:30",
    status: "Terjadwal",
    type: "info",
    icon: CalendarDays,
    unread: true,
  },
  {
    title: "Upload revisi proposal",
    desc: "Unggah revisi proposal sesuai catatan reviewer sebelum deadline 25 Mei 2026 pukul 23:59.",
    time: "Deadline: 25 Mei 2026, 23:59",
    status: "Perlu Tindakan",
    type: "warning",
    icon: UploadCloud,
    unread: false,
  },
  {
    title: "Hasil akhir tersedia",
    desc: "Hasil akhir SUP sudah diumumkan dan dapat dilihat pada halaman Hasil & Feedback.",
    time: "28 Mei 2026, 15:30",
    status: "Tersedia",
    type: "success",
    icon: CheckCircle2,
    unread: false,
  },
];

function getNotificationStyle(type) {
  if (type === "success") {
    return {
      icon: "bg-green-50 text-green-600",
      badge: "bg-green-50 text-green-600",
      accent: "bg-green-500",
    };
  }

  if (type === "warning") {
    return {
      icon: "bg-amber-50 text-amber-600",
      badge: "bg-amber-50 text-amber-600",
      accent: "bg-amber-500",
    };
  }

  return {
    icon: "bg-blue-50 text-primary",
    badge: "bg-blue-50 text-primary",
    accent: "bg-primary",
  };
}

export default function StudentNotificationsPage() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-900">
          Notifikasi SUP
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
          Update status pengajuan, jadwal seminar, revisi, dan hasil akhir akan muncul di sini.
        </p>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => {
          const Icon = item.icon;
          const style = getNotificationStyle(item.type);

          return (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-3xl px-5 py-4 transition-all duration-300 ${
                item.unread
                  ? "bg-white shadow-sm ring-1 ring-blue-100"
                  : "bg-white/70 ring-1 ring-slate-200/80 hover:bg-white hover:ring-blue-100"
              }`}
            >
              {item.unread && (
                <div className={`absolute left-0 top-0 h-full w-1 ${style.accent}`} />
              )}

              <div className="flex gap-4">
                <div
                  className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${style.icon}`}
                >
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">
                          {item.title}
                        </p>

                        {item.unread && (
                          <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm shadow-blue-600/20">
                            Baru
                          </span>
                        )}
                      </div>

                      <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
                        {item.desc}
                      </p>

                      <p className="mt-2 text-xs font-medium text-slate-400">
                        {item.time}
                      </p>
                    </div>

                    <span
                      className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
