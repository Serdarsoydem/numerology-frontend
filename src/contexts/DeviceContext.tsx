"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface DeviceContextProps {
    isMobile: boolean;
}

// Initialize the context with an empty default value
const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

interface DeviceProviderProps {
    children: ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkIfMobile = () => {
            return /Mobi|Android|iPhone|iPod/i.test(navigator.userAgent) && !navigator.userAgent.includes("iPad");
        };

        // Run only on the client
        if (typeof navigator !== "undefined") {
            setIsMobile(checkIfMobile());
        }
    }, []);

    return (
        <DeviceContext.Provider value={{ isMobile }}>
            {children}
        </DeviceContext.Provider>
    );
};

// Custom hook for consuming the context
export const useDevice = (): DeviceContextProps => {
    const context = useContext(DeviceContext);
    if (!context) {
        throw new Error("useDevice must be used within a DeviceProvider");
    }
    return context;
};
