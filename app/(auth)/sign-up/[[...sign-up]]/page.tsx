import { Skeleton } from "@/components/ui/skeleton";
import { SignUp } from "@clerk/nextjs";

import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
    const portfolioLink = 'https://adeelahmad.vercel.app/';

    return (
        <main className="flex flex-col gap-y-10 items-center justify-center text-center w-full h-screen bg-svg">
            <div className="flex flex-col w-full">
                <h1 className="font-bold text-4xl bg-gradient-to-r from-purple-600 to-cyan-400 text-transparent bg-clip-text select-none">
                    Sign Up to Page Builder
                </h1>
                <div className="flex text-center w-full items-center justify-center">
                    <span>by&nbsp;</span>
                    <Link href={portfolioLink} target='_blank' className='text-base text-center hover:underline text-orange-300'>DevAdeelAhmad</Link>
                </div>
            </div>
            <SignUp />
        </main >
    )
}
