"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

// Define message type
type Message = {
    id: string
    role: "user" | "assistant"
    content: string
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!input.trim()) return

        // Add user message to chat
        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            // Send message to API
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            })

            if (!response.ok) {
                throw new Error("Failed to send message")
            }

            const data = await response.json()

            // Add assistant response to chat
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.response,
            }

            setMessages((prev) => [...prev, assistantMessage])
        } catch (error) {
            console.error("Error sending message:", error)
            // Add error message
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Sorry, there was an error processing your request. Please try again.",
            }

            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="sticky top-0 z-10 border-b bg-white p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-bold">Consultant Chat</h1>
                    <Button variant="outline">End Chat</Button>
                </div>
            </header>

            <main className="flex-1 container mx-auto p-4 max-w-4xl">
                <Card className="h-[calc(100vh-12rem)]">
                    <CardHeader className="bg-primary/5">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Consultant" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>Consultant</CardTitle>
                                <p className="text-sm text-muted-foreground">Online now</p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 overflow-y-auto h-[calc(100%-8rem)]">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                <div className="rounded-full bg-primary/10 p-4 mb-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Consultant" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                <h3 className="text-lg font-medium mb-2">Welcome to Consultant Chat</h3>
                                <p className="text-muted-foreground">Ask any questions you have and our consultant will assist you.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div className="flex items-start gap-2 max-w-[80%]">
                                            {message.role !== "user" && (
                                                <Avatar className="mt-1">
                                                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Consultant" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div
                                                className={`p-3 rounded-lg ${
                                                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                                }`}
                                            >
                                                {message.content}
                                            </div>
                                            {message.role === "user" && (
                                                <Avatar className="mt-1">
                                                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                                                    <AvatarFallback>U</AvatarFallback>
                                                </Avatar>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="p-4 border-t">
                        <form onSubmit={handleSubmit} className="flex w-full gap-2">
                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
                                className="flex-1"
                                disabled={isLoading}
                            />
                            <Button type="submit" size="icon" disabled={isLoading}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}

