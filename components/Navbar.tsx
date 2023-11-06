import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Navbar() {
    return (
        <nav className='flex justify-between items-center border-b border-border h-[60px] px-4 py-2'>
            <Logo />
            <div className='flex gap-2 sm:gap-4 items-center justify-end'>
                <ThemeSwitcher />
                <UserButton afterSignOutUrl='/sign-in' />
            </div>
        </nav>
    )
}

export default Navbar
