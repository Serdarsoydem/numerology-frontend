// types.ts
export interface Message {
    id: number;
    sender: 'user' | 'other';
    text: string;
    timestamp: Date;
}

// components/ChatBox.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';

interface ChatBoxProps {
    currentUser: string;
    otherUser: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ currentUser, otherUser }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [messageIdCounter, setMessageIdCounter] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getNextMessageId = () => {
        const nextId = messageIdCounter;
        setMessageIdCounter(prevId => prevId + 1);
        return nextId;
    };

    const handleSendMessage = () => {
        if (input.trim() === '') return;

        const newMessage: Message = {
            id: getNextMessageId(),
            sender: 'user',
            text: input,
            timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);
        setInput('');

        // Simulate response from other person (for demo purposes)
        setTimeout(() => {
            const responseMessage: Message = {
                id: getNextMessageId(),
                sender: 'other',
                text: `This is a simulated response to: ${input}`,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, responseMessage]);
        }, 1000);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex flex-col h-96 max-w-md mx-auto border rounded-lg shadow-lg bg-white">
            {/* Chat header */}
            <div className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <h2 className="font-semibold">Chat with {otherUser}</h2>
            </div>

            {/* Messages container */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Start a conversation...
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`mb-3 flex ${
                                message.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            <div
                                className={`max-w-xs px-4 py-2 rounded-lg ${
                                    message.sender === 'user'
                                        ? 'bg-blue-500 text-white rounded-br-none'
                                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
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
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t p-3 flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                    }}
                    className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Type a message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;