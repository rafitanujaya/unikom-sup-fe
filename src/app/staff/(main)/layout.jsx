"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  CalendarDays,
  ClipboardCheck,
  FileArchive,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

const staff = {
  name: "Dwi Rahmawati",
  role: "Admin Akademik",
  type: "admin", // admin | kaprodi
};

const menuGroups = [
  {
    title: "",
    items: [
      {
        label: "Dashboard",
        href: "/staff/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Pengelolaan",
    items: [
      {
        label: "Verifikasi Pengajuan",
        href: "/staff/verification",
        icon: ClipboardCheck,
      },
      {
        label: "Jadwal Seminar",
        href: "/staff/schedules",
        icon: CalendarDays,
      },
      {
        label: "Hasil Seminar",
        href: "/staff/final-results",
        icon: ShieldCheck,
      },
    ],
  },
  {
    title: "Pemantauan",
    items: [
      {
        label: "Semua Pengajuan",
        href: "/staff/submissions",
        icon: FileText,
      },
    ],
  },
  {
    title: "Daftar Data",
    items: [
      {
        label: "Mahasiswa",
        href: "/staff/students",
        icon: UserRound,
      },
      {
        label: "Penelaah/Penguji",
        href: "/staff/reviewers",
        icon: UsersRound,
      },
    ],
  },
  {
    title: "Laporan",
    items: [
      {
        label: "Rekapitulasi",
        href: "/staff/reports",
        icon: BarChart3,
      },
      {
        label: "Arsip",
        href: "/staff/archive",
        icon: FileArchive,
      },
    ],
  },
  {
    title: "Akun",
    items: [
      {
        label: "Pengaturan",
        href: "/staff/settings",
        icon: Settings,
      },
    ],
  },
];

function getPageTitle(pathname) {
  if (pathname.startsWith("/staff/submissions")) return "Semua Pengajuan";
  if (pathname.startsWith("/staff/students")) return "Mahasiswa";
  if (pathname.startsWith("/staff/verification")) return "Verifikasi Pengajuan";
  if (pathname.startsWith("/staff/schedules")) return "Jadwal Seminar";
  if (pathname.startsWith("/staff/final-results")) return "Hasil Seminar";
  if (pathname.startsWith("/staff/reviewers")) return "Penelaah/Penguji";
  if (pathname.startsWith("/staff/reports")) return "Rekapitulasi";
  if (pathname.startsWith("/staff/archive")) return "Arsip";
  if (pathname.startsWith("/staff/notifications")) return "Notifikasi";
  if (pathname.startsWith("/staff/settings")) return "Pengaturan";

  return "Dashboard";
}

function getPageDescription(pathname) {
  if (pathname.startsWith("/staff/submissions")) {
    return "Pantau seluruh pengajuan yang sedang berjalan maupun sudah selesai.";
  }

  if (pathname.startsWith("/staff/students")) {
    return "Lihat dan kelola daftar mahasiswa Program Studi Sastra Inggris.";
  }

  if (pathname.startsWith("/staff/verification")) {
    return "Periksa pengajuan mahasiswa yang masuk sebelum dijadwalkan.";
  }

  if (pathname.startsWith("/staff/schedules")) {
    return "Atur jadwal seminar, sidang, dan penugasan penelaah.";
  }

  if (pathname.startsWith("/staff/final-results")) {
    return "Kelola hasil seminar sebelum diumumkan kepada mahasiswa.";
  }

  if (pathname.startsWith("/staff/reviewers")) {
    return "Lihat dan kelola daftar penelaah atau penguji.";
  }

  if (pathname.startsWith("/staff/reports")) {
    return "Buat rekapitulasi kegiatan berdasarkan periode akademik.";
  }

  if (pathname.startsWith("/staff/archive")) {
    return "Akses arsip pengajuan, hasil, dan laporan yang telah selesai.";
  }

  if (pathname.startsWith("/staff/settings")) {
    return "Atur profil akun dan preferensi aplikasi.";
  }

  return "Ringkasan aktivitas SUP dan sidang skripsi.";
}

function getRoleLabel(type) {
  if (type === "kaprodi") return "Kaprodi";
  return "Admin";
}

export default function StaffLayout({ children }) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const pageDescription = getPageDescription(pathname);

  return (
    <main className="h-screen overflow-hidden bg-[#F8FBFF] font-[Poppins] text-slate-900">
      <div className="flex h-screen overflow-hidden">
        <aside className="hidden h-screen w-[278px] shrink-0 border-r border-blue-100/80 bg-white lg:flex lg:flex-col">
          <div className="flex h-[88px] shrink-0 items-center border-b border-blue-100/80 px-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <Image
                src="/images/logo-unikom.png"
                alt="Logo UNIKOM"
                width={42}
                height={42}
                className="h-10 w-10 object-contain"
                priority
              />
            </div>

            <div className="ml-3 min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                Sastra Inggris
              </p>
              <h1 className="mt-0.5 truncate text-[15px] font-semibold tracking-tight text-slate-950">
                Admin Portal
              </h1>
            </div>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-4">
              {menuGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {group.title ? (
                    <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {group.title}
                    </p>
                  ) : null}

                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={`group flex items-center rounded-xl px-2.5 py-2 text-[13px] font-medium transition-all duration-300 ${
                            isActive
                              ? "bg-primary text-white shadow-md shadow-blue-600/15"
                              : "text-slate-600 hover:bg-blue-50 hover:text-primary"
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-primary"
                            }`}
                          >
                            <Icon size={17} />
                          </span>

                          <span className="ml-2.5 truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          <div className="shrink-0 border-t border-blue-100/80 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary">
                  <UserRound size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-slate-900">
                    {staff.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {staff.role}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-slate-500 transition-all duration-300 hover:bg-red-50 hover:text-red-600"
                aria-label="Logout"
              >
                <LogOut size={17} />
              </button>
            </div>
          </div>
        </aside>

        <section className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 lg:px-8">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}