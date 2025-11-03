import React from 'react'
import { useGetUserCourse } from '../../hooks/course/useGetUserCourse';
import { ProgressBar } from '../../components/course/ProgressBar';
import { ChapterList } from '../../components/course/ChapterList';

const Course = () => {

    const { data, isLoading, isError, error } = useGetUserCourse();
    const course = data?.data.course;
    const chapters = data?.data?.course?.chapters || [];
    const completedCount = chapters.filter((c) => c.progress?.[0]?.is_done).length;

    if (isLoading) return <p className="p-6">Loading...</p>;
    if (isError) return <p className="p-6 text-red-500">Error loading course data: {error.message}</p>;

    return (
        <section className='min-h-screen '>
            <div className='bg-primary/50 rounded-lg p-8 m-4 shadow-lg'>
                <h1 className='text-white text-3xl font-bold text-center'>{course.title}</h1>
                <div className='bg-accent w-20 mt-5 h-1 mx-auto flex items-center justify-center'></div>
            </div>
            <div className='bg-primary/50 rounded-lg p-8 m-4 shadow-lg'>
                <h1 className='text-white text-xl font-bold text-left'>Difficulty: <span className='font-thin'>{course.difficulty}</span></h1>
            </div>
            <div className='bg-primary/50 rounded-lg p-8 m-4 shadow-lg'>
                <h1 className='text-white text-xl font-bold text-left'>Description:</h1>
                <p className='font-thin text-justify'>{course.description}</p>
            </div>
            <div className='p-8'>
                <ProgressBar completed={completedCount} total={chapters.length} />
                <div className="mt-10">
                    <ChapterList chapters={chapters} />
                </div>
            </div>
        </section>
    )
}

export default Course