"use client"

import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [monuted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!monuted) { // to avoid hydration error
        return null;
    }
    return (
        <Tabs defaultValue={theme}>
            <TabsList className="border">
                <TabsTrigger value='light' onClick={() => setTheme('light')}>
                    <SunIcon className='h-[1.2rem] w-[1.2rem]' />
                </TabsTrigger>
                <TabsTrigger value='dark' onClick={() => setTheme('dark')}>
                    <MoonIcon className='h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0' />
                </TabsTrigger>
                <TabsTrigger value='system' onClick={() => setTheme('system')}>
                    <DesktopIcon className='h-[1.2rem] w-[1.2rem]' />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default ThemeSwitcher