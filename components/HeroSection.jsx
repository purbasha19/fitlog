
import Image from "next/image";
import banner from "../assets/banner.png";

function HeroSection() {
  return (
    <section className="w-full bg-[#0c0d10] px-4 py-16 sm:px-6">

      <div className="mx-auto flex max-w-[1232px] flex-col items-center justify-between gap-10 md:flex-row">

        {/* Left Info */}
        <div className="flex flex-col gap-5">

          <p className="text-[11px] font-bold tracking-widest text-[#C2F800]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-[558px] text-4xl font-bold uppercase leading-tight text-white">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="max-w-[512px] leading-relaxed text-[#9CA3AF]">
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

      </div>

    </section>
  );
}

export default HeroSection;
