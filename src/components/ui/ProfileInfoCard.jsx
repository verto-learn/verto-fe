import React from "react";

export const ProfileInfoCard = ({ icon: Icon, title, value, gradient }) => {
  return (
    <div
      className={`bg-gradient-to-r ${gradient} p-3 rounded-xl shadow-xl text-white`}
    >
      <div className="flex items-center gap-4">
        <Icon size={25} />
        <div>
          <p className="font-semibold">{title}</p>
          <p className="opacity-90">{value ?? "No data available"}</p>
        </div>
      </div>
    </div>
  );
};
