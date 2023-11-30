"use client"

import React, { useRef, useState } from 'react'
import { Button } from '.'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { logo } from '@/assets/images'


export default function LoginForm() {
    const [loading, setLoading] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        toast.loading('Please wait while we send your request', { id: "82046" })
        setLoading(true)
        try {
            const email = emailRef?.current?.value, password = passwordRef?.current?.value
            console.log({email, password})
            // const res = await submitEnquiry(formData)
            // res.error ? toast.error(res.message, { id: "82046" }) : toast.success(res.message, { id: "82046" })
            toast.success('Welcome Back User', { id: "82046" })
        } catch (error) {
            toast.error('Unable to complete request, please, check your network and try again', { id: "82046" })
        }
        setLoading(false)
    }


    return (
        <form action="" onSubmit={handleSubmit} ref={formRef} className="form w-full max-w-sm md:max-w-md relative mx-auto flex flex-col gap-1">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <Image src={logo} alt="CTTI Official Logo" height={90} width={90} className='object-cover' />
                </div>
                {/* <h3 className="pt-4 mt-4 border-t border-t-slate-200 text-lg md:text-xl text-slate-500 text-center font-light">We are always on hand to respond promptly to your enquiries</h3> */}
                <p className="heading text-lg text-center py-4 mt-4 border-y border-y-slate-200">Sign in to access your Account</p>
            </div>
            <div className={`flex flex-col gap-1 py-1`}>
                <label htmlFor={'email'} className="text-gray-600 text-sm">Email</label>
                <input type="email" required ref={emailRef} id='email' name={'email'} placeholder={'Enter Email'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
            </div>
            <div className={`flex flex-col gap-1 py-1`}>
                <label htmlFor={'password'} className="text-gray-600 text-sm">Password</label>
                <input type="password" required ref={passwordRef} id='password' name={'password'} placeholder={'Enter First Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
            </div>
            <Button styles={'text-white text-sm bg-primary hover:bg-primary/90 w-full mt-2'} bg={'text-primary'} color={'text-white'} text={`${loading ? 'Processing...' : 'Login'}`} key={112} />
        </form>
    )
}
