
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

function Navbar() {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCounts = () => {
      const plan = JSON.parse(
        localStorage.getItem("fitlog-todays-plan") || "[]"
      );

      const saved = JSON.parse(
        localStorage.getItem("fitlog-saved-workouts") || "[]"
      );

      setPlanCount(plan.length);
      setSavedCount(saved.length);
    };

    updateCounts();

    window.addEventListener("fitlog-updated", updateCounts);
    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener("fitlog-updated", updateCounts);
      window.removeEventListener("storage", updateCounts);
    };
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="relative z-50 w-full border-b border-[#25262b] bg-[#0c0d10]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Image
            src={logo}
            alt="FitLog Logo"
            width={40}
            height={40}
            priority
            className="h-8 w-8 sm:h-10 sm:w-10"
          />

          <span className="text-xl font-bold tracking-wider text-white sm:text-2xl">
            FITLOG<span className="text-[#ccff00]"></span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-sm font-medium transition sm:px-5 ${
              pathname === "/"
                ? "bg-[#1c2110] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-sm font-medium transition sm:px-5 ${
              pathname === "/my-plan"
                ? "bg-[#1c2110] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Desktop Status Badges */}
        <div className="hidden items-center gap-3 sm:gap-5 lg:flex">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Plan</span>
            <span className="rounded-full bg-[#ccff00] px-3 py-1 text-sm font-bold text-black">
              {planCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Saved</span>
            <span className="rounded-full border border-gray-600 px-3 py-1 text-sm font-bold text-white">
              {savedCount}
            </span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#36383e] text-2xl text-white transition hover:border-[#ccff00] lg:hidden"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile & Tablet Menu */}
      {menuOpen && (
        <div className="border-t border-[#25262b] bg-[#111318] px-5 py-5 lg:hidden">

          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                pathname === "/"
                  ? "bg-[#1c2110] text-[#ccff00]"
                  : "text-gray-300 hover:bg-[#202228]"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                pathname === "/my-plan"
                  ? "bg-[#1c2110] text-[#ccff00]"
                  : "text-gray-300 hover:bg-[#202228]"
              }`}
            >
              My Plan
            </Link>
          </div>

          {/* Mobile Status Badges */}
          <div className="mt-5 flex flex-wrap items-center gap-6 border-t border-[#292b30] pt-5">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Plan</span>
              <span className="rounded-full bg-[#ccff00] px-3 py-1 text-sm font-bold text-black">
                {planCount}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Saved</span>
              <span className="rounded-full border border-gray-600 px-3 py-1 text-sm font-bold text-white">
                {savedCount}
              </span>
            </div>
          </div>

        </div>
      )}
    </nav>
  );
}

export default Navbar;
