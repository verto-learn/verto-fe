import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ChevronLeft,
  CircleUser,
  Settings,
  BookOpen,
  Search,
} from "lucide-react";

export const SidebarUser = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { label: "Profile", href: "/users/profile", icon: <CircleUser size={20} /> },
    { label: "Search", href: "/users/search", icon: <Search size={20} /> },
    { label: "Course", href: "/users/courses", icon: <BookOpen size={20} /> },
    { label: "Settings", href: "/users/settings", icon: <Settings size={20} /> },
  ];

  const isActive = (href) => location.pathname === href;
  const sidebarWidth = isCollapsed ? "w-20" : "w-72";

  return (
    <>
      {/* Toggle button */}
      <div className="fixed top-4 left-5 z-50 flex gap-2 items-center">
        {/* Desktop toggle */}
        <button
          onClick={() => setIsCollapsed((s) => !s)}
          className="hidden lg:inline-flex items-center justify-center p-2 rounded-lg bg-secondary/10 hover:bg-accent/20 text-accent transition"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft
            size={18}
            className={`${isCollapsed ? "rotate-180" : ""} transition`}
          />
        </button>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg bg-secondary/10 hover:bg-accent/20 text-accent transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar Desktop */}
      <aside
        className={`hidden lg:flex lg:flex-col lg:overflow-hidden ${sidebarWidth} bg-primary text-light shadow-lg transition-all duration-300 h-screen`}
      >
        <div className="flex flex-col h-full">
          <div
            className={`px-5 py-6 flex items-center gap-3 ${
              isCollapsed ? "justify-center" : ""
            }`}
          ></div>

          <div className="px-3 mt-6">
            <ul className="flex flex-col gap-3">
              {navItems.map((nav) => {
                const active = isActive(nav.href);
                return (
                  <li key={nav.href} className="relative group">
                    <Link
                      to={nav.href}
                      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors duration-200
                        ${
                          active
                            ? "bg-secondary/20 text-light font-semibold"
                            : "text-gray-300 hover:bg-accent/8 hover:text-accent"
                        }
                        ${isCollapsed ? "justify-center" : ""}
                      `}
                    >
                      <span
                        className={`flex items-center justify-center rounded-md ${
                          active ? "bg-secondary/30 p-2" : "p-1.5"
                        } ${isCollapsed ? "p-0.5" : ""}`}
                      >
                        {nav.icon}
                      </span>

                      {!isCollapsed && (
                        <span className="flex-1 text-sm">{nav.label}</span>
                      )}
                    </Link>

                    {isCollapsed && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white text-primary rounded-md px-3 py-1 text-sm shadow-lg">
                            {nav.label}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>

      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-primary text-light p-5 lg:hidden shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-md bg-accent/20 text-accent"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>

              <nav>
                <ul className="flex flex-col gap-3">
                  {navItems.map((nav) => {
                    const active = isActive(nav.href);
                    return (
                      <li key={nav.href}>
                        <Link
                          to={nav.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`flex items-center gap-3 p-3 rounded-xl transition ${
                            active
                              ? "bg-accent/20 text-accent"
                              : "text-gray-300 hover:bg-accent/8 hover:text-accent"
                          }`}
                        >
                          <span
                            className={`${
                              active ? "bg-accent/30 p-2 rounded-md" : "p-1.5"
                            }`}
                          >
                            {nav.icon}
                          </span>
                          <span className="flex-1">{nav.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.aside>

            {/* Overlay hitam transparan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};
