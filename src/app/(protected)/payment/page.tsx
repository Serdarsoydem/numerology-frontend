import Link from "next/link";
import {Separator} from "@radix-ui/react-menu";
import {Icons} from "@/utils/icons";
import {Card, CardContent} from "@/components/ui/card";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Image from "next/image";
import React from "react";


export default async function Page({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const {callback, data} = await searchParams

    console.log(callback)
    return (
        <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
            <div className="p-6 md:p-8 lg:p-10 flex flex-col">
                <div className="mx-auto max-w-md space-y-6 flex-1">
                    <div className="flex flex-col space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight">İşlem Özeti</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Lütfen İşlem Özetini Kontrol Ediniz
                        </p>
                    </div>
                    <Card>
                        <CardContent className="grid gap-4 font-bold">
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div>Ürün</div>
                                <div>Değişken</div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>Kredi</div>
                                <div>Değişken</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>Toplam</div>
                                <span className={"flex items-center text-lg"}>Değişken
                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex flex-col overflow-hidden">
                <div className="flex-1 overflow-auto p-6 md:p-8 lg:p-10">
                    <div className="mx-auto max-w-md space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Ödeme</h1>
                            <p className="text-gray-500 dark:text-gray-400">Satın Alın</p>
                        </div>
                        <Accordion type="single" defaultValue={ "credit-card"} collapsible
                                   className="w-full">
                            <AccordionItem value="billing-info">
                                <AccordionTrigger>Fatura Bilgileri</AccordionTrigger>
                                <AccordionContent>
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                   Biiling info sayfası ITransl8'den al
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="credit-card">
                                <AccordionTrigger>Kredi Kartı Bilgileri</AccordionTrigger>
                                <AccordionContent>
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    Credit Card ITransl8'den al
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}
