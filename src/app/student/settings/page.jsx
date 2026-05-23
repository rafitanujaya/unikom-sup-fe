"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Camera,
  ChevronDown,
  Eye,
  EyeOff,
  GraduationCap,
  IdCard,
  LockKeyhole,
  Mail,
  Phone,
  Save,
  School,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const facultyProgramMap = {
  "Fakultas Teknik dan Ilmu Komputer": [
    "Teknik Informatika",
    "Sistem Komputer",
    "Teknik Komputer",
    "Teknik Industri",
    "Teknik Elektro",
    "Teknik Sipil",
    "Teknik Arsitektur",
    "Perencanaan Wilayah dan Kota",
    "Sistem Informasi",
    "Manajemen Informatika",
    "Komputerisasi Akuntansi",
    "Teknik Robotika dan Kecerdasan Buatan",
  ],
  "Fakultas Ekonomi dan Bisnis": [
    "Manajemen",
    "Akuntansi",
    "Manajemen Pemasaran",
    "Keuangan dan Perbankan",
    "Magister Manajemen",
  ],
  "Fakultas Ilmu Sosial dan Politik": [
    "Ilmu Komunikasi",
    "Hubungan Internasional",
    "Ilmu Pemerintahan",
  ],
  "Fakultas Hukum": ["Ilmu Hukum"],
  "Fakultas Desain": [
    "Desain Komunikasi Visual",
    "Desain Interior",
    "Desain Grafis",
  ],
  "Fakultas Ilmu Budaya": ["Sastra Inggris", "Sastra Jepang"],
  "Fakultas Pascasarjana": [
    "Magister Sistem Informasi",
    "Magister Manajemen",
    "Magister Ilmu Hukum",
  ],
};

const currentYear = new Date().getFullYear();
const entryYears = Array.from({ length: 18 }, (_, index) => String(currentYear - index));
const semesters = Array.from({ length: 18 }, (_, index) => String(index + 1));

const initialProfile = {
  photo: null,
  nim: "101234567",
  fullName: "Rizky Ramadhan",
  email: "rizky.101234567@mahasiswa.unikom.ac.id",
  phone: "81234567890",
  semester: "6",
  faculty: "Fakultas Ilmu Budaya",
  entryYear: "2023",
  studyProgram: "Sastra Inggris",
};

export default function StudentSettingsPage() {
  const [profileForm, setProfileForm] = useState(initialProfile);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Ubah menjadi true jika profil user sudah pernah diedit.
  const hasEditedProfile = false;

  const availableStudyPrograms = useMemo(() => {
    return facultyProgramMap[profileForm.faculty] ?? [];
  }, [profileForm.faculty]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    if (name === "faculty") {
      setProfileForm((current) => ({
        ...current,
        faculty: value,
        studyProgram: facultyProgramMap[value]?.[0] ?? "",
      }));
      return;
    }

    if (name === "phone") {
      const phoneNumber = value.replace(/\D/g, "").replace(/^0+/, "");

      setProfileForm((current) => ({
        ...current,
        phone: phoneNumber,
      }));
      return;
    }

    setProfileForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file || hasEditedProfile) return;

    setProfileForm((current) => ({
      ...current,
      photo: file,
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    if (hasEditedProfile) return;

    console.log("Update profile student", {
      ...profileForm,
      phone: `+62${profileForm.phone}`,
    });
  };

  const handleChangePassword = (event) => {
    event.preventDefault();

    console.log("Change password student", passwordForm);
  };

  const togglePassword = (field) => {
    setShowPassword((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-900">
          Pengaturan Akun
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
          Kelola profil mahasiswa dan keamanan akun SUP kamu dalam satu halaman.
        </p>
      </div>

      <section className="rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-6 border-b border-slate-100 pb-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative h-24 w-24 shrink-0">
              <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-blue-100 via-blue-50 to-white text-primary shadow-sm ring-1 ring-blue-100">
                <UserRound size={42} />
              </div>

              <label
                className={`absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-blue-600/20 ring-4 ring-white transition-all duration-300 ${
                  hasEditedProfile
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer hover:bg-primary-dark"
                }`}
                aria-label="Upload foto profil"
              >
                <Camera size={18} />
                <input
                  type="file"
                  accept="image/*"
                  disabled={hasEditedProfile}
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Profil Mahasiswa
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                {profileForm.fullName}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                NIM {profileForm.nim} · {profileForm.studyProgram}
              </p>
            </div>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
              hasEditedProfile
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {hasEditedProfile ? "Profil Sudah Dikunci" : "Profil Dapat Diedit"}
          </span>
        </div>

        <div className="mt-6 rounded-2xl bg-amber-50 px-4 py-4 ring-1 ring-amber-100">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-600">
              <AlertTriangle size={19} />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-700">
            Pastikan data profil sudah benar sebelum disimpan
            </p>
            <p className="mt-1 text-sm leading-6 text-amber-700/80">
            Data profil hanya dapat diedit satu kali melalui halaman ini. Jika terdapat kesalahan setelah disimpan, silakan laporkan ke pihak fakultas atau admin program studi untuk permintaan edit ulang. NIM dan email tidak dapat diubah, sedangkan password tetap bisa diganti kapan saja.
            </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="mt-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <ProfileInput
              id="nim"
              label="NIM"
              name="nim"
              value={profileForm.nim}
              icon={IdCard}
              disabled
              readOnlyNote="NIM tidak dapat diubah"
            />

            <ProfileInput
              id="fullName"
              label="Nama Lengkap"
              name="fullName"
              value={profileForm.fullName}
              onChange={handleProfileChange}
              disabled={hasEditedProfile}
              icon={UserRound}
            />

            <ProfileInput
              id="email"
              label="Email"
              name="email"
              type="email"
              value={profileForm.email}
              icon={Mail}
              disabled
              readOnlyNote="Email tidak dapat diubah"
            />

            <PhoneInput
              id="phone"
              label="Nomor HP"
              name="phone"
              value={profileForm.phone}
              onChange={handleProfileChange}
              disabled={hasEditedProfile}
            />

            <SelectInput
              id="semester"
              label="Semester"
              name="semester"
              value={profileForm.semester}
              onChange={handleProfileChange}
              disabled={hasEditedProfile}
              icon={GraduationCap}
              options={semesters}
            />

            <SelectInput
              id="faculty"
              label="Fakultas"
              name="faculty"
              value={profileForm.faculty}
              onChange={handleProfileChange}
              disabled={hasEditedProfile}
              icon={School}
              options={Object.keys(facultyProgramMap)}
            />

            <SelectInput
              id="entryYear"
              label="Tahun Masuk"
              name="entryYear"
              value={profileForm.entryYear}
              onChange={handleProfileChange}
              disabled={hasEditedProfile}
              icon={IdCard}
              options={entryYears}
            />

            <SelectInput
              id="studyProgram"
              label="Program Studi"
              name="studyProgram"
              value={profileForm.studyProgram}
              onChange={handleProfileChange}
              disabled={hasEditedProfile || availableStudyPrograms.length === 0}
              icon={GraduationCap}
              options={availableStudyPrograms}
            />
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={hasEditedProfile}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-fit ${
                hasEditedProfile
                  ? "cursor-not-allowed bg-slate-300 text-white"
                  : "cursor-pointer bg-primary text-white shadow-lg shadow-blue-600/20 hover:bg-primary-dark hover:shadow-xl hover:shadow-blue-900/20"
              }`}
            >
              <Save size={18} />
              Simpan Profil
            </button>
          </div>
        </form>

        <div className="my-8 border-t border-slate-100" />

        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <div>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Keamanan Akun
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              Ganti Password
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Password dapat diperbarui kapan saja dan tidak termasuk batasan edit profil satu kali.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <PasswordInput
              id="currentPassword"
              label="Password Saat Ini"
              name="currentPassword"
              value={passwordForm.currentPassword}
              show={showPassword.currentPassword}
              onChange={handlePasswordChange}
              onToggle={() => togglePassword("currentPassword")}
              placeholder="Masukkan password saat ini"
            />

            <div className="grid gap-4 lg:grid-cols-2">
              <PasswordInput
                id="newPassword"
                label="Password Baru"
                name="newPassword"
                value={passwordForm.newPassword}
                show={showPassword.newPassword}
                onChange={handlePasswordChange}
                onToggle={() => togglePassword("newPassword")}
                placeholder="Masukkan password baru"
              />

              <PasswordInput
                id="confirmPassword"
                label="Konfirmasi Password Baru"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                show={showPassword.confirmPassword}
                onChange={handlePasswordChange}
                onToggle={() => togglePassword("confirmPassword")}
                placeholder="Ulangi password baru"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-blue-900/20 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-fit"
              >
                <LockKeyhole size={18} />
                Ganti Password
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function ProfileInput({
  id,
  label,
  name,
  value,
  onChange,
  disabled,
  icon: Icon,
  type = "text",
  readOnlyNote,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
        {readOnlyNote && (
          <span className="text-xs font-medium text-slate-400">{readOnlyNote}</span>
        )}
      </div>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
        />
      </div>
    </div>
  );
}

function PhoneInput({ id, label, name, value, onChange, disabled }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative flex h-12 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-all duration-300 focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
        <div className="flex items-center gap-2 border-r border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600">
          <Phone size={18} className="text-slate-400" />
          +62
        </div>
        <input
          id={id}
          name={name}
          type="tel"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder="81234567890"
          className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
        />
      </div>
    </div>
  );
}

function SelectInput({
  id,
  label,
  name,
  value,
  onChange,
  disabled,
  icon: Icon,
  options,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-sm outline-none transition-all duration-300 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      </div>
    </div>
  );
}

function PasswordInput({
  id,
  label,
  name,
  value,
  show,
  onChange,
  onToggle,
  placeholder,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-14 text-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition-all duration-300 hover:bg-primary-light hover:text-primary"
          aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}
