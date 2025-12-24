import React, { useState } from 'react'
import CourseForm from '../../components/form/CourseForm';
import { useGetAllCourse } from '../../hooks/course/useGetAllCourse';

const GenerateCourses = () => {
  const [open, setOpen] = useState(true)
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
        {isLoading && <p>Loading courses...</p>}
        {isError && <p className="text-red-500">Error loading courses: {error.message}</p>}
        {!isLoading && !isError && courses.length === 0 && (
          <p>No courses available. Click "Create Course" to add one.</p>
        )}
        {!isLoading && !isError && courses.length > 0 && (
          <table className='w-full mt-6 overflow-x-auto bg-primary/70 rounded-lg'>
            <thead className='bg-primary rounded-lg'>
              <tr>
                <th className="text-left px-4 py-2">Course Title</th>
                <th className="text-left px-4 py-2">Topic ID</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-4 py-6 opacity-50">{course.topic.name}</td>
                  <td className="px-4 py-6 opacity-50">{truncateText(course.description, 95)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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