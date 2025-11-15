import React from "react";
import { useGetUserCourse } from "../../hooks/course/useGetUserCourse";
import { ProgressBar } from "../../components/course/ProgressBar";
import { ChapterList } from "../../components/course/ChapterList";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

const Course = () => {
  const { data, isLoading, isError, error } = useGetUserCourse();


  if (isLoading) {
    return <LoadingSpinner size="lg" color="text-indigo-600" />;
  }


  if (isError) {
    return <p className="p-6 text-red-500">Error: {error.message}</p>;
  }


  const course = data?.data?.[0]?.course;

  console.log("Fetched course data:", data);

  if (!course) {
    return <p className="p-6">Data kursus tidak ditemukan.</p>;
  }

  
  const chapters = course.chapters || [];
  const completedCount = chapters.filter(
    (c) => c.progress?.[0]?.is_done
  ).length;

  console.log("Data kursus yang sudah siap:", course);


  return (
    <section className="min-h-screen">
      <div className="bg-primary/50 rounded-lg p-8 m-4 shadow-lg">
        <h1 className="text-white text-3xl font-bold text-center">
          {course.title}
        </h1>
        <div className="bg-accent w-20 mt-5 h-1 mx-auto flex items-center justify-center"></div>
      </div>

      <div className="bg-primary/50 rounded-lg p-8 m-4 shadow-lg">
        <h1 className="text-white text-xl font-bold text-left">
          Difficulty: <span className="font-thin">{course.difficulty}</span>
        </h1>
      </div>

      <div className="bg-primary/50 rounded-lg p-8 m-4 shadow-lg">
        <h1 className="text-white text-xl font-bold text-left">
          Description:
        </h1>
        <p className="font-thin text-justify">{course.description}</p>
      </div>

      <div className="p-8">
        <ProgressBar completed={completedCount} total={chapters.length} />
        <div className="mt-10">
          <ChapterList chapters={chapters} />
        </div>
      </div>
    </section>
  );
};

export default Course;