import FlippableCard from "@/components/flippable-card";
import {consultantEndpoint} from "@/utils/endpoints";
import {ProfileAPIResponseList} from "@/types/api-types";

const ConsultantListingPage =async () => {

    const consultants = await getConsultantList();


    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Uzmanlarımız
                    </h1>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Uzman danışmanlarımızdan hemen hizmet alın🚀🔥
                    </p>
                </div>

                {/* Responsive grid: 1 column on mobile, 3 columns on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {consultants != undefined && consultants.data.map(consultant => (
                        <div key={consultant.id} className="mb-8">
                            <FlippableCard consultant={consultant.attributes} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConsultantListingPage;


const getConsultantList = async () => {
    const list = await fetch(consultantEndpoint + "?filters[role][$eq]=consultant&populate=*")

    if (!list.ok) {
        return null;
    }

    return await list.json() as ProfileAPIResponseList;
}