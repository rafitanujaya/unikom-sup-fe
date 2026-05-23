import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <section className="max-w-md rounded-2xl bg-white p-8 text-center shadow">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Halaman tidak ditemukan
        </h2>

        <p className="mt-3 text-gray-600">
          Path yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-white transition hover:bg-gray-800"
        >
          Kembali ke Home
        </Link>
      </section>
    </main>
  );
}