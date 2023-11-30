import { ctti_digital_marketing } from '@/assets/images'
import {SignupForm} from '@/components'
import Image from 'next/image'

import { revalidatePath } from "next/cache";
import nodeMailer from 'nodemailer'
import { BreadCrumb } from '@/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'CTTI e-learning Centre :: Enquiry',
    description: 'At CTTI, we are committed to nurturing the next generation of IT professionals and supporting organisations in their digital transformation journeys',
}


const handleSignup = async (data: FormData) => {
    "use server"
    try {
        const firstname = data.get("firstname")?.valueOf()?.toString()
        const middlename = data.get("middlename")?.valueOf()?.toString()
        const lastname = data.get("lastname")?.valueOf()?.toString()
        const phone = data.get("phone")?.valueOf()?.toString()
        const country = data.get("country")?.valueOf()?.toString()
        const state = data.get("state")?.valueOf()?.toString()
        const email = data.get("email")?.valueOf()?.toString()
        const message = data.get("message")?.valueOf()?.toString()

        console.log({ firstname, middlename, lastname, phone, country, state, message, })
        const html = `
            <section className="flex flex-col">
                <h2 style="color: rgb(51,65,85); text-align: center; font-weight: bold; font-size: 1.125rem; line-height: 1.6rem; border-bottom: 1px solid #eee; margin: .5rem; padding-bottom: .5rem;" className="text-slate-700 text-center">We got a New Enquiry!</h2>
                <div className="flex gap-1">
                    <div className="h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0"></div>
                    <div className="flex flex-col flex-1">
                        <h4 style="color: #848484; font-weight: bold; font-size: 1.125rem; line-height: 1.6rem;" className="font-bold text-slate-600 text-lg">${firstname} ${lastname}</h4>
                        <p style="color: rgb(100,116,139); font-size: 0.75rem; line-height: 1rem;" className="text-xs text-slate-500">Email: ${email}</p>
                    </div>
                    <p style="color: rgb(100,116,139); font-size: 0.875rem; line-height: 1.25rem;" className="text-sm text-slate-700 text-justify">${message}</p>
                </div>
            </section>
        `;
        const transport = nodeMailer.createTransport({
            // host: 'smtp.gmail.com',
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        })

        const info = await transport.sendMail({
            // from: `CTTI.com <brunomany1@gmail.com>`,
            from: `CTTI.ng <${process.env.MAIL_FROM}>`,
            // to: ['CTTI Admin <adefredy1@gmail.com>', 'CTTI Admin <admin@ctti.ng>'],
            to: ['CTTI Admin <adefredy1@gmail.com>'],
            bcc: 'CTTI Admin <adedejifrederickr@gmail.com>',
            replyTo: email,
            subject: 'New Contact Message from CTTI',
            html
        })
        console.log(`Message sent: ${info.messageId}`)
        console.log({ info })
        revalidatePath("/enquiry")
        return { error: false, message: `Thank you for your enquiry, ${firstname} ${lastname}. Expect a reply as soon as possible.` }
    } catch (err) {
        console.log({ err })
        return { error: true, message: "Something went wrong while attempting to make your request, please, try again." }
    }
}

export default function Enquiry() {

    return (
        <section className="bg-white min-h-screen grid grid-cols-1 md:grid-cols-2 pb-16">
            <div className="md:col-span-2">
                <BreadCrumb page={"Enquiry"} />
            </div>
            <div className="relative hidden md:flex bg-primary py-5">
                <Image src={ctti_digital_marketing} alt="CTTI Web Students" className="absolute w-full h-full left-0 top-0 object-cover opacity-50" />
            </div>
            <div className="relative flex">
                <SignupForm handleSignup={handleSignup} />
            </div>
        </section>
    )
}

