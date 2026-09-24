"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/methodiek", label: "Methodiek" },
  { href: "/aanbod", label: "Aanbod" },
  { href: "/wininstituut", label: "Over WIN" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Hoofdnavigatie"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          event.currentTarget
            .querySelector<HTMLButtonElement>(
              '[aria-controls="win-mobile-menu"]',
            )
            ?.focus();
        }
      }}
      className="fixed top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href="/"
          className="shrink-0"
          aria-label="WIN Instituut — naar home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/win-logo-2026.webp"
            alt="WIN Instituut"
            width={257}
            height={219}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-win-navy hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-win-navy"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/kennismaking"
            className="hidden rounded-lg bg-win-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-win-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-win-navy sm:inline-flex"
          >
            Kennismaking
          </Link>
          <button
            type="button"
            aria-label={open ? "Sluit menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="win-mobile-menu"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-win-navy focus-visible:outline-2 focus-visible:outline-win-navy lg:hidden"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="win-mobile-menu"
        hidden={!open}
        className="border-t border-stone-200 bg-white px-6 py-5 lg:hidden"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md py-3 font-medium text-win-navy hover:bg-win-cream focus-visible:outline-2 focus-visible:outline-win-navy"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kennismaking"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-lg bg-win-navy px-4 py-3 text-center font-semibold text-white sm:hidden"
          >
            Kennismaking
          </Link>
        </div>
      </div>
    </nav>
  );
}
