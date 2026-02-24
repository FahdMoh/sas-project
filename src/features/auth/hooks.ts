import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './store';
import { login as apiLogin, logout as apiLogout } from './api';
import type { LoginRequest } from './types';

/**
 * Composes auth store state with login mutation logic
 * (loading state, error handling, and API call).
 */
export const useAuth = () => {
    const { isAuthenticated, user, loginSuccess, logout } = useAuthStore();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (credentials: LoginRequest): Promise<void> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiLogin(credentials);
            loginSuccess(response);
        } catch (err) {
            // Both mock rejections and Axios errors are normalised to plain Error
            // objects inside api.ts, so err.message is always the user-facing text.
            const message =
                err instanceof Error ? err.message : 'Login failed. Please try again.';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { isAuthenticated, user, isLoading, error, login, logout };
};

/**
 * Triggers the logout flow:
 *   1. Calls the API (fire-and-forget — errors are swallowed inside api.logout).
 *   2. Always clears store + tokens via the Zustand logout action.
 *   3. Redirects to '/' (home).
 */
export const useLogout = () => {
    const { logout: storeLogout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async (): Promise<void> => {
        await apiLogout(); // attempt server-side invalidation
        storeLogout();     // always clear local tokens & state
        navigate('/');     // redirect regardless of API result
    };

    return { handleLogout };
};
