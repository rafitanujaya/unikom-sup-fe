"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpenCheck,
  Eye,
  EyeOff,
  GraduationCap,
  IdCard,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

export default function StudentRegisterSidangSastraInggris() {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    nim: "",
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!acceptTerms) return;

    console.log("Register student Sidang Sastra Inggris", formData);
  };

  return (
    <main className="h-screen overflow-hidden bg-white text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden min-h-screen overflow-hidden bg-primary px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.22),transparent_28%),radial-gradient(circle_at_78%_72%,rgba(56,189,248,0.34),transparent_32%),linear-gradient(135deg,var(--color-primary-dark)_0%,var(--color-primary)_52%,#0B7BEF_100%)]" />

          <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-24 bottom-24 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute left-12 top-36 h-28 w-28 rotate-12 rounded-[2rem] border border-white/15" />
          <div className="absolute right-16 top-16 h-40 w-40 rounded-full border border-white/15" />
          <div className="absolute bottom-44 left-28 h-3 w-3 rounded-full bg-white/70" />
          <div className="absolute bottom-72 right-32 h-2 w-2 rounded-full bg-cyan-100" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center">
                <Image
                  src="/images/logo-unikom.png"
                  alt="Logo UNIKOM"
                  width={60}
                  height={60}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-blue-100">
                  Sidang Sastra Inggris
                </p>
                <h1 className="text-xl font-semibold tracking-tight">
                  Student Portal
                </h1>
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-medium text-blue-50 ring-1 ring-white/20 backdrop-blur-xl">
              SUP & Sidang Skripsi
            </div>

            <h2 className="max-w-xl text-6xl font-semibold leading-[1.04] tracking-[-0.04em]">
              Mulai proses sidang dari satu akun.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-blue-50/85">
              Buat akun mahasiswa untuk mengajukan SUP, mendaftar sidang
              skripsi, memantau verifikasi, melihat jadwal, dan menerima hasil
              akhir Sidang Sastra Inggris.
            </p>
          </div>

          <div className="relative z-10 mt-10 grid max-w-xl grid-cols-3 gap-4">
            <div className="group rounded-3xl bg-white/12 p-5 ring-1 ring-white/15 backdrop-blur-xl transition hover:bg-white/18">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-lg shadow-blue-950/10">
                <IdCard size={21} />
              </div>
              <p className="text-sm font-semibold">Data Mahasiswa</p>
              <p className="mt-1 text-xs leading-5 text-blue-50/70">
                Daftar dengan NIM dan email aktif.
              </p>
            </div>

            <div className="group rounded-3xl bg-white/12 p-5 ring-1 ring-white/15 backdrop-blur-xl transition hover:bg-white/18">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-lg shadow-blue-950/10">
                <BookOpenCheck size={21} />
              </div>
              <p className="text-sm font-semibold">Akses Pengajuan</p>
              <p className="mt-1 text-xs leading-5 text-blue-50/70">
                Siapkan akun untuk SUP dan sidang skripsi.
              </p>
            </div>

            <div className="group rounded-3xl bg-white/12 p-5 ring-1 ring-white/15 backdrop-blur-xl transition hover:bg-white/18">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-lg shadow-blue-950/10">
                <GraduationCap size={21} />
              </div>
              <p className="text-sm font-semibold">Pantau Proses</p>
              <p className="mt-1 text-xs leading-5 text-blue-50/70">
                Cek status, jadwal, feedback, dan hasil akhir.
              </p>
            </div>
          </div>
        </section>

        <section className="flex h-screen items-center bg-white px-6 py-10 sm:px-10 lg:px-14 xl:px-20">
          <div className="mx-auto flex min-h-[85vh] w-full max-w-125 flex-col justify-center">
            <div className="mb-12 flex items-center gap-4 lg:hidden">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-lg ring-1 ring-blue-100">
                <Image
                  src="/images/logo-unikom.png"
                  alt="Logo UNIKOM"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Sidang Sastra Inggris
                </p>
                <h1 className="text-lg font-semibold tracking-tight">
                  Student Portal
                </h1>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Register Mahasiswa
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Buat akun mahasiswa.
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500">
                Daftar untuk mengakses pengajuan SUP, pendaftaran sidang
                skripsi, jadwal, feedback, dan hasil akhir kamu.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nim"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  NIM
                </label>

                <div className="relative">
                  <IdCard
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />

                  <input
                    id="nim"
                    name="nim"
                    type="text"
                    value={formData.nim}
                    onChange={handleChange}
                    placeholder="Masukkan NIM"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Nama Lengkap
                </label>

                <div className="relative">
                  <UserRound
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama.nim@mahasiswa.unikom.ac.id"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Buat password"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-14 text-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition-all duration-300 hover:bg-primary-light hover:text-primary"
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 text-xs leading-6 text-slate-600">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(event) => setAcceptTerms(event.target.checked)}
                  className="mt-1 h-4 w-4 cursor-pointer rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span>
                  Saya menerima{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-primary underline decoration-transparent underline-offset-4 transition-all duration-300 hover:text-primary-dark hover:decoration-primary-dark"
                  >
                    syarat dan ketentuan
                  </Link>{" "}
                  serta{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-semibold text-primary underline decoration-transparent underline-offset-4 transition-all duration-300 hover:text-primary-dark hover:decoration-primary-dark"
                  >
                    kebijakan privasi
                  </Link>{" "}
                  untuk penggunaan portal Sidang Sastra Inggris.
                </span>
              </label>

              <button
                type="submit"
                disabled={!acceptTerms}
                className={`group flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 ${
                  acceptTerms
                    ? "cursor-pointer bg-primary shadow-lg shadow-blue-600/20 hover:bg-primary-dark hover:shadow-xl hover:shadow-blue-900/20"
                    : "cursor-not-allowed bg-slate-300 shadow-none"
                }`}
              >
                Daftar
              </button>

              <p className="text-sm leading-7 text-slate-500">
                Sudah punya akun?{" "}
                <Link
                  href="/login"
                  className="cursor-pointer font-semibold text-primary underline decoration-transparent underline-offset-4 transition-all duration-300 hover:text-primary-dark hover:decoration-primary-dark"
                >
                  Masuk di sini
                </Link>
              </p>
            </form>

          </div>
        </section>
      </div>
    </main>
  );
}
