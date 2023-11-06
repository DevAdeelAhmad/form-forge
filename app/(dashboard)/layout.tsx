import React, { PropsWithChildren } from 'react'
import Navbar from '../../components/Navbar'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='flex flex-col min-h-screen w-full max-w-[100rem] bg-background max-h-screen'>
            <Navbar />
            <main className='flex w-full flex-grow'>
                {children}
            </main>
        </div>
    )
}

export default Layout