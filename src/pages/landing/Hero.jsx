import { MoveUpRight } from 'lucide-react'
import React from 'react'

export const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center">
            <div className='text-center'>
                <h1 className='text-4xl  font-semibold bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent'>Verto: AI-Powered Learning, Limitless Potential.</h1>
                <p className='text-md mt-5 opacity-70 mb-5'>Verto, we're not just another online course platform. We are the future of education, <br /> and it's powered by artificial intelligence.</p>
                <div className='flex gap-4 justify-center'>
                    <button className='hover:bg-secondary transition-all gap-x-2 hover:scale-110  duration-500 ease-in-out px-6 py-2 rounded-2xl border border-secondary flex items-center'>
                        Start Now
                        <MoveUpRight size={15} />
                    </button>
                    <button className='bg-light/10 rounded-xl px-6 py-2 text-light hover:scale-90 transition-all duration-500'>Try Demo</button>
                </div>
            </div>
        </section>
    )
}

