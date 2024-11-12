"use client"
import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface HorizontalScrollProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const HorizontalScroll = ({ children, className }: HorizontalScrollProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const checkOverflow = () => {
        if (scrollRef.current) {
            const { scrollWidth, clientWidth } = scrollRef.current;
            setIsOverflowing(scrollWidth > clientWidth);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 1.5; // Adjust for scroll speed
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const scroll = (direction: "left" | "right") => {
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
        <div
            className={cn("relative flex select-none group/scroll", className)} // Add "group" for hover effect
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDragStart={(e) => e.preventDefault()} // Prevent dragging for all children
        >
            {isOverflowing && (
                <button
                    className="absolute left-0 top-2/5 transform z-10 text-accent border-none hover:animate-scale-up opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300"
                    onClick={() => scroll('left')}
                >
                    <ChevronLeft className="size-24" />
                </button>
            )}
            <div
                className={cn("relative flex items-center border-none rounded-3xl overflow-x-auto scroll-smooth hide-scrollbar", className)}
                ref={scrollRef}
                onDragStart={(e) => e.preventDefault()} // Prevent dragging within the scrollable container
            >
                {children}
            </div>
            {isOverflowing && (
                <button
                    className="absolute right-0 top-2/5 transform z-10 text-accent border-none hover:animate-scale-up opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300"
                    onClick={() => scroll('right')}
                >
                    <ChevronRight className="size-24"/>
                </button>
            )}
        </div>
    );
};

export default HorizontalScroll;
