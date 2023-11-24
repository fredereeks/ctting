import { StaticImageData } from 'next/image';
import {
    // ctti_msword,
    ctti_coder,
    // ctti_personal_session,
    ctti_slide3,
    ctti_slide2,
    ctti_home_traing,
} from '../assets/images'

type SlideProps = {
    id: number;
    title: string;
    text: string;
    link: string;
    tag: string;
    image: StaticImageData;
}

export const slides: SlideProps[]  = [
    {   id: 121,
        title: "Explore your learning area and gather knowledge",
        text: "Learning is the process of acquiring new or modifying exiting knowledge, behaviours, skills, values or preferences",
        link: "/about", 
        tag: "Get Started",
        image: ctti_home_traing,
    },
    {   id: 122,
        title: "Become a Certified tested and tried IT Personnel",
        text: "Our mammoth resource pool will fortify you with all you need to know in whatever course you enroll for",
        link: "/courses", 
        tag: "Get Started",
        image: ctti_coder,
    },
    {   id: 123,
        title: "Become a Certified tested and tried IT Personnel",
        text: "With access to an unprecedented amount of ready-to-help community of developers and like-minded peers, you are always in good hands and among 'friends'",
        link: "/courses", 
        tag: "Enroll Now",
        image: ctti_slide2,
    },
]