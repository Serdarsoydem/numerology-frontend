import React from 'react';
import {Icons} from "@/utils/icons";
import {env} from "@/env.mjs";
import {redirect} from "next/navigation";
import {ContactPageAPIResponse} from "@/types/api-types";
import {PhoneIcon} from "lucide-react";
import Link from "next/link";
import ContactMessage from "@/components/forms/contact-message";

export default async function Contact() {

    const contactPageInfo = await fetchContactInfo();

    console.log(contactPageInfo);

    return (
        <div className="my-6">
            <div
                className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white rounded-md font-[sans-serif]">
                <div>
                    <h1 className="text-3xl font-extrabold">Buyrun Konuşalım</h1>
                    <p className="text-sm text-gray-400 mt-3">Kendi potansiyelinizi keşfedin, iç huzura ulaşmak için numeroloji rehberliğimizden yararlanın. Size özel bir yolculuğa başlamak için bize ulaşın
                    </p>
                    <div className="mt-12">
                        <h2 className="text-lg font-extrabold">Email</h2>
                        <ul className="mt-3">
                            <li className="flex items-center">
                                <div
                                    className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                    <Icons.mail/>
                                </div>
                                <a
                                    href={`mailto:${contactPageInfo.data.attributes.email}`}
                                    className="text-sm ml-3"
                                >
                                    <strong>{contactPageInfo.data.attributes.email}</strong>
                                </a>

                            </li>
                        </ul>
                    </div>
                    <div className="mt-12">
                        <h2 className="text-lg font-extrabold">Telefon Numarası</h2>
                        <ul className="mt-3">
                            <li className="flex items-center">
                                <div
                                    className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                    <PhoneIcon/>
                                </div>
                                <a
                                    href={`tel:${contactPageInfo.data.attributes.phone}`}
                                    className="text-sm ml-3"
                                >
                                    <strong>{contactPageInfo.data.attributes.phone}</strong>
                                </a>

                            </li>
                        </ul>
                    </div>
                    {contactPageInfo.data.attributes.socials.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-lg font-extrabold">Sosyal Medya</h2>
                            <ul className="flex mt-3 space-x-4">
                                {contactPageInfo.data.attributes.socials.map((social, index) => (
                                    <li key={index}
                                        className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                        <Link target="_blank" href={social.link}>
                                            {/* Render the social platform's icon or text conditionally */}
                                            {social.platform === "Facebook" && <Icons.facebook/>}
                                            {social.platform === "Instagram" && <Icons.instagram/>}
                                            {social.platform === "X" && <Icons.twitter/>}
                                            {social.platform === "Tiktok" && <Icons.tiktok/>}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className={"space-y-6"}>
                    <ContactMessage/>
                </div>
            </div>
        </div>
    );
}

const fetchContactInfo = async () => {
    const response = await fetch(env.NEXT_PUBLIC_STRAPI_URL + "/api/contact?populate=*")

    if (!response.ok) {
        redirect("/")
    }

    return await response.json() as ContactPageAPIResponse;
}
