import { MoveUpRight } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

export const Hero = () => {

    const toLogin = () => {
        window.location.href = '/authenticate/login'
    }

    const toSimulatetion = () => {
        window.location.href = '/simulation'
    }

    return (
        <section className="min-h-screen flex items-center justify-center">
            <div className='text-center'>
                
                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className='text-4xl font-semibold bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent'
                >
                    Verto: AI-Powered Learning, Limitless Potential.
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className='text-md mt-5 opacity-70 mb-5'
                >
                    Verto, we're not just another online course platform. We are the future of education, 
                    <br /> and it's powered by artificial intelligence.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    className='flex gap-4 justify-center'
                >
                    {/* Start Now Button */}
                    <motion.button
                        whileHover={{ scale: 1.1, y: -3 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        onClick={toLogin}
                        className='hover:bg-secondary transition-all gap-x-2 duration-500 px-6 py-2 rounded-2xl border border-secondary flex items-center'
                    >
                        Start Now
                        <MoveUpRight size={15} />
                    </motion.button>

                    {/* Try Simulation Button */}
                    <motion.button
                        whileHover={{ scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 200, damping: 12 }}
                        onClick={toSimulatetion}
                        className='bg-light/10 rounded-xl px-6 py-2 text-light transition-all duration-500'
                    >
                        Try Simulation
                    </motion.button>
                </motion.div>

            </div>
        </section>
    )
}
