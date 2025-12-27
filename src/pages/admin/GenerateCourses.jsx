import React, { useState } from 'react'
import CourseForm from '../../components/form/CourseForm';
import { useGetAllCourse } from '../../hooks/course/useGetAllCourse';
import CourseTable from '../../components/tables/CourseTable';
import { AlertCircle, Loader2 } from 'lucide-react';

const GenerateCourses = () => {
  const [open, setOpen] = useState(false)
  const { data, isLoading, isError, error } = useGetAllCourse();
  const courses = data?.data?.data || [];
  console.log("All Courses Data:", data);

  const truncateText = (text, maxLength = 80) => {
    if (!text) return '-'
    return text.length > maxLength
      ? text.slice(0, maxLength) + '...'
      : text
  }

  return (
    <section className="py-12">
      <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold mb-6">Generate AI Course</h1>
        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
        >
          Create Course
        </button>
      </div>
      <div>
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="ml-3 text-gray-400">Loading courses...</span>
          </div>
        )}

        {isError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <p>Error loading courses: {error?.message || 'Unknown error occurred'}</p>
          </div>
        )}

        {!isLoading && !isError && (
          <CourseTable courses={courses} />
        )}
      </div>
      <CourseForm
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </section>
  );
};

export default GenerateCourses;