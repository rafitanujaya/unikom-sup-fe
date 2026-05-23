"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bell,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  FileText,
  Filter,
  MessageSquareText,
  XCircle,
} from "lucide-react";

const notificationFilters = [
  { label: "Semua", value: "all" },
  { label: "Belum Dibaca", value: "unread" },
  { label: "Jadwal", value: "schedule" },
  { label: "Dokumen", value: "document" },
  { label: "Penilaian", value: "evaluation" },
  { label: "Sistem", value: "system" },
];

const notifications = [
  {
    id: "NTF-001",
    category: "schedule",
    title: "Pengajuan jadwal baru perlu dikonfirmasi",
    message:
      "Anda ditunjuk sebagai Penelaah 1 untuk Sidang Skripsi Dimas Pradipta. Silakan tinjau jadwal sebelum masuk ke Daftar Sidang.",
    time: "Hari ini, 09.15",
    unread: true,
    priority: "high",
    actionLabel: "Konfirmasi Jadwal",
    href: "/reviewer/confirmations",
    meta: "SKR-2026-008",
  },
  {
    id: "NTF-002",
    category: "evaluation",
    title: "Feedback final wajib diisi",
    message:
      "Sidang Nadia Larasati sudah selesai. Nilai dan feedback final Anda belum dikirim.",
    time: "Hari ini, 11.42",
    unread: true,
    priority: "urgent",
    actionLabel: "Isi Nilai & Feedback",
    href: "/reviewer/evaluations/SKR-2026-003",
    meta: "SKR-2026-003",
  },
  {
    id: "NTF-003",
    category: "document",
    title: "Draft skripsi tersedia untuk direview",
    message:
      "Dokumen Sidang Skripsi Maya Anindya sudah tersedia. Anda dapat membaca draft sebelum jadwal sidang dimulai.",
    time: "Kemarin, 16.30",
    unread: false,
    priority: "normal",
    actionLabel: "Buka Dokumen",
    href: "/reviewer/documents/SKR-2026-006",
    meta: "SKR-2026-006",
  },
  {
    id: "NTF-004",
    category: "schedule",
    title: "Jadwal sidang sudah ditetapkan",
    message:
      "Semua penelaah sudah menyetujui jadwal SUP Raka Wiratama. Jadwal sudah masuk ke Daftar Sidang.",
    time: "Kemarin, 10.05",
    unread: false,
    priority: "normal",
    actionLabel: "Lihat Daftar Sidang",
    href: "/reviewer/sessions",
    meta: "SUP-2026-002",
  },
  {
    id: "NTF-005",
    category: "schedule",
    title: "Pengajuan jadwal ditolak salah satu penelaah",
    message:
      "Jadwal SUP Salsa Nabila perlu dijadwalkan ulang karena terdapat penelaah yang tidak tersedia.",
    time: "12 Mei 2026, 14.20",
    unread: false,
    priority: "warning",
    actionLabel: "Lihat Detail",
    href: "/reviewer/confirmations",
    meta: "SUP-2026-011",
  },
  {
    id: "NTF-006",
    category: "system",
    title: "Google Calendar berhasil disinkronkan",
    message:
      "Agenda sidang yang sudah dikonfirmasi akan muncul pada kalender dosen sesuai jadwal yang ditetapkan.",
    time: "12 Mei 2026, 09.00",
    unread: false,
    priority: "normal",
    actionLabel: "Lihat Kalender",
    href: "/reviewer/dashboard",
    meta: "Integrasi Kalender",
  },
];

function categoryConfig(category) {
  const configs = {
    schedule: {
      label: "Jadwal",
      icon: CalendarCheck,
      className: "bg-blue-50 text-[#0B63CE] ring-blue-100",
    },
    document: {
      label: "Dokumen",
      icon: FileText,
      className: "bg-sky-50 text-sky-700 ring-sky-100",
    },
    evaluation: {
      label: "Penilaian",
      icon: MessageSquareText,
      className: "bg-red-50 text-red-600 ring-red-100",
    },
    system: {
      label: "Sistem",
      icon: Bell,
      className: "bg-slate-100 text-slate-600 ring-slate-200",
    },
  };

  return configs[category] || configs.system;
}

function priorityClass(priority) {
  const classes = {
    urgent: "border-red-200 bg-red-50/40",
    high: "border-amber-200 bg-amber-50/35",
    warning: "border-amber-200 bg-amber-50/35",
    normal: "border-blue-100 bg-white",
  };

  return classes[priority] || classes.normal;
}

function NotificationCard({ item }) {
  const config = categoryConfig(item.category);
  const Icon = config.icon;

  return (
    <article
      className={`rounded-[1.75rem] border p-5 shadow-sm shadow-blue-100/20 transition hover:border-blue-200 hover:shadow-md hover:shadow-blue-100/40 ${priorityClass(
        item.priority
      )}`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${config.className}`}
          >
            <Icon size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${config.className}`}
              >
                {config.label}
              </span>
              {item.unread && (
                <span className="rounded-full bg-[#0B63CE] px-3 py-1 text-xs font-semibold text-white">
                  Baru
                </span>
              )}
              {item.priority === "urgent" && (
                <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                  Wajib Ditindaklanjuti
                </span>
              )}
            </div>

            <h3 className="mt-3 text-base font-semibold tracking-tight text-slate-950 md:text-lg">
              {item.title}
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              {item.message}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                {item.meta}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                <Clock3 size={14} />
                {item.time}
              </span>
            </div>
          </div>
        </div>

        <Link
          href={item.href}
          className={`inline-flex shrink-0 items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
            item.priority === "urgent"
              ? "bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
              : "bg-[#0B63CE] text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
          }`}
        >
          {item.actionLabel}
        </Link>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center rounded-[2rem] border border-dashed border-blue-200 bg-white p-10 text-center shadow-sm shadow-blue-100/20">
      <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-blue-50 text-[#0B63CE] ring-1 ring-blue-100">
        <CheckCircle2 size={34} />
      </div>
      <p className="mt-6 text-lg font-semibold text-slate-950">
        Tidak ada notifikasi yang sesuai
      </p>
      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
        Coba ubah filter atau kata kunci pencarian untuk melihat informasi lainnya.
      </p>
    </div>
  );
}

export default function ReviewerNotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredNotifications = useMemo(() => {
    return notifications
      .filter((item) => {
        return (
          activeFilter === "all" ||
          (activeFilter === "unread" && item.unread) ||
          item.category === activeFilter
        );
      })
      .slice(0, 10);
  }, [activeFilter]);

  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <div className="space-y-6 font-[Poppins]">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            Notifikasi
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 md:text-base">
            Informasi terbaru terkait jadwal, dokumen, penilaian, dan pembaruan sistem untuk penelaah.
          </p>
        </div>

        <div className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B63CE] shadow-sm ring-1 ring-blue-100">
          {unreadCount} belum dibaca
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-5">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                Informasi Terbaru
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Menampilkan maksimal 10 informasi terbaru untuk penelaah.
              </p>
            </div>

            <div className="flex max-w-full overflow-x-auto rounded-[1.35rem] border border-blue-100 bg-white p-1.5 shadow-sm shadow-blue-100/30 [scrollbar-width:none]">
              {notificationFilters.map((filter) => {
                const isActive = activeFilter === filter.value;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setActiveFilter(filter.value)}
                    className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-[#0B63CE] text-white shadow-lg shadow-blue-600/20"
                        : "text-slate-500 hover:bg-blue-50 hover:text-[#0B63CE]"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="min-h-[560px] bg-[#F8FBFF] p-4">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-3">
              {filteredNotifications.map((item) => (
                <NotificationCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[520px] items-center justify-center">
              <EmptyState />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
