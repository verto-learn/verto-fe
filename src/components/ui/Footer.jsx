import React from "react";
import { Facebook, Instagram, Twitter, Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-light py-10 mt-16 relative overflow-hidden">
     

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-accent">Verto</h2>
          <p className="text-light/80 mt-3 leading-relaxed text-sm">
            Belajar kapan saja, di mana saja, dengan pengalaman belajar terbaik
            yang dirancang untuk masa depan.
          </p>
        </div>

        {/* Navigation links */}
        <div>
          <h3 className="text-lg font-semibold text-light mb-4">Navigasi</h3>
          <ul className="space-y-2">
            {["Beranda", "Kursus", "Tentang", "Kontak"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-light/80 hover:text-accent transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social media section */}
        <div>
          <h3 className="text-lg font-semibold text-light mb-4">
            Ikuti Kami
          </h3>
          <div className="flex items-center gap-4">
            {[
              { icon: <Facebook size={20} />, link: "#" },
              { icon: <Instagram size={20} />, link: "#" },
              { icon: <Twitter size={20} />, link: "#" },
              { icon: <Github size={20} />, link: "#" },
            ].map(({ icon, link }, i) => (
              <a
                key={i}
                href={link}
                className="p-2 rounded-full bg-third/40 hover:bg-accent transition-colors duration-200 text-light hover:text-light shadow-sm"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="relative z-10 border-t border-light/10 mt-10 pt-4 text-center text-sm text-light/70">
        © {new Date().getFullYear()} MyCourse. Semua hak cipta dilindungi.
      </div>
    </footer>
  );
};
