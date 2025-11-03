import { Link, useLocation } from "react-router-dom";

export const CourseNavbar = () => {
  const location = useLocation();

  const item = [
    { name: "Overview", link: "/courses/overview" },
    { name: "Curriculum", link: "/courses/curriculum" },
    { name: "Resources", link: "/courses/resources" },
    { name: "Discussion", link: "/courses/discussion" },
  ];

  return (
    <nav className="glass-card px-8 py-4 mb-6 rounded-xl">
      <ul className="flex gap-8 items-center justify-center">
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
    </nav>
  );
};
