import Link from "next/link";
import Image from "next/image";
import React from "react";
import {env} from "@/env.mjs";

export default function Footer() {

    return (


        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
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
                    <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
{/*                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Hakkımızda</a>
                        </li>*/}
                        <li>
                            <a href="/privacy" className="hover:underline me-4 md:me-6">Gizlilik Sözleşmesi</a>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:underline">İletişim</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700"/>
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a
                    href={`${env.NEXT_PUBLIC_APP_URL}`} className="hover:underline">IHope™</a> Tüm Haklar Saklıdır.</span>
            </div>
        </footer>


    )
}
