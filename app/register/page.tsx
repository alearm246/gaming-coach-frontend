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
        <>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Register</button>
            </form>  
        </> 
    )
}