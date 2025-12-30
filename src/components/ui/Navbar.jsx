import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import { useGetUserSession } from "../../hooks/users/useGetUserSession";
import ProfileCard from "./ProfileCard";

const Navbar = () => {
  const location = useLocation();
  const { data, isLoading, isError, error } = useGetUserSession();
  const user = data?.data.user;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items = [
    { name: "Home", link: "/" },
    { name: "Simulation", link: "/simulation" },
    { name: "Leaderboard", link: "/leaderboard" },
  ];

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg">
      <div className="px-10 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="font-semibold text-xl tracking-wide text-white">
            Verto<span className="text-secondary">.learn</span>
          </Link>
        </div>

        {/* Link Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {items.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className={`leading-tight relative px-5 py-2 rounded-b-lg text-sm font-medium transition-all duration-500 ease-in-out
                    ${isActive
                      ? "bg-gradient-to-t from-white/30 to-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                      : "text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute inset-0 rounded-lg bg-white/10 blur-md animate-pulse" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Profil/Login Desktop */}
          {isLoading ? (
            <p className="text-gray-300 text-sm">Loading...</p>
          ) : isError ? (
            <Link
              to="/authenticate/login"
              className="relative px-5 py-2 rounded-lg bg-secondary text-light border border-secondary  text-sm font-medium
              hover:bg-transparent hover:text-white transition-all duration-500 ease-in-out hover:shadow-[0_0_15px_rgba(67,0,255,0.6)]"
            >
              Login
            </Link>
          ) : user ? (
            <ProfileCard user={user} />
          ) : (
            <Link
              to="/authenticate/login"
              className="relative px-5 py-2 rounded-lg border border-secondary text-secondary text-sm font-medium
              hover:bg-secondary hover:text-white transition-all duration-500 ease-in-out hover:shadow-[0_0_15px_rgba(67,0,255,0.6)]"
            >
              Login
            </Link>
          )}
        </div>

        {/* 2. Tombol Hamburger (Sudah diganti ikonnya) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" /> // Ikon 'X' (Close)
            ) : (
              <Menu className="h-6 w-6" /> // Ikon 'Hamburger' (Menu)
            )}
          </button>
        </div>
      </div>

      {/* Menu Dropdown Seluler */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-10 pb-4 pt-2">
          {/* Link Navigasi Seluler */}
          <ul className="flex flex-col space-y-4">
            {items.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    onClick={handleMobileLinkClick}
                    className={`block py-2 text-center rounded-lg text-sm font-medium transition-all duration-300 ease-in-out
                    ${isActive
                      ? "bg-white/20 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Garis Pemisah */}
          <div className="my-4 border-t border-white/10"></div>

          {/* Profil/Login Seluler */}
          <div className="flex justify-center">
            {isLoading ? (
              <p className="text-gray-300 text-sm">Loading...</p>
            ) : isError ? (
              <p className="text-red-500 text-sm">Error: {error.message}</p>
            ) : user ? (
              <ProfileCard user={user} />
            ) : (
              <Link
                to="/login"
                onClick={handleMobileLinkClick}
                className="w-full text-center px-5 py-2 rounded-lg border border-secondary text-secondary font-medium
                hover:bg-secondary hover:text-white transition-all duration-500 ease-in-out"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;