"use client";
import { useState, FormEvent } from "react"
import { apiRequest } from "@/lib/api";

export default function ConnectPage() {
    const [playerTag, setPlayerTag] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const data = await apiRequest("/api/player/connect", "POST", {
                player_tag: playerTag
            });
        } catch (error) {
            setError("Connecting clash royale account failed. Please try again");
            console.error(error);
            throw error;
        }
    } 

    return (
        <>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={playerTag}
                    onChange={(e) => setPlayerTag(e.target.value)}
                    placeholder="player tag"
                />
                <button type="submit">connect account</button>
            </form>  
        </> 
    )
}