import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Страница не найдена | ДВИЖ",
};

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "80vh", textAlign: "center" }}>
      <p className="page-hero-label">// 404 · NOT FOUND</p>
      <h1 className="page-hero-title">
        НЕ ТУДА.<br />
        <span className="accent">заблудился!</span>
      </h1>
      <p className="page-hero-desc" style={{ margin: "2rem auto 3rem" }}>
        Этой страницы нет. Может, она была — а может, и не было.
        Движ не стоит на месте.
      </p>
      <Link href="/" className="nav-cta" style={{ display: "inline-block" }}>
        НА ГЛАВНУЮ
      </Link>
    </section>
  );
}
