import React from 'react'

const Testimonials = () => {

    const testimonials = [
        {
            name: "Jane Doe",
            role: "Student",
            avatar: "https://i.pravatar.cc/150?u=jane-doe",
            feedback: "Verto has transformed the way I learn. The AI-powered courses are engaging and tailored to my needs, making complex topics easy to understand."
        },
        {
            name: "John Smith",
            role: "Educator",
            avatar: "https://i.pravatar.cc/150?u=john-smith",
            feedback: "As an educator, Verto provides incredible tools to create dynamic and up-to-date course content effortlessly. It's a game-changer for curriculum development."
        },
        {
            name: "Emily Johnson",
            role: "Professional", 
            avatar: "https://i.pravatar.cc/150?u=emily-johnson",
            feedback: "The personalized learning paths on Verto have helped me acquire new skills quickly and efficiently. I was able to upskill for my career in just a few weeks."
        }
    ]

  return (
    <section className='min-h-screen flex justify-center items-center py-16 md:py-0'>
        <div className='px-10 w-full max-w-6xl'>
            <h1 className='font-semibold text-4xl mb-12 text-center'>What Our Users Say</h1>
            <div className='grid md:grid-cols-3 gap-8'>
                {testimonials.map((testimonial, index) => (
                    <div 
                        key={index} 
                        className="bg-white/5 p-6 rounded-lg border border-white/20 hover:shadow-xl hover:shadow-secondary/30 transition-shadow duration-300 flex flex-col justify-between"
                    >
                        <p className="italic text-light/90 mb-6">"{testimonial.feedback}"</p>
                        <div className="flex items-center mt-auto">
                            <img 
                                src={testimonial.avatar} 
                                alt={`Avatar of ${testimonial.name}`}
                                className="w-14 h-14 rounded-full mr-4 border-2 border-secondary/50"
                            />
                            <div>
                                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                                <span className="text-sm opacity-70">{testimonial.role}</span>
                            </div>
                        </div> 
                    </div>   
                ))}
            </div>
        </div>
    </section>
  )
}

export default Testimonials