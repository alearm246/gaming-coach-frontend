'use client';
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { apiRequest } from '@/lib/api';

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const data = await apiRequest("/api/auth/login", "POST", {
                email,
                password
            })
            localStorage.setItem('JWT', data.token);
            router.push("/connect");
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