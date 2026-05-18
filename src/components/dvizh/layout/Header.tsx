"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { href: "/", label: "ГЛАВНАЯ" },
  { href: "/tours/", label: "ТУРЫ" },
  { href: "/parties/", label: "ТУСЫ" },
  { href: "/camp/", label: "ЛАГЕРЬ" },
  { href: "/culture/", label: "КУЛЬТУРА" },
  { href: "/rehab/", label: "ГЛАВВРАЧ" },
  { href: "/reviews/", label: "ОТЗЫВЫ" },
  { href: "/contacts/", label: "КОНТАКТЫ" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggle = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  }, []);

  const close = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      <nav>
        <Link href="/" className="nav-logo">
          ДВИЖ<span>!</span>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${pathname === link.href ? " active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contacts/" className="nav-cta">
            ПИШИ В ЛИЧКУ
          </Link>
        </div>

        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={toggle}
          aria-label="Меню"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <MobileMenu
        links={NAV_LINKS}
        pathname={pathname}
        open={menuOpen}
        onClose={close}
      />
    </>
  );
}
