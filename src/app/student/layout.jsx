"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpenCheck,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";

const student = {
  name: "Rizky Ramadhan",
  nim: "101234567",
};

const menuItems = [
  {
    label: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Pengajuan",
    href: "/student/submission",
    icon: FileText,
  },
  {
    label: "Hasil & Feedback",
    href: "/student/result",
    icon: BookOpenCheck,
  },
  {
    label: "Riwayat",
    href: "/student/history",
    icon: History,
  },
  {
    label: "Notifikasi",
    href: "/student/notifications",
    icon: Bell,
  },
  {
    label: "Pengaturan",
    href: "/student/settings",
    icon: Settings,
  },
];

function getPageTitle(pathname) {
  if (pathname.startsWith("/student/submission")) return "Pengajuan";
  if (pathname.startsWith("/student/result")) return "Hasil & Feedback";
  if (pathname.startsWith("/student/history")) return "Riwayat";
  if (pathname.startsWith("/student/notifications")) return "Notifikasi";
  if (pathname.startsWith("/student/settings")) return "Pengaturan";

  return "Dashboard";
}

export default function StudentLayout({ children }) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <main className="h-screen overflow-hidden bg-[#F8FBFF] text-slate-900">
      <div className="flex h-screen overflow-hidden">
        <aside className="hidden h-screen w-[286px] shrink-0 border-r border-blue-100 bg-white lg:flex lg:flex-col">
          <div className="flex h-28 shrink-0 items-center justify-center border-b border-blue-100 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center">
              <Image
                src="/images/logo-unikom.png"
                alt="Logo UNIKOM"
                width={62}
                height={62}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            <div className="mx-3 mt-2 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Sidang Sastra Inggris
              </p>
              <h1 className="text-base font-semibold tracking-tight text-slate-950">
                Student Portal
              </h1>
            </div>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Menu Utama
            </p>

            <div className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`group flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-blue-600/18"
                        : "text-slate-600 hover:bg-blue-50 hover:text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-white/18 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-primary"
                        }`}
                      >
                        <Icon size={18} />
                      </span>

                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="shrink-0 border-t border-blue-100 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 via-blue-50 to-slate-50 text-primary">
                  <UserRound size={21} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {student.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    NIM {student.nim}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-2xl text-slate-500 transition-all duration-300 hover:bg-red-50 hover:text-red-600"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </aside>

        <section className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4 lg:px-8">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}