"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/our-work", label: "Our Work" },
  { href: "/courses-activities", label: "Courses & Activities" },
  { href: "/media", label: "Media" },
  { href: "/donate", label: "Donate" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header" id="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="MaBap Foundation home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/logo.jpg"
            alt="MaBap Foundation logo"
            className="brand-logo"
          />
          <span className="brand-name">MaBap Foundation</span>
        </Link>

        <button
          className="nav-toggle"
          id="nav-toggle"
          aria-label="Open menu"
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          className={`primary-nav${isOpen ? " open" : ""}`}
          id="primary-nav"
          aria-label="Primary"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? "active" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
