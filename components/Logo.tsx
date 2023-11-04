import Link from 'next/link'
import React from 'react'


const Logo = () => {
    const portfolioLink = 'https://adeelahmad.vercel.app/';

    return (
        <div className='flex items-center justify-center gap-x-3'>
            <Link href='/' className='font-bold text-2xl sm:text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer select-none'>
                PageForm
            </Link>
            <div className='hidden md:flex'>
                <span className='select-text'>by&nbsp;</span>
                <Link href={portfolioLink} target='_blank' className='text-base hover:underline text-orange-300'>DevAdeelAhmad</Link>
            </div>
        </div>
    )
}

export default Logo