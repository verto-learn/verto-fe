import React from 'react'

export const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center">
            <div className='text-center'>
                <h1 className='text-4xl  font-semibold bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent'>Verto: AI-Powered Learning, Limitless Potential.</h1>
                <p className='text-md mt-5 opacity-70 mb-5'>Verto, we're not just another online course platform. We are the future of education, <br /> and it's powered by artificial intelligence.</p>
                <div className='flex gap-4 justify-center'>
                    <button className='hover:bg-accent transition-colors  ease-in-out px-6 py-2 rounded-2xl border border-accent'>Start Now</button>
                    <button className='bg-light/20 rounded-xl px-6 py-2'>Try Demo</button>
                </div>
            </div>
        </section>
    )
}

