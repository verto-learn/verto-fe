import React from "react";
import { useGetUserSession } from "../../hooks/users/useGetUserSession";
import { Book, CircleUser, Shield, CalendarDays } from "lucide-react";
import { ProfileInfoCard } from "../../components/ui/ProfileInfoCard";


const Profile = () => {
  const { data, isLoading, isError } = useGetUserSession();
  const users = data?.data?.user;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) return <p className="p-6">Loading...</p>;
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

      {/* User Info Cards */}
      <div className="glass-card px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileInfoCard
          icon={Book}
          title="Selected Course"
          value={users?.selected_course}
          gradient="from-secondary to-pink-500"
        />
        <ProfileInfoCard
          icon={CalendarDays}
          title="Joined"
          value={formatDate(users?.created_at)}
          gradient="from-fuchsia-600 to-purple-500"
        />
      </div>
    </section>
  );
};

export default Profile;
