import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken, clearTokens } from '@/shared/lib/auth/token-manager';

/**
 * Injects the Bearer token from storage into every outgoing request.
 */
export const attachTokenInterceptor = (instance: AxiosInstance): void => {
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = getToken();
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
};

/**
 * Handles 401 Unauthorized responses.
 * TODO: implement token refresh logic (call /auth/refresh, retry original request).
 */
export const handleUnauthorizedInterceptor = (instance: AxiosInstance): void => {
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                // TODO: attempt token refresh before clearing session
                clearTokens();
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
};
