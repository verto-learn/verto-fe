import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ChevronLeft,
  User,
  Settings,
  BookOpen,
  Search,
  MessageSquare,
} from "lucide-react";


export const SidebarUser = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop collapsed
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile drawer

  const navItems = [
    {
      label: "Chats",
      href: "/users/profile",
      icon: <MessageSquare size={20} />,
      pill: "48",
    },
    { label: "Search", href: "/users/search", icon: <Search size={20} /> },
    {
      label: "Manage subscription",
      href: "/users/subscription",
      icon: <BookOpen size={20} />,
    },
    { label: "Updates & FAQ", href: "/users/updates", icon: <BookOpen size={20} /> },
    { label: "Settings", href: "/users/settings", icon: <Settings size={20} /> },
  ];

  const isActive = (href) => location.pathname === href;

  const sidebarWidth = isCollapsed ? "w-20" : "w-72";

  return (
    <>
      {/* Toggle button (desktop collapse/expand) */}
      <div className="fixed top-4 left-4 z-50 flex gap-2 items-center">
        <button
          onClick={() => setIsCollapsed((s) => !s)}
          className="hidden lg:inline-flex items-center justify-center p-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft size={18} className={`${isCollapsed ? "rotate-180" : ""} transition`} />
        </button>

        {/* Mobile open button */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="inline-flex lg:hidden items-center justify-center p-2 rounded-lg bg-accent text-light"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Desktop Sidebar (collapsed/expanded) */}
      <aside
        className={`hidden  lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:flex-col lg:overflow-hidden ${sidebarWidth} bg-primary text-light shadow-lg transition-all duration-300 rounded-r-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* Header / Logo */}
          <div className={`px-5 py-6 flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
            <div
              className={`flex items-center gap-3 ${
                isCollapsed ? "flex-col" : ""
              }`}
            >
              

            </div>
          </div>

          <div className="px-3 mt-6">
            <ul className="flex flex-col gap-3">
              {navItems.map((nav) => {
                const active = isActive(nav.href);
                return (
                  <li key={nav.href} className="relative group">
                    <Link
                      to={nav.href}
                      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors duration-200
                        ${active ? "bg-accent/20 text-accent font-semibold" : "text-gray-300 hover:bg-accent/8 hover:text-accent"}
                        ${isCollapsed ? "justify-center" : ""}
                      `}
                    >
                      {/* Icon in circle when active (like image) */}
                      <span
                        className={`flex items-center justify-center rounded-md ${active ? "bg-accent/30 p-2" : "p-1.5"} ${
                          isCollapsed ? "p-0.5" : ""
                        }`}
                      >
                        {nav.icon}
                      </span>

                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-sm">{nav.label}</span>
                          {nav.pill && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-lg bg-[#202027] text-gray-200">
                              {nav.pill}
                            </span>
                          )}
                        </>
                      )}
                    </Link>

                    {/* Tooltip for collapsed */}
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-primary text-light p-5 lg:hidden shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-[#0b2bff]/20 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L19 8v8l-7 6-7-6V8l7-6z" fill="#4300FF" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold">Brainwave</h2>
                </div>
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
                            active ? "bg-accent/20 text-accent" : "text-gray-300 hover:bg-accent/8 hover:text-accent"
                          }`}
                        >
                          <span className={`${active ? "bg-accent/30 p-2 rounded-md" : "p-1.5"}`}>
                            {nav.icon}
                          </span>
                          <span className="flex-1">{nav.label}</span>
                          {nav.pill && <span className="px-2 py-0.5 text-xs rounded-lg bg-[#202027]">{nav.pill}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>

            {/* overlay */}
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
