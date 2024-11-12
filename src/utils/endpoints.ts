import {env} from "@/env.mjs";

const strapiEndpoint = env.NEXT_PUBLIC_STRAPI_URL + "/api"

export const blogsEndpoint = strapiEndpoint + "/blogs";
export const interviewEndpoint = strapiEndpoint + "/interviews";
export const newsEndpoint = strapiEndpoint + "/newses";
export const eventsEndpoint = strapiEndpoint + "/events";
export const authorsEndpoint = strapiEndpoint + "/authors";
export const servicesEndpoint = strapiEndpoint + "/services";

export const getEndpoint = (articleType: string) => {

    let endpoint = undefined;
    switch (articleType){
        case "newses":
            endpoint = newsEndpoint;
            break
        case "interviews":
            endpoint = interviewEndpoint;
            break
        case "blogs":
            endpoint = blogsEndpoint;
            break
        default:
            return;
    }
    return endpoint;
}
