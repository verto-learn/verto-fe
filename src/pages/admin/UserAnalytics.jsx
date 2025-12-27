import React, { useMemo } from 'react';
import { Users, Sparkles, BookOpen, Activity } from 'lucide-react';
import { useGetUserStats } from '../../hooks/users/useGetUserStats';
import { useGetAllUsers } from '../../hooks/users/useGetAllUsers';
import UsersTable from '../../components/tables/UsersTable';
import StatCard from '../../components/ui/StatCard';
import UserChart from '../../components/ui/UserChart';

const UserAnalytics = () => {
  const { data: statsData } = useGetUserStats();
  const { data: usersData } = useGetAllUsers(); 
  const stats = statsData?.data?.data || {};
  const allUsers = usersData?.data?.data || [];

  // Filter regular users untuk tabel
  const regularUsers = useMemo(() => {
    return allUsers.filter((user) => user.role === 'user');
  }, [allUsers]);

  return (
    <section className='py-12 px-4 max-w-7xl mx-auto space-y-8'>
      
      {/* 1. Header Section */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-600/20 rounded-xl">
            <Users className="w-6 h-6 text-blue-500" />
        </div>
        <div>
            <h1 className="text-2xl font-bold text-white">User Analytics</h1>
            <p className="text-gray-400 text-sm">Overview & Performance Monitoring</p>
        </div>
      </div>

      {/* 2. Stats Grid (Kartu Statistik) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value={stats.total_students || 0} 
          icon={Users} 
          color="blue" 
        />
        <StatCard 
          title="New Today" 
          value={stats.new_users_today || 0} 
          icon={Sparkles} 
          color="green" 
          trend={stats.new_users_today > 0 ? 100 : 0} // Contoh trend logic
        />
        <StatCard 
          title="Active Learners" 
          value={stats.active_learners || 0} 
          icon={BookOpen} 
          color="purple" 
        />
        <StatCard 
          title="Participation Rate" 
          value={`${stats.active_ratio || 0}%`} 
          icon={Activity} 
          color="orange" 
        />
      </div>

      {/* 3. Content Grid: Chart & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Kolom Kiri: Chart (Lebar 1/3) */}
        <div className="lg:col-span-2">
           <UserChart stats={stats} />
        </div>

        <div className="lg:col-span-2">
           <UsersTable users={regularUsers} />
        </div>
        
      </div>

    </section>
  );
};

export default UserAnalytics;