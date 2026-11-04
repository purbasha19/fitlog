
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to load workout.");
        }

        const data = await response.json();

        const workoutList = Array.isArray(data)
          ? data
          : data.workouts || data.data || [];

        const selectedWorkout = workoutList.find(
          (item) => String(item.id) === String(id)
        );

        if (!selectedWorkout) {
          throw new Error("Workout not found.");
        }

        setWorkout(selectedWorkout);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const handleAddToPlan = () => {
    const existingPlan = JSON.parse(
      localStorage.getItem("fitlog-todays-plan") || "[]"
    );

    const alreadyAdded = existingPlan.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadyAdded) {
      setMessage("This workout is already in your plan!");
      return;
    }

    const updatedPlan = [...existingPlan, workout];

    localStorage.setItem(
      "fitlog-todays-plan",
      JSON.stringify(updatedPlan)
    );

    window.dispatchEvent(new Event("fitlog-updated"));

    setMessage(`${workout.name} added to today's plan!`);
  };

  const handleSaveWorkout = () => {
    const existingSaved = JSON.parse(
      localStorage.getItem("fitlog-saved-workouts") || "[]"
    );

    const alreadySaved = existingSaved.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadySaved) {
      setMessage("This workout is already saved!");
      return;
    }

    const updatedSaved = [...existingSaved, workout];

    localStorage.setItem(
      "fitlog-saved-workouts",
      JSON.stringify(updatedSaved)
    );

    window.dispatchEvent(new Event("fitlog-updated"));

    setMessage(`${workout.name} saved for later!`);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0c0d10] text-white">
        <p className="text-lg text-gray-400">Loading workout...</p>
      </main>
    );
  }

  if (error || !workout) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#0c0d10] text-white">
        <p className="text-xl text-red-400">
          {error || "Workout not found."}
        </p>

        <Link
          href="/"
          className="rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black"
        >
          Back to Workouts
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0c0d10] px-5 py-12 text-white md:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-gray-400 transition hover:text-[#ccff00]"
        >
          ← Back to Workouts
        </Link>

        {/* Workout Details */}
        <div className="grid gap-10 md:grid-cols-2">

          {/* Workout Image */}
          <div className="overflow-hidden rounded-2xl border border-[#292b30] bg-[#17191e]">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full max-h-[500px] min-h-[300px] w-full object-cover"
            />
          </div>

          {/* Workout Information */}
          <div className="flex flex-col justify-center">

            <p className="mb-3 text-sm font-bold tracking-[3px] text-[#ccff00]">
              WORKOUT DETAILS
            </p>

            <h1 className="mb-5 text-4xl font-extrabold uppercase leading-tight md:text-5xl">
              {workout.name}
            </h1>

            <p className="mb-7 leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mb-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-300">
                Muscle Groups
              </h2>

              <div className="flex flex-wrap gap-2">
                {workout.muscleGroups?.map((muscle, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 px-4 py-2 text-sm text-[#ccff00]"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            {/* Workout Stats */}
            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-xl border border-[#292b30] bg-[#17191e] p-4">
                <p className="text-xs uppercase text-gray-500">Equipment</p>
                <p className="mt-2 font-semibold">
                  {workout.equipment || "N/A"}
                </p>
              </div>

              <div className="rounded-xl border border-[#292b30] bg-[#17191e] p-4">
                <p className="text-xs uppercase text-gray-500">Difficulty</p>
                <p className="mt-2 font-semibold">
                  {workout.difficulty || "N/A"}
                </p>
              </div>

              <div className="rounded-xl border border-[#292b30] bg-[#17191e] p-4">
                <p className="text-xs uppercase text-gray-500">Sets</p>
                <p className="mt-2 font-semibold">
                  {workout.sets ?? "N/A"}
                </p>
              </div>

              <div className="rounded-xl border border-[#292b30] bg-[#17191e] p-4">
                <p className="text-xs uppercase text-gray-500">Reps</p>
                <p className="mt-2 font-semibold">
                  {workout.reps ?? "N/A"}
                </p>
              </div>

              <div className="rounded-xl border border-[#292b30] bg-[#17191e] p-4">
                <p className="text-xs uppercase text-gray-500">Duration</p>
                <p className="mt-2 font-semibold">
                  {workout.duration ?? "N/A"} min
                </p>
              </div>

              <div className="rounded-xl border border-[#292b30] bg-[#17191e] p-4">
                <p className="text-xs uppercase text-gray-500">Calories</p>
                <p className="mt-2 font-semibold">
                  {workout.caloriesBurned ?? "N/A"} kcal
                </p>
              </div>

            </div>

            {/* Rating */}
            <div className="mt-5 text-sm text-gray-300">
              <span className="text-[#ccff00]">★</span>{" "}
              Rating: {workout.rating ?? "N/A"}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={handleAddToPlan}
                className="rounded-full bg-[#ccff00] px-7 py-3 font-bold text-black transition hover:bg-white"
              >
                + Add to Today's Plan
              </button>

              <button
                onClick={handleSaveWorkout}
                className="rounded-full border border-[#555] px-7 py-3 font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
              >
                ♡ Save for Later
              </button>

            </div>

            {/* Feedback Message */}
            {message && (
              <p className="mt-5 text-sm text-[#ccff00]">
                {message}
              </p>
            )}

          </div>
        </div>

        {/* Instructions */}
        <section className="mt-16 border-t border-[#292b30] pt-10">
          <h2 className="mb-6 text-2xl font-bold uppercase">
            How to Perform
          </h2>

          <div className="space-y-4">
            {Array.isArray(workout.instructions) ? (
              workout.instructions.map((instruction, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-xl border border-[#292b30] bg-[#17191e] p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] font-bold text-black">
                    {index + 1}
                  </span>

                  <p className="leading-7 text-gray-300">
                    {instruction}
                  </p>
                </div>
              ))
            ) : (
              <p className="leading-7 text-gray-400">
                {workout.instructions || "No instructions available."}
              </p>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
