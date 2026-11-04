
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Reusable SVG icon component
function WorkoutIcon({ type }) {
  const commonProps = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (type === "time") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === "calories") {
    return (
      <svg {...commonProps}>
        <path d="M12 22c4.5 0 7-3.2 7-7 0-3-2-5-4-7-1 3-3 4-3 4s0-5-4-9c0 5-3 7-3 12 0 4 2.5 7 7 7Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    </svg>
  );
}

function LibrarySection() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  // Fetch workouts from API
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to load workouts.");
        }

        const data = await response.json();

        const workoutList = Array.isArray(data)
          ? data
          : data.workouts || data.data || [];

        setWorkouts(workoutList);
        console.log(workoutList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // Navigate to workout detail page
  const handleWorkoutClick = (id) => {
    router.push(`/exercises/${id}`);
  };

  return (
    <section
      id="library"
      className="w-full overflow-hidden bg-black px-4 py-12 text-white sm:px-6 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1232px]">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-[#C2F800]" />
            <p className="mt-4 text-sm text-gray-400">
              Loading workouts...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="py-20 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-[#C2F800] px-5 py-2 text-sm font-bold text-black"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && workouts.length === 0 && (
          <p className="py-20 text-center text-gray-400">
            No workouts available.
          </p>
        )}

        {/* Workout Grid */}
        {!loading && !error && workouts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {workouts.map((workout) => (
              <article
                key={workout.id}
                onClick={() => handleWorkoutClick(workout.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleWorkoutClick(workout.id);
                  }
                }}
                role="link"
                tabIndex={0}
                aria-label={`View ${workout.name} details`}
                className="cursor-pointer overflow-hidden rounded-2xl bg-[#1A1A1A] transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Workout Image */}
                <div className="h-48 w-full overflow-hidden sm:h-52">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5">

                  {/* Category Tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {workout.muscleGroups.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#C2F800] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Workout Title */}
                  <h3 className="break-words text-base font-bold uppercase text-white sm:text-lg">
                    {workout.name}
                  </h3>

                  {/* Equipment */}
                  <p className="mt-1 break-words text-sm text-gray-400">
                    {workout.equipment}
                  </p>

                  {/* Divider */}
                  <div className="my-5 h-px w-full bg-gray-700/50" />

                  {/* Footer Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3 text-xs text-gray-400">

                    <div className="flex items-center gap-1.5">
                      <WorkoutIcon type="time" />
                      <span>{workout.duration} min</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <WorkoutIcon type="calories" />
                      <span>{workout.caloriesBurned} kcal</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <WorkoutIcon type="rating" />
                      <span>{workout.rating}</span>
                    </div>

                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default LibrarySection;
