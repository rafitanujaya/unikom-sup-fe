"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/student");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10 font-[Poppins]">
      <section className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-blue-100 bg-blue-50 text-primary">
          <SearchX size={30} strokeWidth={1.8} />
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            404 Not Found
          </p>

          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950 md:text-3xl">
            Halaman Tidak Ditemukan
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
            Halaman yang kamu cari mungkin sudah dipindahkan, belum tersedia,
            atau alamat URL yang dimasukkan tidak sesuai.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl bg-primary px-6 text-sm font-medium text-white transition duration-200 hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <ArrowLeft size={17} />
            Kembali ke Halaman Sebelumnya
          </button>
        </div>

        <p className="mt-6 text-xs leading-5 text-slate-400">
          Kamu bisa kembali ke halaman sebelumnya atau memilih menu lain yang
          tersedia.
        </p>
      </section>
    </main>
  );
}