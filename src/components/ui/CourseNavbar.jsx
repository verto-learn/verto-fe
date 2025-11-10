import { Link, useLocation } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import { useState } from "react"; // 1. Import useState
import { Menu, X } from "lucide-react"; // 2. Import ikon

export const CourseNavbar = () => {
  const location = useLocation();
  // 3. Tambahkan state untuk menu seluler
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const item = [
    { name: "Overview", link: "/courses/overview" },
    { name: "Curriculum", link: "/courses/curriculum" },
    { name: "Resources", link: "/courses/resources" },
    { name: "Discussion", link: "/courses/discussion" },
  ];

 
  const activeItemName = item.find(
    (nav) => location.pathname === nav.link
  )?.name;

  return (
  
    <nav className="fixed glass-card mb-6 rounded-xl">

      <div className="px-8 py-4 flex items-center justify-between">
        <ul className="hidden md:flex gap-8 items-center justify-center">
          {item.map((nav) => {
            const isActive = location.pathname === nav.link;

            return (
              <li key={nav.name}>
                <Link
                  to={nav.link}
                  className={`pb-2 font-medium border-b-2 transition-all duration-300 ${
                    isActive
                      ? "text-white border-accent"
                      : "text-gray-300 border-transparent hover:text-white hover:border-accent"
                  }`}
                >
                  {nav.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <ProfileCard />
        </div>

        <div className="md:hidden">
          <span className="text-white font-bold text-lg">
            {activeItemName || "Course Menu"}
          </span>
        </div>


        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>


      {isMobileMenuOpen && (
        <div className="md:hidden px-8 pb-4 pt-2">
          <ul className="flex flex-col gap-4">
            {item.map((nav) => {
              const isActive = location.pathname === nav.link;
              return (
                <li key={nav.name}>
                  <Link
                    to={nav.link}
                    onClick={() => setIsMobileMenuOpen(false)} // Tutup menu saat diklik
                    className={`block py-2 text-center rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-accent/30 text-white" // Style aktif seluler
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {nav.name}
                  </Link>
                </li>
              );
            })}
          </ul>

   
          <hr className="border-white/10 my-4" />

 
          <div className="flex justify-center">
            <ProfileCard />
          </div>
        </div>
      )}
    </nav>
  );
};