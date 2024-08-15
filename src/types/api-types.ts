
export type NavigationMenuType = {
    title: string
    href: string
    disabled?: boolean
    children?: NavigationMenuType[]
    description?: string
}

export type ConsultantType = {
    name : string;
    title : string;
    image? : string;
    bio? : string;
    socials : {
        twitter? : string;
        instagram? : string;
    };
    contact : {
        phone? : string;
        email? : string;
    };
}

export type BlogType = {
    title : string;
    image : string;
    date  :string;
    author : ConsultantType;
    content : string;
    tags : string[];
    category : string;
}

export type InterviewType = {
    title : string;
    image : string;
    date  :string;
    interviewee : ConsultantType;
    interviewer : ConsultantType;
    content : string;
    tags : string[];
    category : string;
}

export type VideoType = {
    title : string;
    url : string;
    date : string;
    author : ConsultantType;
    tags : string[];
    category : string;
}

export type NewsType = {
    title : string;
    image : string;
    date : string;
    author : ConsultantType;
    content : string;
    tags : string[];
    category : string;
}

export type SurveyType = {
    title : string;
    image? : string;
    date? : string;
    question : {
        question : string;
        options : string[];
    };
    tags : string[];
    category : string;
    result : string;
}

export type CTA = {
    title : string;
    buttonVariant : "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
    buttonLink : string;
}

export type StoryType = {
    id : string
    title : string;
    image? : never;
    video : string;
    cta : CTA;
    isViewed : boolean;
    thumbnail : string;
} | {
    id : string
    title : string;
    image : string;
    video? : never;
    cta : CTA;
    isViewed : boolean;
    thumbnail : string;
}
