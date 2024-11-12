"use client"

import React, {createContext, useContext, useRef, useEffect, ReactNode, useState} from 'react';

// Define the shape of the context
interface MediaContextType {
    playMedia: (mediaElement: HTMLMediaElement) => void;
    stopMedia: () => void;
    isPlaying: boolean;
    setIsPlaying : (val :boolean) => void;
    setVideoRef : (mediaElement: HTMLMediaElement) => void;
}


const MediaContext = createContext<MediaContextType | undefined>(undefined);


export const MediaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    let currentMediaRef = useRef<HTMLMediaElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const playMedia = (mediaElement: HTMLMediaElement) => {
        // Pause the currently playing media, if any
        console.log("trying to play")

        if (currentMediaRef.current && currentMediaRef.current !== mediaElement) {
            currentMediaRef.current.pause();
        }
        // Set the new media as the current one and play it
        currentMediaRef.current = mediaElement;
        mediaElement.play().then(() => {
            setIsPlaying(true);
        });
    };

    const stopMedia = () => {
        if (currentMediaRef.current) {
            console.log("trying to stop")
            currentMediaRef.current.pause();
            currentMediaRef.current = null;
            setIsPlaying(false);
        }
    };

    const setVideoRef = (videoRef: HTMLMediaElement) =>{
        currentMediaRef.current=videoRef
    }

    // Ensure media is stopped when the user leaves the page
    useEffect(() => {
        return () => {
            stopMedia();
        };
    }, []);

    return (
        <MediaContext.Provider value={{ playMedia, stopMedia, isPlaying, setIsPlaying , setVideoRef}}>
            {children}
        </MediaContext.Provider>
    );
};

// Hook to use the media context
export const useMedia = (): MediaContextType => {
    const context = useContext(MediaContext);
    if (!context) {
        throw new Error('useMedia must be used within a MediaProvider');
    }
    return context;
};
