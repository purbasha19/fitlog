
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
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Show Toast Notification
  const showToast = (message) => {
    setToast({ message, id: Date.now() });
  };

  // Automatically Hide Toast After 3 Seconds
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  // Load Workouts from Local Storage
  useEffect(() => {
    const loadWorkouts = () => {
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
    };

    loadWorkouts();

    window.addEventListener("fitlog-updated", loadWorkouts);
    window.addEventListener("storage", loadWorkouts);

    return () => {
      window.removeEventListener("fitlog-updated", loadWorkouts);
      window.removeEventListener("storage", loadWorkouts);
    };
  }, []);

  // Current Tab Workouts
  const currentWorkouts =
    activeTab === "today" ? todayWorkouts : savedWorkouts;
    // Filter Workouts by Search
const filteredWorkouts = currentWorkouts.filter((workout) => {
  const search = searchTerm.toLowerCase().trim();

  const workoutName = workout.name?.toLowerCase() || "";
  const equipment = workout.equipment?.toLowerCase() || "";
  const difficulty = workout.difficulty?.toLowerCase() || "";

  const muscleGroups = Array.isArray(workout.muscleGroups)
    ? workout.muscleGroups.join(" ").toLowerCase()
    : "";

  return (
    workoutName.includes(search) ||
    equipment.includes(search) ||
    difficulty.includes(search) ||
    muscleGroups.includes(search)
  );
});

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
  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    if (sortBy === "calories") {
      return (
        Number(b.caloriesBurned || 0) -
        Number(a.caloriesBurned || 0)
      );
    }

    if (sortBy === "rating") {
      return Number(b.rating || 0) - Number(a.rating || 0);
    }

    return Number(a.duration || 0) - Number(b.duration || 0);
  });

  // Remove Workout
  const handleDelete = (id) => {
    if (activeTab === "today") {
      const updatedWorkouts = todayWorkouts.filter(
        (workout) => String(workout.id) !== String(id)
      );

      setTodayWorkouts(updatedWorkouts);

      localStorage.setItem(
        "fitlog-todays-plan",
        JSON.stringify(updatedWorkouts)
      );
    } else {
      const updatedWorkouts = savedWorkouts.filter(
        (workout) => String(workout.id) !== String(id)
      );

      setSavedWorkouts(updatedWorkouts);

      localStorage.setItem(
        "fitlog-saved-workouts",
        JSON.stringify(updatedWorkouts)
      );
    }

    window.dispatchEvent(new Event("fitlog-updated"));

    showToast("Workout removed successfully!");
  };

  // Mark Workout as Done
  const handleMarkDone = (id) => {
    const alreadyCompleted = completedWorkouts.some(
      (item) => String(item) === String(id)
    );

    const updatedCompleted = alreadyCompleted
      ? completedWorkouts.filter(
          (item) => String(item) !== String(id)
        )
      : [...completedWorkouts, id];

    setCompletedWorkouts(updatedCompleted);

    localStorage.setItem(
      "fitlog-completed-workouts",
      JSON.stringify(updatedCompleted)
    );

    if (alreadyCompleted) {
      showToast("Workout marked as incomplete!");
    } else {
      showToast("Workout completed successfully!");
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0f1115] text-white">
      <Navbar />

      {/* Toast Notification */}
      {toast && (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className="fixed right-4 top-24 z-50 max-w-[calc(100%-2rem)] rounded-lg border border-[#C2F800] bg-[#15181e] px-5 py-3 text-sm font-semibold text-white shadow-lg sm:right-6"
        >
          <span className="mr-2 text-[#C2F800]">✓</span>
          {toast.message}
        </div>
      )}

      <section className="mx-auto min-h-[700px] max-w-[1232px] px-4 py-8 sm:px-6 sm:py-12">

        {/* Page Heading */}
        <div>
          <h1 className="text-3xl font-extrabold uppercase sm:text-4xl">
            MY PLAN
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Workout Statistics */}
        <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-xl border border-gray-800 bg-[#15181e] sm:grid-cols-3">

          <div className="border-b border-gray-800 p-5 sm:border-b-0 sm:border-r sm:p-6">
            <p className="text-xs text-gray-400">
              Exercises
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#C2F800]">
              {todayWorkouts.length}
            </h2>
          </div>

          <div className="border-b border-gray-800 p-5 sm:border-b-0 sm:border-r sm:p-6">
            <p className="text-xs text-gray-400">
              Minutes
            </p>

            <h2 className="mt-2 text-3xl font-extrabold">
              {totalMinutes}
            </h2>
          </div>

          <div className="p-5 sm:p-6">
            <p className="text-xs text-gray-400">
              Calories
            </p>

            <h2 className="mt-2 text-3xl font-extrabold">
              {totalCalories}
            </h2>
          </div>

        </div>
        {/* Search Workouts */}
<div className="mt-6">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search by workout name, muscle group, equipment..."
    className="w-full rounded-xl border border-gray-800 bg-[#15181e] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#C2F800]"
  />
</div>
        {/* Tabs and Sort */}
        <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:flex-wrap sm:items-center">

          {/* Tabs */}
          <div className="flex w-full items-center rounded-xl border border-gray-800 bg-[#15181e] p-1.5 sm:w-fit">

            <button
              onClick={() => setActiveTab("today")}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold transition sm:flex-none sm:px-6 sm:text-sm ${
                activeTab === "today"
                  ? "bg-[#252a34] text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Today's Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold transition sm:flex-none sm:px-6 sm:text-sm ${
                activeTab === "saved"
                  ? "bg-[#252a34] text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Saved
            </button>

          </div>

          {/* Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3">

            <label
              htmlFor="sort-workouts"
              className="text-xs text-gray-400"
            >
              Sort By
            </label>

            <div className="relative">
              <select
                id="sort-workouts"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-lg border border-gray-800 bg-[#15181e] py-2 pl-4 pr-10 text-sm text-white outline-none focus:border-[#C2F800]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              {/* Dropdown Chevron */}
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>

          </div>

        </div>

        {/* Workout Cards */}
        <div className="mt-6 space-y-4">

          {sortedWorkouts.length > 0 ? (
            sortedWorkouts.map((workout) => {
              const isCompleted = completedWorkouts.some(
                (item) => String(item) === String(workout.id)
              );

              return (
                <article
                  key={workout.id}
                  className="flex min-w-0 flex-col gap-4 rounded-xl border border-gray-800 bg-[#15181e] p-3 transition hover:border-gray-700 sm:gap-5 sm:p-4 md:flex-row md:items-center"
                >

                  {/* Workout Image */}
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-44 w-full shrink-0 rounded-lg object-cover sm:h-52 md:h-[85px] md:w-[125px]"
                  />

                  {/* Workout Details */}
                  <div className="min-w-0 flex-1">

                    <h2 className="break-words text-base font-extrabold uppercase sm:text-lg">
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                      {workout.equipment}
                    </p>

                    {/* Workout Stats */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-300">

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
                  <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">

                    <Link
                      href={`/exercises/${workout.id}`}
                      className="flex-1 rounded-full border border-gray-700 px-3 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-white/10 sm:flex-none sm:px-4"
                    >
                      View Details
                    </Link>

                    {activeTab === "today" && (
                      <button
                        onClick={() => handleMarkDone(workout.id)}
                        className={`flex-1 rounded-full px-3 py-2.5 text-xs font-bold transition sm:flex-none sm:px-4 ${
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
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-700 px-4 py-10 text-center sm:px-6">

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
                className="mt-7 rounded-full bg-[#C2F800] px-7 py-3 text-sm font-bold text-black transition hover:bg-[#a9d900]"
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
