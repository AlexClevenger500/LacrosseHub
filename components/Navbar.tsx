"use client";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/rankings", label: "Rankings" },
  { href: "/teams",    label: "Teams"    },
  { href: "/players",  label: "Players"  },
  { href: "/scores",   label: "Scores"   },
  { href: "/recruiting", label: "Recruiting" },
  { href: "/news",     label: "News"     },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
            Lax<span className="text-blue-500">Hub</span>
          </span>
          <span className="hidden sm:block text-xs text-gray-500 font-medium uppercase tracking-widest mt-0.5">
            Lacrosse Analytics
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search teams, players…"
              className="bg-gray-800 text-sm text-gray-300 placeholder-gray-500 rounded px-3 py-1.5 w-48 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:w-64 transition-all"
            />
          </div>
          <Link
            href="/login"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-800 bg-gray-950 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
