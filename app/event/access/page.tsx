import { Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { verifyEventPasscode } from "./actions";

export default async function EventAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; redirectTo?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "1";
  const redirectTo = params.redirectTo || "/event";

  return (
    <main>
      <Navbar />

      <section className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tosca/15 text-tosca">
          <Lock size={24} />
        </div>

        <h1 className="font-display mt-5 text-2xl font-semibold text-ink">
          Akses Khusus Member
        </h1>
        <p className="mt-2 text-ink-soft">
          Halaman event cuma bisa diakses member Entiti. Masukin passcode
          yang dibagikan di WA Channel ya.
        </p>

        <form
          action={verifyEventPasscode}
          className="mt-8 flex w-full flex-col gap-3"
        >
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <input
            type="password"
            name="passcode"
            required
            autoFocus
            placeholder="Masukin passcode"
            className="focus-ring w-full rounded-lg border border-black/10 px-4 py-3 text-center text-sm"
          />

          {hasError && (
            <p className="text-sm font-medium text-red-600">
              Passcode salah, coba lagi.
            </p>
          )}

          <button
            type="submit"
            className="focus-ring rounded-full bg-tosca py-3 font-semibold text-ink transition-colors hover:bg-tosca-dark hover:text-white"
          >
            Masuk
          </button>
        </form>

        <p className="mt-6 text-sm text-ink-soft">
          Belum jadi member?{" "}
          <a
            href="https://forms.gle/XBADUs4gzHWkBhAZ6"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-tosca hover:underline"
          >
            Daftar jadi Entiti Member
          </a>{" "}
          buat gabung dulu.
        </p>
      </section>

      <Footer />
    </main>
  );
}
