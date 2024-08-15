"use client"
import Navigation from "@/components/nav/navigation";
import Link from "next/link";
import Image from "next/image";

export const Header = async () => {
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
                <Navigation/>
            </div>
        </header>

    )
}
