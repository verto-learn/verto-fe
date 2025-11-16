import React from "react";
import { useGetUserCourse } from "../../hooks/course/useGetUserCourse";
import { useSearchParams, useParams } from "react-router-dom";
import { useGetCourseDetail } from "../../hooks/course/useGetCourseDetail";
import { ProgressBar } from "../../components/course/ProgressBar";
import { ChapterList } from "../../components/course/ChapterList";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

const Course = () => {
  const { data, isLoading, isError, error } = useGetUserCourse();

  const [searchParams] = useSearchParams();
  const selectedCourseId = searchParams.get("course_id");
  const params = useParams();
  const routeCourseId = params.id;


  const {
    data: detailData,
    isLoading: detailLoading,
    isError: detailError,
    error: detailErrorObj,
  } = useGetCourseDetail(routeCourseId);


  if (routeCourseId) {
    if (detailLoading) return <LoadingSpinner size="lg" color="text-indigo-600" />;
    if (detailError) return <p className="p-6 text-red-500">Error: {detailErrorObj.message}</p>;
  } else {
    if (isLoading) {
      return <LoadingSpinner size="lg" color="text-indigo-600" />;
    }

    if (isError) {
      return <p className="p-6 text-red-500">Error: {error.message}</p>;
    }
  }
 
  let course = null;
  if (routeCourseId) {
    course = detailData?.data ?? null;
  } else {
    const coursesArray = data?.data ?? [];
    if (selectedCourseId) {
      const found = coursesArray.find((c) => c.course?.id === selectedCourseId);
      course = found?.course ?? coursesArray?.[0]?.course ?? null;
    } else {
      course = coursesArray?.[0]?.course ?? null;
    }
  }

  if (!course) {
    return <p className="p-6">Data kursus tidak ditemukan.</p>;
  }

  const chapters = course.chapters || [];
  const completedCount = chapters.filter(
    (c) => c.progress?.[0]?.is_done
  ).length;



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