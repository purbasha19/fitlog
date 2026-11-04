
"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

function Navbar() {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

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

  return (
    <nav className="w-full border-b border-[#25262b] bg-[#0c0d10]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="FitLog Logo"
            width={40}
            height={40}
            priority
          />

          <span className="text-2xl font-bold tracking-wider text-white">
            FITLOG<span className="text-[#ccff00]"></span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className={`rounded-full px-5 py-2 text-sm font-medium ${
              pathname === "/"
                ? "bg-[#1c2110] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </a>

          <a
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-sm font-medium ${
              pathname === "/my-plan"
                ? "bg-[#1c2110] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </a>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-3">

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
    </nav>
  );
}

export default Navbar;
