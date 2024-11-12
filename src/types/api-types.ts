import {BlocksContent} from "@strapi/blocks-react-renderer";



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

export type ResourceResponseTypeAPIList = {
    data : ResourceResponseTypeAPI[]
    meta : StrapiMetaType
}

export type ResourceResponseTypeAPI = {
    attributes : ResourceType
    id : string
}

type ResourceType = {
    title : string;
    slug : string;
    image : MediaType;
    createdAt  :string;
    updatedAt  :string;
    publishedAt  :string;
    content : BlocksContent;
    tags : string[];
    category : Category;
    video? : MediaType;
    author : {
        data : AuthorData
    }
}

export type CustomResourceResponse = ResourceType & {
    id : string;
    image : CustomMediaType;
    video : CustomMediaType;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    publishedAt: string; // ISO date string
    slug: string;
    content: any[]; // Assuming content is an array, the type depends on its structure
    category: Category;
    tags: Tag[];
    author: {
        "id": number,
        "Profile": BlocksContent,
        "createdAt": string,
        "updatedAt": string,
        "Name": string
    }
}

type MediaType = {
    data : {
        id: number;
        attributes : MediaAttributes
    }

};

export type MediaAttributes = {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        small: MediaFormat;
        thumbnail: MediaFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: {
        public_id: string;
        resource_type: string;
    };
    folderPath: string;
    createdAt: string;
    updatedAt: string;
}

type MediaFormat = {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
    provider_metadata: {
        public_id: string;
        resource_type: string;
    };
};

type StrapiMetaType = {
    pagination:{
        page: number,
        pageSize: number,
        pageCount: number,
        total: number
    }
}

type CustomMediaType = MediaAttributes & {
    id : string
}

export type CategoryAPIResponse = {
    data: {
        id: number;
        attributes: {
            title: string;
            slug: string;
            createdAt: string; // ISO date string
            updatedAt: string; // ISO date string
        };
    }[];
};

type Category = {
    id: number;
    title: string;
    slug: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
};

type TagStrapi = {
    data: {
        id: number;
        attributes: {
            title: string;
            slug: string;
            createdAt: string; // ISO date string
            updatedAt: string; // ISO date string
        };
    };
};

type Tag = {
    id: number;
    title: string;
    slug: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

export type AuthorStrapi = {
    data: AuthorData[];
    meta: StrapiMetaType;
};

export type AuthorData = {
    id: number;
    attributes: AuthorAttributes;
};

export type AuthorAttributes = {
    Profile: BlocksContent[];
    createdAt: string;
    updatedAt: string;
    Name: string;
    Social: SocialLink[];
    Picture: MediaType;
    blogs: ResourceResponseTypeAPIList;
};

export type SocialLink = {
    id: number;
    Name: string;
    Platform: string;
    Link: string;
};

type User = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string; // Hashed password
    resetPasswordToken: string | null;
    registrationToken: string | null;
    isActive: boolean;
    blocked: boolean;
    preferedLanguage: string | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

export type InterviewType = ResourceType

export type NewsType = ResourceType

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


export type ContactPageAPIResponse= {
    data: {
        id: number;
        attributes: {
            phone: string;
            email: string;
            address: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            Name: string | null;
            socials: SocialLink[];
        };
    };
    meta: Record<string, any>;
};
