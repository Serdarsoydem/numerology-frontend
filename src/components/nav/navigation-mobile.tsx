"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import {NavigationMenuType} from "@/types/app-types";
import {useState} from "react";

interface NavigationMobileProps {
  navItems : NavigationMenuType[]
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string
  disabled?: boolean
  segment: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileLink({
  children,
  href,
  disabled,
  segment,
  setIsOpen,
}: Readonly<MobileLinkProps>): JSX.Element {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        href.includes(segment) && "text-foreground",
        disabled && "pointer-events-none opacity-60"
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  )
}

export function NavigationMobile({
  navItems
}: Readonly<NavigationMobileProps>) {
  const segment = useSelectedLayoutSegment()
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="transition-all duration-300 ease-in-out">
        <Button variant="default" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col gap-10 transition-all duration-300 ease-in-out"
      >
        {/* Logo */}
        <div className="pl-4">
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
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-4 pl-16 text-xl font-medium leading-none tracking-wide">
          {navItems.map((item) => {
            if (!item.children) {
              // If the item has no children, render as a simple link
              return (
                <MobileLink
                  key={item.title}
                  href={item.href}
                  segment={String(segment)}
                  setIsOpen={setIsOpen}
                >
                  {item.title}
                </MobileLink>
              );
            } else {
              // If the item has children, render it with its sub-items
              return (
                <div key={item.title} className="flex flex-col">
              <span className="cursor-pointer text-lg font-semibold">
                {item.title}
              </span>
                  <div className="pl-4 flex flex-col gap-2">
                    {item.children.map((subItem) => (
                      <MobileLink
                        key={subItem.title}
                        href={subItem.href}
                        segment={String(segment)}
                        setIsOpen={setIsOpen}
                      >
                        {subItem.title}
                      </MobileLink>
                    ))}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </SheetContent>
    </Sheet>

  )
}
