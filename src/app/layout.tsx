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
/*    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: {
      // @ts-ignore
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
    },
    icons: {
      icon: "/favicon.ico",
    },
    // manifest: `${siteConfig.url}/site.webmanifest`,*/
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
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        > */}
        <AuthProvider>
            <MediaProvider>
                <SmoothScrollProvider>
                    <DeviceProvider>
                        <Header/>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
                            <div className="min-h-screen w-full">{children}</div>
                            <div id="modal-root"/>
                        </div>
                        <Footer/>
                        <TailwindIndicator/>
                        <Toaster/>
                    </DeviceProvider>
                </SmoothScrollProvider>
            </MediaProvider>
        </AuthProvider>

        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
