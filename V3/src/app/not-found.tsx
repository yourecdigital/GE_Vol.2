import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Страница не найдена",
};

export default function NotFound() {
  return (
    <main className="page-top min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 40%, rgba(164,86,50,0.08), transparent 70%)" }} />

      <span className="label-caps text-wine/60 mb-6">// 404 · не найдено</span>

      <h1 className="display-hero text-ink mb-6">
        не туда.<br />
        <span className="text-gold-shimmer">заблудился!</span>
      </h1>

      <p className="text-desc text-ink/45 max-w-md mb-10">
        Этой страницы нет. Может, она была — а может, и не&nbsp;было.
        Зато у&nbsp;нас есть хинкали.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="btn-primary px-10 py-4">
          На главную
        </Link>
        <Link href="/menu" className="btn-outline px-10 py-4">
          Открыть меню
        </Link>
      </div>
    </main>
  );
}
