import "./globals.css"
//import "flag-icons/css/flag-icons.min.css"

import { Viewport } from "next"
import { env } from "@/env.mjs"

import {fontBody, fontHeading} from "@/config/fonts"
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import React from "react";
import {Header} from "@/components/header";
import {AuthProvider} from "@/contexts/auth-context";
import {MediaProvider} from "@/contexts/media-context";
import {DeviceProvider} from "@/contexts/DeviceContext";
import Footer from "@/components/pages/footer";

// ✅ ToastContainer eklendi
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
}

export async function generateMetadata() {
    return {
        // metadata devre dışı bırakılmış durumda
    }
}

export default function RootLayout({
                                       children
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="overflow-x-hidden overflow-y-scroll">
        <body
            className={cn(
                "antialiased",
                fontBody.variable,
                fontHeading.variable
            )}
        >
        <AuthProvider>
            <MediaProvider>
                <SmoothScrollProvider>
                    <DeviceProvider>
                        <Header />
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
                            <div className="min-h-screen w-full">{children}</div>
                            <div id="modal-root" />
                        </div>
                        <Footer />
                        <TailwindIndicator />
                        <Toaster />

                        {/* ✅ ToastContainer JSX'in içine yerleştirildi */}
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </DeviceProvider>
                </SmoothScrollProvider>
            </MediaProvider>
        </AuthProvider>
        </body>
        </html>
    )
}
