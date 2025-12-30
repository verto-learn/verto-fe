import React from "react";
import { Trophy, Loader2, AlertCircle, TrendingUp, User } from "lucide-react";
import { useGetLeaderboard } from "../hooks/course/useGetLeaderboard";
import Podium from "../components/ui/Podium";

const Leaderboard = () => {
  const { data, isLoading, isError, error } = useGetLeaderboard();
  const users = data?.data?.data || [];
  const topThree = users.slice(0, 3);
  const restUsers = users.slice(3);
  const getInitials = (name) => name?.substring(0, 2).toUpperCase();

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-yellow-500/10 rounded-full mb-4 border border-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
            <Trophy className="w-10 h-10 text-yellow-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Leaderboard
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
         Leaderboard based on score
        </p>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-gray-400">Mengambil data peringkat...</p>
        </div>
      )}

      {isError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center text-red-400 max-w-lg mx-auto">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p>Gagal memuat leaderboard.</p>
          <p className="text-sm opacity-70 mt-1">{error?.message}</p>
        </div>
      )}

      {!isLoading && !isError && users.length === 0 && (
        <div className="text-center py-20 text-gray-500">
           Belum ada data peringkat. Jadilah yang pertama!
        </div>
      )}

      {!isLoading && !isError && users.length > 0 && (
        <>
          {/* 1. TOP 3 PODIUM */}
          <Podium winners={topThree} />

          {/* 2. RANKING LIST (Sisanya) */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-5 bg-gray-800/50 text-gray-400 font-semibold text-sm uppercase tracking-wider border-b border-gray-700">
                <div className="col-span-2 md:col-span-1 text-center">Rank</div>
                <div className="col-span-7 md:col-span-8">User</div>
                <div className="col-span-3 text-right">Points</div>
            </div>

            {/* List Items */}
            <div className="divide-y divide-gray-800">
                {restUsers.map((user, index) => {
                    const rank = index + 4; // Karena mulai dari posisi 4
                    return (
                        <div 
                            key={user.id} 
                            className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-gray-800/30 transition-colors group"
                        >
                            {/* Rank Number */}
                            <div className="col-span-2 md:col-span-1 text-center">
                                <span className="font-mono text-gray-500 font-bold text-lg group-hover:text-indigo-400 transition-colors">
                                    #{rank}
                                </span>
                            </div>

                            {/* User Info */}
                            <div className="col-span-7 md:col-span-8 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center text-indigo-300 font-bold text-sm border border-indigo-500/20">
                                    {getInitials(user.full_name)}
                                </div>
                                <div>
                                    <h4 className="text-white font-medium group-hover:text-indigo-300 transition-colors">
                                        {user.full_name}
                                    </h4>
                                    <p className="text-xs text-gray-500 hidden md:block">
                                        Bergabung {new Date(user.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Score */}
                            <div className="col-span-3 text-right">
                                <div className="inline-flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                                    <TrendingUp size={14} className="text-green-500" />
                                    <span className="font-mono font-bold text-white">
                                        {user.total_score}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Footer List */}
            {restUsers.length === 0 && topThree.length > 0 && (
                 <div className="p-8 text-center text-gray-500 text-sm">
                    Hanya ada {topThree.length} peserta saat ini.
                 </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Leaderboard;