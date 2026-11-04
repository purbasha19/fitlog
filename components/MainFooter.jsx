
import Image from "next/image";
import logo from "../assets/logo.png";

function MainFooter() {
  return (
    <footer className="w-full bg-[#111111] text-white">
      <div className="mx-auto flex h-[100px] max-w-[1280px] items-center justify-between px-6">

        {/* Brand Logo */}
        <div className="flex h-[20px] w-[72px] items-center">
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
        <div className="flex h-[16px] w-[326px] items-center justify-end">
          <p className="whitespace-nowrap text-xs text-gray-500">
            © 2026 FitLog. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default MainFooter;
