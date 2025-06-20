"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const baseUrl = "http://localhost:1337";

interface PodcastItem {
    __component: string;
    Title?: string;
    Voice?: string;
    Description?: string;
    Audio?: {
        url: string;
    };
    Image?: {
        data?: {
            attributes?: {
                url?: string;
            };
        } | null;
    } | null;
}

interface Kitap {
    id: number;
    Title: string;
    Podcast: PodcastItem[];
}

export default function Kitaplar() {
    const [kitaplar, setKitaplar] = useState<Kitap[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${baseUrl}/api/kitaps?populate=Podcast.Image,Podcast.Audio`
                );
                const data = await res.json();

                const mapped: Kitap[] = data.data.map((item: any) => ({
                    id: item.id,
                    Title: item.attributes.Title,
                    Podcast: item.attributes.Podcast,
                }));

                setKitaplar(mapped);
            } catch (error) {
                console.error("Veri alınırken hata oluştu:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Kitaplar</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {kitaplar.map((kitap) => (
                    <div
                        key={kitap.id}
                        className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300"
                    >
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">{kitap.Title}</h2>

                        {kitap.Podcast && kitap.Podcast.length > 0 && (
                            <div className="space-y-4">
                                {kitap.Podcast.map((item, index) => {
                                    if (item.__component === "shared.podcast") {
                                        const imageUrlRaw = item.Image?.data?.attributes?.url;
                                        const imageUrl =
                                            imageUrlRaw?.startsWith("http")
                                                ? imageUrlRaw
                                                : imageUrlRaw
                                                    ? baseUrl + (imageUrlRaw.startsWith("/") ? imageUrlRaw : "/" + imageUrlRaw)
                                                    : null;

                                        const audioUrlRaw = item.Audio?.url;
                                        const audioUrl =
                                            audioUrlRaw?.startsWith("http")
                                                ? audioUrlRaw
                                                : audioUrlRaw
                                                    ? baseUrl + (audioUrlRaw.startsWith("/") ? audioUrlRaw : "/" + audioUrlRaw)
                                                    : null;

                                        return (
                                            <div key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                                                <p className="font-medium text-gray-800">{item.Title || "Podcast"}</p>

                                                {item.Voice && (
                                                    <p className="text-sm text-gray-700 mb-1">Voice: {item.Voice}</p>
                                                )}

                                                {item.Description && (
                                                    <p className="text-sm text-gray-600 mb-2">{item.Description}</p>
                                                )}

                                                {imageUrl ? (
                                                    <div
                                                        className="relative my-2 rounded-lg overflow-hidden"
                                                        style={{ width: "100%", maxWidth: "400px", height: "200px" }}
                                                    >
                                                        <Image
                                                            src={imageUrl}
                                                            alt={item.Title || "Podcast"}
                                                            fill
                                                            className="object-cover rounded-lg"
                                                            priority
                                                            sizes="(max-width: 768px) 100vw, 33vw"
                                                        />
                                                    </div>
                                                ) : (
                                                    <p>Resim yok</p>
                                                )}

                                                {audioUrl && (
                                                    <audio controls className="w-full mt-2">
                                                        <source src={audioUrl} type="audio/mpeg" />
                                                        Tarayıcınız ses oynatıcıyı desteklemiyor.
                                                    </audio>
                                                )}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
