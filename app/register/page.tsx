'use client';
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { apiRequest } from '@/lib/api';
import { AuthResponse } from '@/lib/types';

export default function RegisterPage() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const data: AuthResponse = await apiRequest("/api/auth/register", "POST", {
                username,
                email,
                password
            })
            localStorage.setItem('JWT', data.token);
            router.push("/connect");
        } catch (error) {
            setError('Registration failed. Please try again.')
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
                    <h2 className="text-xl font-semibold text-white mb-6">Create an account</h2>
                    {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="bg-gray-800 text-white placeholder-gray-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="bg-gray-800 text-white placeholder-gray-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="bg-gray-800 text-white placeholder-gray-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl py-3 text-sm transition-colors mt-2"
                        >
                            Create Account
                        </button>
                    </form>
                    <p className="text-gray-500 text-sm text-center mt-6">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-400 hover:text-blue-300">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    )
}