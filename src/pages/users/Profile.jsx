import React from "react";
import { useGetUserSession } from "../../hooks/users/useGetUserSession";
import { Book, CircleUser, Shield, CalendarDays } from "lucide-react";
import { ProfileInfoCard } from "../../components/ui/ProfileInfoCard";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useGetUserCourse } from "../../hooks/course/useGetUserCourse";
import CourseCard from "../../components/course/CourseCard";


const Profile = () => {
  const { data, isLoading, isError } = useGetUserSession();
  const { data: course, isLoading: isCourseLoading } = useGetUserCourse();
  const users = data?.data?.user;
  const is_admin = users?.role === "admin";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) return <LoadingSpinner size="lg" color="text-indigo-600" />;
  if (isError) return <p className="p-6 text-red-500">Error loading user data.</p>;

  return (
    <section className="min-h-screen py-8 px-4 space-y-5">
      <div className="glass-card px-8 py-6">
        <div className="flex items-center gap-8">
          <div className="bg-accent p-3 rounded-full">
            <CircleUser size={28} />
          </div>
          <div>
            {users ? (
              <>
                <p className="font-medium text-lg">{users.full_name}</p>
                <p className="opacity-70">{users.email}</p>
              </>
            ) : (
              <p className="opacity-70">No user data available.</p>
            )}
          </div>
        </div>
      </div>


      <div className="glass-card px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileInfoCard
          icon={Book}
          title="Role"
          value={users?.role ?? "N/A"}
          gradient="from-secondary to-pink-500"
        />
        <ProfileInfoCard
          icon={CalendarDays}
          title="Joined"
          value={formatDate(users?.created_at)}
          gradient="from-fuchsia-600 to-purple-500"
        />
      </div>

      {!is_admin && (
        <div className="mt-6">
          <h2 className="text-white text-xl font-semibold mb-4">
            Your Courses
          </h2>

          {isCourseLoading ? (
            <LoadingSpinner size="md" color="text-indigo-600" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {course?.data && course.data.length > 0 ? (
                course.data.map((item) => (
                  <CourseCard
                    key={item.course?.id}
                    item={item}
                  />
                ))
              ) : (
                <p className="text-gray-400">
                  You don't have any generated courses yet.
                </p>
              )}
            </div>
          )}
        </div>
      )}

    </section>
  );
};

export default Profile;
