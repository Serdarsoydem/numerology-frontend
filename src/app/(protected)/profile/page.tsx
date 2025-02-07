"use client"

import React, { useState } from 'react';
import { User, Calendar, ShoppingCart, Edit, Save, Lock } from 'lucide-react';
import UserProfile from "@/components/pages/profile/user";

interface UserProfile {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    eventRegistrations: Array<{
        id: number;
        eventName: string;
        date: string;
        status: 'Confirmed' | 'Pending' | 'Cancelled';
    }>;
    services: Array<{
        id: number;
        serviceName: string;
        date: string;
        status: string;
    }>;
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'events' | 'services'>('events');
     const [profile, setProfile] = useState<UserProfile>({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, Anytown, USA',
        eventRegistrations: [
            { id: 1, eventName: 'Tech Conference 2024', date: '2024-07-15', status: 'Confirmed' },
            { id: 2, eventName: 'Startup Pitch Night', date: '2024-08-22', status: 'Pending' }
        ],
        services: [
            { id: 1, serviceName: 'Cloud Hosting', date: '2024-01-15', status: 'Active' },
            { id: 2, serviceName: 'Design Consultation', date: '2024-03-20', status: 'Completed' }
        ]
    });



    const renderStatusBadge = (status: string) => {
        const statusClasses = {
            'Confirmed': 'bg-green-100 text-green-800',
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Cancelled': 'bg-red-100 text-red-800',
            'Active': 'bg-blue-100 text-blue-800',
            'Completed': 'bg-green-100 text-green-800'
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };



    return (
        <div className="container mx-auto p-4">
            <UserProfile />
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'events'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
                    >
                        <Calendar className="inline-block mr-2 -mt-1 w-4 h-4" />
                        Events
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'services'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
                    >
                        <ShoppingCart className="inline-block mr-2 -mt-1 w-4 h-4" />
                        Services
                    </button>
                </nav>
            </div>

            {/* Events/Services Table remains the same as previous implementation */}
            <div className="bg-white shadow rounded-lg mt-4 overflow-hidden">
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                        {activeTab === 'events' ? 'Event Registrations' : 'Services Used'}
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {activeTab === 'events' ? 'Event Name' : 'Service Name'}
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {activeTab === 'events' ? (
                                profile.eventRegistrations.map(event => (
                                    <tr key={event.id}>
                                        <td className="px-4 py-4 whitespace-nowrap">{event.eventName}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">{event.date}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            {renderStatusBadge(event.status)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                profile.services.map(service => (
                                    <tr key={service.id}>
                                        <td className="px-4 py-4 whitespace-nowrap">{service.serviceName}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">{service.date}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            {renderStatusBadge(service.status)}
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
