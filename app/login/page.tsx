'use client';
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { apiRequest } from '@/lib/api';
import { Player, UserResponse, AuthResponse } from '@/lib/types';

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const data: AuthResponse = await apiRequest("/api/auth/login", "POST", {
                email,
                password
            })
            localStorage.setItem('JWT', data.token);

            const data2: UserResponse = await apiRequest("/api/auth/me", "GET");

            //We are assuming one clash royale account per player. add multi account support some other time
            const { players } = data2;

            if (players.length > 0) {
                router.push("/coach");
            } else {
                router.push("/connect");
            }

        } catch (error) {
            setError('Login failed. Please try again.')
            console.error(error);
            throw error;
        }
    }

    return (
        <>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>  
        </> 
    )
}