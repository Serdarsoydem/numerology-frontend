import {resourceNameMap} from "@/utils/constants";

export type NavigationMenuType = {
    title: string
    href: string
    disabled?: boolean
    children?: NavigationMenuType[]
    description?: string
}
export type ResourceNameType = keyof typeof resourceNameMap;
