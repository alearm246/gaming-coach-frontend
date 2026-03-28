import { useState } from "react";
import { Message } from "@/lib/types";
import ReactMarkdown from 'react-markdown'

interface MessageBubbleProp {
    message: Message
}

export default function MessageBubble({ message }: MessageBubbleProp) {
    const { role, content } = message;
    const isUser = role === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold mr-2 shrink-0">
                    GC
                </div>
            )}
            <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                isUser 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-gray-800 text-gray-100 rounded-bl-sm'
            }`}>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    )
}