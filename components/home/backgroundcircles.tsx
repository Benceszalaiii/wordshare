"use client";

import { BallAnimation } from '../shared/animations';


export function Balls(){
    return (
        <div className='relative justify-center text-center w-full h-screen'>
        <BallAnimation x={20} y={10} color='bg-red-500' duration={8} />
        <BallAnimation x={70} y={20} color='bg-neutral-500' duration={12} />
        <BallAnimation x={10} y={80} color='bg-indigo-700' duration={4} />
        <BallAnimation x={60} y={10} color='bg-yellow-500' duration={6} />
        <BallAnimation x={30} y={69} color='bg-emerald-800' duration={3} />
        </div>
    )
}