"use client"

import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";
import {CTA} from "@/types/shared";

export const StoryCTA =  ({cta } : { cta : CTA}) => {

    return (
        <Link href={cta.actionType  === "event_registration" ?
            "/events/" + cta.event.data.attributes.slug : cta.url }>
            <Button
                className={`ml-auto`}
                variant={cta.variant}
            >
                {cta.text}

            </Button>
        </Link>
    )
}
