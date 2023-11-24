import React from 'react'
import { FaCheck } from 'react-icons/fa'

function CoachingCard({title, contents, state} : CoachingProps) {
  return (
    <aside className="bg-white rounded-md p-4 shadow-lg flex flex-col gap-2 m-2">
        <h3 className={`${state ? 'text-cyan-600' : 'text-primary'} text-lg md:text-xl font-bold p-2`}>{title}</h3>
        <div className="flex flex-col gap-2 py-2">
          {
            contents.map((req,i) => (<p key={i} className="text-slate-600 py-1 leading-loose text-sm flex items-center gap-2 border-0 border-b-[1px] border-b-slate-300"><FaCheck className='bg-cyan-400 text-white h-[15px] w-[15px] flex-shrink-0 text-xs p-1 grid place-items-center rounded-full' /> {req}</p>))
          }
        </div>
    </aside>
  )
}

export default CoachingCard