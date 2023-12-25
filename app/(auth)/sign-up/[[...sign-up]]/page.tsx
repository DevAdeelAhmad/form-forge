import { Skeleton } from "@/components/ui/skeleton";
import { SignUp } from "@clerk/nextjs";

import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  const portfolioLink = "https://adeelahmad.vercel.app/";

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen text-center gap-y-10 bg-svg">
      <div className="flex flex-col w-full">
        <h1 className="text-4xl font-bold text-transparent select-none bg-gradient-to-r from-purple-600 to-cyan-400 bg-clip-text">
          Sign Up to Form Forge
        </h1>
        <div className="flex items-center justify-center w-full text-center">
          <span>by&nbsp;</span>
          <Link
            href={portfolioLink}
            target="_blank"
            className="text-base text-center text-orange-300 hover:underline"
          >
            DevAdeelAhmad
          </Link>
        </div>
      </div>
      <SignUp />
    </main>
  );
}
