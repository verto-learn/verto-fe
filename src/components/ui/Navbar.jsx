import React from "react";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const items = [
    { name: "Home", link: "/" },
    { name: "About", link: "/tentang" },
    { name: "Division", link: "/divisi" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-10 py-4 flex justify-between items-center backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg">
      <div className="flex items-center space-x-2">
        <h1 className="font-semibold text-xl tracking-wide text-white">Verto<span className="text-pink-400">.learn</span></h1>
      </div>

      {/* Menu Items */}
      <div className="flex items-center space-x-8">

      <ul className="flex space-x-8">
        {items.map((item) => {
          const isActive = location.pathname === item.link;
          return (
            <li key={item.name}>
              <Link
                to={item.link}
                className={`relative px-5 py-2 rounded-b-lg text-sm font-medium transition-all duration-500 ease-in-out
                ${
                  isActive
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

      <Link
        to="/login"
        className="relative px-5 py-2 rounded-full border border-pink-500 text-pink-400 font-medium
          hover:bg-pink-500/20 hover:text-white transition-all duration-500 ease-in-out
          shadow-[0_0_10px_rgba(236,72,153,0.5)] hover:shadow-[0_0_20px_rgba(236,72,153,0.8)]"
      >
        Join
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;
