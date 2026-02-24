/**
 * Auth feature types
 */
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    refreshToken: string;
}
