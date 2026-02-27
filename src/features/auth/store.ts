import { create } from 'zustand';
import { getAccessToken, setTokens, clearTokens } from '@/shared/lib/auth/token-manager';
import type { LoginResponse } from './types';

interface AuthStore {
    /** True when a valid access token is present in localStorage. */
    isAuthenticated: boolean;
    /** Identifier of the logged-in user (email). */
    user: string | null;
    /** Called after a successful login API response. */
    loginSuccess: (response: LoginResponse) => void;
    /** Clears session state and tokens. */
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    // Restore auth from a previous session
    isAuthenticated: !!getAccessToken(),
    user: null,

    loginSuccess: (response) => {
        setTokens(response.token.access, response.token.refresh);
        set({
            isAuthenticated: true,
            user: response.email_or_phone_number,
        });
    },

    logout: () => {
        clearTokens();
        set({ isAuthenticated: false, user: null });
    },
}));
