"use client"
import React from 'react';
import { useState } from 'react';
import {Profile} from "@/types/api-types";
import {MediaType} from "@/types/shared";


// Individual Consultant Card Component
const FlippableCard = ({ consultant } : {consultant : Profile<MediaType>}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="relative w-full h-96 transition-transform duration-700 preserve-3d"
            style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
        >
            {/* Front of Card */}
            <div
                className={`absolute w-full h-full bg-white rounded-xl shadow-lg p-6 ${
                    isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
                } transition-opacity duration-700`}
                style={{ backfaceVisibility: 'hidden' }}
            >
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-blue-100 mb-4 overflow-hidden">
                        <img
                            src={consultant.image.data.attributes.url}
                            alt={consultant.image.data.attributes.url}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{consultant.name}</h2>
                    <p className="text-md text-gray-600 mb-2">{consultant.name}</p>

                    <p className="text-gray-600 text-center text-sm mb-6 line-clamp-2">
                        {consultant.summary}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {consultant.skills.split(",").map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                    {skill}
                            </span>
                        ))}
                    </div>
                    <button
                        onClick={handleFlip}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                        Detayları İncele
                    </button>
                </div>
            </div>

            {/* Back of Card */}
            <div
                className={`absolute w-full h-full bg-white rounded-xl shadow-lg p-6 ${
                    isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } transition-opacity duration-700`}
                style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                }}
            >
                <div className="flex flex-col h-full">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Tecrübeler</h3>
                    <ul className="space-y-2 mb-4">
                        {consultant.experience.split(",").map((item, index) => (
                            <li key={index} className="flex items-start">
                                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 flex-shrink-0 text-xs">
                                    ✓
                                </div>
                                <p className="text-gray-600 text-sm">{item}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-auto">
                        <button
                            onClick={handleFlip}
                            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                        >
                            Geri Dön
                        </button>
                        <button
                            onClick={handleFlip}
                            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                        >
                            Geri Dön
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlippableCard;