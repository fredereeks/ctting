"use client"

import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags';
import {handleSubmit} from "@/actions"

export default function CourseEnquiryForm({title} : {title: string }) {
    const formRef = useRef<HTMLFormElement | null>(null)
    const [pending, setPending] = useState<boolean>(false)
    const [phone, setPhone] = useState<string | undefined>('')

    async function handleClientSubmit(formData: FormData) {
        setPending(true)
        try {
            const data = await handleSubmit(formData);
            if (data?.error) {
                toast.error(data?.message, {id: "86249"})
                formRef?.current?.reset();
            } else {
                toast.success(data?.message || "Message Sent", {id: "86249"})
                formRef?.current?.reset();
            }
        } catch (error) {
            toast.error("Something went wrong. Please, try again", {id: "86249"})
        }
        setPending(false)
    }

    return (
        <form ref={formRef} action={handleSubmit} className="flex flex-col bg-gray-100 rounded-md p-4 min-w-[300px] max-w-[35rem]">
            <div className="py-3 mb-2 flex flex-col gap-1 bg-gray-400 px-3">
                <h3 className="text-xl md:text-2xl text-thin text-white text-center capitalize">Make Enquiry on {title}</h3>
                <p className="text-white text-center leading-loose text-sm">Fill out your details in the form below and we would get back to you as sooon as possible.</p>
            </div>
            <div className="flex flex-col gap-2 p-5">
                <input type="text" className={`outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border-[1px] border-zinc-200 rounded-[.25rem] py-2 px-4`} required name="fullname" placeholder="Full Name e.g. John Doe" />
                <input type="email" required className={`outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border-[1px] border-zinc-200 rounded-[.25rem] py-2 px-4`} name="email" placeholder="someone@gmail.com" />
                <input type="text" disabled required value={title} className={`outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border-[1px] border-zinc-200 rounded-[.25rem] py-2 px-4`} name="course" placeholder={title} />
                <div className="flex w-full gap-1 py-2 border-[1px] border-zinc-200 bg-transparent rounded-md overflow-hidden">
                <PhoneInput
                        onChange={(value) => setPhone(value)}
                        placeholder={"Enter Phone Number"}
                        international
                        withCountryCallingCode={true}
                        key={234}
                        defaultCountry='NG'
                        style={{ outline: 0, width: '108%' }}
                        countryCallingCodeEditable={false}
                        value={phone}
                        name="phone"
                        flags={flags}
                        limitMaxLength={true}
                        smartCaret={false}
                        className='w-full outline-none placeholder-opacity-70 text-sitetext/80 bg-transparent rounded-md px-4 flex-1'
                    />
                </div>
                <textarea className={`outline-none placeholder-opacity-70 h-[150px] text-slate-500 text-sm sm:text-md bg-transparent border-[1px] border-zinc-200 rounded-[.25rem] py-2 px-4`} name="fullname" placeholder="Please, write your message here" ></textarea>
                <button disabled={pending} type="submit" className={`outline-none bg-primary text-white text-sm sm:text-md  rounded-[.25rem] py-2 px-4`} >{pending ? 'Sending...' : 'Send Message'}</button>
            </div>
        </form>
    )
}
