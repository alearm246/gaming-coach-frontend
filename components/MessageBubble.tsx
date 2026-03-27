import { useState } from "react";
import { Message } from "@/lib/types";

interface MessageBubbleProp {
    message: Message
}

export default function MessageBubble({ message }: MessageBubbleProp) {
    const { role, content } = message;
    return (
        <div className={role === 'user' ? 'text-right' : 'text-left'}>
            {content}
        </div>
    )
}