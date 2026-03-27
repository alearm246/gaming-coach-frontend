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
        <div>
            {isLoading && (
                <div className="flex items-center gap-1 p-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            )}
            <div>
                {messages.map((message, index) => {
                  return (<>
                            <MessageBubble key={index} message={message} />
                            <br />
                          </>)
                })}
                <div ref={messagesEndRef} />
            </div>
             <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Reply..."
                />
                <button disabled={isLoading} type="submit">
                    {isLoading ? "..." : "Send"}
                </button>
            </form>  
        </div>
    )
}