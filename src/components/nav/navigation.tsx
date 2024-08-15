"use client"

import {
    NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {cn} from "@/lib/utils";
import React from "react";
import {NavigationMenuType} from "@/types/api-types";


const Navigation = () => {
    const navigationMenu: NavigationMenuType[] = [
        {
            title: "Haberler",
            href: "/haberler",
        },
        {
            title: "Blog",
            href: "/blog"
        },
        {
            title: "Röportajlar",
            href: "/roportajlar"
        },
        {
            title: "İletişim",
            href: "/contact"
        },
        {
            title: "Servisler",
            href: "/servisler"
        },
        {
            title : "Giriş Yap",
            href : "giris"
        }
    ]
    return (
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                {navigationMenu.map((item) => {
                    if (!item.children) {
                        return (
                            <NavigationMenuItem key={item.title} asChild>
                                <Link href={item.href} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "bg-transparent"
                                        )}
                                    >
                                        {item.title}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        )
                    } else {
                        return (
                            <NavigationMenuItem key={item.title}>
                                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[230px] gap-3 p-4">
                                        {item.children.map((subItem) => (
                                            <ListItem
                                                key={subItem.title}
                                                href={subItem.href}
                                                title={subItem.title}
                                            >
                                                {subItem.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        )
                    }
                })}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default Navigation
