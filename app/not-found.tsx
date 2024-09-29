"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function NotFound() {

    const router = useRouter();
    const className = "border p-4 rounded-2xl text-sm transition-all duration-300";
  return (
<div className='flex flex-col gap-5 items-center justify-center mt-48'>
<h1 className={`dark:text-red-600 text-red-800 font-extrabold text-[7rem] font-serif `}>404</h1>
<p className='dark:text-red-200 font-semibold text-2xl text-red-500'>Page not found</p>
<p>The page you requested does not exist.</p>
<div className='flex flex-row gap-5'>
<Link href="/" className={cn("bg-red-950 hover:bg-red-800 border-red-600 text-white ",className)}>Home page</Link>
<button className={cn("border-red-600 hover:bg-red-950/45 text-black dark:text-white",className)} onClick={()=> {
    router.back();
}}>Previous site</button>
</div>
</div>
  )
}