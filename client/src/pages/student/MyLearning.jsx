import React from "react";
import Course from "./Course";
import { useGetMyLearningCoursesQuery } from "@/features/api/purchaseApi";

const MyLearning = () => {
  const { data, isLoading, isError } = useGetMyLearningCoursesQuery();

  const myLearning = data?.courses || [];
  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-bold text-2xl">MY LEARNING</h1>
        {!isLoading && !isError && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Purchased courses:{" "}
            <span className="font-semibold">{myLearning.length}</span>
          </p>
        )}
      </div>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : isError ? (
          <p>Failed to load purchased courses.</p>
        ) : myLearning.length === 0 ? (
          <p>You have not purchased any course yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearning.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
