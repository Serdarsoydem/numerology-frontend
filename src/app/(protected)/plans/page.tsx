import SubscriptionPage from "@/components/pages/subscription-page";

export default async function Page({
                                       searchParams,
                                   }: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // Eğer searchParams bir Promise ise await edebilirsin,
    // ama Next.js'de searchParams genellikle hazır objedir.
    // Yine de ihtiyaca göre düzenle.

    const { callback, data } = searchParams;

    console.log("Callback param:", callback);

    return (
        <div className="grid">
            <SubscriptionPage />
        </div>
    );
}
