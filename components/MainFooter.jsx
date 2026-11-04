
import Image from "next/image";
import logo from "../assets/logo.png";

function MainFooter() {
  return (
    <footer className="w-full bg-[#111111] text-white">
      <div className="mx-auto flex min-h-[100px] max-w-[1280px] flex-col items-center justify-center gap-4 px-4 py-6 sm:px-6 md:flex-row md:justify-between md:gap-0">

        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="FitLog"
            className="h-[20px] w-[72px] object-contain"
          />

          <span className="text-xl font-extrabold tracking-tight text-white">
            FITLOG
          </span>
        </div>

        {/* Copyright Notice */}
        <p className="text-center text-xs text-gray-500">
          © 2026 FitLog. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default MainFooter;
