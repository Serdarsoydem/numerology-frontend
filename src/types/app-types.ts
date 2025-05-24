import {resourceNameMap} from "@/utils/constants";

export type NavigationMenuType = {
    title: string
    href: string
    disabled?: boolean
    children?: NavigationMenuType[]
    description?: string
}
export type ResourceNameType = keyof typeof resourceNameMap;

export interface Message {
    id: number;
    sender: 'user' | 'other';
    text: string;
    timestamp: Date;
}

export interface Chat {
    id: number;
    contactName: string;
    lastMessage: string;
    lastMessageTime: Date;
    unreadCount: number;
    avatar: string;
    messages: Message[];
}

