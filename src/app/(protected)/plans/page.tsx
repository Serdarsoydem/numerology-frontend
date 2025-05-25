import { SubscriptionPage } from "@/components/pages/subscription-page";


export default async function Page({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const {callback, data} = await searchParams

    console.log(callback)
    return (
        <div className="grid">
            <SubscriptionPage />
        </div>
    )
}
