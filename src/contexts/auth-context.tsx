"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

// Define the AuthContext type
interface AuthContextType {
    isLoggedIn: boolean;
    login: (data: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    user : {
        email: string;
        username: string;
    } | undefined
}

// Create the AuthContext with the appropriate type and initial value
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{ email: string; username: string } | undefined>(undefined);
    const router = useRouter();

    // Decode JWT to get expiration time
    const getTokenExpiration = (token: string) => {
        try {
            const decoded: any = jwtDecode(token);
            if (decoded.exp) {
                return decoded.exp * 1000; // Convert to milliseconds
            }
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
        return null;
    };

    // Check if the token is expired
    const isTokenExpired = () => {
        const expiration = localStorage.getItem('tokenExpiration');
        if (!expiration) return true;
        const now = new Date().getTime();
        return now > parseInt(expiration);
    };

    // Initialize login state
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired()) {
            setIsLoggedIn(true);
            const user = localStorage.getItem("user")
            if (user) setUser(JSON.parse(user))
        } else {
            setIsLoggedIn(false);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('tokenExpiration');
        }
    }, []);

    // Login method
    const login = async (data: { email: string; password: string }) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        identifier: data.email,
                        password: data.password,
                    }),
                }
            );

            if (response.ok) {
                const result = await response.json();

                const expirationTime = getTokenExpiration(result.jwt);
                const user = {email: result.user.email + "" ,username: result.user.username +"" };

                if (!expirationTime) {
                    console.log("Auth Failed, could not get expirationTime")
                }else {
                    localStorage.setItem('token', result.jwt);
                    localStorage.setItem('tokenExpiration', expirationTime.toString());
                    localStorage.setItem('user', JSON.stringify(user));
                    setIsLoggedIn(true);
                    setUser(user)
                }

                router.push('/'); // Redirect to a protected page
            } else {
                // Handle errors
                const errorData = await response.json();
                console.error('Login failed:', errorData.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // Logout method
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        router.push('/login');
    };

    // Context value
    const value: AuthContextType = {
        isLoggedIn,
        login,
        logout,
        user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
