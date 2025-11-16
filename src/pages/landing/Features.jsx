import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  const cards = [
    { id: 1, img: "/assets/course.png", title: "Smart Course Generator" },
    { id: 2, img: "/assets/overview.png", title: "Progress Overview" },
    { id: 3, img: "/assets/simulation.png", title: "Computer Architecture Simulation" },
  ];

  return (
    <section className="min-h-screen py-20 flex flex-col items-center justify-center ">
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Powerful Features
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
            className="glass-card p-5 rounded-2xl cursor-pointer group transition-all duration-300"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={card.img}
                alt={card.title}
                className="rounded-xl group-hover:scale-110 transition-all duration-500"
              />
            </div>
            <h3 className="text-center mt-5 text-xl font-semibold text-white">
              {card.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
