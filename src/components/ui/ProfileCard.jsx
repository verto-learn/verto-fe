import React, { useState, useEffect, useRef } from "react";
import { useGetUserSession } from "../../hooks/users/useGetUserSession";
import { CircleUser, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";

const ProfileCard = () => {
  const { data, isLoading, isError, error } = useGetUserSession();
  const { mutate: logout } = useLogout();
  const users = data?.data?.user;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Error loading profile data: {error.message}
      </p>
    );

  const handleLogout = () => {
    logout();
    navigate("/authenticate/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-light shadow-lg text-primary px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100 transition"
      >
        <CircleUser />
        <span className="font-semibold">{users.full_name}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-primary text-light shadow-xl rounded-lg py-2 z-50 ">
          <div className="px-4 py-2">
            <p className="font-semibold">{users.full_name}</p>
            <p className="text-sm text-gray-500">{users.email}</p>
          </div>

          <button
            onClick={() => navigate("/users/profile")}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-accent/40 text-left "
          >
            <User size={18} />
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-accent/40 text-left text-red-500"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
