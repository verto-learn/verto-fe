import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  // Mapping warna untuk background transparan dan teks
  const colorStyles = {
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    green: "bg-green-500/10 text-green-500 border-green-500/20",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    red: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  const activeStyle = colorStyles[color] || colorStyles.blue;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-lg hover:border-gray-600 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          
          {/* Optional: Menampilkan Trend jika ada datanya */}
          {trend && (
            <div className={`flex items-center gap-1 text-xs mt-2 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span className="font-medium">{Math.abs(trend)}% vs last month</span>
            </div>
          )}
        </div>

        <div className={`p-3 rounded-xl ${activeStyle} transition-transform group-hover:scale-110 duration-300`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;