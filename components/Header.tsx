"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav, proposedLogo } from "@/content/site";
import { BookButton } from "./BookButton";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-paper/10 bg-bg/95 text-paper backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:px-6">
        <Link href="/" className="shrink-0" aria-label="EIP home">
          {/* SVG mark. next/image does not optimize SVG, so this stays a plain image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={proposedLogo.onDark}
            alt="EIP"
            width={48}
            height={48}
            className="h-11 w-11"
          />
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center px-3 text-[0.95rem] text-paper/90 hover:text-gold-bright"
                >
                  {item.label}
                </Link>
                <div className="invisible absolute left-0 top-full z-20 min-w-56 border border-paper/15 bg-bg-2 p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-3 py-2 text-[0.95rem] text-paper/85 hover:text-gold-bright"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center px-3 text-[0.95rem] text-paper/90 hover:text-gold-bright"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <Link
            href="/turn-tax-calculator"
            className="hidden min-h-11 items-center text-[0.95rem] text-gold-bright underline decoration-gold/40 underline-offset-4 hover:decoration-gold-bright md:inline-flex"
          >
            Calculate your Turn Tax
          </Link>
          <BookButton className="px-3 sm:px-5">Book a 20-minute call</BookButton>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-paper/25 text-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-paper/10 px-4 py-3 lg:hidden" aria-label="Mobile">
          <Link
            href="/turn-tax-calculator"
            className="block py-3 text-gold-bright"
            onClick={() => setOpen(false)}
          >
            Calculate your Turn Tax
          </Link>
          {primaryNav.map((item) => (
            <div key={item.href} className="border-t border-paper/10 py-2">
              <Link href={item.href} className="block py-2 font-semibold" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block py-2 pl-3 text-[0.95rem] text-paper/75"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
