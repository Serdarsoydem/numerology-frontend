"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MessageCircle, Video, Clock, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import {ProfileAPIResponse} from "@/types/api-types";

export default function ContactOptions({consultant} : {consultant : ProfileAPIResponse}) {
    const [message, setMessage] = useState("")

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">{consultant.data.attributes.name}'dan danışmanlık al🚀</CardTitle>
                <CardDescription>Nasıl İletişime Geçmek İstersiniz?</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="chat" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="chat" className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            <span className="hidden sm:inline">Chat</span>
                        </TabsTrigger>
                        <TabsTrigger value="reservation" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span className="hidden sm:inline">Resarvasyon</span>
                        </TabsTrigger>
                        <TabsTrigger value="video" className="flex items-center gap-2">
                            <Video className="h-4 w-4" />
                            <span className="hidden sm:inline">Video Araması</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="chat" className="mt-6">
                        <div className="space-y-4">
                            <div className="rounded-lg bg-muted p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <div className="h-8 w-8 overflow-hidden rounded-full bg-primary">
                                        <Image
                                            src={consultant.data.attributes.image.data.attributes.url}
                                            alt="Consultant"
                                            width={32}
                                            height={32}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <span className="font-medium">{consultant.data.attributes.name}</span>
                                </div>
                                <p className="text-sm">
                                    Merhaba! Mesajınızı iletin. En kısa zaman içinde size dönüş yapacağım.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Textarea
                                    placeholder="Mesajınızı buraya yazın..."
                                    className="min-h-[120px]"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <div className="flex justify-end">
                                    <Button className="flex items-center gap-2">
                                        <Send className="h-4 w-4" />
                                        Mesajı Gönder
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="reservation" className="mt-6">
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Tarih</Label>
                                    <Input id="date" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="time">Zaman</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="9:00">9:00</SelectItem>
                                            <SelectItem value="10:00">10:00</SelectItem>
                                            <SelectItem value="11:00">11:00</SelectItem>
                                            <SelectItem value="13:00">1:00</SelectItem>
                                            <SelectItem value="14:00">2:00</SelectItem>
                                            <SelectItem value="15:00">3:00</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="topic">Ne Konuda Danışmak İstiyorsunuz?</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select topic" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="strategy">Business Strategy</SelectItem>
                                        <SelectItem value="marketing">Marketing Plan</SelectItem>
                                        <SelectItem value="finance">Financial Analysis</SelectItem>
                                        <SelectItem value="operations">Operations Optimization</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Diğer Notlarınız</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Please provide any additional details about your consultation needs..."
                                />
                            </div>

                            <Button className="w-full">Resarvasyon Yap</Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="video" className="mt-6">
                        <div className="space-y-4">
                            <div className="rounded-lg border border-dashed border-muted-foreground/50 p-8 text-center">
                                <Video className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-medium">Vido Aramasını Ayarla</h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {consultant.data.attributes.name} ile video aramasını reserve edin!
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="video-date">Tarih</Label>
                                    <Input id="video-date" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="video-time">Zaman</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="9:00">9:00</SelectItem>
                                            <SelectItem value="10:00">10:00</SelectItem>
                                            <SelectItem value="11:00">11:00</SelectItem>
                                            <SelectItem value="13:00">1:00</SelectItem>
                                            <SelectItem value="14:00">2:00</SelectItem>
                                            <SelectItem value="15:00">3:00</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="duration">Görüşme Süresi</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="30">30 minutes</SelectItem>
                                        <SelectItem value="60">60 minutes</SelectItem>
                                        <SelectItem value="90">90 minutes</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button className="w-full">Video Görüşmesi Planla</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t px-6 py-4">
                <div className="flex items-center justify-between gap-4">
                    <span >İletişime gererken sorun mu yaşıyorsunuz?  </span>
                    <Button variant="outline" size="sm">
                        <a href={"/contact"}>Yardım</a>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

