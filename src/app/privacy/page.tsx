import {PrivacyAPIResponse} from "@/types/api-types";
import ContentRenderer from "@/components/content-renderer";
import {redirect} from "next/navigation";
import {strapiEndpoint} from "@/utils/endpoints";


export default async function PrivacyPage() {

    const policy = await fetchPrivacyPolicy();

    if (!policy) redirect("/")

    return (
        <ContentRenderer content={policy?.data.attributes.content}/>
    )
};

const fetchPrivacyPolicy = async ()=> {
    const response = await fetch(`${strapiEndpoint}/privacy-policy`);
    if (!response.ok) {
        return undefined;
    }
    const json = await response.json();
    return json as PrivacyAPIResponse;
}
