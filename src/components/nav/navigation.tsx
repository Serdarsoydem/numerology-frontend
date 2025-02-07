"use client"

import {
    NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {cn} from "@/lib/utils";
import React, {useState} from "react";
import SearchBox from "@/components/search";
import {useAuth} from "@/contexts/auth-context";
import {NavigationMenuType} from "@/types/app-types";
import AvatarDropdown from "@/components/nav/avatar-dropdown";
import {useRouter} from "next/navigation";

type NavigationMenuProps = {
    navigationMenu: NavigationMenuType[]
}

const Navigation = ({navigationMenu} : NavigationMenuProps) => {
    const router = useRouter();

    const {isLoggedIn, logout, user} = useAuth();
    const handleProfileClick = () => {

        router.push('/profile'); // Redirect to a protected page

    };

    const handleLogoutClick = () => {
        // Your logout logic
        logout();
    };
    return (
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                <NavigationMenuItem asChild>
                    <SearchBox/>
                </NavigationMenuItem>
                {navigationMenu.map((item) => {
                    if (!item.children ) {
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
                {!isLoggedIn ?  (
                    <NavigationMenuItem asChild>
                        <Link href={"login"} legacyBehavior passHref>
                            <NavigationMenuLink
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    "bg-transparent"
                                )}
                            >
                                Giriş
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ) : (
                    <AvatarDropdown onProfileClick={handleProfileClick} onLogoutClick={handleLogoutClick} />
                )}

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
