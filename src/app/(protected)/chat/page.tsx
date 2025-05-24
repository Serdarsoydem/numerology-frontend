// pages/index.tsx
"use client"
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { ChatList, ChatWindow, EmptyState } from '@/components/ChatComponents';
import { Chat, Message } from '@/types/app-types';

const Home: NextPage = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChat, setActiveChat] = useState<Chat | null>(null);
    const [isMobileView, setIsMobileView] = useState(false);
    const [showChatList, setShowChatList] = useState(true);

    useEffect(() => {
        // Load mock data
        setChats(generateMockChats());

        // Check for mobile view
        const checkMobile = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSelectChat = (chat: Chat) => {
        // Clear unread count when selecting a chat
        const updatedChats = chats.map(c => {
            if (c.id === chat.id) {
                return { ...c, unreadCount: 0 };
            }
            return c;
        });

        setChats(updatedChats);
        setActiveChat(updatedChats.find(c => c.id === chat.id) || null);

        // On mobile, hide the chat list when a chat is selected
        if (isMobileView) {
            setShowChatList(false);
        }
    };

    const handleSendMessage = (chatId: number, text: string) => {
        const now = new Date();
        const newMessage: Message = {
            id: Date.now(),
            sender: 'user',
            text,
            timestamp: now,
        };

        const updatedChats = chats.map(chat => {
            if (chat.id === chatId) {
                return {
                    ...chat,
                    messages: [...chat.messages, newMessage],
                    lastMessage: text,
                    lastMessageTime: now,
                };
            }
            return chat;
        });

        setChats(updatedChats);
        setActiveChat(updatedChats.find(c => c.id === chatId) || null);

        // Simulate response after 1-2 seconds
        setTimeout(() => {
            const responseText = `This is a simulated response to: "${text}"`;
            const responseTime = new Date();
            const responseMessage: Message = {
                id: Date.now(),
                sender: 'other',
                text: responseText,
                timestamp: responseTime,
            };

            const chatsWithResponse = chats.map(chat => {
                if (chat.id === chatId) {
                    return {
                        ...chat,
                        messages: [...chat.messages, newMessage, responseMessage],
                        lastMessage: responseText,
                        lastMessageTime: responseTime,
                    };
                }
                return chat;
            });

            setChats(chatsWithResponse);
            if (activeChat?.id === chatId) {
                setActiveChat(chatsWithResponse.find(c => c.id === chatId) || null);
            }
        }, 1000 + Math.random() * 1000);
    };

    const toggleChatList = () => {
        setShowChatList(!showChatList);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>Chat App</title>
                <meta name="description" content="A WhatsApp-like chat application" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="h-screen flex flex-col">
                {/* Header */}
                <header className="bg-blue-600 text-white p-4 shadow-md">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold">Chat App</h1>
                        {isMobileView && (
                            <button
                                onClick={toggleChatList}
                                className="p-2 rounded hover:bg-blue-700"
                            >
                                {showChatList ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                        <polyline points="12 19 5 12 12 5"></polyline>
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 flex overflow-hidden">
                    {/* Chat list - hidden on mobile when viewing a chat */}
                    {(!isMobileView || showChatList) && (
                        <div className="w-full md:w-80 flex-shrink-0 h-full">
                            <ChatList
                                chats={chats}
                                activeChat={activeChat}
                                onSelectChat={handleSelectChat}
                            />
                        </div>
                    )}

                    {/* Chat window or empty state */}
                    {(!isMobileView || !showChatList) && (
                        <div className="flex-1 h-full">
                            {activeChat ? (
                                <ChatWindow
                                    chat={activeChat}
                                    onSendMessage={handleSendMessage}
                                />
                            ) : (
                                <EmptyState />
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Home;


export const generateMockChats = (): Chat[] => {
    return [
        {
            id: 1,
            contactName: "Sarah Johnson",
            lastMessage: "See you tomorrow!",
            lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
            unreadCount: 0,
            avatar: "/api/placeholder/40/40",
            messages: [
                {
                    id: 1,
                    sender: 'other',
                    text: "Hey there! How's your project coming along?",
                    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
                },
                {
                    id: 2,
                    sender: 'user',
                    text: "Going well! I'm almost done with the design phase.",
                    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 min ago
                },
                {
                    id: 3,
                    sender: 'other',
                    text: "That's great to hear! Can we meet tomorrow to discuss?",
                    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 min ago
                },
                {
                    id: 4,
                    sender: 'user',
                    text: "Sure thing! How about 2pm at the cafe?",
                    timestamp: new Date(Date.now() - 1000 * 60 * 8), // 8 min ago
                },
                {
                    id: 5,
                    sender: 'other',
                    text: "See you tomorrow!",
                    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
                }
            ]
        },
        {
            id: 2,
            contactName: "Alex Wong",
            lastMessage: "Did you check the latest design?",
            lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            unreadCount: 2,
            avatar: "/api/placeholder/40/40",
            messages: [
                {
                    id: 1,
                    sender: 'other',
                    text: "Hey, I just sent you the new design files",
                    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 60 min ago
                },
                {
                    id: 2,
                    sender: 'other',
                    text: "Did you check the latest design?",
                    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
                }
            ]
        },
        {
            id: 3,
            contactName: "Michael Chen",
            lastMessage: "The meeting is scheduled for Thursday",
            lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            unreadCount: 0,
            avatar: "/api/placeholder/40/40",
            messages: [
                {
                    id: 1,
                    sender: 'other',
                    text: "Hi there, I'm organizing the team meeting this week",
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
                },
                {
                    id: 2,
                    sender: 'user',
                    text: "Great, what day works best?",
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), // 2.5 hours ago
                },
                {
                    id: 3,
                    sender: 'other',
                    text: "The meeting is scheduled for Thursday",
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
                }
            ]
        },
        {
            id: 4,
            contactName: "Emma Davis",
            lastMessage: "Thanks for the help!",
            lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
            unreadCount: 0,
            avatar: "/api/placeholder/40/40",
            messages: [
                {
                    id: 1,
                    sender: 'other',
                    text: "Can you help me with that React issue?",
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
                },
                {
                    id: 2,
                    sender: 'user',
                    text: "Sure, try using useEffect instead of componentDidMount",
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5.5), // 5.5 hours ago
                },
                {
                    id: 3,
                    sender: 'other',
                    text: "Thanks for the help!",
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
                }
            ]
        },
        {
            id: 5,
            contactName: "Team Project",
            lastMessage: "Let's finalize the requirements",
            lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            unreadCount: 5,
            avatar: "/api/placeholder/40/40",
            messages: [
                {
                    id: 1,
                    sender: 'other',
                    text: "Let's finalize the requirements",
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
                }
            ]
        }
    ];
};