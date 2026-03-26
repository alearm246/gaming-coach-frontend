const BASE_URL = 'http://localhost:5000';

export async function apiRequest(url: string, method: string, body?: any): Promise<any> {
    try {
        const token = localStorage.getItem('JWT')
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
        
        const response: any = await fetch(`${BASE_URL}${url}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        })

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`) 
        }

        const data = await response.json()
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}