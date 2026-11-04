
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import Link from "next/link";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState("today");
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [sortBy, setSortBy] = useState("duration");

  // Load Workouts from Local Storage
  useEffect(() => {
    const todayData = JSON.parse(
      localStorage.getItem("fitlog-todays-plan") || "[]"
    );

    const savedData = JSON.parse(
      localStorage.getItem("fitlog-saved-workouts") || "[]"
    );

    const completedData = JSON.parse(
      localStorage.getItem("fitlog-completed-workouts") || "[]"
    );

    setTodayWorkouts(todayData);
    setSavedWorkouts(savedData);
    setCompletedWorkouts(completedData);
  }, []);

  // Current Tab Workouts
  const currentWorkouts =
    activeTab === "today" ? todayWorkouts : savedWorkouts;

  // Statistics
  const totalMinutes = todayWorkouts.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );

  const totalCalories = todayWorkouts.reduce(
    (total, workout) => total + Number(workout.caloriesBurned || 0),
    0
  );

  // Sort Workouts
  const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
    if (sortBy === "shortest") {
      return Number(a.duration) - Number(b.duration);
    }

    if (sortBy === "longest") {
      return Number(b.duration) - Number(a.duration);
    }

    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    return Number(a.duration) - Number(b.duration);
  });

  // Remove Workout
  const handleDelete = (id) => {
    if (activeTab === "today") {
      const updatedWorkouts = todayWorkouts.filter(
        (workout) => workout.id !== id
      );

      setTodayWorkouts(updatedWorkouts);

      localStorage.setItem(
        "fitlog-todays-plan",
        JSON.stringify(updatedWorkouts)
      );
    } else {
      const updatedWorkouts = savedWorkouts.filter(
        (workout) => workout.id !== id
      );

      setSavedWorkouts(updatedWorkouts);

      localStorage.setItem(
        "fitlog-saved-workouts",
        JSON.stringify(updatedWorkouts)
      );
    }
  };

  // Mark Workout as Done
  const handleMarkDone = (id) => {
    const updatedCompleted = completedWorkouts.includes(id)
      ? completedWorkouts.filter((item) => item !== id)
      : [...completedWorkouts, id];

    setCompletedWorkouts(updatedCompleted);

    localStorage.setItem(
      "fitlog-completed-workouts",
      JSON.stringify(updatedCompleted)
    );
  };

  return (
    <main className="min-h-screen bg-[#0f1115] text-white">
      <Navbar />

      <section className="mx-auto min-h-[700px] max-w-[1232px] px-6 py-12">

        {/* Page Heading */}
        <div>
          <h1 className="text-4xl font-extrabold uppercase">
            MY PLAN
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Workout Statistics */}
        <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-xl border border-gray-800 bg-[#15181e] sm:grid-cols-3">

          <div className="border-b border-gray-800 p-6 sm:border-b-0 sm:border-r">
            <p className="text-xs text-gray-400">
              Exercises
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#C2F800]">
              {todayWorkouts.length}
            </h2>
          </div>

          <div className="border-b border-gray-800 p-6 sm:border-b-0 sm:border-r">
            <p className="text-xs text-gray-400">
              Minutes
            </p>

            <h2 className="mt-2 text-3xl font-extrabold">
              {totalMinutes}
            </h2>
          </div>

          <div className="p-6">
            <p className="text-xs text-gray-400">
              Calories
            </p>

            <h2 className="mt-2 text-3xl font-extrabold">
              {totalCalories}
            </h2>
          </div>

        </div>

        {/* Tabs and Sort */}
        <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          {/* Tabs */}
          <div className="inline-flex w-fit items-center rounded-xl border border-gray-800 bg-[#15181e] p-1.5">

            <button
              onClick={() => setActiveTab("today")}
              className={`rounded-lg px-6 py-2 text-sm font-bold transition ${
                activeTab === "today"
                  ? "bg-[#252a34] text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-6 py-2 text-sm font-bold transition ${
                activeTab === "saved"
                  ? "bg-[#252a34] text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Saved
            </button>

          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="sort-workouts"
              className="text-xs text-gray-400"
            >
              Sort By
            </label>

            <select
              id="sort-workouts"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-800 bg-[#15181e] px-4 py-2 text-sm text-white outline-none"
            >
              <option value="duration">Duration</option>
              <option value="shortest">Shortest First</option>
              <option value="longest">Longest First</option>
              <option value="name">Name</option>
            </select>
          </div>

        </div>

        {/* Workout Cards */}
        <div className="mt-6 space-y-4">

          {sortedWorkouts.length > 0 ? (
            sortedWorkouts.map((workout) => {
              const isCompleted = completedWorkouts.includes(workout.id);

              return (
                <article
                  key={workout.id}
                  className="flex flex-col gap-5 rounded-xl border border-gray-800 bg-[#15181e] p-4 transition hover:border-gray-700 md:flex-row md:items-center"
                >

                  {/* Workout Image */}
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-[130px] w-full rounded-lg object-cover md:h-[85px] md:w-[125px]"
                  />

                  {/* Workout Details */}
                  <div className="min-w-0 flex-1">

                    <h2 className="text-lg font-extrabold uppercase">
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                      {workout.equipment}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-300">

                      <span className="flex items-center gap-1.5">
                        <span className="text-[#C2F800]">◷</span>
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-1.5">
                        <span className="text-[#C2F800]">♨</span>
                        {workout.caloriesBurned} kcal
                      </span>

                      <span className="flex items-center gap-1.5">
                        <span className="text-[#C2F800]">★</span>
                        {workout.rating}
                      </span>

                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2">

                    <Link
                      href={`/exercises/${workout.id}`}
                      className="rounded-full border border-gray-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
                    >
                      View Details
                    </Link>

                    {activeTab === "today" && (
                      <button
                        onClick={() => handleMarkDone(workout.id)}
                        className={`rounded-full px-4 py-2.5 text-xs font-bold transition ${
                          isCompleted
                            ? "border border-[#C2F800] bg-transparent text-[#C2F800]"
                            : "bg-[#C2F800] text-black hover:bg-[#a9d900]"
                        }`}
                      >
                        {isCompleted ? "✓ Completed" : "✓ Mark as Done"}
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(workout.id)}
                      aria-label={`Remove ${workout.name}`}
                      className="rounded-full px-3 py-2 text-lg text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                      ×
                    </button>

                  </div>

                </article>
              );
            })
          ) : (

            /* Empty State */
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-700 px-6 text-center">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1c2025] text-3xl text-[#C2F800]">
                +
              </div>

              <h2 className="text-xl font-extrabold tracking-wider">
                NOTHING HERE YET
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
                {activeTab === "today"
                  ? "Browse the library and add a lift to get today moving."
                  : "You haven't saved any workouts yet. Save your favorite exercises to see them here."}
              </p>

              <Link
                href="/#library"
                className="mt-7 rounded-full bg-[#C2F800] px-7 py-3 font-bold text-black transition hover:bg-[#a9d900]"
              >
                Go to workouts
              </Link>

            </div>
          )}

        </div>

      </section>

      <MainFooter />
    </main>
  );
}
