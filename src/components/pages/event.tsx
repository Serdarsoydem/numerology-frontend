"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {EventResponseCustomType} from "@/types/api-types";
import {extractTimeFromISO, formatDate, getLocationDescription} from "@/utils";
import MuxPlayer from "@mux/mux-player-react";
import ContentRenderer from "@/components/content-renderer";
import {paymentActions} from "@/constants";

const EventPage = ({event} : {event : EventResponseCustomType}) => {
    const [isJoiningEvent, setIsJoiningEvent] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleInputChange = (e : any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e : any) => {
        e.preventDefault();
        const paymentParams = new URLSearchParams({
            ...formData,
            eventId: event.id,
            eventPrice: event.price.toString(),
            action : paymentActions.joinEvent
        });
        window.location.href = `/payment?${paymentParams}`;
    };

    console.log('event.schedule',event.schedule);

    return (
        <div className="min-h-screen ">
            {/* Hero Section */}
            <div className="relative h-96 text-white">
                <img
                    src={event.image.url}
                    alt="Event Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/50 to-blue-900/50" />
                <div className="relative container mx-auto px-4 py-20 h-full flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
                    <div className="flex flex-wrap gap-6 text-lg mb-8">
                        <span className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-white rounded-full" />
                            {formatDate(event.date)}
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-white rounded-full" />
                            {extractTimeFromISO(event.date)}
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-white rounded-full" />
                            {getLocationDescription(event.location)}
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                         {/* <span className="text-3xl font-bold">{event.price == 0 ? "Ücretsiz" : event.price.toFixed(2)}</span> */}
                        <Dialog open={isJoiningEvent} onOpenChange={setIsJoiningEvent}>
                            <DialogTrigger asChild>
                                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                                    Etkinliğe Katıl
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{event.title}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label>Ad Soyad</Label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Adınız ve Soyadınız"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label>Email Adresi</Label>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Email Adresiniz"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label>Telefon Numarası</Label>
                                        <Input
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Telefon Numaranız"
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        {event.price === 0 ? "Kaydol" : "Ödemeye Geç"}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                        <TabsTrigger value="overview">Açıklama</TabsTrigger>
                        {event.video ? <TabsTrigger value="video">Video</TabsTrigger> : <></>}
                        {event.schedule && Object.keys(event.schedule).length > 0 ? (
                            <TabsTrigger value="schedule">Etkinlik Planı</TabsTrigger>
                        ) : null}
                    </TabsList>

                    <TabsContent value="overview">
                            <ContentRenderer content={event.content}/>
                    </TabsContent>

                    {event.video &&
                    <TabsContent value="video">
                        <div className="aspect-video bg-gray-100 rounded-lg max-w-4xl">
                            <MuxPlayer src={event.video.url} className="mx-auto my-4"/>
                        </div>
                    </TabsContent>}

                    {event.schedule &&
                    <TabsContent value="schedule">
                        <div className="space-y-4 max-w-3xl">
                            {event.schedule.map((item, index) => (
                                <div key={index} className="flex gap-6 p-6 bg-white rounded-lg shadow-sm">
                                    <div className="font-semibold text-blue-600 w-32">
                                        {item.time}
                                    </div>
                                    <div className="text-gray-700">{item.description}</div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>}
                </Tabs>
            </div>
        </div>
    );
};

export default EventPage;

