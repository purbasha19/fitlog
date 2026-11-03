
import Image from "next/image";
import banner from "../assets/banner.png";

function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-16">

      {/* Left Info */}
      <div className="flex flex-col gap-5">

        <p className="text-[11px] font-bold text-[#C2F800] tracking-widest">
          WORKOUT LIBRARY
        </p>

        <h1 className="max-w-[558px] text-white text-4xl font-bold uppercase leading-tight">
          TRAIN WITH INTENT. LOG EVERY SET.
        </h1>

        <p className="max-w-[512px] text-[#9CA3AF] leading-relaxed">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today's plan, and watch the week's work add up.
        </p>

        <a
          href="#library"
          className="flex w-fit items-center gap-3 rounded-md bg-[#C2F800] px-6 py-3 font-bold text-black hover:opacity-90"
        >
          BROWSE WORKOUTS
         
        </a>

      </div>

      {/* Right Banner Image */}
      <div>
        <Image
          src={banner}
          alt="Workout fitness banner"
          width={334}
          height={334}
          className="h-[334px] w-[334px] object-contain"
        />
      </div>

    </section>
  );
}

export default HeroSection;
