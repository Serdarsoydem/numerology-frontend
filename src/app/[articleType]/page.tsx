import {redirect} from "next/navigation";
import {CustomResourceResponse} from "@/types/api-types";
import {resourceNameMap} from "@/utils/constants";
import {getEndpoint} from "@/utils/endpoints";
import InfiniteScrollArticles from "@/components/pages/scroll-articles";
import {ResourceNameType} from "@/types/app-types";
import CategoryNav from "@/components/nav/category-nav";
import HorizontalScroll from "@/components/horizontal-scroll";


export default async function ArticlePage(
    {
        params : { articleType}
    }:
        {
            params : {
                articleType : string
            }
        }
) {

    const resourceNameKeys = Object.keys(resourceNameMap) as ResourceNameType[];
    if (!resourceNameKeys.includes(articleType as keyof typeof resourceNameMap)) {
        redirect("/");
    }

    let endpoint = getEndpoint(articleType)
    if (!endpoint) redirect("/");

    return (
        <>
            <InfiniteScrollArticles articleType={articleType as keyof typeof resourceNameMap}/>
        </>
    )
}
