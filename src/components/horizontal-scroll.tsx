"use client"
import React, { useRef } from 'react';
import {cn} from "@/lib/utils";
import {ChevronLeft, ChevronRight} from "lucide-react";

export interface HorizontalScroll
    extends React.InputHTMLAttributes<HTMLInputElement> {}


const HorizontalScroll = ({ children, className } : HorizontalScroll) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction : "left" | "right") => {
        if (direction === 'left') {
            // @ts-ignore
            scrollRef.current.scrollLeft -= 80;
        } else {
            // @ts-ignore
            scrollRef.current.scrollLeft += 80;
        }
    };

    return (
        <div className={cn("relative flex items-center",className)} >
            <button
                className="absolute left-0 top-0.5 z-10 text-accent border-none hover:animate-scale-up"
                onClick={() => scroll('left')}
            >
                <ChevronLeft className={"size-24"}/>
            </button>
            <div
                className={cn("relative flex items-center mx-16 border-none rounded-3xl overflow-x-auto scroll-smooth hide-scrollbar",className)}
                ref={scrollRef}
            >
                {children}
            </div>
            <button
                className="absolute right-0 top-0.5 z-10 text-accent border-none hover:animate-scale-up"
                onClick={() => scroll('right')}
            >
                <ChevronRight className={"size-24 "} />
            </button>
        </div>
    );
};

export default HorizontalScroll;
