export interface Player {
    id: number
    player_tag: string
    player_name: string
}

export interface UserResponse {
    id: number
    username: string
    email: string
    players: Player[]
}

export interface AuthResponse {
    token: string
    username?: string
    email?: string
}

export interface CoachingResponse {
    response: string
}

export interface Message {
    role: "user" | "assistant",
    content: string
}