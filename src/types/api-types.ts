import {BlocksContent} from "@strapi/blocks-react-renderer";
import {StrapiCustomResponse, StrapiResponse, StrapiResponseList} from "@/types/utils";
import {CTA, CustomMediaType, MediaType, SocialLink} from "@/types/shared";

export type ResourceResponseTypeAPIList = StrapiResponseList<ResourceType<MediaType, AuthorResponseTypeAPI>>

export type ResourceResponseTypeAPI = StrapiResponse<ResourceType<MediaType, AuthorResponseTypeAPI>>

export type ResourceResponseCustomType= StrapiCustomResponse<ResourceType<CustomMediaType, AuthorCustomType>>

export type EventResponseTypeAPIList= StrapiResponseList<EventType<MediaType>>

export type EventResponseTypeAPI= StrapiResponse<EventType<MediaType>>

export type EventResponseCustomType= StrapiCustomResponse<EventType<CustomMediaType>>

export type StoryResponseTypeAPIList= StrapiResponseList<StoryType<MediaType>>

export type StoryResponseTypeAPI= StrapiResponse<StoryType<MediaType>>

export type CategoryAPIResponse = StrapiResponseList<Category>

export type AuthorResponseTypeAPI =  StrapiResponse<AuthorType<MediaType>>

export type AuthorResponseTypeAPIList =  StrapiResponseList<AuthorType<MediaType>>

export type AuthorCustomType =  StrapiCustomResponse<AuthorType<CustomMediaType>>

export type ContactPageAPIResponse = StrapiResponse<ContactPage>

export type PrivacyAPIResponse = StrapiResponse<PrivacyPolicy>

type StoryType<T extends MediaType | CustomMediaType> = {
    title : string;
    slug : string;
    description : string;
    storyMedia : T;
    cta : CTA[];
}

export type EventType<T extends MediaType | CustomMediaType>  = {
    title : string;
    slug : string;
    description : string;
    date : string;
    price : number;
    category : Category;
    tags : Tag[];
    image : T;
    video? : T;
    schedule? : {
        id : number;
        description : string;
        time : string;
    }[]
    location : Location
    content : BlocksContent
}

export type Location = OnlineLocation[] | OnSiteLocaion[]

type OnlineLocation = {
    "__component": "shared.online-location",
    "id": number,
    "url": string,
    "platform": "zoom" | "youtube" | "google_meets"
}

type OnSiteLocaion = {
    "__component": "shared.online-location",
    address : string;
    city : string;
    district : string;
}

type ResourceType<T extends MediaType | CustomMediaType, K extends AuthorResponseTypeAPI | AuthorCustomType>  = {
    title : string;
    slug : string;
    image : T;
    content : BlocksContent;
    tags : string[];
    category : Category;
    video? : T;
    author : K;
}

type Category = {
    id: number;
    title: string;
    slug: string;
};

type Tag = {
    id: number;
    title: string;
    slug: string;
}

export type AuthorType <T extends MediaType | CustomMediaType>= {
    profile: BlocksContent;
    name: string;
    social: SocialLink[];
    image: T;
    blogs?: ResourceResponseTypeAPIList;
    newses?: ResourceResponseTypeAPIList;
    interviews?: ResourceResponseTypeAPIList;
};

type ContactPage = {
    phone: string;
    email: string;
    address: string;
    name: string | null;
    socials: SocialLink[];
}

type PrivacyPolicy = {
    content : BlocksContent
}
