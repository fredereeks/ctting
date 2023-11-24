import { StaticImageData } from 'next/image'
import {
  exam_announcement,
  exam_courses,
//   exam_groupread,
  exam_slider,
  exam_study,
//   exam_template,
} from '../assets/images'

type PartnersCardProps = {
    id?: string
    direction?: boolean
    background: string
    image: StaticImageData
    title: string
    text: string
}

export const partners: PartnersCardProps[] = [
    {
        id: "234",
        background: "bg-gradient-to-br bg-clip-text from-purple-500 to-purple-600",
        image: exam_announcement,
        direction: true,
        title: "Microsoft Partnership",
        text: "As a Microsoft Training Partner, we offer various courses covering Microsoft technologies and platforms. Our partnership with Microsoft allows us to deliver official Microsoft training materials designed by experts to equip our students with the skills needed to maximise their productivity and effectiveness. Whether you're interested in mastering Azure cloud services, becoming a Microsoft Certified Professional (MCP), or developing applications with .NET, our Microsoft partnership ensures you receive the highest quality training and preparation for Microsoft certifications.",
    },
    {
        id: "235",
        background: "bg-gradient-to-br bg-clip-text from-yellow-400 to-orange-400",
        image: exam_courses,
        direction: false,
        title: "CISCO Partnership",
        text: "CTTI is honoured to be a Cisco Learning Partner. Through this partnership, we deliver Cisco-certified training that enables individuals to become proficient in networking and security technologies. Our Cisco-certified instructors provide comprehensive training in network infrastructure, cybersecurity, and collaboration. By partnering with Cisco, we ensure that our students gain the knowledge and skills required to design, implement, and maintain robust network solutions and are well-prepared to earn Cisco certifications such as CCNA, CCNP, and CCIE.",
    },
    {
        id: "236",
        background: "bg-gradient-to-br bg-clip-text from-primary to-primary",
        image: exam_slider,
        direction: true,
        title: "Oracle Partnership",
        text: "CTTI's partnership with Oracle allows us to offer industry-leading training programs on Oracle technologies. Whether you are interested in database administration, Java development, or cloud solutions, our Oracle-certified instructors provide expert guidance and hands-on training. We deliver authorised Oracle courseware through our Oracle partnership, allowing our students to gain in-depth knowledge and skills in Oracle products and technologies. By completing our Oracle training programs, you will be well-prepared to earn certifications validating your expertise in Oracle databases, applications, and cloud solutions.",
    },
    {
        id: "237",
        background: "bg-gradient-to-br bg-clip-text from-pink-500 to-pink-600",
        image: exam_study,
        direction: false,
        title: "PMI Partnership",
        text: "As a Registered Education Provider (R.E.P.) with the Project Management Institute (PMI), CTTI offers project management training that aligns with the PMI's globally recognised standards. Our PMI-certified instructors deliver comprehensive project management courses covering project initiation, planning, execution, monitoring, and closing. Whether pursuing the Project Management Professional (PMP) certification or seeking to enhance your project management skills, our partnership with PMI ensures that you receive top-notch training that equips you for success in project management.",
    },
]