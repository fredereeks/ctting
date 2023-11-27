// import { StaticImageData } from "next/image"

type BCProps = {
    page: string
    extra?: { name: string, link: string }
}

type BtnProps = {
    bg: string
    color: string
    styles?: string
    text: string
}

type CatalogueProps = {
    id: string;
    title: string;
    icon: React.JSX.Element;
    background: string;
    courses: string[];
    delivery: string;
}

type CategoryProps = {
    id: number
    icon: JSX.Element
    background: string
    title: string
    courses: string[]
    delivery: string
}

type CorporateProps = {
    id?: string
    title: string
    contents: string[]
    state?: boolean
}

type CommCardProps = {
    _id: string
    fullname: string
    date: string
    text: string
    replies?: ReplyProps[]
}



type CourseCardProps = { 
    id: string;
    image: StaticImageData;
    category: string;
    title: string;
    users: number;
    rating: number;
    description: string;
    duration: string;
    featured?: boolean;
    requisite?: string[];
    contents?: string[];
    key?: string;
 }

type DiffCardProps = {
    id: number
    icon: JSX.Element
    background: string
    tag: string
    title: string
    text: string
    full: boolean
}

type DifferencesProps = {
    id: number;
    tag: string;
    icon: JSX.Element;
    background: string;
    title: string;
    text: string;
}

type DropdownProps = {
    about: string | boolean
    courses: string | boolean
    solutions: string | boolean
    resources: string | boolean
}

type LinkCardType = {
    title: string
    link: string
    sublinks: [] | SublinksProps[]
    onClick: (name: string) => void
}

type NewsCardProps = {
    id: string
    image: string
    title: string
    text: string
    comments?: string | number
    fullname: string
    users?: string | number
    category: string
    full: boolean
}

type ReplyProps = {
    _id: string
    fullname: string
    date: string
    text: string
    replies: string
    comment_id: string
}

type SideNewsCardProps = {
    images: string[];
    title: string;
    createdAt: string;
    category?: string;
    text?: string;
    _id: string;
}

type SkillCardProps = {
    image: string;
    title: string;
    text: string;
    direction: boolean;
}

type SublinksProps = {
    id: number;
    link: string;
    title: string;
}

type TextInputProps = {
    holder: string;
    name: string;
    label: string;
    onChange?: (e: React.ChangeEvent) => void;
    required: string;
    styles: string;
    type: string;
    value: string;
}

type TrainingCardProps = {
    id: string;
    background: string;
    light?: string;
    icon: JSX.Element;
    title: string;
    text: string;
}

type VirtualCardProps = {
    id?: string
    icon: JSX.Element;
    title: string;
    text: string;
  }