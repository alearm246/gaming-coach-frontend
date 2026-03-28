"use client";
import { useState, useEffect, useRef, FormEvent } from "react"
import { apiRequest } from "@/lib/api";
import MessageBubble from "@/components/MessageBubble";
import { CoachingResponse, Message, UserResponse } from "@/lib/types";

export default function CoachPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [playerId, setPlayerId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data: UserResponse = await apiRequest("/api/auth/me", "GET");
                setPlayerId(data.players[0].id);
            } catch(error) {
                console.error(error);
                throw error;
            }
        }
        fetchUser();
    }, [])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])  

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setMessages(prev => [...prev, { role: 'user', content: input }])
        try {
            const data: CoachingResponse = await apiRequest("/api/chat/", "POST", {
                message: input,
                player_id: playerId
            })

            const { response } = data;
            setMessages(prev => [...prev, { role: 'assistant', content: response }])
        } catch(error) {
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
            setInput("");
        }
    }

    return (
        <div className="flex flex-col h-screen bg-gray-950 text-white">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-800">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    GC
                </div>
                <h1 className="font-semibold text-lg">Gaming Coach</h1>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                            GC
                        </div>
                        <h2 className="text-xl font-semibold">Gaming Coach</h2>
                        <p className="text-gray-400 text-sm max-w-sm">Ask me anything about your Clash Royale performance. I've analyzed your recent matches and I'm ready to help you improve.</p>
                    </div>
                )}
                {messages.map((message, index) => (
                    <>
                        <MessageBubble key={index} message={message} />
                        <br />
                    </>      
                ))}
                {isLoading && (
                    <div className="flex items-center gap-1 p-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold mr-2 shrink-0">
                            GC
                        </div>
                        <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-6 py-4 flex justify-center">
                <form onSubmit={handleSubmit} className="flex gap-3 items-center bg-gray-800 rounded-2xl px-4 py-3 w-full max-w-2xl">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask your coach..."
                        disabled={isLoading}
                        className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center disabled:opacity-40 hover:bg-blue-500 transition-colors shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
)
}