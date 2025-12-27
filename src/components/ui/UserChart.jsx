import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const UserChart = ({ stats }) => {
  // Menyiapkan data untuk Recharts berdasarkan props stats dari backend
  const data = [
    {
      name: 'Total Students',
      value: stats?.total_students || 0,
      color: '#3B82F6', // Blue-500
    },
    {
      name: 'Active Learners',
      value: stats?.active_learners || 0,
      color: '#A855F7', // Purple-500
    },
    {
      name: 'Admins',
      value: stats?.total_admins || 0,
      color: '#EAB308', // Yellow-500
    },
  ];

  // Custom Tooltip agar sesuai tema Dark Mode
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-xl">
          <p className="text-gray-200 font-semibold mb-1">{label}</p>
          <p className="text-white text-sm">
            Jumlah: <span className="font-bold">{payload[0].value}</span> User
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-lg h-full">
      <h3 className="text-lg font-bold text-white mb-6">User Distribution</h3>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#374151', opacity: 0.2 }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={50} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserChart;