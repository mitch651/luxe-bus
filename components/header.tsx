"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full overflow-hidden flex-shrink-0 border border-white/20 relative">
            <Image
              src="/images/logo.png"
              alt="The Luxe Bus"
              width={56}
              height={56}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <span className="font-semibold text-lg tracking-wide text-white">
            The Luxe Bus
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-white/70 uppercase tracking-wider">
          <li>
            <a href="#home" className="hover:text-[#c9a84c] transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#trip" className="hover:text-[#c9a84c] transition-colors">
              Book a Trip
            </a>
          </li>
          <li>
            <a href="#fleet" className="hover:text-[#c9a84c] transition-colors">
              Fleet
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="hover:text-[#c9a84c] transition-colors"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#reviews"
              className="hover:text-[#c9a84c] transition-colors"
            >
              Reviews
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-[#c9a84c] transition-colors"
            >
              Contact
            </a>
          </li>
          <li>
            <Link href="/#trip" className="btn-gold !py-2 !px-5 !text-xs">
              Book Now
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Menu"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/5 px-6 pb-6">
          <ul className="flex flex-col gap-4 text-sm font-medium text-white/70 uppercase tracking-wider pt-4">
            <li>
              <a
                href="#home"
                onClick={() => setOpen(false)}
                className="block py-2 hover:text-[#c9a84c]"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#trip"
                onClick={() => setOpen(false)}
                className="block py-2 hover:text-[#c9a84c]"
              >
                Book a Trip
              </a>
            </li>
            <li>
              <a
                href="#fleet"
                onClick={() => setOpen(false)}
                className="block py-2 hover:text-[#c9a84c]"
              >
                Fleet
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={() => setOpen(false)}
                className="block py-2 hover:text-[#c9a84c]"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#reviews"
                onClick={() => setOpen(false)}
                className="block py-2 hover:text-[#c9a84c]"
              >
                Reviews
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block py-2 hover:text-[#c9a84c]"
              >
                Contact
              </a>
            </li>
            <li>
              <Link
                href="/#trip"
                onClick={() => setOpen(false)}
                className="btn-gold text-center !text-xs mt-2 block"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
