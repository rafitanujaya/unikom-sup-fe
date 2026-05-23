"use client";

import { useState } from "react";
import {
  Camera,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

function SectionHeader({ title, description }) {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight text-slate-950">{title}</h2>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder, type = "text", disabled = false }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-600">{label}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0B63CE] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
      />
    </label>
  );
}

function PasswordInput({ label, value, onChange, placeholder }) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-600">{label}</span>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 pr-12 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0B63CE] focus:ring-4 focus:ring-blue-100"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-blue-50 hover:text-[#0B63CE]"
          aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </label>
  );
}

function ProfileMeta({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-sm text-slate-500">
      <Icon size={16} className="shrink-0 text-[#0B63CE]" />
      <span className="shrink-0 text-slate-400">{label}</span>
      <span className="truncate font-medium text-slate-700">{value}</span>
    </div>
  );
}

export default function ReviewerSettingsPage() {
  const [profile, setProfile] = useState({
    name: "Dr. Tatan Tawami, M.Hum.",
    email: "tatan.tawami@unikom.ac.id",
    lecturerId: "0412047602",
    studyProgram: "Sastra Inggris",
    faculty: "Fakultas Ilmu Budaya",
    phone: "812-3456-7890",
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const passwordMatch =
    password.newPassword.length > 0 && password.newPassword === password.confirmPassword;
  const passwordReady =
    password.current.length > 0 && password.newPassword.length >= 8 && passwordMatch;

  function updateProfile(key, value) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function updatePassword(key, value) {
    setPassword((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="space-y-6 font-[Poppins]">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            Pengaturan
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 md:text-base">
            Kelola informasi profil penelaah dan keamanan akun reviewer portal.
          </p>
        </div>

        <div className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B63CE] shadow-sm ring-1 ring-blue-100">
          Reviewer Portal
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <div className="border-b border-blue-100 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative w-fit shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
                  alt={profile.name}
                  className="h-28 w-28 rounded-[2rem] object-cover ring-1 ring-blue-100"
                />
                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0B63CE] text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  aria-label="Ubah foto profil"
                >
                  <Camera size={17} />
                </button>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0B63CE] ring-1 ring-blue-100">
                    Penelaah
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                    Aktif
                  </span>
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {profile.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">Penelaah Sastra Inggris</p>

                <div className="mt-4 grid gap-2 md:grid-cols-3">
                  <ProfileMeta icon={Mail} label="Email" value={profile.email} />
                  <ProfileMeta icon={UserRound} label="NIDN" value={profile.lecturerId} />
                  <ProfileMeta icon={ShieldCheck} label="Prodi" value={profile.studyProgram} />
                </div>
              </div>
            </div>

            
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-8 xl:grid-cols-[260px_1fr] xl:items-start">
            <SectionHeader
              title="Edit Profil"
              description="Perbarui data profil yang digunakan pada reviewer portal dan informasi penugasan sidang."
            />

            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                label="Nama Lengkap"
                value={profile.name}
                onChange={(value) => updateProfile("name", value)}
                placeholder="Masukkan nama lengkap"
              />
              <TextInput
                label="Email Institusi"
                value={profile.email}
                onChange={() => {}}
                placeholder="nama@unikom.ac.id"
                type="email"
                disabled
              />
              <TextInput
                label="NIDN / ID Dosen"
                value={profile.lecturerId}
                onChange={(value) => updateProfile("lecturerId", value)}
                placeholder="Masukkan NIDN"
              />
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-600">Nomor Telepon</span>
                <div className="flex h-12 overflow-hidden rounded-2xl border border-blue-100 bg-[#F8FBFF] transition focus-within:border-[#0B63CE] focus-within:ring-4 focus-within:ring-blue-100">
                  <div className="flex items-center border-r border-blue-100 bg-white px-4 text-sm font-semibold text-[#0B63CE]">
                    +62
                  </div>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(event) => updateProfile("phone", event.target.value)}
                    placeholder="812-3456-7890"
                    className="w-full bg-transparent px-4 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>
              <TextInput
                label="Program Studi"
                value={profile.studyProgram}
                onChange={(value) => updateProfile("studyProgram", value)}
                placeholder="Masukkan program studi"
              />
              <TextInput
                label="Fakultas"
                value={profile.faculty}
                onChange={(value) => updateProfile("faculty", value)}
                placeholder="Masukkan fakultas"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-blue-100 pt-5 sm:flex-row sm:items-center sm:justify-between xl:col-start-2">
              <p className="text-sm leading-6 text-slate-500">
                Perubahan profil akan digunakan pada data penelaah dan tampilan akun Anda.
              </p>
              <button
                type="button"
                className="inline-flex min-w-[180px] items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B63CE] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <Save size={16} className="shrink-0" />
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-100 p-6">
          <div className="grid gap-8 xl:grid-cols-[260px_1fr] xl:items-start">
            <div className="flex items-start gap-4 xl:block">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0B63CE] ring-1 ring-blue-100 xl:mb-4">
                <LockKeyhole size={20} />
              </div>
              <SectionHeader
                title="Ubah Password"
                description="Bagian keamanan akun dipisahkan dari edit profil agar perubahan password lebih jelas."
              />
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <PasswordInput
                  label="Password Lama"
                  value={password.current}
                  onChange={(value) => updatePassword("current", value)}
                  placeholder="Masukkan password lama"
                />
                <PasswordInput
                  label="Password Baru"
                  value={password.newPassword}
                  onChange={(value) => updatePassword("newPassword", value)}
                  placeholder="Minimal 8 karakter"
                />
                <PasswordInput
                  label="Konfirmasi Password Baru"
                  value={password.confirmPassword}
                  onChange={(value) => updatePassword("confirmPassword", value)}
                  placeholder="Ulangi password baru"
                />
              </div>

              <div
                className={`rounded-3xl p-4 ring-1 ${
                  passwordReady
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                    : "bg-amber-50 text-amber-700 ring-amber-100"
                }`}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  <p className="text-sm leading-6">
                    {passwordReady
                      ? "Password baru sudah valid dan siap disimpan."
                      : "Password baru minimal 8 karakter dan harus sama dengan konfirmasi password."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-slate-500">
                  Setelah password diubah, gunakan password baru saat login berikutnya.
                </p>
                <button
                  type="button"
                  disabled={!passwordReady}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg transition ${
                    passwordReady
                      ? "bg-[#0B63CE] text-white shadow-blue-600/20 hover:bg-blue-700"
                      : "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none"
                  }`}
                >
                  <LockKeyhole size={16} />
                  Simpan Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
