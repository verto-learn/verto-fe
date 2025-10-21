import React from 'react'
import { TestimonialCard } from '../../components/ui/TestimonialCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

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
            name: "John Doe",
            role: "Educator",
            avatar: "https://i.pravatar.cc/150?u=john-doe",
            feedback: "As an educator, Verto provides incredible tools to create dynamic and up-to-date course content effortlessly. It's a game-changer for curriculum development."
        },
        {
            name: "Noel Gallagher",
            role: "Singer",
            avatar: "https://i.pravatar.cc/150?u=noel-gallagher",
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
                <div className='w-full mx-auto'>
                    <Swiper
                        modules={[EffectCoverflow, Autoplay]}
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={3}
                        spaceBetween={40}
                        loop={true}
                        autoplay={{ delay: 3000 }}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: true,
                        }}
                        className="w-full"
                    >

                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index} >
                                <div className="w-full">
                                    <TestimonialCard testimonial={testimonial} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default Testimonials