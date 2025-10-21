import React from 'react'

export const TestimonialCard = ({ testimonial }) => {
    return (
        <div
            className="bg-white/5 p-6 rounded-lg border border-white/20 hover:shadow-xl hover:shadow-secondary/30 transition-shadow duration-300 flex flex-col justify-between"
        >
            <p className="italic text-light/90 mb-6 text-justify">"{testimonial.feedback}"</p>
            <hr className='mb-4 opacity-70' />
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
    )
}

