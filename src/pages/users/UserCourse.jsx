import React, { useState } from 'react';
import { useGetUserCourse } from '../../hooks/course/useGetUserCourse';
import { Loader2, BookOpen, AlertCircle } from 'lucide-react';
import UserCourseCard from '../../components/course/UserCourseCard';
import CourseDetailModal from '../../components/course/CourseDetailModal';

const UserCourse = () => {
  // 1. Fetch Data
  const { data, isLoading, isError, error } = useGetUserCourse();
  
  // 2. State untuk Modal
  const [selectedCourseData, setSelectedCourseData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper untuk parsing data
  const userCourses = data?.data || []; // Sesuaikan jika response backend berbeda strukturnya

  // Handler buka modal
  const handleCardClick = (courseData) => {
    setSelectedCourseData(courseData);
    setIsModalOpen(true);
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto min-h-screen">
      
      {/* Header Page */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-indigo-600/20 rounded-lg">
                <BookOpen className="w-6 h-6 text-indigo-400" />
             </div>
             <h1 className="text-3xl font-bold text-white">My Courses</h1>
           </div>
           <p className="text-gray-400 ml-1">Lanjutkan pembelajaran Anda dan tingkatkan skill.</p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-500">Memuat kursus Anda...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-400 font-medium">Gagal memuat data.</p>
            <p className="text-red-300/70 text-sm">{error?.message}</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && userCourses.length === 0 && (
         <div className="text-center py-20 bg-gray-900/30 rounded-2xl border border-gray-800 border-dashed">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">Belum ada kursus</h3>
            <p className="text-gray-500 mb-6">Anda belum mengambil kursus apapun.</p>
            <a href="/generate-course" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Cari Kursus Baru
            </a>
         </div>
      )}

      {/* Grid Layout Cards */}
      {!isLoading && !isError && userCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCourses.map((item) => (
            <UserCourseCard 
                key={item.course_id + item.user_id} // Unique key combination
                data={item} 
                onClick={() => handleCardClick(item)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <CourseDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedData={selectedCourseData}
      />

    </section>
  );
};

export default UserCourse;