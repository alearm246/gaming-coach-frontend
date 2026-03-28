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
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        GC
                    </div>
                    <h1 className="text-2xl font-bold text-white">Gaming Coach</h1>
                </div>
                <div className="bg-gray-900 rounded-2xl p-8">
                    <h2 className="text-xl font-semibold text-white mb-2">Connect your account</h2>
                    <p className="text-gray-400 text-sm mb-6">Enter your Clash Royale player tag to get started. You can find it in your profile in game.</p>
                    {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={playerTag}
                            onChange={(e) => setPlayerTag(e.target.value)}
                            placeholder="#XXXXXXXX"
                            className="bg-gray-800 text-white placeholder-gray-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl py-3 text-sm transition-colors"
                        >
                            Connect Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
)
}