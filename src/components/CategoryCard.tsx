'use client'

import React from 'react'
import Link from 'next/link'

function CategoryCard({id, icon, background, title, courses} : CategoryProps) {
  return (
    <Link href={`/courses/${title}`} key={id} className="bg-white flex flex-col md:flex-row items-center gap-2 p-3 sm:p-4 max-w-[25rem] group shad hover:shadow-2xl rounded-base transition-all duration-300">
        <div className={`h-[70px] w-[70px] mb-2 rounded-md grid place-items-center ${background}`}>
            {icon}
        </div>
        <div className="flex flex-col justify-center items-center md:items-start">
            <h4 className="text-md md:text-base font-bold text-left text-slate-500 capitalize">{title}</h4>
            <p className="text-xs md:text-sm text-justify leading-tight text-slate-400">{courses?.length-1}+ Courses Here</p>
        </div>
    </Link>
  )
}

export default CategoryCard