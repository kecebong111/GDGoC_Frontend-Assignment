"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Overview", href: "/overview" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-[#e3e6e8] bg-white">
      <div className="mx-auto flex w-[calc(100%-48px)] max-w-[1312px] flex-wrap items-center justify-between gap-x-4 gap-y-4 py-5 lg:min-h-[104px] lg:flex-nowrap lg:py-0">
        <Link
          href="/"
          aria-label="GDGoC UGM home"
           className="relative block h-11 w-[min(190px,100%)] shrink-0 sm:h-12 sm:w-[280px] xl:w-[350px]"
        >
          <Image
            src="/GDGoC_UGM_identity.svg"
            alt="Google Developer Groups On Campus — Universitas Gadjah Mada"
            fill
            priority
            sizes="(min-width: 1280px) 350px, (min-width: 640px) 280px, 190px"
            className="object-contain object-left"
          />
        </Link>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex min-h-11 items-center gap-2 rounded-lg border border-[#dadce0] px-3 text-sm lg:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        </button>

        <nav
          id="mobile-main-navigation"
          aria-label="Main navigation"
          onKeyDown={(event) => { if (event.key === "Escape") setMenuOpen(false); }}
          className={`${menuOpen ? "flex" : "hidden"} order-3 w-full flex-col items-stretch gap-1 border-t border-[#e3e6e8] pt-3 lg:order-none lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-2 lg:border-0 lg:pt-0`}
        >
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`min-w-0 rounded-full px-2 py-3 text-center text-sm leading-5 transition-colors sm:px-4 xl:px-5 ${
                  active
                    ? "bg-[#eaf2ff] font-semibold text-[#1967d2]"
                    : "text-[#70757a] hover:text-[#1967d2]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/overview#tracks"
          className={`${menuOpen ? "inline-flex" : "hidden"} order-4 min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#4285f4] px-3 text-xs font-medium text-white transition-colors hover:bg-[#1967d2] lg:order-none lg:inline-flex lg:min-h-[52px] lg:w-auto lg:gap-5 lg:px-6 lg:text-sm`}
          onClick={() => setMenuOpen(false)}
        >
          Find your track

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-[18px] w-[18px] shrink-0"
          >
            <path d="M4 12h16m-6-6 6 6-6 6" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
