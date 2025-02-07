import {redirect} from "next/navigation";
import Article from "@/components/pages/Article";
import {ResourceResponseCustomType} from "@/types/api-types";
import {resourceNameMap} from "@/utils/constants";
import {blogsEndpoint, interviewEndpoint, newsEndpoint} from "@/utils/endpoints";
import {ResourceNameType} from "@/types/app-types";


export default async function ArticlePage(
    {
        params : { slug , articleType}
    }:
        {
            params : {
                slug : string
                articleType : string
            }
        }
) {

    const resourceNameKeys = Object.keys(resourceNameMap) as ResourceNameType[];
    if (!resourceNameKeys.includes(articleType as keyof typeof resourceNameMap)) {
        redirect("/");
    }

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

    if (!endpoint) redirect("/");
    const article = await fetchArticle(endpoint + "/slug/" + slug);
    if (!article) redirect("/"+articleType);

    return (
        <>
            {article ? <Article article={article}/> : <div></div>}
        </>
    )
}


const fetchArticle = async (endpoint: string): Promise<ResourceResponseCustomType | null > => {
    const response = await fetch(endpoint);

    if (!response.ok) {
        return null;
    }

    return await response.json() as ResourceResponseCustomType;
};
