import { useAuthStore } from './store';
import * as authApi from './api';
import type { LoginPayload } from './types';

/**
 * Convenience hook exposing auth state and actions.
 */
export const useAuth = () => {
    const { user, token, setAuth, clearAuth } = useAuthStore();

    const isAuthenticated = !!token;

    const handleLogin = async (payload: LoginPayload) => {
        // TODO: handle errors with try/catch and surface to UI
        const response = await authApi.login(payload);
        setAuth(response.user, response.token, response.refreshToken);
    };

    const handleLogout = async () => {
        await authApi.logout();
        clearAuth();
    };

    return { user, token, isAuthenticated, handleLogin, handleLogout };
};
