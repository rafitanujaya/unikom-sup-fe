"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarCheck,
  CalendarDays,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRoundCheck,
} from "lucide-react";

const reviewer = {
  name: "Dr. Tatan Tawami, M.Hum.",
  role: "Ketua Penelaah",
  nidn: "0412087601",
};

const menuItems = [
  {
    label: "Dashboard",
    href: "/reviewer/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Konfirmasi Jadwal",
    href: "/reviewer/confirmations",
    icon: CalendarCheck,
  },
  {
    label: "Daftar Sidang",
    href: "/reviewer/sessions",
    icon: CalendarDays,
  },
  {
    label: "Penilaian & Feedback",
    href: "/reviewer/evaluations",
    icon: ClipboardCheck,
  },
  {
    label: "Notifikasi",
    href: "/reviewer/notifications",
    icon: Bell,
  },
  {
    label: "Pengaturan",
    href: "/reviewer/settings",
    icon: Settings,
  },
];

function getPageTitle(pathname) {
  if (pathname.startsWith("/reviewer/confirmations")) return "Konfirmasi Jadwal";
  if (pathname.startsWith("/reviewer/sessions")) return "Daftar Sidang";
  if (pathname.startsWith("/reviewer/documents")) return "Review Dokumen";
  if (pathname.startsWith("/reviewer/evaluations")) return "Penilaian & Feedback";
  if (pathname.startsWith("/reviewer/notifications")) return "Notifikasi";
  if (pathname.startsWith("/reviewer/settings")) return "Pengaturan";

  return "Dashboard";
}

function SidebarBrand() {
  return (
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
                Reviewer Portal
              </h1>
            </div>
          </div>
  );
}

function ReviewerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[292px] shrink-0 border-r border-blue-100 bg-white lg:flex lg:flex-col">
      <SidebarBrand />

      <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Menu Penelaah
        </p>

        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#0B63CE] text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-600 hover:bg-blue-50 hover:text-[#0B63CE]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-[#0B63CE]"
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
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 via-blue-50 to-slate-50 text-[#0B63CE]">
              <UserRoundCheck size={21} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{reviewer.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">NIDN {reviewer.nidn}</p>
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
  );
}

function PageHeader({ title }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#0B63CE]">
          Sidang Sastra Inggris
        </p>
        <h2 className="mt-1 truncate text-2xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
      </div>

      <button className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-white text-slate-600 shadow-sm transition hover:bg-blue-50 hover:text-[#0B63CE]">
        <Bell size={19} />
        <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
      </button>
    </div>
  );
}

export default function ReviewerLayout({ children }) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <main className="h-screen overflow-hidden bg-[#F8FBFF] font-[Poppins] text-slate-900">
      <div className="flex h-screen overflow-hidden">
        <ReviewerSidebar />

        <section className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 lg:px-8">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
