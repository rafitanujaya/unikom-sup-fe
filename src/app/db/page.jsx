"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpenCheck,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

export default function StudentLoginSidangSastraInggris() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const cachedEmail = localStorage.getItem(
      "sidang_sastra_inggris_student_email"
    );

    if (cachedEmail) {
      setEmail(cachedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (rememberMe) {
      localStorage.setItem("sidang_sastra_inggris_student_email", email);
    } else {
      localStorage.removeItem("sidang_sastra_inggris_student_email");
    }

    console.log("Login student Sidang Sastra Inggris", { email, password });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
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
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-100">
                  Sidang Sastra Inggris
                </p>
                <h1 className="text-xl font-semibold tracking-tight">
                  Student Portal
                </h1>
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-medium text-blue-50 ring-1 ring-white/20 backdrop-blur-xl">
              SUP & Sidang Skripsi
            </div>

            <h2 className="max-w-xl text-6xl font-semibold leading-[1.04] tracking-[-0.04em]">
              Kelola SUP dan Sidang Skripsi dengan lebih mudah.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-blue-50/85">
              Satu portal untuk pengajuan SUP, pendaftaran sidang skripsi,
              pemantauan jadwal, feedback penelaah, dan hasil akhir mahasiswa
              Sastra Inggris.
            </p>
          </div>

          <div className="relative z-10 mt-10 grid max-w-xl grid-cols-3 gap-4">
            <div className="group rounded-3xl bg-white/12 p-5 ring-1 ring-white/15 backdrop-blur-xl transition hover:bg-white/18">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-lg shadow-blue-950/10">
                <BookOpenCheck size={21} />
              </div>
              <p className="text-sm font-semibold">Pengajuan Sidang</p>
              <p className="mt-1 text-xs leading-5 text-blue-50/70">
                Ajukan SUP atau sidang skripsi secara online.
              </p>
            </div>

            <div className="group rounded-3xl bg-white/12 p-5 ring-1 ring-white/15 backdrop-blur-xl transition hover:bg-white/18">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-lg shadow-blue-950/10">
                <GraduationCap size={21} />
              </div>
              <p className="text-sm font-semibold">Pantau Proses</p>
              <p className="mt-1 text-xs leading-5 text-blue-50/70">
                Cek status verifikasi, jadwal, dan tahapan sidang.
              </p>
            </div>

            <div className="group rounded-3xl bg-white/12 p-5 ring-1 ring-white/15 backdrop-blur-xl transition hover:bg-white/18">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-lg shadow-blue-950/10">
                <UserRound size={21} />
              </div>
              <p className="text-sm font-semibold">Hasil & Feedback</p>
              <p className="mt-1 text-xs leading-5 text-blue-50/70">
                Lihat catatan penelaah dan keputusan akhir.
              </p>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center bg-white px-6 py-10 sm:px-10 lg:px-14 xl:px-20">
          <div className="mx-auto w-full max-w-[500px]">
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

            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Login Mahasiswa
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Selamat datang kembali.
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
                Masuk untuk memantau pengajuan, jadwal sidang, feedback, dan
                hasil akhir kamu.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="nama.nim@mahasiswa.unikom.ac.id"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
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
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Masukkan password"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-14 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition hover:bg-primary-light hover:text-primary"
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

              <div className="flex items-center justify-between gap-4">
                <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  Ingat saya
                </label>

                <Link
                  href="/forgot-password"
                  className="cursor-pointer text-sm font-semibold text-primary underline decoration-transparent underline-offset-4 transition-all duration-300 hover:text-primary-dark hover:decoration-primary-dark"
                >
                  Lupa password?
                </Link>
              </div>

              <button
                type="submit"
                className="group flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-blue-900/20 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Masuk
              </button>

              <p className="pb-10 text-sm leading-7 text-slate-500">
                Belum punya akun?{" "}
                <Link
                  href="/register"
                  className="cursor-pointer font-semibold text-primary underline decoration-transparent underline-offset-4 transition-all duration-300 hover:text-primary-dark hover:decoration-primary-dark"
                >
                  Daftar terlebih dahulu
                </Link>
              </p>
            </form>

            <p className="text-xs leading-6 text-slate-400">
              © 2026{" "}
              <span className="font-medium text-slate-500">
                Sidang Sastra Inggris
              </span>{" "}
              · Portal mahasiswa untuk pengajuan SUP, sidang skripsi, dan
              pemantauan hasil akhir.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
