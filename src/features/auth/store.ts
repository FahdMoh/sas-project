import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User } from './types';

interface AuthStore extends AuthState {
    setAuth: (user: User, token: string, refreshToken: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            refreshToken: null,

            setAuth: (user, token, refreshToken) =>
                set({ user, token, refreshToken }),

            clearAuth: () =>
                set({ user: null, token: null, refreshToken: null }),
        }),
        {
            name: 'auth-storage', // localStorage key
        }
    )
);
