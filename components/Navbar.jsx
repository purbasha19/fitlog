
import Image from "next/image";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="w-full bg-[#0c0d10] border-b border-[#25262b]">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
        <Image
        src={logo}
        alt="FitLog Logo"
        width={40}
        height={40}
        priority
      />

       <span className="text-white text-2xl font-bold tracking-wider">
       FITLOG<span className="text-[#ccff00]"></span>
      </span>
      </div>
        

        {/* Navigation Links */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="bg-[#1c2110] text-[#ccff00] px-5 py-2 rounded-full text-sm font-medium"
          >
            Workout
          </a>

          <a
            href="/my-plan"
            className="text-gray-400 hover:text-white px-5 py-2 rounded-full text-sm font-medium"
          >
            My Plan
          </a>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Plan</span>
            <span className="bg-[#ccff00] text-black px-3 py-1 rounded-full text-sm font-bold">
              0
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Saved</span>
            <span className="border border-gray-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              0
            </span>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
