
export interface StrapiResponseList <T>{
    data: {
        attributes : T & BaseAttributes
        id : string
    }[]
    meta : StrapiMetaType
}

export interface StrapiResponse<T> {
    data: {
        attributes : T & BaseAttributes
        id : string
    }
    meta : {}
}

export type StrapiCustomResponse<T> = {
    id: string;
} & BaseAttributes & T;

type BaseAttributes = {
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
};

type StrapiMetaType = {
    pagination:{
        page: number,
        pageSize: number,
        pageCount: number,
        total: number
    }
}
