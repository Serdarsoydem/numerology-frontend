"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {ProfileAPIResponse} from "@/types/api-types";
import React, {useState} from "react";

export default function ConsultantProfile({consultant} : {consultant : ProfileAPIResponse}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card className="overflow-hidden">
            <div className="relative h-48 w-full bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 transform">
                    <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white">
                        <img
                            src={consultant.data.attributes.image.data.attributes.url}
                            alt="Consultant profile"
                            width={128}
                            height={128}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <CardHeader className="pt-20 text-center">
                <CardTitle className="text-2xl font-bold">{consultant.data.attributes.name}</CardTitle>
                <CardDescription className="text-md">{consultant.data.attributes.summary}</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="mb-4 flex flex-wrap justify-center gap-2">
                    {consultant.data.attributes.skills.split(",").map((item, index) => (
                        <Badge key={index} variant="secondary">{item}</Badge>
                    ))}
                </div>

                <div className="mt-4 flex justify-center">
                    <div className="text-center">
                        {expanded && (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-left">
                                {consultant.data.attributes.experience.split(",").map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 flex-shrink-0 text-xs">
                                            ✓
                                        </div>
                                        <p className="text-gray-600 text-sm">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Button className="w-full" onClick={() => setExpanded(!expanded)}>
                    {expanded ? "Tecrübeleri Sakla" : "Tecrübeleri Gör"}
                </Button>
            </CardFooter>
        </Card>
    )
}

