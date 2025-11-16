import { Brain, Captions, FolderOpenDot, UserLock } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {

  const features = [
    {
      headline: "Limitless Subjects",
      icon: Captions,
      description: "If you can think of it, our AI can create a course for it. Your curiosity is the only limit."
    },
    {
      headline: "Always Current",
      icon: FolderOpenDot,
      description: "The world is constantly changing, and so are our courses. Our AI continuously updates content to ensure you're learning the most relevant and up-to-date information."
    },
    {
      headline: "Personalized For You",
      icon: UserLock,
      description: "Our adaptive learning technology tailors the curriculum to your individual pace and learning style, ensuring you grasp every concept before moving on."
    },
    {
      headline: "Efficient and Engaging",
      icon: Brain,
      description: "We believe learning should be exciting, not a chore. Our AI crafts interactive and dynamic lessons that keep you motivated and eager to learn more."
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="px-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-semibold text-4xl mb-12 text-center md:text-left"
        >
          Why Verto?
        </motion.h1>

        <div className="grid md:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut"
              }}
              className="mb-6 bg-light/10 px-6 py-4 rounded-lg border border-secondary/20 hover:shadow-lg hover:shadow-secondary/70 transition-all duration-300"
            >
              <feature.icon className="w-8 h-8 mb-4 text-secondary" />
              <h2 className="text-lg font-semibold mb-4">{feature.headline}</h2>
              <p className="opacity-70 text-sm text-justify">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
