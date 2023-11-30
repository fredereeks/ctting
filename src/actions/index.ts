"use server"

import nodeMailer from 'nodemailer'

export const handleSubmit = async (data: FormData) => {
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