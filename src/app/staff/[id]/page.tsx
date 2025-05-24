
import ConsultantProfile from "@/components/pages/profile/consultant-profile";
import ContactOptions from "@/components/pages/contact-options";
import {consultantEndpoint} from "@/utils/endpoints";
import {ProfileAPIResponse} from "@/types/api-types";

export default async function ArticlePage(
    {
        params : { id }
    }:
    {
        params : {
            id : string
        }
    }
) {

    const consultant = await fetchConsultant(id);
    console.log(consultant);

    return (
        <>
            <div className="lg:col-span-1">
                {consultant != null && <ConsultantProfile  consultant={consultant}/>}
            </div>
            <div className="lg:col-span-2">
                {consultant != null && <ContactOptions consultant={consultant}/>}
            </div>
        </>
    )
}

const fetchConsultant = async (slug : string) => {
    const response  = await fetch(consultantEndpoint + "/" + slug + "?populate=*");
    if (!response.ok) {
        return null;
    }
    return await response.json() as ProfileAPIResponse;
}