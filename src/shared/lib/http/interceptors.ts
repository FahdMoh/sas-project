import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, clearTokens } from '@/shared/lib/auth/token-manager';

/**
 * Injects the Bearer token from localStorage into every outgoing request.
 */
export const attachTokenInterceptor = (instance: AxiosInstance): void => {
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = getAccessToken();
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
};

/**
 * Handles 401 Unauthorized responses — clears tokens and redirects to /login.
 * TODO: implement silent refresh before clearing the session.
 */
export const handleUnauthorizedInterceptor = (instance: AxiosInstance): void => {
    instance.interceptors.response.use(
        (response) => response,
        (error: unknown) => {
            const status =
                typeof error === 'object' &&
                    error !== null &&
                    'response' in error &&
                    typeof (error as { response?: { status?: number } }).response?.status === 'number'
                    ? (error as { response: { status: number } }).response.status
                    : null;

            if (status === 401) {
                clearTokens();
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
};
