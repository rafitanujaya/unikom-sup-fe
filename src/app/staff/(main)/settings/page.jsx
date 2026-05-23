"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  EyeOff,
  History,
  LockKeyhole,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";

const initialProfile = {
  fullName: "Dwi Rahmawati",
  email: "dwi.rahmawati@unikom.ac.id",
  phone: "81234567890",
  role: "Staff Koordinator",
  faculty: "Fakultas Ilmu Budaya",
  studyProgram: "Sastra Inggris",
};

const initialSystem = {
  semester: "Ganjil",
  academicYear: "2025/2026",
  dataLimit: "10",
  timezone: "Asia/Jakarta",
};

const activities = [
  {
    title: "Password diperbarui",
    description: "Keamanan akun berhasil diperbarui.",
    date: "12 Mei 2026",
  },
  {
    title: "Profil diperbarui",
    description: "Data identitas staff berhasil disimpan.",
    date: "10 Mei 2026",
  },
  {
    title: "Nomor telepon diubah",
    description: "Kontak staff berhasil diperbarui.",
    date: "08 Mei 2026",
  },
];

export default function StaffSettingsPage() {
  const [profile, setProfile] = useState(initialProfile);
  const [system, setSystem] = useState(initialSystem);
  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    newPassword: false,
    confirmPassword: false,
  });

  const hasPasswordInput =
    password.current.length > 0 ||
    password.newPassword.length > 0 ||
    password.confirmPassword.length > 0;

  const isNewPasswordTooShort =
    password.newPassword.length > 0 && password.newPassword.length < 8;

  const isPasswordMismatch =
    password.newPassword.length > 0 &&
    password.confirmPassword.length > 0 &&
    password.newPassword !== password.confirmPassword;

  const passwordReady =
    password.current.length > 0 &&
    password.newPassword.length >= 8 &&
    password.newPassword === password.confirmPassword;

  function updateProfile(key, value) {
    if (key === "phone") {
      const phoneNumber = value.replace(/\D/g, "").replace(/^0+/, "");

      setProfile((current) => ({
        ...current,
        phone: phoneNumber,
      }));

      return;
    }

    setProfile((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateSystem(key, value) {
    setSystem((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updatePassword(key, value) {
    setPassword((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function togglePassword(key) {
    setShowPassword((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function handleSaveProfile(event) {
    event.preventDefault();

    console.log("Save staff profile", {
      ...profile,
      phone: `+62${profile.phone}`,
    });
  }

  function handleSavePassword(event) {
    event.preventDefault();

    if (!passwordReady) return;

    console.log("Save password", password);
  }

  function handleSaveSystem(event) {
    event.preventDefault();

    console.log("Save system preferences", system);
  }

  return (
    <div className="mx-auto w-full max-w-5xl pb-10 font-[Poppins]">
      <div className="mb-6 pt-2">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
          Pengaturan Akun
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Kelola profil, keamanan, dan preferensi akun staff.
        </p>
      </div>

      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm shadow-blue-100/30">
        <AccountOverview profile={profile} />

        <div className="p-6">
          <form onSubmit={handleSaveProfile}>
            <SectionHeader
              title="Informasi Profil"
              description="Perbarui data identitas staff."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <TextInput
                id="fullName"
                label="Nama Lengkap"
                value={profile.fullName}
                onChange={(value) => updateProfile("fullName", value)}
                placeholder="Masukkan nama lengkap"
                icon={UserRound}
              />

              <PhoneInput
                id="phone"
                label="Nomor Telepon"
                value={profile.phone}
                onChange={(value) => updateProfile("phone", value)}
              />

              <ReadonlyInput
                label="Email Institusi"
                value={profile.email}
                icon={Mail}
              />

              <ReadonlyInput
                label="Program Studi"
                value={profile.studyProgram}
                icon={Building2}
              />

              <ReadonlyInput
                label="Fakultas"
                value={profile.faculty}
                icon={Building2}
                className="md:col-span-2"
              />
            </div>

            <ActionRow>
              <PrimaryButton type="submit" icon={Save}>
                Simpan Profil
              </PrimaryButton>
            </ActionRow>
          </form>

          <Divider />

          <form onSubmit={handleSavePassword}>
            <SectionHeader
              title="Keamanan Akun"
              description="Ganti password akun staff."
            />

            <div className="mt-5 space-y-4">
              <PasswordInput
                id="currentPassword"
                label="Password Saat Ini"
                value={password.current}
                show={showPassword.current}
                onChange={(value) => updatePassword("current", value)}
                onToggle={() => togglePassword("current")}
                placeholder="Masukkan password saat ini"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <PasswordInput
                  id="newPassword"
                  label="Password Baru"
                  value={password.newPassword}
                  show={showPassword.newPassword}
                  onChange={(value) => updatePassword("newPassword", value)}
                  onToggle={() => togglePassword("newPassword")}
                  placeholder="Minimal 8 karakter"
                />

                <PasswordInput
                  id="confirmPassword"
                  label="Konfirmasi Password"
                  value={password.confirmPassword}
                  show={showPassword.confirmPassword}
                  onChange={(value) => updatePassword("confirmPassword", value)}
                  onToggle={() => togglePassword("confirmPassword")}
                  placeholder="Ulangi password baru"
                />
              </div>

              {hasPasswordInput && (
                <div
                  className={`rounded-3xl px-4 py-4 ring-1 ${
                    passwordReady
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                      : "bg-amber-50 text-amber-700 ring-amber-100"
                  }`}
                >
                  <div className="flex gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />

                    <p className="text-sm leading-6">
                      {passwordReady
                        ? "Password baru sudah valid."
                        : isNewPasswordTooShort
                          ? "Password baru minimal 8 karakter."
                          : isPasswordMismatch
                            ? "Konfirmasi password belum sama."
                            : "Lengkapi field password untuk menyimpan perubahan."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <ActionRow>
              <PrimaryButton
                type="submit"
                icon={LockKeyhole}
                disabled={!passwordReady}
              >
                Simpan Password
              </PrimaryButton>
            </ActionRow>
          </form>

          <Divider />

          <form onSubmit={handleSaveSystem}>
            <SectionHeader
              title="Preferensi Sistem"
              description="Atur tampilan data bawaan."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <SelectInput
                id="semester"
                label="Semester Aktif"
                value={system.semester}
                onChange={(value) => updateSystem("semester", value)}
                icon={CalendarDays}
                options={["Ganjil", "Genap"]}
              />

              <SelectInput
                id="academicYear"
                label="Tahun Akademik"
                value={system.academicYear}
                onChange={(value) => updateSystem("academicYear", value)}
                icon={CalendarDays}
                options={["2025/2026", "2026/2027", "2027/2028"]}
              />

              <SelectInput
                id="dataLimit"
                label="Data Per Halaman"
                value={system.dataLimit}
                onChange={(value) => updateSystem("dataLimit", value)}
                icon={SlidersHorizontal}
                options={["10", "25", "50"]}
              />

              <SelectInput
                id="timezone"
                label="Zona Waktu"
                value={system.timezone}
                onChange={(value) => updateSystem("timezone", value)}
                icon={Clock}
                options={["Asia/Jakarta", "Asia/Makassar", "Asia/Jayapura"]}
              />
            </div>

            <ActionRow>
              <PrimaryButton type="submit" icon={Save}>
                Simpan Preferensi
              </PrimaryButton>
            </ActionRow>
          </form>

          <Divider />

          <div>
            <SectionHeader
              title="Riwayat Perubahan"
              description="Aktivitas terbaru pada akun."
            />

            <div className="mt-5 divide-y divide-blue-100">
              {activities.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                      <History size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {item.title}
                      </p>

                      <p className="mt-1 text-sm leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 text-sm font-medium text-slate-400 sm:text-right">
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AccountOverview({ profile }) {
  return (
    <div className="border-b border-blue-100 p-6">
      <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative w-fit shrink-0">
          <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-blue-100 via-blue-50 to-white text-primary shadow-sm ring-1 ring-blue-100">
            <UserRound size={44} />
          </div>

          <label
            className="absolute -bottom-2 -right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-blue-600/20 ring-4 ring-white transition-all duration-300 hover:bg-primary-dark"
            aria-label="Upload foto profil"
          >
            <Camera size={18} />
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        <div className="min-w-0 flex-1">

          <h2 className="mt-3 truncate text-2xl font-semibold tracking-tight text-slate-950">
            {profile.fullName}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Staff pengelola SUP dan Sidang Skripsi
          </p>

          <div className="mt-4 grid min-w-0 gap-x-5 gap-y-2 md:grid-cols-2 xl:grid-cols-3">
            <ProfileMeta icon={Mail} label="Email" value={profile.email} />
            <ProfileMeta icon={BadgeCheck} label="Role" value={profile.role} />
            <ProfileMeta
              icon={Building2}
              label="Prodi"
              value={profile.studyProgram}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, description }) {
  return (
    <div>
      <h3 className="text-lg font-semibold tracking-tight text-slate-950">
        {title}
      </h3>

      <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function Badge({ children, icon: Icon, variant = "primary" }) {
  const styles = {
    primary: "bg-blue-50 text-primary ring-blue-100",
    success: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${styles[variant]}`}
    >
      {Icon && <Icon size={14} />}
      {children}
    </span>
  );
}

function ProfileMeta({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-sm text-slate-500">
      <Icon size={16} className="shrink-0 text-primary" />

      <span className="shrink-0 text-slate-400">{label}</span>

      <span className="min-w-0 truncate font-medium text-slate-700">
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="my-8 border-t border-blue-100" />;
}

function ActionRow({ children }) {
  return <div className="mt-5 flex justify-end">{children}</div>;
}

function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-600">
        {label}
      </span>

      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={19}
          />
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`h-12 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100 ${
            Icon ? "pl-12" : ""
          }`}
        />
      </div>
    </label>
  );
}

function ReadonlyInput({ label, value, icon: Icon, className = "" }) {
  return (
    <div className={className}>
      <span className="mb-1.5 block text-sm font-medium text-slate-600">
        {label}
      </span>

      <div className="flex h-12 items-center gap-3 rounded-2xl border border-blue-100 bg-slate-50 px-4 text-sm font-medium text-slate-500">
        {Icon && <Icon size={19} className="shrink-0 text-primary" />}

        <span className="min-w-0 truncate">{value}</span>
      </div>
    </div>
  );
}

function PhoneInput({ id, label, value, onChange }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-600">
        {label}
      </span>

      <div className="flex h-12 overflow-hidden rounded-2xl border border-blue-100 bg-[#F8FBFF] transition focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
        <div className="flex items-center gap-2 border-r border-blue-100 bg-white px-4 text-sm font-semibold text-primary">
          <Phone size={18} className="text-primary" />
          +62
        </div>

        <input
          id={id}
          type="tel"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="81234567890"
          className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>
    </label>
  );
}

function SelectInput({ id, label, value, onChange, icon: Icon, options }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-600">
        {label}
      </span>

      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={19}
          />
        )}

        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`h-12 w-full appearance-none rounded-2xl border border-blue-100 bg-[#F8FBFF] px-4 pr-12 text-sm font-medium text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100 ${
            Icon ? "pl-12" : ""
          }`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
      </div>
    </label>
  );
}

function PasswordInput({
  id,
  label,
  value,
  show,
  onChange,
  onToggle,
  placeholder,
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-600">
        {label}
      </span>

      <div className="relative">
        <LockKeyhole
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={19}
        />

        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-2xl border border-blue-100 bg-[#F8FBFF] pl-12 pr-14 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-blue-50 hover:text-primary"
          aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
        >
          {show ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </label>
  );
}

function PrimaryButton({
  children,
  icon: Icon,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-fit ${
        disabled
          ? "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none"
          : "cursor-pointer bg-primary text-white shadow-lg shadow-blue-600/20 hover:bg-primary-dark hover:shadow-xl hover:shadow-blue-900/20"
      }`}
    >
      {Icon && <Icon size={17} />}
      {children}
    </button>
  );
}