"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  GraduationCap,
  Info,
  Save,
  UploadCloud,
  UserRound,
  X,
} from "lucide-react";

const researchFields = [
  "Linguistics",
  "Literature",
  "Translation Studies",
  "Cultural Studies",
  "English Language Teaching",
  "Discourse Analysis",
  "Other",
];

const lecturers = [
  "Dr. Nia Kurniasih, M.Hum.",
  "Dr. Tatan Tawami, M.Hum.",
  "Dr. Sri Wiyanti, M.Hum.",
  "Rahma Widyana, M.Hum.",
  "Dian Puspita, M.Hum.",
  "Andi Suhendi, M.Hum.",
];

const documentRequirements = [
  "Proposal dalam format PDF.",
  "Dokumen sudah disetujui atau diketahui oleh dosen pembimbing.",
  "Pastikan nama file jelas dan tidak menggunakan karakter khusus.",
];

const emptyForm = {
  thesisTitle: "",
  researchField: "",
  supervisorName: "",
  abstract: "",
  requestedExaminers: ["", "", ""],
  examinerRequestNote: "",
};

const initialSubmission = {
  id: null,
  status: "none", // none | pending_verification | revision_required | verified | rejected
  submittedAt: null,
  updatedAt: null,
  staffNote: "",
};

export default function StudentSubmissionPage() {
  const [submission, setSubmission] = useState(initialSubmission);
  const [formData, setFormData] = useState(emptyForm);
  const [proposalFile, setProposalFile] = useState(null);
  const [agree, setAgree] = useState(false);

  const isEmptySubmission = submission.status === "none";
  const isWaitingVerification = submission.status === "pending_verification";
  const isRevisionRequired = submission.status === "revision_required";
  const isVerified = submission.status === "verified";
  const isRejected = submission.status === "rejected";

  const shouldShowForm = isEmptySubmission || isRevisionRequired || isRejected;
  const canResubmit = isRevisionRequired;
  const isNewSubmission = isEmptySubmission || isRejected;

  const isFormValid = useMemo(() => {
    return (
      formData.thesisTitle.trim() !== "" &&
      formData.supervisorName.trim() !== "" &&
      formData.abstract.trim() !== "" &&
      proposalFile !== null &&
      agree
    );
  }, [
    formData.thesisTitle,
    formData.supervisorName,
    formData.abstract,
    proposalFile,
    agree,
  ]);

  const getAvailableLecturers = (currentIndex) => {
    const selectedLecturers = formData.requestedExaminers.filter(
      (lecturer, index) => lecturer !== "" && index !== currentIndex
    );

    return lecturers.filter((lecturer) => !selectedLecturers.includes(lecturer));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleExaminerChange = (index, value) => {
    setFormData((current) => {
      const nextRequestedExaminers = [...current.requestedExaminers];
      nextRequestedExaminers[index] = value;

      return {
        ...current,
        requestedExaminers: nextRequestedExaminers,
      };
    });
  };

  const clearExaminer = (index) => {
    handleExaminerChange(index, "");
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProposalFile(file);
  };

  const resetFormState = () => {
    setAgree(false);
    setProposalFile(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    const now = new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    if (canResubmit) {
      const payload = {
        submissionId: submission.id,
        ...formData,
        requestedExaminers: formData.requestedExaminers.filter(Boolean),
        proposalFile,
      };

      console.log("Resubmit existing SUP submission", payload);

      setSubmission((current) => ({
        ...current,
        status: "pending_verification",
        updatedAt: now,
        staffNote: "",
      }));
      resetFormState();
      return;
    }

    const submissionId = `SUB-SUP-${new Date().getFullYear()}-0003`;
    const payload = {
      submissionId,
      ...formData,
      requestedExaminers: formData.requestedExaminers.filter(Boolean),
      proposalFile,
    };

    console.log("Create new SUP submission", payload);

    setSubmission({
      id: submissionId,
      status: "pending_verification",
      submittedAt: now,
      updatedAt: now,
      staffNote: "",
    });
    resetFormState();
  };

  // Demo action untuk simulasi respons staff. Hapus bagian ini saat sudah pakai backend.
  const simulateRevisionRequired = () => {
    setSubmission((current) => ({
      ...current,
      status: "revision_required",
      updatedAt: new Date().toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      staffNote:
        "Dokumen proposal yang diunggah belum sesuai format. Mohon unggah ulang file proposal final dalam format PDF dan pastikan halaman pengesahan sudah lengkap.",
    }));
    resetFormState();
  };

  const simulateVerified = () => {
    setSubmission((current) => ({
      ...current,
      status: "verified",
      updatedAt: new Date().toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      staffNote:
        "Pengajuan telah diverifikasi. Silakan menunggu informasi jadwal seminar dari admin program studi.",
    }));
    resetFormState();
  };

  const simulateRejected = () => {
    setSubmission({
      id: null,
      status: "rejected",
      submittedAt: null,
      updatedAt: new Date().toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      staffNote:
        "Pengajuan sebelumnya ditolak secara administratif. Silakan buat pengajuan baru sesuai ketentuan yang berlaku.",
    });
    setFormData(emptyForm);
    resetFormState();
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-900">
            Pengajuan SUP
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
            Ajukan Seminar Usulan Proposal dengan mengisi data proposal dan mengunggah dokumen yang diperlukan.
          </p>
        </div>

        <SubmissionBadge status={submission.status} />
      </div>

      {isEmptySubmission && (
        <StatusNotice
          type="info"
          title="Belum ada pengajuan aktif"
          desc="Silakan lengkapi form pengajuan SUP. Setelah dikirim, pengajuan akan masuk ke tahap verifikasi admin."
        />
      )}

      {isRevisionRequired && (
        <StatusNotice
          type="warning"
          title="Pengajuan perlu diperbaiki"
          desc={`Pengajuan ${submission.id} membutuhkan perbaikan. Kirim ulang dokumen melalui form ini tanpa membuat submission baru.`}
          note={submission.staffNote}
        />
      )}

      {isRejected && (
        <StatusNotice
          type="warning"
          title="Pengajuan sebelumnya ditolak"
          desc="Kamu dapat membuat pengajuan SUP baru dengan mengisi kembali form di bawah ini."
          note={submission.staffNote}
        />
      )}

      {shouldShowForm ? (
        <SubmissionFormView
          formData={formData}
          proposalFile={proposalFile}
          agree={agree}
          isFormValid={isFormValid}
          isNewSubmission={isNewSubmission}
          canResubmit={canResubmit}
          onChange={handleChange}
          onExaminerChange={handleExaminerChange}
          onClearExaminer={clearExaminer}
          onFileChange={handleFileChange}
          onAgreeChange={setAgree}
          onSubmit={handleSubmit}
          getAvailableLecturers={getAvailableLecturers}
        />
      ) : (
        <SubmissionStatusView
          submission={submission}
          isWaitingVerification={isWaitingVerification}
          isVerified={isVerified}
          onSimulateRevisionRequired={simulateRevisionRequired}
          onSimulateVerified={simulateVerified}
          onSimulateRejected={simulateRejected}
        />
      )}
    </>
  );
}

function SubmissionFormView({
  formData,
  proposalFile,
  agree,
  isFormValid,
  isNewSubmission,
  canResubmit,
  onChange,
  onExaminerChange,
  onClearExaminer,
  onFileChange,
  onAgreeChange,
  onSubmit,
  getAvailableLecturers,
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <section className="rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="border-b border-slate-100 pb-6">

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Data Proposal
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            {canResubmit ? "Kirim Ulang Pengajuan" : "Detail Pengajuan"}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {canResubmit
              ? "Perbarui dokumen atau data yang diminta staff, lalu kirim ulang menggunakan submission yang sama."
              : "Pastikan data yang dimasukkan sudah sesuai sebelum proposal dikirim untuk proses verifikasi admin."}
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="thesisTitle" className="mb-2 block text-sm font-medium text-slate-700">
              Judul Proposal <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <BookOpenCheck className="pointer-events-none absolute left-4 top-4 text-slate-400" size={20} />
              <textarea
                id="thesisTitle"
                name="thesisTitle"
                value={formData.thesisTitle}
                onChange={onChange}
                rows={3}
                placeholder="Masukkan judul proposal"
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <SelectInput
              id="researchField"
              label="Bidang Penelitian"
              name="researchField"
              value={formData.researchField}
              onChange={onChange}
              options={researchFields}
              placeholder="Pilih bidang penelitian"
            />

            <TextInput
              id="supervisorName"
              label="Dosen Pembimbing"
              name="supervisorName"
              value={formData.supervisorName}
              onChange={onChange}
              placeholder="Masukkan nama dosen pembimbing"
              icon={GraduationCap}
              required
            />
          </div>

          <div>
            <label htmlFor="abstract" className="mb-2 block text-sm font-medium text-slate-700">
              Ringkasan Proposal <span className="text-red-500">*</span>
            </label>
            <textarea
              id="abstract"
              name="abstract"
              value={formData.abstract}
              onChange={onChange}
              rows={5}
              placeholder="Tuliskan ringkasan singkat proposal"
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="rounded-[28px] bg-slate-50 p-5 ring-1 ring-slate-100">
            <div className="mb-5 flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Rekomendasi Penguji
                </p>
                <h4 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
                  Request Dosen Penguji
                </h4>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Bagian ini opsional. Kamu dapat merekomendasikan maksimal 3 dosen penguji. Dosen yang sudah dipilih tidak dapat dipilih ulang di slot lain.
                </p>
              </div>

              <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                Opsional
              </span>
            </div>

            <div className="space-y-4">
              {formData.requestedExaminers.map((value, index) => (
                <ExaminerSelectInput
                  key={`requestedExaminer-${index + 1}`}
                  id={`requestedExaminer-${index + 1}`}
                  label={`Dosen Penguji ${index + 1}`}
                  value={value}
                  onChange={(event) => onExaminerChange(index, event.target.value)}
                  onClear={() => onClearExaminer(index)}
                  options={getAvailableLecturers(index)}
                  placeholder="Tidak memilih"
                />
              ))}
            </div>

            <div className="mt-4">
              <label
                htmlFor="examinerRequestNote"
                className="mb-2 flex items-center justify-between gap-3 text-sm font-medium text-slate-700"
              >
                <span>Catatan Request</span>
                <span className="text-xs font-medium text-slate-400">Opsional</span>
              </label>

              <textarea
                id="examinerRequestNote"
                name="examinerRequestNote"
                value={formData.examinerRequestNote}
                onChange={onChange}
                rows={3}
                placeholder="Tuliskan alasan atau catatan singkat terkait request dosen penguji"
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Dokumen Proposal <span className="text-red-500">*</span>
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-blue-200 bg-blue-50/50 px-6 py-8 text-center transition-all duration-300 hover:border-primary hover:bg-blue-50">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm ring-1 ring-blue-100">
                <UploadCloud size={24} />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-900">
                {proposalFile
                  ? proposalFile.name
                  : canResubmit
                  ? "Upload ulang dokumen proposal"
                  : "Upload dokumen proposal"}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Format PDF, maksimal 10 MB.
              </p>

              <input
                type="file"
                accept="application/pdf"
                onChange={onFileChange}
                className="hidden"
              />
            </label>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600 ring-1 ring-slate-200 transition-all duration-300 hover:bg-white hover:ring-blue-100">
            <input
              type="checkbox"
              checked={agree}
              onChange={(event) => onAgreeChange(event.target.checked)}
              className="mt-1 h-4 w-4 cursor-pointer rounded border-slate-300 text-primary focus:ring-primary"
            />
            <span>
              Saya menyatakan data dan dokumen yang dikirim sudah benar dan siap diproses untuk verifikasi SUP. <span className="text-red-500">*</span>
            </span>
          </label>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-6 text-slate-400">
              Field bertanda <span className="text-red-500">*</span> wajib diisi sebelum pengajuan dikirim.
            </p>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-fit ${
                isFormValid
                  ? "cursor-pointer bg-primary text-white shadow-lg shadow-blue-600/20 hover:bg-primary-dark hover:shadow-xl hover:shadow-blue-900/20"
                  : "cursor-not-allowed bg-slate-300 text-white shadow-none"
              }`}
            >
              <Save size={18} />
              {canResubmit ? "Kirim Ulang Pengajuan" : "Kirim Pengajuan"}
            </button>
          </div>
        </form>
      </section>

      <aside className="space-y-6">
        <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Ketentuan Dokumen
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            Sebelum Mengirim
          </h3>

          <div className="mt-5 space-y-3">
            {documentRequirements.map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-6 text-slate-500">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-amber-50 p-6 ring-1 ring-amber-100">

          <h3 className="mt-4 text-xl font-semibold tracking-tight text-amber-700">
            Perhatikan
          </h3>
          <p className="mt-2 text-sm leading-7 text-amber-700/80">
            Setelah pengajuan dikirim, admin akan melakukan verifikasi kelengkapan dokumen. Proses verifikasi umumnya membutuhkan waktu 2-3 hari kerja.
          </p>
        </div>
      </aside>
    </div>
  );
}

function SubmissionStatusView({
  submission,
  isWaitingVerification,
  isVerified,
  onSimulateRevisionRequired,
  onSimulateVerified,
  onSimulateRejected,
}) {
  const isSuccess = isVerified;
  const Icon = isSuccess ? CheckCircle2 : Clock3;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <section className="rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
            isSuccess ? "bg-green-50 text-green-600" : "bg-blue-50 text-primary"
          }`}
        >
          <Icon size={26} />
        </div>

        <p
          className={`mt-6 text-sm font-semibold uppercase tracking-[0.18em] ${
            isSuccess ? "text-green-600" : "text-primary"
          }`}
        >
          {isSuccess ? "Terverifikasi" : "Menunggu Verifikasi"}
        </p>

        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
          {isSuccess
            ? "Pengajuan kamu sudah diverifikasi."
            : "Pengajuan kamu sedang diproses admin."}
        </h3>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          {isSuccess
            ? "Pengajuan SUP sudah diterima dan diverifikasi oleh staff. Selanjutnya kamu tinggal menunggu informasi jadwal seminar dari admin program studi."
            : "Pengajuan SUP sudah berhasil dikirim dan sedang menunggu verifikasi administrasi. Kamu belum bisa membuat pengajuan baru sampai proses ini selesai."}
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem label="ID Pengajuan" value={submission.id} />
            <InfoItem label="Dikirim Pada" value={submission.submittedAt} />
            <InfoItem label="Update Terakhir" value={submission.updatedAt} />
            <InfoItem
              label="Status"
              value={isSuccess ? "Terverifikasi / ACC" : "Menunggu Verifikasi"}
            />
          </div>
        </div>

        {submission.staffNote && (
          <div className="mt-5 rounded-2xl bg-blue-50 px-4 py-4 text-sm leading-6 text-slate-600 ring-1 ring-blue-100">
            <span className="font-semibold text-primary">Catatan staff:</span>{" "}
            {submission.staffNote}
          </div>
        )}
      </section>

      <aside className="space-y-6">
        <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Informasi
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            {isWaitingVerification ? "Apa yang perlu dilakukan?" : "Tahap Selanjutnya"}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            {isWaitingVerification
              ? "Tidak ada tindakan yang perlu dilakukan saat ini. Admin akan memverifikasi dokumen dalam 2-3 hari kerja. Jika ada kesalahan dokumen, staff akan memberikan catatan perbaikan."
              : "Pantau halaman notifikasi untuk informasi jadwal seminar, ruangan, dan detail reviewer setelah proses penjadwalan selesai."}
          </p>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Simulasi Staff
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Tombol ini hanya untuk demo flow UI. Hapus saat sudah terhubung backend.
          </p>
          <div className="mt-4 space-y-3">
            <button
              type="button"
              onClick={onSimulateRevisionRequired}
              className="h-11 w-full cursor-pointer rounded-2xl bg-amber-50 text-sm font-semibold text-amber-600 ring-1 ring-amber-100 transition hover:bg-amber-100"
            >
              Staff Minta Perbaikan
            </button>
            <button
              type="button"
              onClick={onSimulateVerified}
              className="h-11 w-full cursor-pointer rounded-2xl bg-green-50 text-sm font-semibold text-green-600 ring-1 ring-green-100 transition hover:bg-green-100"
            >
              Staff Verify / ACC
            </button>
            <button
              type="button"
              onClick={onSimulateRejected}
              className="h-11 w-full cursor-pointer rounded-2xl bg-red-50 text-sm font-semibold text-red-600 ring-1 ring-red-100 transition hover:bg-red-100"
            >
              Staff Tolak Administratif
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function SubmissionBadge({ status }) {
  if (status === "revision_required") {
    return (
      <div className="w-fit rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-600 ring-1 ring-amber-100">
        Perlu Perbaikan
      </div>
    );
  }

  if (status === "pending_verification") {
    return (
      <div className="w-fit rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-primary ring-1 ring-blue-100">
        Menunggu Verifikasi
      </div>
    );
  }

  if (status === "verified") {
    return (
      <div className="w-fit rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-600 ring-1 ring-green-100">
        Terverifikasi / ACC
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="w-fit rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 ring-1 ring-red-100">
        Ditolak
      </div>
    );
  }

  return (
    <div className="w-fit rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 ring-1 ring-slate-200">
      Belum Mengajukan
    </div>
  );
}

function StatusNotice({ type, title, desc, note }) {
  const style = {
    info: {
      wrapper: "bg-blue-50 text-primary ring-blue-100",
      icon: Clock3,
    },
    warning: {
      wrapper: "bg-amber-50 text-amber-700 ring-amber-100",
      icon: AlertTriangle,
    },
    success: {
      wrapper: "bg-green-50 text-green-700 ring-green-100",
      icon: CheckCircle2,
    },
  }[type];

  const Icon = style.icon;

  return (
    <div className={`mb-6 rounded-[28px] p-5 ring-1 ${style.wrapper}`}>
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-6 opacity-80">{desc}</p>
          {note && (
            <div className="mt-4 rounded-2xl bg-white/70 px-4 py-3 text-sm leading-6 ring-1 ring-white/70">
              <span className="font-semibold">Catatan staff:</span> {note}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TextInput({ id, label, name, value, onChange, placeholder, icon: Icon, required }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}

function SelectInput({ id, label, name, value, onChange, options, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <FileText className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-sm outline-none transition-all duration-300 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
        >
          <option value="">{placeholder}</option>
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

function ExaminerSelectInput({ id, label, value, onChange, onClear, options, placeholder }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
        <span className="text-xs font-medium text-slate-400">Opsional</span>
      </div>

      <div className="relative">
        <UserRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-12 pr-20 text-sm outline-none transition-all duration-300 focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-10 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-all duration-300 hover:bg-red-50 hover:text-red-600"
            aria-label={`Batalkan ${label}`}
          >
            <X size={16} />
          </button>
        )}

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      </div>
    </div>
  );
}
