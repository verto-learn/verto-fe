import React from "react";
import { useGetUserCourse } from "../../hooks/course/useGetUserCourse";
import { useSearchParams, useParams } from "react-router-dom";
import { ProgressBar } from "../../components/course/ProgressBar";
import { ChapterList } from "../../components/course/ChapterList";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

const Course = () => {
  const { data, isLoading, isError, error } = useGetUserCourse();

  const [searchParams] = useSearchParams();
  const selectedCourseId = searchParams.get("course_id");
  const { id: routeCourseId } = useParams();

  if (isLoading) return <LoadingSpinner size="lg" color="text-indigo-600" />;
  if (isError) return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const coursesArray = data?.data ?? [];

  // 🔥 SELALU ambil dari user course
  let courseWrapper = null;

  if (routeCourseId) {
    courseWrapper = coursesArray.find(
      (c) => c.course?.id === routeCourseId
    );
  } else if (selectedCourseId) {
    courseWrapper = coursesArray.find(
      (c) => c.course?.id === selectedCourseId
    );
  } else {
    courseWrapper = coursesArray[0];
  }

  const course = courseWrapper?.course;

  if (!course) {
    return <p className="p-6">Data kursus tidak ditemukan.</p>;
  }

  const chapters = course.chapters || [];

  // ✅ progress sudah pasti ada
  const completedCount = chapters.filter(
    (c) => c.progress?.[0]?.is_done === true
  ).length;

  return (
    <section className="min-h-screen">
      <div className="bg-primary/50 rounded-lg p-8 m-4 shadow-lg">
        <h1 className="text-white text-3xl font-bold text-center">
          {course.title}
        </h1>
        <div className="bg-accent w-20 mt-5 h-1 mx-auto"></div>
      </div>

      <div className="bg-primary/50 rounded-lg p-8 m-4 shadow-lg">
        <h1 className="text-white text-xl font-bold">
          Difficulty: <span className="font-thin">{course.difficulty}</span>
        </h1>
      </div>

      <div className="bg-primary/50 rounded-lg p-8 m-4 shadow-lg">
        <h1 className="text-white text-xl font-bold">Description:</h1>
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
