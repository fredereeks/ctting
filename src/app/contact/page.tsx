import React from 'react'
import { Metadata } from 'next'
import nodeMailer from 'nodemailer'
import { BreadCrumb, CourseCard } from '@/components';
import { courses } from '@/data';
import ContactForm from '@/components/ContactForm';
import Image from 'next/image';
import { ctti_business } from '@/assets/images';
import { revalidatePath } from 'next/cache';

export const metadata: Metadata = {
  title: 'CTTI e-learning Centre :: About',
  description: 'Contact Us at CTTI. We are an e-Learning Course Centre is an Online Platform devoted to bringing quality, standard and professional courses to your need wherever and whenever you need it',
}

const handleSubmit = async (data: FormData) => {
  "use server"
  try {
    const firstname = data.get("firstname")?.valueOf();
    const lastname = data.get("lastname")?.valueOf();
    const email = data.get("email")?.valueOf();
    const phone = data.get("phone")?.valueOf();
    const message = data.get("message")?.valueOf();

    // Save to Database
    // const contactMessage = await prisma.contact.create({data: {
    //     firstname, lastname, email, phone: phone || null, message
    // }})
    // console.log({contactMessage})
    // console.log({ firstname, lastname, email, phone, message })
    const html = `
              <section className="flex flex-col">
                  <h2 style="color: rgb(51,65,85); text-align: center; font-weight: bold; font-size: 1.125rem; line-height: 1.6rem; border-bottom: 1px solid #eee; margin: .5rem; padding-bottom: .5rem;" className="text-slate-700 text-center">New Message!</h2>
                  <div className="flex gap-1">
                      <div className="h-10 w-10 rounded-full bg-primary flex-shrink-0"></div>
                      <div className="flex flex-col flex-1">
                          <h4 style="color: #848484; font-weight: bold; font-size: 1.125rem; line-height: 1.6rem;" className="font-bold text-slate-600 text-lg">${firstname} ${lastname}</h4>
                          <p style="color: rgb(100,116,139); font-size: 0.75rem; line-height: 1rem;" className="text-xs text-slate-500">Email: ${email}</p>
                          <p style="color: rgb(100,116,139); font-size: 0.75rem; line-height: 1rem;" className="text-xs text-slate-500">Phone Number: ${phone}</p>
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

    // const userMail = typeof(email) === 'string' ? email.toString() || "invalidmail@gmail.com"

    const info = transport.sendMail({
      // from: `Fleen.com <brunomany1@gmail.com>`,
      from: `CTTI.ng <${process.env.MAIL_FROM}>`,
      to: ['CTTI Admin <adefredy1@gmail.com>'],
      bcc: 'CTTI Admin <adedejifrederickr@gmail.com>',
      replyTo: email?.toString(),
      subject: 'New Contact Message from Fleen',
      html
    }, (err, info) => {
      if (err) {
        return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
      }
      console.log(`Message sent: ${info?.messageId}`)
    })
    // console.log({ info })
    revalidatePath("/contact")
    return { error: false, message: `Thank you for reaching our to us ${firstname} ${lastname}. Expect our reply soonest.` };


  } catch (error) {
    console.log({ error })
    return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
  }
}

export default async function ContactPage() {
  return (
    <main className="relative">
      <BreadCrumb page={"Contact"} />
      <section className="relative bg-primary/80 py-20">
        <Image src={ctti_business} alt='ctti business leadership' className="absolute top-0 left-0 w-full h-full object-cover opacity-20" />
        <div className="container relative mx-auto flex flex-col md:flex-row md:justify-center md:items-center gap-2 px-4">
          <div className="w-full flex flex-col gap-3 md:flex-1 md:pr-2 py-4">
            <h3 className="text-white font-extrabold text-4xl md:text-5xl">Contact us for any Enquiry</h3>
            <p className="text-white leading-[1.8]">Our dedicated team is always happy to answer any kind of queries you may have. Try us.</p>
            <p className="text-white leading-[1.8]">Alternatively, you can use the live chat to get instant reply (working days and hours only)</p>
          </div>
          <div className="w-full sm:flex-1 grid grid-cols-1 justify-center gap-2 bg-white p-6 shad shadow-gray-500 overflow-hidden rounded-sm">
            <ContactForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </section>
      <section className="bg-gray-50 px-4">
        <div className="container relative mx-auto py-10 flex flex-col overflow-hidden">
          <h3 className="py-2 px-3 heading border-l-[3px] border-l-gray-300 font-bold text-lg md:text-2xl">Suggested Courses for you</h3>
          <div className="col-span-1 md:col-span-3 pt-6 pb-4 grid course__wrap gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {
              courses.filter(course => course.featured === true).slice(0, 4).reverse().map(course => <CourseCard key={course.id} {...course} />)
            }
          </div>
        </div>
      </section>
    </main>
  )
}
