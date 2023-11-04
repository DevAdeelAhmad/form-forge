import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { UserButton } from '@clerk/nextjs'
import React, { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='flex flex-col min-h-screen w-full max-w-[100rem] bg-background max-h-screen'>
            <nav className='flex justify-between items-center border-b border-border h-[60px] px-4 py-2'>
                <Logo />
                <div className='flex gap-2 sm:gap-4 items-center justify-end'>
                    <ThemeSwitcher />
                    <UserButton afterSignOutUrl='/sign-in' />
                </div>
            </nav>
            <main className='flex w-full flex-grow'>
                {children}
            </main>
        </div>
    )
}

export default Layout