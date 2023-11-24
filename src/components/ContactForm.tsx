"use client"

import React, { useRef, useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags';
import 'react-phone-number-input/style.css'
import toast from 'react-hot-toast';
import Link from 'next/link';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import { TextInput } from '@/components';



export default function ContactForm({handleSubmit}: {handleSubmit: (data: FormData) => Promise<{message: string, error: boolean} | undefined>}) {
    const formRef = useRef<HTMLFormElement | null>(null)
    const [pending, setPending] = useState<boolean>(false)
    const [phone, setPhone] = useState<string | undefined>('')
    // const [country, setCountry] = React.useState('Nigeria')
    // const [region, setRegion] = React.useState('')


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
        <form ref={formRef} action={handleClientSubmit} className="w-full flex flex-col gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <input type="text" placeholder='First Name' name='firstname' required className="w-full outline-none placeholder-opacity-70 my-1 text-sitetext focus:border-primary bg-transparent border border-zinc-200 rounded-md py-2 px-4" />
                <input type="text" placeholder='Last Name' name='lastname' required className="w-full outline-none placeholder-opacity-70 my-1 text-sitetext focus:border-primary bg-transparent border border-zinc-200 rounded-md py-2 px-4" />
                <input type="email" placeholder='Email' name='email' required className="w-full outline-none placeholder-opacity-70 my-1 text-sitetext focus:border-primary bg-transparent border border-zinc-200 rounded-md py-2 px-4" />
                {/* <input type="phone" placeholder='Phone Number (optional)' name='phone' className="w-full outline-none placeholder-opacity-70 my-1 text-sitetext focus:border-primary bg-transparent border border-zinc-200 rounded-md py-2 px-4" /> */}
                <div className="flex w-full gap-1 py-2 border border-zinc-200 bg-transparent rounded-md overflow-hidden">
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
                        className='w-full outline-none placeholder-opacity-70 text-sitetext bg-transparent rounded-md px-4 flex-1'
                    />
                </div>
                <textarea placeholder='Would be interested in knowing your drive (optional)' name='message' className="w-full outline-none placeholder-opacity-70 my-1 text-sitetext focus:border-primary bg-transparent border border-zinc-200 rounded-md py-4 px-4 col-start-1 h-[12rem] lg:col-span-2 resize-y" ></textarea>
            </div>
            <button type="submit" disabled={pending} className="text-gray-50 bg-[#ec1c3e] rounded-[2rem] w-max px-4 py-2 text-sm md:text-md shadow-lg cursor-pointer shadow-[#ec1c3e]">{pending ? 'Processing...' : 'Send Message'}</button>
        </form>
    )
}
