
import Image from "next/image";
import banner from "../assets/banner.png";

function HeroSection() {
  return (
    <section className="w-full overflow-hidden bg-[#0c0d10] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">

      <div className="mx-auto flex max-w-[1232px] flex-col items-center justify-between gap-10 md:flex-row md:gap-8 lg:gap-12">

        {/* Left Info */}
        <div className="flex w-full flex-col gap-5 md:w-1/2">

          <p className="text-[11px] font-bold tracking-widest text-[#C2F800]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-[558px] text-3xl font-bold uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="max-w-[512px] text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          <a
            href="#library"
            className="flex w-fit items-center gap-3 rounded-md bg-[#C2F800] px-6 py-3 text-sm font-bold text-black transition hover:opacity-90 sm:text-base"
          >
            BROWSE WORKOUTS
          </a>

        </div>

        {/* Right Banner Image */}
        <div className="flex w-full items-center justify-center md:w-1/2">
          <Image
            src={banner}
            alt="Workout fitness banner"
            width={334}
            height={334}
            priority
            className="h-auto w-full max-w-[260px] object-contain sm:max-w-[300px] lg:max-w-[334px]"
          />
        </div>

      </div>

    </section>
  );
}

export default HeroSection;
