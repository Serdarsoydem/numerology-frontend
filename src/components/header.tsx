"use client"
import Navigation from "@/components/nav/navigation";
import Link from "next/link";
import Image from "next/image";
import {NavigationMobile} from "@/components/nav/navigation-mobile";
import {NavigationMenuType} from "@/types/app-types";
import {NavigationMenuItem} from "@/components/ui/navigation-menu";
import SearchBox from "@/components/search";
import React, {useState} from "react";

export const Header =  () => {
    const navigationMenu: NavigationMenuType[] = [
        {
            title: "Haberler",
            href: "/newses",
        },
        {
            title: "Blog",
            href: "/blogs"
        },
        {
            title: "Röportajlar",
            href: "/interviews"
        },
        {
            title: "Etkinlikler",
            href: "/events"
        },
        {
            title: "İletişim",
            href: "/contact"
        },
        {
            title: "Servisler",
            href: "/services"
        },
        {
           title: "Yazarlar",
           href: "/BookAuthor"

        },

        {
            title: "Kitaplar",
            href: "/kitap"
        }

        ]

    return (
        <header
            className="fixed top-0 z-[50] w-full border-b border-neutral-200 bg-white/[0.8] backdrop-blur-sm dark:border-white/[0.1] dark:bg-black/[0.6]">
            <div className="container flex items-center justify-between border-2 rounded-[36px]">

                    <Link
                        href={"/"}
                        className="flex items-center justify-center gap-2 text-lg font-bold tracking-wide transition-all duration-300 ease-in-out"
                    >
                        <Image
                            src="/images/IHOPE-BRAND.svg"
                            width={80}
                            height={80}
                            alt="logo"
                            className="w-[160px] h-[80px]"
                        />
                    </Link>
                    <Navigation navigationMenu={navigationMenu}/>


                <div className="flex md:hidden flex-1 justify-end">
                    <SearchBox/>
                    <NavigationMobile navItems={navigationMenu}/>
                </div>
            </div>

        </header>

    )
}
