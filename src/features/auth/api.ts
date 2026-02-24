import { httpClient } from '@/shared/lib/http/axios';
import { API_ENDPOINTS } from '@/config/api-config';
import type { LoginPayload, AuthResponse } from './types';

/**
 * Log in with email and password.
 */
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await httpClient.post<AuthResponse>(
        API_ENDPOINTS.LOGIN,
        payload
    );
    return data;
};

/**
 * Log out the current user (invalidates server-side session).
 */
export const logout = async (): Promise<void> => {
    await httpClient.post(API_ENDPOINTS.LOGOUT);
};

/**
 * Exchange a refresh token for a new access token.
 */
export const refreshToken = async (token: string): Promise<AuthResponse> => {
    const { data } = await httpClient.post<AuthResponse>(API_ENDPOINTS.REFRESH, {
        refreshToken: token,
    });
    return data;
};
