import Image, { StaticImageData } from 'next/image'
import React from 'react'
import nodeMailer from 'nodemailer'
import Link from 'next/link'
import { FaCheck, FaStar } from 'react-icons/fa'
import { IoMdCart, IoMdHeadset } from 'react-icons/io'
// import { usePaystackPayment } from 'react-paystack';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { CourseCard } from '@/components'
import { courses } from '@/data'
import 'react-phone-number-input/style.css'
import { randomNumber } from '@/utils';
import CourseEnquiryForm from '@/components/CourseEnquiryForm'


type SingleCourseProps = {
    params: {
        id: string 
    }
}

type CoursesProps = { id: string; image: StaticImageData; category: string; title: string; users: number; rating: number; description: string; duration: string; featured: boolean; requisite: string[]; contents: string[]; }

const fetchCourse = async(id: string, type: string) => {
  const course: CoursesProps | undefined = await courses.find(course => course.id.toString() === id.toString())
  return course
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
    //   revalidatePath("/contact")
      return { error: false, message: `Thank you for reaching our to us ${firstname} ${lastname}. Expect our reply soonest.` };
  
  
    } catch (error) {
      console.log({ error })
      return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
    }
  }

export default async function SingleCourse({params: {id}}: SingleCourseProps) {
    const state : CoursesProps | undefined = await fetchCourse(id, "id")
    console.log({state})

  return (
    <main className='flex flex-col bg-gray-100 pt-14 justify-center'>
      <div className="container relative mx-auto max-w-[980px] px-4 flex flex-col">
        <div className="flex flex-wrap gap-2 items-center pt-5 pb-7 text-slate-400">
          <Link href="/" className="font-bold hover:text-slate-500 px-2 text-md md:text-lg text-slate-600  ">Home</Link>
          /
          <Link href="/courses" className="font-bold hover:text-slate-500 px-2 text-md md:text-lg text-slate-600  ">Courses</Link>
          /
          <Link href={`/courses/${state?.category?.toLowerCase().replaceAll(" ", "-")}`} className="font-bold hover:text-slate-500 px-2 text-md md:text-lg text-slate-600  ">{state?.category}</Link>
          /
          <div className="font-normal hover:text-slate-500 px-2 text-md md:text-lg text-slate-500">{state?.title}</div>
        </div>
      </div>
      <section className="bg-white">
        <div className="container relative mx-auto max-w-[980px] py-10 px-4 flex flex-col">
          <article className="bg-white">
            <div className="container relative mx-auto max-w-[960px] grid grid-cols-1 md:grid-cols-5 gap-3">
              <aside className="col-span-1 md:col-span-3 flex flex-col gap-4">
                <div className="rounded-lg relative h-[300px] md:h-[400px] w-full overflow-hidden before:z-10 before:w-full before:h-[30%] before:absolute before:bottom-0 before:left-0 before:bg-gradient-to-t before:from-gray-950 before:to-transparent">
                  {state?.image && <Image src={state?.image} alt={state?.title} className="absolute w-full h-full left-0 top-0 object-cover" />}
                  <p className="flex flex-col gap-1 bottom-5 left-4 absolute z-20 text-sm sm:text-base text-white"> {state?.duration}</p>
                  <div className="flex flex-col gap-1 bottom-5 right-4 absolute z-20">
                    <p className="text-white text-xs md:text-sm">{((+Math.ceil(state?.rating || 0) * 100) - randomNumber(141, 293)).toLocaleString()} reviews</p>
                    {/* <div className="flex gap-1 items-center">
                      <FaStar className='text-xs text-yellow-500' key={12}/>
                      <FaStar className='text-xs text-yellow-500' key={23}/>
                      <FaStar className='text-xs text-yellow-500' key={56}/>
                      <FaStar className='text-xs text-yellow-500' key={87}/>
                      <FaStarHalfAlt className='text-xs text-yellow-500' key={782}/>
                    </div> */}
                    <div className="flex items-center gap-1">
                      {
                        new Array((state?.rating || 0)).fill(1).map((el, i) => (<FaStar key={i} className="text-yellow-500 text-xs sm:text-sm" />))
                      }
                      {
                        (5 - (state?.rating || 0)) > 0 ? new Array(5 - (state?.rating || 0)).fill(1).map((el, i) => (<FaStar key={i} className="text-slate-100 text-xs sm:text-sm" />)) : ""
                      }
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl text-thin text-slate-800 capitalize">{state?.title}</h3>
                  <div className="flex flex-col gap-4">
                    <p className="text-slate-500 leading-loose text-sm">{state?.description === "" ? `This is the description of ${state?.title} that would be long and detailed that would be coming in soon enough as we are still in development mode` : state?.description}</p>
                    {/* <p className="text-slate-500 leading-loose text-sm">Mollitia, voluptates fugiat aperiam deleniti, ex ut corrupti? Quae deleniti reprehenderit iusto sit et nisi cumque delectus quaerat laborum repellendus error tempora, quisquam voluptas? Laboriosam nulla ipsum officia quos? Veritatis eius cupiditate perferendis? Dolorem incidunt obcaecati illum minus neque. Provident odit repudiandae magni sunt, sapiente culpa quod laborum et error porro, aspernatur perspiciatis voluptates officia cum at illum fugit nostrum. Quis neque nisi magni illo. Dolore voluptas tempora minus numquam repudiandae?</p> */}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-lg md:text-xl pt-2 text-thin text-slate-800">Delivery Options</p>
                    <div className="flex flex-col bg-gray-100 rounded-md p-4">
                      <p className="text-slate-800 py-1 leading-loose text-sm flex items-center gap-2 border-0 border-b-[1px] border-b-slate-300"><FaCheck className='bg-green-400 text-white h-[15px] w-[15px] flex-shrink-0 text-xs p-1 grid place-items-center rounded-full' /> Classroom </p>
                      <p className="text-slate-800 py-1 leading-loose text-sm flex items-center gap-2 border-0 border-b-[1px] border-b-slate-300"><FaCheck className='bg-green-400 text-white h-[15px] w-[15px] flex-shrink-0 text-xs p-1 grid place-items-center rounded-full' /> Virtual </p>
                      <p className="text-slate-800 py-1 leading-loose text-sm flex items-center gap-2 border-0 border-b-[1px] border-b-slate-300"><FaCheck className='bg-green-400 text-white h-[15px] w-[15px] flex-shrink-0 text-xs p-1 grid place-items-center rounded-full' /> Hybrid (Classroom & Virtual) </p>
                    </div>
                  </div>
                </div>
              </aside>
              <aside className="col-span-1 md:col-span-2 flex flex-col gap-3 md:px-4">
                <div className="flex flex-col gap-2">
                  <div className="flex relative gap-2 py-2 items-center">
                    <h3 className="text-xl md:text-2xl text-gray-600">&#8358;<span className="blur-sm">{(state?.duration)}</span></h3>
                    <label htmlFor='payment' className="cursor-pointer text-xs px-4 bg-indigo-100 w-max text-indigo-400 py-1 rounded-[2rem] my-1">See Payment Options</label>
                    <input type="checkbox" className="hidden peer" id="payment" />
                    <label htmlFor='payment' className="scale-0 peer-checked:scale-100 duration-100 fixed z-[1000] bg-gray-800/50 w-screen h-screen p-10 grid place-items-center top-0 left-0">
                      <div className="flex flex-col bg-gray-100 rounded-md p-4 min-w-[300px] max-w-[25rem]">
                        <div className="py-3 mb-2 flex flex-col gap-1 bg-gray-500 px-3">
                          <h3 className="text-xl md:text-2xl text-thin text-white text-center capitalize">Available Payment Plans</h3>
                          <p className="text-white text-center leading-loose text-sm">We offer three payment options for {state?.title} and they are as follows:</p>
                        </div>
                        <p className="text-slate-800 py-1 leading-loose text-sm flex items-center gap-2 border-0 border-b-[1px] border-b-slate-300"><FaCheck className='bg-green-400 text-white h-[15px] w-[15px] flex-shrink-0 text-xs p-1 grid place-items-center rounded-full' /> Full Payment </p>
                        <p className="text-slate-800 py-1 leading-loose text-sm flex items-center gap-2 border-0 border-b-[1px] border-b-slate-300"><FaCheck className='bg-green-400 text-white h-[15px] w-[15px] flex-shrink-0 text-xs p-1 grid place-items-center rounded-full' /> Two-Time Payment </p>
                        <p className="text-slate-800 py-1 leading-loose text-sm flex items-center gap-2 border-0 border-b-[1px] border-b-slate-300"><FaCheck className='bg-green-400 text-white h-[15px] w-[15px] flex-shrink-0 text-xs p-1 grid place-items-center rounded-full' /> Three-Time Payment </p>
                        <p className="p-2 text-slate-800 text-xs text-center">You can request a call back or make more enquiry about this course by clicking the &apos;Make Enquiry&apos; button</p>
                      </div>
                    </label>
                  </div>
                  {/* {success && <div className="text-sm text-white py-2 my-2 px-4 bg-green-500 text-center rounded-md">{success}</div>}
                  {error && <div className="text-sm text-white py-2 my-2 px-4 bg-pink-500 text-center rounded-md">{error}</div>} */}
                  <div className="flex gap-2">
                    <form action="" className="flex-1 flex">
                      <button type="submit" className="flex-1 w-[3rem] bg-primary p-2 rounded-lg flex items-center justify-center gap-1">
                        <IoMdCart className='text-md md:text-base text-white' />
                        <p className="text-white text-sm md:text-md">Pay for Course</p>
                      </button>
                    </form>
                    <label htmlFor='inquiry' className="cursor-pointer flex-1 w-[3rem] border-[1px] border-primary p-2 rounded-lg flex items-center justify-center gap-2">
                      <IoMdHeadset className='text-sm md:text-md text-gray-500' />
                      <p className="text-gray-500 text-sm md:text-md">Make Enquiry</p>
                    </label>
                    <input type="checkbox" className="hidden peer" id="inquiry" />
                    <label htmlFor='inquiry' className="scale-0 peer-checked:scale-100 duration-100 z-[1000] fixed bg-gray-800/50 w-screen h-screen p-10 grid place-items-center top-0 left-0">
                      <CourseEnquiryForm key="82807" title={state?.title || "Course"} handleSubmit={handleSubmit} />
                    </label>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-lg md:text-xl pt-2 text-thin text-slate-800">Prerequisite</p>
                    <div className="flex flex-col bg-gray-100 rounded-md p-4">
                      {
                        state?.requisite?.map((req, i) => (<p key={i} className="text-slate-800 py-1 leading-loose text-sm flex items-center gap-2 border-0 border-b-[1px] border-b-slate-300"><FaCheck className='bg-green-400 text-white h-[15px] w-[15px] flex-shrink-0 text-xs p-1 grid place-items-center rounded-full' /> {req}</p>))
                      }
                    </div>
                    <p className="text-lg md:text-xl pt-2 text-thin text-slate-800">Course Table of Contents</p>
                    <div className="flex flex-col bg-gray-100 rounded-md p-4">
                      {
                        state?.contents?.map((content, i) => (<p key={i} className="text-slate-800 p-1 leading-loose text-sm flex justify-between border-0 border-b-[1px] border-b-slate-300">{content} <span className="ml-auto">+</span></p>))
                      }
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </article>
        </div>
      </section>
      <section className="bg-gray-50 px-4">
        <div className="container relative mx-auto max-w-[980px] py-10 flex flex-col overflow-hidden">
          <h3 className="py-2 px-3 text-primary border-0 border-l-[3px] border-l-primary font-bold text-lg md:text-xl">Related Courses</h3>
          <div className="col-span-1 md:col-span-3 pt-6 pb-4 grid course__wrap gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {
              courses.filter(course => course.category === state?.category && course.id !== state?.id).slice(0, 4).reverse().map(course => <CourseCard key={course.id} {...course} />)
            }
          </div>
        </div>
      </section>
    </main>
  )
}
