import {EventResponseTypeAPI, EventType} from "@/types/api-types";

export type MediaType = {
    data : {
        id: number;
        attributes : MediaAttributes
    }
};

type MediaAttributes = {
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

export type CustomMediaType = MediaAttributes & {
    id : string
}

export type SocialLink = {
    id: number;
    name: string;
    platform: "Facebook" | "Instagram" | "X" | "Tiktok";
    link: string;
};

// Base CTA type with common properties
type BaseCTA = {
    id: number;
    __component: 'shared.cta';
    variant : "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
    text: string;
};

// Event Registration CTA
type EventRegistrationCTA = BaseCTA & {
    actionType: 'event_registration';
    event: EventResponseTypeAPI;
};


type LinkCTA = BaseCTA & {
    actionType: 'link';
    url: string;
};

// Union type for all possible CTA variants
export type CTA = EventRegistrationCTA | LinkCTA;


