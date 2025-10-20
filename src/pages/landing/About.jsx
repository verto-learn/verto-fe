import { Brain, Captions, FolderOpenDot, UserLock } from 'lucide-react';
import React from 'react'

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
    <section className='min-h-screen flex items-center justify-center'>
        <div className='px-10'>
            <h1 className='font-semibold text-4xl mb-12'>Why Verto?</h1>
            <div className='grid md:grid-cols-4 gap-4'>
                {features.map((feature, index) => (
                    <div key={index} className="mb-6 bg-light/10 px-6 py-4 rounded-lg border hover:scale-120 border-secondary/20 hover:shadow-lg hover:shadow-secondary/70 transition-shadow duration-300">
                        <feature.icon className="w-8 h-8 mb-4 text-secondary"/>
                        <h2 className="text-lg font-semibold mb-4">{feature.headline}</h2>
                        <p className="opacity-70  text-sm text-justify">{feature.description}</p>
                    </div>
                ))}
            </div>
       </div>
    </section>
  )
}

export default About