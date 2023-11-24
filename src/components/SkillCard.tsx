"use client"
import Image from 'next/image';
import React from 'react'

function SkillCard({image, title, text, direction} : SkillCardProps) {
  return (
    <aside className={`group py-8 px-4 flex flex-col items-stretch gap-3 md:gap-5 ${direction ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <div className="relative flex-1 mx-auto flex h-full py-4 flex-shrink-0 group-hover:shad bg-white rounded-md overflow-hidden">
            <Image src={image} alt={title} className="h-full w-full rounded-md hover:shadow-xl shadow-lg object-cover scale-100 group-hover:scale-150" />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-2 py-4 flex-shrink-0 ">
            <h4 className={`text-xl md:text-3xl text-transparent font-bold bg-gradient-to-r from-indigo-800 to-cyan-800 bg-clip-text`}>{title}</h4>
            <p className="text-slate-600 text-justify text-md md:text-base leading-loose py-2 pr-2">{text}</p>
        </div>
    </aside>
  )
}

export default SkillCard