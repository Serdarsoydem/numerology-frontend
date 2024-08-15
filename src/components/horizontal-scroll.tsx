"use client"
import React, {useEffect, useRef, useState} from 'react';
import {cn} from "@/lib/utils";
import {ChevronLeft, ChevronRight} from "lucide-react";

export interface HorizontalScroll
    extends React.InputHTMLAttributes<HTMLInputElement> {}


const HorizontalScroll = ({ children, className } : HorizontalScroll) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);


    const checkOverflow = () => {
        if (scrollRef.current) {
            const { scrollWidth, clientWidth } = scrollRef.current;
            console.log(scrollWidth,clientWidth)
            setIsOverflowing(scrollWidth > clientWidth);
        }
    };



    const scroll = (direction : "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, []);

    useEffect(() => {
        checkOverflow();
    }, [children]);


    return (
        <div className={cn("relative flex ",className)} >
            {isOverflowing && (
                <button
                    className="absolute left-0 top-0.5 z-10 text-accent border-none hover:animate-scale-up hidden md:block"
                    onClick={() => scroll('left')}
                >
                    <ChevronLeft className="size-24" />
                </button>
            )}
            <div
                className={cn("relative flex items-center mx-6 md:mx-16 border-none rounded-3xl overflow-x-auto scroll-smooth hide-scrollbar",className)}
                ref={scrollRef}
            >
                {children}
            </div>
            {isOverflowing && (
                <button
                    className="absolute right-0 top-0.5 z-10 text-accent border-none hover:animate-scale-up hidden md:block"
                    onClick={() => scroll('right')}
                >
                    <ChevronRight className="size-24" />
                </button>
            )}
        </div>
    );
};

export default HorizontalScroll;
