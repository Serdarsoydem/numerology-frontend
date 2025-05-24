// components/ChatList.tsx
import React from 'react';
import { Chat } from '../types';

interface ChatListProps {
    chats: Chat[];
    activeChat: Chat | null;
    onSelectChat: (chat: Chat) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, activeChat, onSelectChat }) => {
    const formatTime = (date: Date) => {
        const today = new Date();
        const isToday = today.toDateString() === date.toDateString();

        if (isToday) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
    };

    return (
        <div className="h-full flex flex-col bg-white border-r">
            <div className="p-4 bg-gray-50 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
                <div className="mt-2">
                    <input
                        type="search"
                        placeholder="Search conversations..."
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                            activeChat?.id === chat.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => onSelectChat(chat)}
                    >
                        <div className="relative">
                            <img
                                src={chat.avatar}
                                alt={chat.contactName}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            {chat.unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unreadCount}
                </span>
                            )}
                        </div>
                        <div className="ml-3 flex-1 overflow-hidden">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-medium text-gray-900 truncate">{chat.contactName}</h3>
                                <span className="text-xs text-gray-500">{formatTime(chat.lastMessageTime)}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// components/ChatWindow.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Chat, Message } from '../types';

interface ChatWindowProps {
    chat: Chat;
    onSendMessage: (chatId: number, text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onSendMessage }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat.messages]);

    const handleSendMessage = () => {
        if (input.trim() === '') return;
        onSendMessage(chat.id, input);
        setInput('');
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatMessageDate = (date: Date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (today.toDateString() === date.toDateString()) {
            return 'Today';
        } else if (yesterday.toDateString() === date.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
        }
    };

    // Group messages by date
    const groupedMessages: { [key: string]: Message[] } = {};
    chat.messages.forEach(message => {
        const dateKey = message.timestamp.toDateString();
        if (!groupedMessages[dateKey]) {
            groupedMessages[dateKey] = [];
        }
        groupedMessages[dateKey].push(message);
    });

    return (
        <div className="flex flex-col h-full bg-gray-100">
            {/* Chat header */}
            <div className="px-4 py-3 bg-white border-b flex items-center shadow-sm">
                <img
                    src={chat.avatar}
                    alt={chat.contactName}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                    <h2 className="font-semibold text-gray-800">{chat.contactName}</h2>
                    <p className="text-xs text-gray-500">Online</p>
                </div>
            </div>

            {/* Messages container */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                {Object.keys(groupedMessages).map(dateKey => (
                    <div key={dateKey}>
                        <div className="flex justify-center my-4">
              <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                {formatMessageDate(new Date(dateKey))}
              </span>
                        </div>
                        {groupedMessages[dateKey].map((message) => (
                            <div
                                key={message.id}
                                className={`mb-3 flex ${
                                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                                        message.sender === 'user'
                                            ? 'bg-blue-500 text-white rounded-br-none'
                                            : 'bg-white text-gray-800 rounded-bl-none shadow'
                                    }`}
                                >
                                    <p>{message.text}</p>
                                    <span className={`text-xs ${
                                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                    } block text-right mt-1`}>
                    {formatTime(message.timestamp)}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="bg-white p-3 flex items-center border-t">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                    }}
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Type a message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
    );
};

// components/EmptyState.tsx
import React from 'react';

const EmptyState: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <h3 className="mt-4 text-xl font-medium">Select a chat to start messaging</h3>
            <p className="mt-2 text-sm text-gray-500">Choose from your existing conversations or start a new one</p>
        </div>
    );
};

export { ChatList, ChatWindow, EmptyState };